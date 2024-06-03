'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const currentDate = new Date();
    await queryInterface.bulkInsert('Coupons', [
      { 
        Code: 'SAVE10',
        Discount: 10.00,
        ExpiryDate: '2024-06-30',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Code: 'GET15OFF',
        Discount: 15.00,
        ExpiryDate: '2024-07-15',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Code: 'SPRING20',
        Discount: 20.00,
        ExpiryDate: '2024-05-31',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Code: 'FREESHIP',
        Discount: 0.00,
        ExpiryDate: '2024-06-15',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Code: 'HALFOFF',
        Discount: 50.00,
        ExpiryDate: '2024-06-30',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Code: 'SUMMER25',
        Discount: 25.00,
        ExpiryDate: '2024-08-31',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Code: 'WELCOME5',
        Discount: 5.00,
        ExpiryDate: '2024-07-31',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Code: 'SALE20',
        Discount: 20.00,
        ExpiryDate: '2024-06-30',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Code: 'JULY10',
        Discount: 10.00,
        ExpiryDate: '2024-07-31',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Code: 'LABORDAY',
        Discount: 30.00,
        ExpiryDate: '2024-09-05',
        createdAt: currentDate,
        updatedAt: currentDate
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Coupons', null, {});
  }
};
