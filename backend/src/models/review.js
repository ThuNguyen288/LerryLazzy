'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      // associations can be defined here
      Review.belongsTo(models.User, { foreignKey: 'UserID' });
      Review.belongsTo(models.Product, { foreignKey: 'ProductID' });
    }
  }

  Review.init({
    ReviewID: {
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
    },
    Rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ReviewDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Review',
    tableName: 'Reviews',
    timestamps: false
  });

  return Review;
};
