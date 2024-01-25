'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('petTypesProducts', [
      {
        petTypeId: 2,
        productId: 1
      },
      {
        petTypeId: 2,
        productId: 2
      },
      {
        petTypeId: 1,
        productId: 3
      },
      {
        petTypeId: 1,
        productId: 4
      },
      {
        petTypeId: 1,
        productId: 5
      },
      {
        petTypeId: 5,
        productId: 6
      },
      {
        petTypeId: 4,
        productId: 7
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('petTypesProducts', null, {});
  }
};