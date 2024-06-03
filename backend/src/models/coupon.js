'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    static associate(models) {
      Coupon.hasMany(models.Order, { foreignKey: 'CouponID' });
    }
  }

  Coupon.init({
    CouponID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Code: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Discount: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    ExpiryDate: {
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
    modelName: 'Coupon',
    tableName: 'Coupons',
    timestamps: true
  });

  return Coupon;
};
