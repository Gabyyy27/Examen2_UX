"use strict";
const { randomUUID } = require("crypto");

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("payment_methods", [
      { id: randomUUID(), name: "Efectivo", is_active: true },
      { id: randomUUID(), name: "Tarjeta", is_active: true },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("payment_methods", null, {});
  },
};
