'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categoriesProducts', [
      {
        categories_id: 1,
        products_id: 1
      },
      {
        categories_id: 2,
        products_id: 1
      },
      {
        categories_id: 3,
        products_id: 1
      },
      {
        categories_id: 2,
        products_id: 2
      },
      {
        categories_id: 3,
        products_id: 2
      },
      {
        categories_id: 1,
        products_id: 3
      },
      {
        categories_id: 1,
        products_id: 4
      },
      {
        categories_id: 3,
        products_id: 4
      },
      {
        categories_id: 2,
        products_id: 5
      },
      {
        categories_id: 3,
        products_id: 5
      },
      {
        categories_id: 1,
        products_id: 6
      },
      {
        categories_id: 3,
        products_id: 6
      },
      {
        categories_id: 1,
        products_id: 7
      },
      {
        categories_id: 2,
        products_id: 7
      },
      {
        categories_id: 3,
        products_id: 7
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categoriesProducts', null, {});
  }
};
