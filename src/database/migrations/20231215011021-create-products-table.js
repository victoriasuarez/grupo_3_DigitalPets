'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      categories_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'categories'
          },
          key: 'id'
        }
      },
      petTypes_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'petTypes'
          },
          key: 'id'
        }
      },
      brands_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'brands'
          },
          key: 'id'
        }
      },
      petAges_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'petAges'
          },
          key: 'id'
        }
      },
      description: {
        type: Sequelize.TEXT,
      },
      discount: {
        type: Sequelize.FLOAT
      },
      image: {
        type: Sequelize.TEXT,
        defaultValue: 'default-image.png'
      },
      weight: {
        type: Sequelize.INTEGER,
      },
      color: {
        type: Sequelize.TEXT,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};