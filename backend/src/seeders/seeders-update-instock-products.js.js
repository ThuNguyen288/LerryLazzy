'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkUpdate('Products', {
        InStock: 150, 
      })

      console.log('Data seeding complete!')
    } catch (error) {
      console.error('Error seeding data:', error)
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkUpdate('Products', {
        InStock: Sequelize.literal('InStock'), 
      })

      console.log('Rollback complete!')
    } catch (error) {
      console.error('Error rolling back data:', error)
    }
  }
}
