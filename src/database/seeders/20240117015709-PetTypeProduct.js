'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('petTypesProducts', [
      {
        petTypes_id: 2,
        products_id: 1
      },
      {
        petTypes_id: 2,
        products_id: 2
      },
      {
        petTypes_id: 1,
        products_id: 3
      },
      {
        petTypes_id: 1,
        products_id: 4
      },
      {
        petTypes_id: 1,
        products_id: 5
      },
      {
        petTypes_id: 5,
        products_id: 6
      },
      {
        petTypes_id: 4,
        products_id: 7
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('petTypesProducts', null, {});
  }
};