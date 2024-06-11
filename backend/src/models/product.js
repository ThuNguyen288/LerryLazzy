'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.OrderItem, { foreignKey: 'ProductID' });
      Product.hasMany(models.Review, { foreignKey: 'ProductID', as: 'Reviews'});
      Product.hasMany(models.Cart, { foreignKey: 'ProductID' });
      Product.hasMany(models.Favorite, { foreignKey: 'ProductID' });

      Product.belongsTo(models.Category, { foreignKey: 'CategoryID', as: 'category' });
      Product.belongsTo(models.Subcategory, { foreignKey: 'SubcategoryID', as: 'subcategory' });
    }
  }

  Product.init({
    ProductID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
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
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'CategoryID'
      }
    },
    SubcategoryID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Subcategories',
        key: 'SubcategoryID'
      }
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    InStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    timestamps: true
  });
  return Product;
};