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
      // categories_id: {
      //   type: Sequelize.INTEGER,
      //   allowNull: true,
      //   references: {
      //     model: {
      //       tableName: 'categories'
      //     },
      //     key: 'id'
      //   }
      // },
      // petTypes_id: {
      //   type: Sequelize.INTEGER,
      //   allowNull: true,
      //   references: {
      //     model: {
      //       tableName: 'petTypes'
      //     },
      //     key: 'id'
      //   }
      // },
      brands_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'brands'
          },
          key: 'id'
        }
      },
      petAges_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
        type: Sequelize.STRING,
        defaultValue: 'default-image.png'
      },
      weight: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      color: {
        type: Sequelize.TEXT,
        allowNull: true
      },
       createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};