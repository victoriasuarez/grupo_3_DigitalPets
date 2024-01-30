'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('petTypes', [
      {
        name: 'Perros',
        image: 'categoria-perros.jpg'
      },
      {
        name: 'Gatos',
        image: 'categoria-gatos.jpg'
      },
      {
        name: 'Aves',
        image: 'categoria-aves.jpg'
      },
      {
        name: 'Peces',
        image: 'categoria-peces.jpg'
      },
      {
        name: 'Otros',
        image: 'categoria-otros.png'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('petTypes', null, {});
  }
};