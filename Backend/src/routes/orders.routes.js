const router = require("express").Router();
const orders = require("../controllers/orders.controller");

router.post("/", orders.createCart);
router.post("/:id/items", orders.addItem);
router.get("/:id", orders.getOrder);
router.patch("/:id/delivery", orders.setDelivery);
router.patch("/:id/payment", orders.setPayment);
router.post("/:id/confirm", orders.confirmOrder);

module.exports = router;
