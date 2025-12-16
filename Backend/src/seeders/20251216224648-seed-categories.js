"use strict";
const { randomUUID } = require("crypto");

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("categories", [
      { id: randomUUID(), name: "Hamburguesas", is_active: true, created_at: new Date(), updated_at: new Date() },
      { id: randomUUID(), name: "Pizzas", is_active: true, created_at: new Date(), updated_at: new Date() },
      { id: randomUUID(), name: "Bebidas", is_active: true, created_at: new Date(), updated_at: new Date() },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};

