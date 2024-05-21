'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      UserID: '2',
      Username: 'thuthu',
      Password: '987654321',
      Firstname: 'Kim Thu',
      Lastname: 'Nguyen Thi',
      Phone: '0123456789',
      Email: 'thuthu@example.com',
      Address: '456 Demo Street',
      Role: 'admin'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
