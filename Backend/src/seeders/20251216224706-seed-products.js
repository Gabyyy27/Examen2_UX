"use strict";
const { randomUUID } = require("crypto");

module.exports = {
  async up(queryInterface) {
    const [cats] = await queryInterface.sequelize.query(`SELECT id, name FROM categories;`);
    const byName = Object.fromEntries(cats.map((c) => [c.name, c.id]));

    await queryInterface.bulkInsert("products", [
      {
        id: randomUUID(),
        category_id: byName["Hamburguesas"],
        name: "Hamburguesa clásica",
        description: "Carne, queso, lechuga y tomate.",
        price: 120.00,
        image_url: null,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: randomUUID(),
        category_id: byName["Pizzas"],
        name: "Pizza pepperoni",
        description: "Pepperoni y queso mozzarella.",
        price: 180.00,
        image_url: null,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: randomUUID(),
        category_id: byName["Bebidas"],
        name: "Refresco",
        description: "Bebida fría 500ml.",
        price: 35.00,
        image_url: null,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
