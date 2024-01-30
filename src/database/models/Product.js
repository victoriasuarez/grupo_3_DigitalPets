'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsToMany(models.Category, {
        as: 'categories',
        through: 'CategoryProduct',
        foreignKey: 'productId',
        otherKey: 'categoryId'
      });
      Product.belongsToMany(models.PetType, {
        as: 'petTypes',
        through: 'PetTypeProduct',
        foreignKey: 'productId',
        otherKey: 'petTypeId'
      });
      Product.belongsTo(models.Brand, { 
        as: 'brand',
        foreignKey: 'brands_id'
      });
      Product.belongsTo(models.PetAge, { 
        as: 'petAge',
        foreignKey: 'petAges_id'
      });
    }
  }
  Product.init({
    name: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // categories_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    // },
    // petTypes_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true
    // },
    brands_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    petAges_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
    },
    discount: {
      type: DataTypes.FLOAT
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: 'default-image.png'
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    color: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
  });
  return Product;
};