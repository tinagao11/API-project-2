const express = require('express');
const bcrypt = require('bcryptjs');
const { Spot, SpotImage, User, Review, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation')
const { Op } = require('sequelize');
const { check,query } = require('express-validator');//package that collect errors and save as array

const router = express.Router();

// const valitReviews = [
//   check('review')
//       .exists({ checkFalsy: true })
//       .withMessage("Review text is required"),
//   check('stars')
//       .isInt({ min: 1, max: 5 })
//       .withMessage("Stars must be an integer from 1 to 5"),
//   handleValidationErrors
// ]
const valitSpots = [
  check('address')
      .exists({ checkFalsy: true })
      .withMessage('Street Address is required'),
  check('city')
      .exists({ checkFalsy: true })
      .withMessage('City is required'),
  check('state')
      .exists({ checkFalsy: true })
      .withMessage('State is required'),
  check('country')
      .exists({ checkFalsy: true })
      .withMessage('Country is required'),
  check('lat')
      .isFloat({ min: -90, max: 90 })
      .withMessage("Latitude must be within -90 and 90"),
  check('lng')
      .isFloat({ min: -180, max: 180 })
      .withMessage("Longitude must be within -180 and 180"),
  check('name')
      .isLength({ max: 50 })
      .withMessage("Name must be less than 50 characters"),
  check('description')
      .exists({ checkFalsy: true })
      .withMessage("Description is required"),
  check('price')
      .isFloat({ min: 0 })
      .withMessage("Price per day must be a positive number"),
  handleValidationErrors
]
const validateQueryFilters = [
query('page')
  .optional()
  .isInt({ min: 1 })
  .withMessage("Page must be greater than or equal to 1"),
query('size')
  .optional()
  .isInt({ min: 1 })
  .withMessage("Size must be greater than or equal to 1"),
query('maxLat')
  .optional()
  .isFloat({ min: -90, max: 90 })
  .withMessage("Maximum latitude is invalid"),
query('minLat')
  .optional()
  .isFloat({ min: -180, max: 180 })
  .withMessage("Minimum latitude is invalid"),
query('minLng')
  .optional()
  .isFloat({ min: -180, max: 180 })
  .withMessage("Maximum longitude is invalid"),
query('maxLng')
  .optional()
  .isFloat({ min: -180, max: 180 })
  .withMessage("Minimum longitude is invalid"),
query('minPrice')
  .optional()
  .isFloat({ min: 0 })
  .withMessage("Minimum price must be greater than or equal to 0"),
query('maxPrice')
  .optional()
  .isFloat({ min: 0 })
  .withMessage("Maximum price must be greater than or equal to 0"),
handleValidationErrors
]

//get all spots
router.get('/', validateQueryFilters, async (req, res)=>{
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
  let queryObj = {
    where: {}
  };

  if(!page || (parseInt(page)==NaN)) page = 1;
  if(!size || (parseInt(size)==NaN)) size = 20;

  queryObj.limit = size;
  queryObj.offset = size *(page-1);

  if(minLat){
    queryObj.where.lat = {
      [Op.gte]: parseFloat(minLat)
    }
  }

  if(maxLat){
    queryObj.where.lat ={
      [Op.gle]: parseFloat(maxLat)
    }
  }

  if(minLng){
    queryObj.where.lng = {
      [Op.gte]: parseFloat(minLng)
    }
  }

  if(maxLng){
    queryObj.where.lng ={
      [Op.gle]: parseFloat(maxLng)
    }
  }

  if(minPrice){
    queryObj.where.price = {
      [Op.gte]: parseFloat(minPrice)
    }
  }

  if(maxLat){
    queryObj.where.price ={
      [Op.gle]: parseFloat(maxPrice)
    }
  }

  const spots = await Spot.findAll({...queryObj})

  return res.status(200).json(spots)

})



//get spots by current user
router.get('/current', requireAuth, async (req, res) => {
  const ownerId = req.user.id;

  // Fetch all spots owned by the current user
  const spots = await Spot.findAll({
      where: { ownerId: ownerId },
  });

  for (const spot of spots) {
      // Calculate average rating for each spot
      const reviews = await Review.findAll({
          where: { spotId: spot.id },
          attributes: ['stars']
      });

      let avgRating = reviews.reduce((acc, { stars }) => acc + stars, 0) / reviews.length;
      avgRating = isNaN(avgRating) ? 0 : avgRating; // Handle case with no reviews
      spot.dataValues.avgRating = avgRating;

      // Fetch preview image for each spot
      const previewImage = await SpotImage.findOne({
          where: { spotId: spot.id },
          attributes: ['url']
      });

      spot.dataValues.previewImage = previewImage ? previewImage.url : null;


      spot.dataValues.lat = parseFloat(spot.lat);
      spot.dataValues.lng = parseFloat(spot.lng);
      spot.dataValues.price = parseFloat(spot.price);
  }

  res.json({ Spots: spots });
});


// Get details of a Spot from an id
async function getSpotDetailById(spotId){
  const spot = await Spot.findByPk(spotId);

  if(!spot) return null;

  const reviewCount= await Review.count({
    where: {spotId}
  })

  const starSum = await Review.sum('stars',{
    where:{spotId}
  })

  const avgRating = starSum/reviewCount

  const imgurl = await SpotImage.findAll({
    where: {spotId},
    attributes: ['id', 'url', 'preview']
  })

  const owner = await User.findByPk(spot.ownerId,{
    attributes: ['id', 'firstName','lastName']
  })

  spot.setDataValue('numReviews', reviewCount);
  spot.setDataValue('avgStarRating', avgRating);
  spot.setDataValue('SpotImages', imgurl);
  spot.setDataValue('Owner', owner);


  ['lat', 'lng', 'price'].forEach(key => {
    if (spot[key]) spot[key] = parseFloat(spot[key]);
});

return spot;

}

router.get('/:spotId',requireAuth, async(req, res)=>{
  const { spotId } = req.params;
  const spotDetails = await getSpotDetailById(spotId);

  if (!spotDetails) {
    return res.status(404).json({
        message: "Spot couldn't be found"
    });
}

res.json(spotDetails);

});

//create a spot
router.post('/',[requireAuth,valitSpots], async(req, res)=>{
  const { address, city, state, country, lat, lng, name, description, price } = req.body

  const spot = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
})

if (spot.lat) spot.lat = parseFloat(lat)
if (spot.lng) spot.lng = parseFloat(lng)
if (spot.price) spot.price = parseFloat(price)

res.status(201).json(spot)

})

//Add an Image to a Spot based on the Spot's id
async function addImageToSpot(userId, spotId, imageUrl, isPreview){
  const spot = await Spot.findByPk(spotId);

  if(!spot){
    return { error: true, status: 404, message: "Spot couldn't be found" }
  }

  if(userId !== spot.ownerId){

    return { error: true, status: 403, message:'Spot must belong to the current user'}

  }

  const spotImage = await SpotImage.create({
    spotId: spotId,
    url: imageUrl,
    preview: isPreview
  })

  return {
    error: false,
    spotImage:{
      id: spotImage.id,
      url: spotImage.url,
      preview: spotImage.preview
    }
  }

}

router.post('/:spotId/images', requireAuth, async(req, res)=>{
  const {url, preview} = req.body;

  const { spotId } = req.params;

  const userId = req.user.id;

  const result = await addImageToSpot(userId, spotId, url, preview)

  if(result.error){
    return res.status(result.status).json({message: result.message})
  }

  res.json(result.spotImage)
})

    // Edit a spot
  router.put('/:spotId', [requireAuth, valitSpots], async(req, res)=>{
    const {spotId} = req.params;

    const data = req.body;

    const spot = await Spot.findByPk(spotId)

    if(!spot){
      return res.status(404).json({message: `Spot couldn't be found`})}

    if(req.user.id !== spot.ownerId){
      return res.status(404).json({message: `Spot must belong to the current user`})
    }

    const updatedSpot = await spot.update(data)

    res.json(updatedSpot)

  })

   //delete spot
   router.delete('/:spotId', requireAuth, async(req, res)=>{
    const { spotId } = req.params;
    let spot = await Spot.findByPk(spotId);

    if(!spot){
      return res.status(404).json({message: `Spot couldn't be found`})}

    if(req.user.id !== spot.ownerId){
      return res.status(404).json({message: `Spot must belong to the current user`})
    }

    spot.destroy()

    res.status(200).json({
      message: 'Successfully deleted'
    })

   })

module.exports = router;
