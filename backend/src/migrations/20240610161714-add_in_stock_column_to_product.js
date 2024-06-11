'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'InStock', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'InStock');
  }
};
