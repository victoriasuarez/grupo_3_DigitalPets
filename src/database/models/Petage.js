'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Petage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Petage.init({
    name: DataTypes.STRING,
    allowNull: false
  }, {
    sequelize,
    modelName: 'Petage',
    tableName: 'petAges',
    timestamps: false
  });
  return Petage;
};