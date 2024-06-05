'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const currentDate = new Date();
    try {
      await queryInterface.bulkInsert('Reviews', [
        {
          UserID: 7,
          ProductID: 14,
          Rating: 5,
          Comment: 'Great product, highly recommended!',
          ReviewDate: '2024-05-31 08:00:00',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          UserID: 10,
          ProductID: 33,
          Rating: 4,
          Comment: 'Good quality but a bit expensive.',
          ReviewDate: '2024-05-30 12:00:00',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          UserID: 15,
          ProductID: 42,
          Rating: 4,
          Comment: 'Works well, worth the price.',
          ReviewDate: '2024-05-29 15:00:00',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          UserID: 18,
          ProductID: 19,
          Rating: 3,
          Comment: 'Average product, nothing special.',
          ReviewDate: '2024-05-28 10:00:00',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          UserID: 6,
          ProductID: 52,
          Rating: 5,
          Comment: 'Love it! Best purchase ever.',
          ReviewDate: '2024-05-27 09:00:00',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          UserID: 9,
          ProductID: 1,
          Rating: 2,
          Comment: 'Disappointed with the quality.',
          ReviewDate: '2024-05-26 11:00:00',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          UserID: 4,
          ProductID: 26,
          Rating: 5,
          Comment: 'Absolutely fantastic!',
          ReviewDate: '2024-05-25 14:00:00',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          UserID: 11,
          ProductID: 37,
          Rating: 4,
          Comment: 'Great value for money.',
          ReviewDate: '2024-05-24 13:00:00',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          UserID: 6,
          ProductID: 8,
          Rating: 3,
          Comment: 'Decent product, could be better.',
          ReviewDate: '2024-05-23 16:00:00',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          UserID: 8,
          ProductID: 30,
          Rating: 5,
          Comment: 'Excellent product, highly recommended!',
          ReviewDate: '2024-05-22 17:00:00',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          UserID: 20,
          ProductID: 40,
          Rating: 4,
          Comment: 'Satisfied with the purchase.',
          ReviewDate: '2024-05-09 19:00:00',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          UserID: 13,
          ProductID: 55,
          Rating: 3,
          Comment: 'Not bad, but could be improved.',
          ReviewDate: '2024-05-08 20:00:00',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          UserID: 12,
          ProductID: 2,
          Rating: 4,
          Comment: 'Impressed with the quality.',
          ReviewDate: '2024-05-07 21:00:00',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          UserID: 19,
          ProductID: 49,
          Rating: 5,
          Comment: 'Highly recommend!',
          ReviewDate: '2024-05-06 22:00:00',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          UserID: 5,
          ProductID: 63,
          Rating: 2,
          Comment: 'Not satisfied with the product.',
          ReviewDate: '2024-05-05 23:00:00',
          createdAt: currentDate,
          updatedAt: currentDate
        }
      ], {});
      console.log('Reviews inserted successfully.');
    } catch (error) {
      console.error('Error inserting reviews:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('Reviews', null, {});
      console.log('Reviews deleted successfully.');
    } catch (error) {
      console.error('Error deleting reviews:', error);
    }
  }
};