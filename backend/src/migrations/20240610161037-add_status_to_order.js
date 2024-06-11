'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Orders', 'Status', {
      type: Sequelize.STRING(50),
      allowNull: false
    })
    
    await queryInterface.addColumn('Orders', 'StatusDate', {
      type: Sequelize.DATE,
      allowNull: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Orders', 'Status')
    await queryInterface.removeColumn('Orders', 'StatusDate')
  }
}
