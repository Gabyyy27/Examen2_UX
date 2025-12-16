const router = require("express").Router();
const menu = require("../controllers/menu.controller");

router.get("/products", menu.getProducts);
router.get("/products/:id", menu.getProductById);

module.exports = router;
