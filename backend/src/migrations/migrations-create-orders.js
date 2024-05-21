'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      OrderID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      UserID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'UserID'
        }
      },
      OrderDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      ShippingAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      PaymentMethod: {
        type: Sequelize.STRING,
        allowNull: false
      },
      TotalPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      CouponID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Coupons',
          key: 'CouponID'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};
