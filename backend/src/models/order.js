'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.hasMany(models.OrderItem, { foreignKey: 'OrderID', as: 'orderitem' });

      Order.belongsTo(models.User, { foreignKey: 'UserID', as: 'user' });
      Order.belongsTo(models.Coupon, { foreignKey: 'CouponID' });
    }
  }

  Order.init({
    OrderID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    OrderDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ShippingAddress: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    PaymentMethod: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    TotalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    CouponID: {
      type: DataTypes.INTEGER,
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
    Status: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    StatusDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Note: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    DeliveryMethod: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'Orders',
    timestamps: true
  });
  return Order;
};
