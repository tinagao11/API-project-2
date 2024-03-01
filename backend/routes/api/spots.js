const express = require('express');
const bcrypt = require('bcryptjs');
const { Spot, SpotImage, User, Review, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation')
const { Op } = require('sequelize');
const { check,query } = require('express-validator');//package that collect errors and save as array

const router = express.Router();

const valitReviews = [
  check('review')
      .exists({ checkFalsy: true })
      .withMessage("Review text is required"),
  check('stars')
      .isInt({ min: 1, max: 5 })
      .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors
]
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



module.exports = router;
