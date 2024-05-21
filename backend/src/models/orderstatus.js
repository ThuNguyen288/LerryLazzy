'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderStatus extends Model {
    static associate(models) {
      // define association here if needed
    }
  }

  OrderStatus.init({
    StatusID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    StatusName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'OrderStatus',
    tableName: 'OrderStatus',
    timestamps: false
  });

  return OrderStatus;
};
