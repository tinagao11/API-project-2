'use strict';

/** @type {import('sequelize-cli').Migration} */
const { ReviewImage } = require('../models')
let options = { tableName: 'ReviewImages'}
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
    await ReviewImage.bulkCreate([
      {
        reviewId:1,
        url:'https://media-cdn.tripadvisor.com/media/vr-ha-splice-j/10/d7/cf/55.jpg'
      },
      {
        reviewId:2,
        url:'https://media-cdn.tripadvisor.com/media/vr-ha-splice-j/0e/d2/1b/d7.jpg'
      },
      {
        reviewId:3,
        url:'https://media-cdn.tripadvisor.com/media/vr-ha-splice-j/0f/4b/d1/20.jpg'
      },
      {
        reviewId:4,
        url:'https://media-cdn.tripadvisor.com/media/vr-ha-splice-j/11/51/9f/75.jpg'
      }

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
      reviewId: { [Op.in]: [1,2,3,4]}
    }, {})
  }
};
