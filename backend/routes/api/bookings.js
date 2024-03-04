const express = require('express');
const { Spot, SpotImage, User, Review, ReviewImage, Booking } = require('../../db/models');
const { requireAuth, setTokenCookie, restoreUser } = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation')
const { Op } = require('sequelize');
const { check,query } = require('express-validator');

const router = express.Router();

//Get all of the Current User's Bookings
router.get('/current', requireAuth, async(req, res)=>{
  const userId = req.user.id;
  let compiledBookings = [];

  const bookings = await Booking.findAll({
    where:{userId: userId},
    include:[{
      model: Spot,
      attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']}]
  })

  for (let booking of bookings) {
    let bookingData = booking.toJSON();


    const previewImage = await SpotImage.findOne({
        where: { spotId: bookingData.Spot.id, preview: true }
    });


    bookingData.Spot.previewImage = previewImage ? previewImage.url : null;


    bookingData.Spot.lat = parseFloat(bookingData.Spot.lat);
    bookingData.Spot.lng = parseFloat(bookingData.Spot.lng);
    bookingData.Spot.price = parseFloat(bookingData.Spot.price);


    compiledBookings.push({
        id: bookingData.id,
        spotId: bookingData.spotId,
        Spot: bookingData.Spot,
        userId: bookingData.userId,
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        createdAt: bookingData.createdAt,
        updatedAt: bookingData.updatedAt
    });
}

return res.status(200).json({ Bookings: compiledBookings });

})

//Edit a Booking
router.put('/:bookingId', requireAuth, async(req,res)=>{
  const {bookingId}= req.params;
  const userId = req.user.id;
  const {startDate, endDate}= req.body;

  const booking = await Booking.findByPk(bookingId);

  if(!booking){
    return res.status(404).json({
      message: "Booking couldn't be found"
  })
  }

  if (userId !== booking.userId) {
    return res.status(403).json({message: `Booking must belong to the current user`})
}

  const start = new Date(startDate);
  const end = new Date(endDate);
  let currentDate = new Date();

  if (start < currentDate || end < currentDate) {
      return res.status(403).json({
          message: "Past bookings can't be modified"
      })
  }


  if (end <= start) {
    return res.status(400).json({
        message: "Bad Request",
        errors: { endDate: "endDate cannot be on or before startDate" }
    });
}

const existing = await Booking.findOne({
  where:{
    id: {
      [Op.ne]: bookingId
  },
  spotId: booking.spotId,
    [Op.and]:[
      {
        startDate: {
            [Op.lte]: end
        }
    },
    {
        endDate: {
            [Op.gte]: start
        }
    }
    ]
  }
})

if (existing) {
  return res.status(403).json({
      message: "Sorry, this spot is already booked for the specified dates",
      errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking"
      }
  })}

  booking.startDate = startDate
  booking.endDate = endDate
  await booking.save()

  res.json(booking)

})


//Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
  const { bookingId } = req.params
  const booking = await Booking.findByPk(bookingId)
  if (!booking) {
      return res.status(404).json({
          message: `Booking couldn't be found`
      })
  }
   if (booking.userId !== req.user.id) {
      return res.status(403).json({
          message: 'Booking must belong to the current user'
      })
  }
  if (new Date(booking.startDate) <= new Date()) {
      return res.status(403).json({
          message: "Bookings that have been started can't be deleted"
      })
  }

  await booking.destroy();

  return res.json({
      message: "Successfully deleted"
  })
})





module.exports = router;
