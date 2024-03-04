const express = require('express');
const { Spot, SpotImage, User, Review, ReviewImage, Booking } = require('../../db/models');
const { requireAuth, setTokenCookie, restoreUser } = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation')
const { Op } = require('sequelize');
const { check,query } = require('express-validator');

const router = express.Router();

//Delete a Spot Image
router.delete('/:imageId', requireAuth, async(req, res)=>{
  const {imageId}= req.params;

  let spotimage = await SpotImage.findByPk(imageId);

  if(!spotimage){
    return res.status(404).json({
      message: `Spot Image couldn't be found`
  })
  }

  let spot = await Spot.findByPk(spotimage.spotId)
  if(spot.ownerId !== req.user.id){
      return res.status(403).json({message:'image must belong to the current user'})
  }

  await spotimage.destroy();

  return res.status(200).json({ message: 'Successfully deleted' })

})



module.exports = router;
