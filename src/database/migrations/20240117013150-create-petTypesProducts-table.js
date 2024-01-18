module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('petTypesProducts', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        petTypes_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'petTypes',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        products_id: {
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