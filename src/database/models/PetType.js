'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PetType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PetType.belongsToMany(models.Product, {
        through: 'PetTypeProduct',
        foreignKey: 'petTypeId',
      });
    }
  }
  PetType.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'PetType',
    tableName: 'petTypes',
    timestamps: false
  });
  return PetType;
};
