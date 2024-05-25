'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Coupons', [
      { CouponID: 1, Code: 'SAVE10', Discount: 10.00, ExpiryDate: '2024-06-30' },
      { CouponID: 2, Code: 'GET15OFF', Discount: 15.00, ExpiryDate: '2024-07-15' },
      { CouponID: 3, Code: 'SPRING20', Discount: 20.00, ExpiryDate: '2024-05-31' },
      { CouponID: 4, Code: 'FREESHIP', Discount: 0.00, ExpiryDate: '2024-06-15' },
      { CouponID: 5, Code: 'HALFOFF', Discount: 50.00, ExpiryDate: '2024-06-30' },
      { CouponID: 6, Code: 'SUMMER25', Discount: 25.00, ExpiryDate: '2024-08-31' },
      { CouponID: 7, Code: 'WELCOME5', Discount: 5.00, ExpiryDate: '2024-07-31' },
      { CouponID: 8, Code: 'SALE20', Discount: 20.00, ExpiryDate: '2024-06-30' },
      { CouponID: 9, Code: 'JULY10', Discount: 10.00, ExpiryDate: '2024-07-31' },
      { CouponID: 10, Code: 'LABORDAY', Discount: 30.00, ExpiryDate: '2024-09-05' }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Coupons', null, {});
  }
};
