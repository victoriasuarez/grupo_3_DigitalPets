// models/categoryProduct.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CategoryProduct extends Model {
    static associate(models) {
      // No es necesario definir asociaciones en este modelo,
      // ya que las asociaciones se han definido en los modelos Category y Product.
    }
  }
  CategoryProduct.init(
    {
      categoryId: {
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
      modelName: 'CategoryProduct',
      tableName: 'categoriesProducts',
      timestamps: false
    }
  );
  return CategoryProduct;
};