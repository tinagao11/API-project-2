'use strict';

/** @type {import('sequelize-cli').Migration} */
const { Spot } = require('../models')
let options = { tableName: 'Spots'}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '123 Main St',
        city: 'Acity',
        state: 'Astate',
        country: 'Acountry',
        lat: 67,
        lng: -114,
        name: 'Aspot',
        description: 'Nice place in the middle of the city.',
        price: 900.00


      },
      {
        ownerId: 2,
        address: '223 Main St',
        city: 'Bcity',
        state: 'Bstate',
        country: 'Bcountry',
        lat: 78,
        lng: -144,
        name: 'Bspot',
        description: 'Explore cutting-edge technology and futuristic innovations in the heart of city',
        price: 700.99
      },
      {
        ownerId: 3,
        address: '323 Main St',
        city: 'Ccity',
        state: 'Cstate',
        country: 'Ccountry',
        lat: 69,
        lng: 59,
        name: 'Cspot',
        description: 'Relax by the soothing ocean in Seascape.',
        price: 800.99
      },
      {
        ownerId: 2,
        address: '423 Main St',
        city: 'Dcity',
        state: 'Dstate',
        country: 'Dcountry',
        lat: 70,
        lng: -145,
        name: 'Dspot',
        description: 'Ideal for adventurers and peace seekers alike.',
        price: 160.99

      },
      {
        ownerId: 2,
        address: '523 Main St',
        city: 'Ecity',
        state: 'Estate',
        country: 'Ecountry',
        lat: 89,
        lng: -110,
        name: 'Espot',
        description: 'Embark on an unforgettable adventure in Expeditionland',
        price: 100.99
      },
      {
        ownerId: 1,
        address: '623 Main St',
        city: 'Fcity',
        state: 'Fstate',
        country: 'Fcountry',
        lat: 63,
        lng: -117,
        name: 'Fspot',
        description: 'Discover the serene beauty of Quietude at the Tranquility Gardens.',
        price: 500.99

      },
      {
        ownerId: 3,
        address: '723 Main St',
        city: 'Gcity',
        state: 'Gstate',
        country: 'Gcountry',
        lat: 80,
        lng: -175,
        name: 'Gspot',
        description: 'Step back in time and uncover the secrets of Antiquity',
        price: 150.99

      }
    ],options,{validate:true})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
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
      ownerId: { [Op.in]: [1,2,3,4,5,6]}
    })
  }
};
