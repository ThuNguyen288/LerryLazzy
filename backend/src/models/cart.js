'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      // associations can be defined here
      Cart.belongsTo(models.User, { foreignKey: 'UserID' });
      Cart.belongsTo(models.Product, { foreignKey: 'ProductID' });
    }
  }

  Cart.init({
    CartID: {
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
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Cart',
    tableName: 'Cart',
    timestamps: false
  });

  return Cart;
};
