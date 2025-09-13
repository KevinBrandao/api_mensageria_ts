'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('quartos_reserva', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      booking_uuid: {
        type: Sequelize.UUID,
        references: { model: 'reserva', key: 'uuid' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      room_number: Sequelize.STRING,
      daily_rate: Sequelize.DECIMAL(10, 2),
      status: Sequelize.STRING,
      guests: Sequelize.INTEGER,
      breakfast_included: Sequelize.BOOLEAN,
      number_of_days: Sequelize.INTEGER,
      checkin_date: Sequelize.DATEONLY,
      checkout_date: Sequelize.DATEONLY,
      category_name: Sequelize.STRING,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('quartos_reserva');
  }
};
