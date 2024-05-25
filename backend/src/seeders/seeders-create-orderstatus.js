'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('OrderStatus', [
      { StatusID: 1, StatusName: 'Pending Confirmation' },
      { StatusID: 2, StatusName: 'Pending Pickup' },
      { StatusID: 3, StatusName: 'Pending Delivery' },
      { StatusID: 4, StatusName: 'Delivered' },
      { StatusID: 5, StatusName: 'Cancelled' }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('OrderStatus', null, {});
  }
};
