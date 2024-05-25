'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OrderStatusHistory', {
      OrderStatusID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      OrderID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Orders',
          key: 'OrderID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      StatusID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'OrderStatus',
          key: 'StatusID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      StatusDate: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OrderStatusHistory');
  }
};
