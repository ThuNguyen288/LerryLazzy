'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Subcategories', [
      { SubcategoryID: 1, Name: 'Animal' },
      { SubcategoryID: 2, Name: 'Plant' },
      { SubcategoryID: 3, Name: 'Food' },
      { SubcategoryID: 4, Name: 'Cloth' },
      { SubcategoryID: 5, Name: 'Accessory' },
      { SubcategoryID: 6, Name: 'Mochi' },
      { SubcategoryID: 7, Name: 'Other' }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Subcategories', null, {});
  }
};
