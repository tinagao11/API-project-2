'use strict';

/** @type {import('sequelize-cli').Migration} */
const { SpotImage } = require('../models')
let options = { tableName: 'SpotImages'};
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
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://example.com/image1.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://example.com/image2.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://example.com/image3.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://example.com/image4.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://example.com/image5.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://example.com/image6.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://example.com/image7.jpg',
        preview: true
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
    })
  }
};
