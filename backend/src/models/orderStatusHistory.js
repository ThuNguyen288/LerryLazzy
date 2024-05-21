'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderStatusHistory extends Model {
    static associate(models) {
      // define association here if needed
    }
  }

  OrderStatusHistory.init({
    OrderStatusID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    OrderID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    StatusID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    StatusDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'OrderStatusHistory',
    tableName: 'OrderStatusHistory',
    timestamps: false
  });

  return OrderStatusHistory;
};
