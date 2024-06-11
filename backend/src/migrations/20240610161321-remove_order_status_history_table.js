'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OrderStatusHistory')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OrderStatusHistory', {
    })
  }
}
