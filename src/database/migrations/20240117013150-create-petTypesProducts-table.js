module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('petTypesProducts', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        petTypeId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'petTypes',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        productId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'products',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('petTypesProducts');
    },
  };