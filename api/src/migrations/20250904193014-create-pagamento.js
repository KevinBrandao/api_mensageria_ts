'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pagamento', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      booking_uuid: {
        type: Sequelize.UUID,
        references: { model: 'reserva', key: 'uuid' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      method: Sequelize.STRING,
      status: Sequelize.STRING,
      transaction_id: Sequelize.STRING,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('pagamento');
  }
};
