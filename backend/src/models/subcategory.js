'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subcategory extends Model {
    static associate(models) {
      // define association here if needed
    }
  }

  Subcategory.init({
    SubcategoryID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Subcategory',
    tableName: 'Subcategories',
    timestamps: false
  });

  return Subcategory;
};
