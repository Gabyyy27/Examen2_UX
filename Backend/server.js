require("dotenv").config();
const app = require("./src/app"); // o donde tengas tu app
const { sequelize } = require("./src/models");

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB conectada.");

    app.listen(PORT, () => console.log(`API corriendo en puerto ${PORT}`));
  } catch (err) {
    console.error("Error conectando DB:", err.message);
    process.exit(1);
  }
})();
