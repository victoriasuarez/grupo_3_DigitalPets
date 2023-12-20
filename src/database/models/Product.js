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
      // define association here
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
    categories_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    petTypes_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    brands_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    petAges_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
    },
    discount: {
      type: DataTypes.FLOAT
    },
    image: {
      type: DataTypes.TEXT,
      defaultValue: './public/images/default-image.png'
    },
    weight: {
      type: DataTypes.INTEGER
    },
    color: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: false
  });
  return Product;
};