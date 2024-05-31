'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.hasMany(models.OrderItem, { foreignKey: 'OrderID' });

      Order.belongsTo(models.User, { foreignKey: 'UserID' });
      Order.belongsTo(models.Coupon, { foreignKey: 'CouponID' });
    }
  }

  Order.init({
    OrderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
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
      type: DataTypes.STRING,
      allowNull: false
    },
    PaymentMethod: {
      type: DataTypes.STRING,
      allowNull: false
    },
    TotalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    CouponID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'Orders',
    timestamps: false
  });

  return Order;
};
