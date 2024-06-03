'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      { 
        Name: 'Wool',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        Name: 'Product',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        Name: 'Material',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        Name: 'Tool',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
