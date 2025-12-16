const { Order, OrderItem, Product, DeliveryType, PaymentMethod } = require("../models");

async function recalcTotals(orderId) {
  const items = await OrderItem.findAll({ where: { order_id: orderId } });

  const subtotal = items.reduce((acc, it) => acc + Number(it.line_total), 0);

  const order = await Order.findByPk(orderId);
  const deliveryFee = order.delivery_fee ? Number(order.delivery_fee) : 0;

  const total = subtotal + deliveryFee;

  await order.update({ subtotal, total });
  return order;
}

exports.createCart = async (req, res) => {
  try {
    const order = await Order.create({ status: "CART" });
    return res.status(201).json(order);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.addItem = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    if (!product_id) return res.status(400).json({ message: "product_id es requerido" });

    const qty = Number(quantity || 1);
    if (!Number.isInteger(qty) || qty <= 0) {
      return res.status(400).json({ message: "quantity debe ser un entero > 0" });
    }

    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: "Pedido no encontrado" });
    if (order.status !== "CART") return res.status(400).json({ message: "El pedido ya fue confirmado" });

    const product = await Product.findByPk(product_id);
    if (!product || !product.is_active) return res.status(404).json({ message: "Producto no encontrado" });

    // Si ya existe el item, suma cantidad
    let item = await OrderItem.findOne({ where: { order_id: order.id, product_id } });

    const unitPrice = Number(product.price);

    if (!item) {
      item = await OrderItem.create({
        order_id: order.id,
        product_id,
        quantity: qty,
        unit_price: unitPrice,
        line_total: unitPrice * qty,
      });
    } else {
      const newQty = Number(item.quantity) + qty;
      await item.update({
        quantity: newQty,
        unit_price: unitPrice,
        line_total: unitPrice * newQty,
      });
    }

    await recalcTotals(order.id);
    return res.status(201).json({ message: "Producto agregado al pedido", item });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: OrderItem,
          as: "items",
          include: [{ model: Product, as: "product", attributes: ["id", "name", "price", "image_url"] }],
        },
        { model: DeliveryType, as: "deliveryType" },
        { model: PaymentMethod, as: "paymentMethod" },
      ],
      order: [[{ model: OrderItem, as: "items" }, "created_at", "ASC"]],
    });

    if (!order) return res.status(404).json({ message: "Pedido no encontrado" });
    return res.json(order);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.setDelivery = async (req, res) => {
  try {
    const { delivery_type_id, delivery_address } = req.body;
    if (!delivery_type_id) return res.status(400).json({ message: "delivery_type_id es requerido" });

    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: "Pedido no encontrado" });
    if (order.status !== "CART") return res.status(400).json({ message: "El pedido ya fue confirmado" });

    const dt = await DeliveryType.findByPk(delivery_type_id);
    if (!dt || !dt.is_active) return res.status(404).json({ message: "Tipo de entrega no válido" });

    await order.update({
      delivery_type_id,
      delivery_address: delivery_address || null,
      delivery_fee: Number(dt.fee),
    });

    await recalcTotals(order.id);
    return res.json({ message: "Entrega actualizada", order });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.setPayment = async (req, res) => {
  try {
    const { payment_method_id } = req.body;
    if (!payment_method_id) return res.status(400).json({ message: "payment_method_id es requerido" });

    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: "Pedido no encontrado" });
    if (order.status !== "CART") return res.status(400).json({ message: "El pedido ya fue confirmado" });

    const pm = await PaymentMethod.findByPk(payment_method_id);
    if (!pm || !pm.is_active) return res.status(404).json({ message: "Método de pago no válido" });

    await order.update({ payment_method_id });
    return res.json({ message: "Pago actualizado", order });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.confirmOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{ model: OrderItem, as: "items" }],
    });

    if (!order) return res.status(404).json({ message: "Pedido no encontrado" });
    if (order.status !== "CART") return res.status(400).json({ message: "El pedido ya fue confirmado" });
    if (!order.items || order.items.length === 0) return res.status(400).json({ message: "El pedido está vacío" });
    if (!order.delivery_type_id) return res.status(400).json({ message: "Debe seleccionar tipo de entrega" });
    if (!order.payment_method_id) return res.status(400).json({ message: "Debe seleccionar método de pago" });

    await recalcTotals(order.id);
    await order.update({ status: "CONFIRMED" });

    return res.json({ message: "Pedido confirmado", order });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

