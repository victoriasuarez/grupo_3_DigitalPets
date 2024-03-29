// models/categoryProduct.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PetTypeProduct extends Model {
    static associate(models) {
      // No es necesario definir asociaciones en este modelo,
      // ya que las asociaciones se han definido en los modelos Category y Product.
    }
  }
  PetTypeProduct.init(
    {
      petTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'PetTypeProduct',
      tableName: 'petTypesProducts',
      timestamps: false
    }
  );
  return PetTypeProduct;
};