'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reserva', {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      created_at: {
        type: Sequelize.DATE
      },
      type: Sequelize.STRING,
      customer_id: {
        type: Sequelize.INTEGER,
        references: { model: 'clientes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      hotel_id: {
        type: Sequelize.INTEGER,
        references: { model: 'hotel', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      updated_at: Sequelize.DATE
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('reserva');
  }
};
