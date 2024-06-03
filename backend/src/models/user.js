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
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Username: {
      type: DataTypes.STRING(50),
      allowNull: false
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
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    Address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Role: {
      type: DataTypes.STRING(50),
      allowNull: false
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
