'use strict';

//const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@admin.com',
        password: '$2a$10$2jqNFC5bTMu19BK7OxzSRuKNDv3VMZ2rInFGNYa/OzTdNmrfLl4LW', //admin5678
        birthDate: '1990-01-01',
        image: 'default-image-users.png', 
        roles_id: 1, 
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};