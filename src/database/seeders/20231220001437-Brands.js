'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('brands', [
      {
        name: 'Whiskas',
        image: 'Whiskas.jpg'
      },
      {
        name: 'Sabrositos',
        image: 'Sabrositos.png'
      },
      {
        name: 'Kongo',
        image: 'Kongo.jpg'
      },
      {
        name: 'Tetra'
      },
      {
        name: 'Nelsoni Ranch'
      },
      {
        name: 'Power'
      },
      {
        name: 'Pedigree',
        image: 'Pedigree.png'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('brands', null, {});
  }
};