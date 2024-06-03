'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const currentDate = new Date();
    await queryInterface.bulkInsert('OrderStatus', [
      { 
        StatusName: 'Pending Confirmation',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        StatusName: 'Pending Pickup',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        StatusName: 'Pending Delivery',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        StatusName: 'Delivered',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        StatusName: 'Cancelled',
        createdAt: currentDate,
        updatedAt: currentDate
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('OrderStatus', null, {});
  }
};
