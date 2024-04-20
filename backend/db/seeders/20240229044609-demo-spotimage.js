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
        url: 'https://media-cdn.tripadvisor.com/media/vr-ha-splice-j/10/19/65/1d.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://media-cdn.tripadvisor.com/media/vr-ha-splice-j/0e/d2/1b/df.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://media-cdn.tripadvisor.com/media/vr-ha-splice-j/0e/d2/1b/ca.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://media-cdn.tripadvisor.com/media/vr-ha-splice-j/0e/d2/1b/ef.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://media-cdn.tripadvisor.com/media/vr-ha-splice-j/10/66/55/98.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://media-cdn.tripadvisor.com/media/vr-ha-splice-j/10/d7/cf/3b.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://media-cdn.tripadvisor.com/media/vr-ha-splice-j/10/d7/cf/6a.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://media-cdn.tripadvisor.com/media/vr-ha-splice-j/10/d7/cf/5f.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://media-cdn.tripadvisor.com/media/vr-ha-splice-j/10/d7/cf/51.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://media-cdn.tripadvisor.com/media/vr-ha-splice-j/10/d7/cf/45.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://media-cdn.tripadvisor.com/media/vr-ha-splice-j/10/51/0c/7b.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://media-cdn.tripadvisor.com/media/vr-ha-splice-j/0e/93/9b/f8.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://media-cdn.tripadvisor.com/media/vr-ha-splice-j/0e/93/9b/ec.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://media-cdn.tripadvisor.com/media/vr-ha-splice-j/0e/93/9b/fb.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://media-cdn.tripadvisor.com/media/vr-ha-splice-j/0e/93/9b/ee.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://media-cdn.tripadvisor.com/media/vr-ha-splice-j/0f/4b/d1/2d.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://media-cdn.tripadvisor.com/media/vr-ha-splice-j/12/46/61/20.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://media-cdn.tripadvisor.com/media/vr-splice-j/0b/9c/ee/48.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://media-cdn.tripadvisor.com/media/vr-ha-splice-j/10/10/e2/a6.jpg',
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
