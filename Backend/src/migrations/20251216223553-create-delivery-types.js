"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("payment_methods", {
      id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
      name: { type: Sequelize.STRING(50), allowNull: false, unique: true },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("payment_methods");
  },
};

