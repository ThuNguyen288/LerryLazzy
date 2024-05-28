'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
        Product.hasMany(models.Review, { foreignKey: 'ProductID' });
        Product.hasMany(models.Cart, { foreignKey: 'ProductID' });
        Product.hasMany(models.Favorite, { foreignKey: 'ProductID' });
    }
  }

  Product.init({
    ProductID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    CategoryID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SubcategoryID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Image: {
      type: DataTypes.BLOB,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    timestamps: false
  });

  return Product;
};
