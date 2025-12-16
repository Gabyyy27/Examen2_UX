const express = require("express");
const cors = require("cors");

const menuRoutes = require("./routes/menu.routes");
const orderRoutes = require("./routes/orders.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/menu", menuRoutes);
app.use("/orders", orderRoutes);

module.exports = app;

