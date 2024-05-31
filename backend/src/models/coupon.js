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
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    Code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Discount: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    ExpiryDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Coupon',
    tableName: 'Coupons',
    timestamps: false
  });

  return Coupon;
};
