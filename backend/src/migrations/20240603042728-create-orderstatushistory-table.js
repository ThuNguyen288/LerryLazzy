'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OrderStatusHistory', {
      OrderStatusID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      OrderID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Orders',
          key: 'OrderID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      StatusID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'OrderStatus',
          key: 'StatusID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      StatusDate: {
        type: Sequelize.DATE,
        allowNull: false,
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
    await queryInterface.dropTable('OrderStatusHistory');
  }
};