'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      UserID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      Username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      Password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      Firstname: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      Lastname: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      Phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      Email: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      Address: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      Role: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
