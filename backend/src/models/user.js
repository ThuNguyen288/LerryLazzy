'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Order, { foreignKey: 'UserID' });
      User.hasMany(models.Review, { foreignKey: 'UserID' });
      User.hasMany(models.Cart, { foreignKey: 'UserID' });
      User.hasMany(models.Favorite, { foreignKey: 'UserID' });
    }
  }

  User.init({
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: false
  });

  return User;
};
