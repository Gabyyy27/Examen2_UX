"use strict";
const { randomUUID } = require("crypto");

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("delivery_types", [
      { id: randomUUID(), name: "Para llevar", fee: 0, is_active: true },
      { id: randomUUID(), name: "A domicilio", fee: 30, is_active: true },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("delivery_types", null, {});
  },
};
