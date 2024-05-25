'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      Favorite.belongsTo(models.User, { foreignKey: 'UserID' });
      Favorite.belongsTo(models.Product, { foreignKey: 'ProductID' });
    }
  }

  Favorite.init({
    FavoriteID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ProductID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Favorite',
    tableName: 'Favorite',
    timestamps: false
  });

  return Favorite;
};
