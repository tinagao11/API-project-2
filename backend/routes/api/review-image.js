const express = require('express');
const { Spot, SpotImage, User, Review, ReviewImage, Booking } = require('../../db/models');
const { requireAuth, setTokenCookie, restoreUser } = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation')
const { Op } = require('sequelize');
const { check,query } = require('express-validator');

const router = express.Router();

//Delete a Review Image
router.delete('/:imageId', requireAuth, async(req, res)=>{
  const { imageId}= req.params;

  let reviewImage = await ReviewImage.findByPk(imageId);

  if(!reviewImage){
    return res.status(404).json({
      message: `Review Image couldn't be found`
  })
  }

  let review = await Review.findByPk(reviewImage.reviewId)

  if(!review){
    return res.status(403).json({message:"Forbidden"})
}

  if(review.userId !== req.user.id){
      return res.status(403).json({message:'image must belong to the current user'})
  }

  await reviewImage.destroy();

  return res.status(200).json({ message: 'Successfully deleted' })

})



module.exports = router;
