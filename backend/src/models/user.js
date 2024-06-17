'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Order, { foreignKey: 'UserID', as: 'order' });
      User.hasMany(models.Review, { foreignKey: 'UserID', as: 'reviews' });
      User.hasMany(models.Cart, { foreignKey: 'UserID' });
      User.hasMany(models.Favorite, { foreignKey: 'UserID' });
    }
  }

  User.init({
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    Password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Firstname: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Lastname: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Role: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Code: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DateOfBirth: {
      type: DataTypes.DATE,
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
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true
  });

  return User;
};
