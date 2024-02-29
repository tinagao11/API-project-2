'use strict';

/** @type {import('sequelize-cli').Migration} */
const { Booking } = require('../models')
let options = { tableName: 'Bookings' };
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Booking.bulkCreate([
      {
      spotId:1,
      userId:1,
      startDate:'2024-01-20',
      endDate:'2024-02-05'
    },
    {
      spotId:2,
      userId:2,
      startDate:'2024-02-14',
      endDate:'2024-02-20'
    },
    {
      spotId:3,
      userId:3,
      startDate:'2024-01-03',
      endDate:'2024-02-01'
    },
    {
      spotId:4,
      userId:1,
      startDate:'2024-02-22',
      endDate:'2024-02-26'
    },
    {
      spotId:5,
      userId:2,
      startDate:'2024-01-26',
      endDate:'2024-03-15'
    },
    {
      spotId:6,
      userId:3,
      startDate:'2024-03-01',
      endDate:'2024-03-20'
    },
    ], options, { validate: true })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2,3,4,5,6] }
    }, {});
  }
};
