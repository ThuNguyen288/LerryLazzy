'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      ProductID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      Name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      Description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      Price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      CategoryID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Categories',
          key: 'CategoryID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      SubcategoryID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Subcategories',
          key: 'SubcategoryID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};
