'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      OrderID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      UserID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'UserID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      OrderDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      ShippingAddress: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      PaymentMethod: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      TotalPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
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
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};
