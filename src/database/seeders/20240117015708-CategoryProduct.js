'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categoriesProducts', [
      {
        categoryId: 1,
        productId: 1
      },
      {
        categoryId: 2,
        productId: 1
      },
      {
        categoryId: 3,
        productId: 1
      },
      {
        categoryId: 2,
        productId: 2
      },
      {
        categoryId: 3,
        productId: 2
      },
      {
        categoryId: 1,
        productId: 3
      },
      {
        categoryId: 1,
        productId: 4
      },
      {
        categoryId: 3,
        productId: 4
      },
      {
        categoryId: 2,
        productId: 5
      },
      {
        categoryId: 3,
        productId: 5
      },
      {
        categoryId: 1,
        productId: 6
      },
      {
        categoryId: 3,
        productId: 6
      },
      {
        categoryId: 1,
        productId: 7
      },
      {
        categoryId: 2,
        productId: 7
      },
      {
        categoryId: 3,
        productId: 7
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categoriesProducts', null, {});
  }
};
