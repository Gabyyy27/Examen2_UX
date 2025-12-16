"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("delivery_types", {
      id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
      name: { type: Sequelize.STRING(50), allowNull: false, unique: true },
      fee: { type: Sequelize.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("delivery_types");
  },
};
