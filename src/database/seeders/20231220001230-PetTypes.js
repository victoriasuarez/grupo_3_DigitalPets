'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('petTypes', [
      {
        name: 'Perros'
      },
      {
        name: 'Gatos'
      },
      {
        name: 'Aves'
      },
      {
        name: 'Peces'
      },
      {
        name: 'Otros'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('petTypes', null, {});
  }
};