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
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      OrderDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      ShippingAddress: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      PaymentMethod: {
        type: Sequelize.STRING(100),
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
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};
