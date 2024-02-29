'use strict';
/** @type {import('sequelize-cli').Migration} */
const { Review } = require('../models')
let options = { tableName: 'Reviews'}
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
    await Review.bulkCreate([
    {
      spotId:2,
      userId:1,
      review: 'Would give zero star if I can',
      stars: 1
    },
    {
      spotId:4,
      userId:3,
      review: 'Outstanding in every way possible! ',
      stars: 5
    },
    {
      spotId:5,
      userId:2,
      review: 'Beautiful location!',
      stars: 4
    },
    {
      spotId:3,
      userId:1,
      review: 'Beautiful and peaceful, but no AC',
      stars: 3
    },
    {
      spotId:7,
      userId:3,
      review: 'Absolutely amazing view.',
      stars: 4
    },
  ], options, { validate: true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2,3,4,5,6]}
    }, {})
  }
};
