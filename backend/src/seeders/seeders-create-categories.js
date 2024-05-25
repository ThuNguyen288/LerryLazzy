'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      { CategoryID: 1, Name: 'Wool' },
      { CategoryID: 2, Name: 'Product' },
      { CategoryID: 3, Name: 'Material' },
      { CategoryID: 4, Name: 'Set' }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
