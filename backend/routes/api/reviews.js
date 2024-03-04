const express = require('express');
const { Spot, SpotImage, User, Review, ReviewImage, Booking } = require('../../db/models');
const { requireAuth, setTokenCookie, restoreUser } = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation')
const { Op } = require('sequelize');
const { check,query } = require('express-validator');

const router = express.Router();

const validReviews = [
  check('review')
  .exists({checkFalsy: true})
  .withMessage('Review text is required'),

  check('stars')
  .isInt({min:1, max:5})
  .withMessage('Stars must be an integer from 1 to 5'),

  handleValidationErrors
]

//Get all Reviews of the Current User

router.get('/current', requireAuth, async(req,res)=>{
  const userId = req.user.id;

  const reviews = await Review.findAll({
    where: {userId:userId},
    include: [
      {model: User, attributes: ['id', 'firstName', 'lastName']},
      {
        model: Spot,
        attributes:['id','ownerId','address','city','state','country','lat','lng','name','price'],
        include:[{
          model: SpotImage,
          attributes:['url']
        }]

      },
      {model: ReviewImage, attributes:['id','url']}
    ]
  })

  const processedReviews = reviews.map(review => {
    const reviewDetail = review.get({ plain: true });
    const previewImage = reviewDetail.Spot.SpotImages[0]?.url || null;


    Object.assign(reviewDetail.Spot, {
        previewImage: previewImage,
        lat: parseFloat(reviewDetail.Spot.lat),
        lng: parseFloat(reviewDetail.Spot.lng),
        price: parseFloat(reviewDetail.Spot.price)
    });

    delete reviewDetail.Spot.SpotImages;

    return reviewDetail;
});

res.json({ Reviews: processedReviews });

})

//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async(req, res)=>{
  const { reviewId } = req.params;
  const {url} = req.body;

  let review = await Review.findByPk(reviewId)

  if(!review){
    return res.status(404).json({"message": "Review couldn't be found"})
  }

  if(review.userId !== req.user.id){
    return res.status(403).json({message: `Review must belong to the current user`})
  }

  const imageCount = await ReviewImage.findAll({
    where: {reviewId:reviewId}
  })

  if(imageCount.length>=10){
    return res.status(403).json({
      message: "Maximum number of images for this resource was reached"
  })
  }

  let newImage = await ReviewImage.create({
    reviewId: reviewId,
    url: url
  })

  let result = {
    id: newImage.reviewId,
    url:newImage.url
  }

  return res.status(200).json(result)


})


//Edit a Review

router.put('/:reviewId', [requireAuth, validReviews], async (req, res)=>{
  const {reviewId}= req.params;
  const {review, stars}= req.body;

  const currentreview = await Review.findByPk(reviewId);

  if(!currentreview){
    return res.status(404).json({"message": "Review couldn't be found"})
  }

  if(currentreview.userId !== req.user.id){
    return res.status(403).json({message: `Review must belong to the current user`})
  }

  const updatedRview = await currentreview.update({review, stars})

  return res.status(200).json(updatedRview)


})



//Delete a Review

router.delete('/:reviewId', requireAuth, async(req,res)=>{
  const {reviewId}= req.params;

  const review = await Review.findByPk(reviewId);

  if(!review){
    return res.status(404).json({"message": "Review couldn't be found"})
  }

  if(review.userId !== req.user.id){
    return res.status(403).json({message: `Review must belong to the current user`})
  }

  review.destroy();

  res.status(200).json({
    message: 'Successfully deleted'
  })


})



module.exports = router;
