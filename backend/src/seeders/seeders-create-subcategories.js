'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const currentDate = new Date();
    await queryInterface.bulkInsert('Subcategories', [
      { 
        Name: 'Animal',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Name: 'Plant',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Name: 'Food',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Name: 'Cloth',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Name: 'Accessory',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Name: 'Mochi',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Name: 'Other',
        createdAt: currentDate,
        updatedAt: currentDate
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Subcategories', null, {});
  }
};
