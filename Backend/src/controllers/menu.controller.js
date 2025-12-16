const { Category, Product } = require("../models");

exports.getProducts = async (req, res) => {
  try {
    const { categoryId } = req.query;

    const where = { is_active: true };
    if (categoryId) where.category_id = categoryId;

    const products = await Product.findAll({
      where,
      include: [{ model: Category, as: "category", attributes: ["id", "name"] }],
      order: [["name", "ASC"]],
    });

    return res.json(products);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id, is_active: true },
      include: [{ model: Category, as: "category", attributes: ["id", "name"] }],
    });

    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    return res.json(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
