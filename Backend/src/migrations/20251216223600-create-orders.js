"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },

      status: { type: Sequelize.STRING(20), allowNull: false, defaultValue: "CART" }, // CART | CONFIRMED

      delivery_type_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: "delivery_types", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      payment_method_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: "payment_methods", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      delivery_address: { type: Sequelize.TEXT, allowNull: true },

      subtotal: { type: Sequelize.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
      delivery_fee: { type: Sequelize.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
      total: { type: Sequelize.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },

      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("orders");
  },
};

