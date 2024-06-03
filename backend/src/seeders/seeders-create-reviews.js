'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const currentDate = new Date();
    try {
      await queryInterface.bulkInsert('Reviews', [
        ...Array.from({ length: 20 }).map((_, index) => ({
          UserID: Math.floor(Math.random() * (20 - 2 + 1)) + 2, 
          ProductID: Math.floor(Math.random() * (64 - 1 + 1)) + 1, 
          Rating: Math.floor(Math.random() * 5) + 1, 
          Comment: `This is review ${index + 1}.`,
          ReviewDate: currentDate,
          createdAt: currentDate,
          updatedAt: currentDate
        })),
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
