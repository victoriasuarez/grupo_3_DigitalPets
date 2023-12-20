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
      // define association here
    }
  }
  PetType.init({
    name: DataTypes.STRING,
    allowNull: false
  }, {
    sequelize,
    modelName: 'PetType',
    tableName: 'petTypes',
    timestamps: false
  });
  return PetType;
};
