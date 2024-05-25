'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      UserID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      Username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      Password: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      Firstname: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      Lastname: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      Phone: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      Email: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      Address: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      Role: {
        type: Sequelize.STRING(50),
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
