'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Orders', 'DeliveryMethod', {
      type: Sequelize.STRING(50),
      allowNull: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Orders', 'DeliveryMethod')
  }
}
