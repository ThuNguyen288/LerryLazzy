'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderStatusHistory extends Model {
    static associate(models) {
      OrderStatusHistory.belongsTo(models.Order, { foreignKey: 'OrderID', as: 'order' });
      OrderStatusHistory.belongsTo(models.OrderStatus, { foreignKey: 'StatusID', as: 'status' });
    }
  }

  OrderStatusHistory.init({
    OrderStatusID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
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
    modelName: 'OrderStatusHistory',
    tableName: 'OrderStatusHistory',
    timestamps: true
  });
  return OrderStatusHistory;
};