'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsToMany(models.Product, {
        as: 'products',
        through: 'CategoryProduct',
        foreignKey: 'categoryId',
        otherKey: 'productId'
      });
    }
  }
  Category.init({
  name:{
      type: DataTypes.STRING,
      allowNull: false
  }}, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: false
  });
  return Category;
};