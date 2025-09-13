'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('hotel', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: Sequelize.STRING,
      city: Sequelize.STRING,
      state: Sequelize.STRING,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('hotel');
  }
};
