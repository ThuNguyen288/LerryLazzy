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
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      Password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Firstname: {  
        type: Sequelize.STRING,
        allowNull: false
      },
      Lastname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Phone: {
        type: Sequelize.STRING,  
        allowNull:false
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Role: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
