module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      order_id: { type: DataTypes.UUID, allowNull: false },
      product_id: { type: DataTypes.UUID, allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
      unit_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      line_total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    },
    { tableName: "order_items", underscored: true, timestamps: true }
  );

  OrderItem.associate = (db) => {
    OrderItem.belongsTo(db.Order, { foreignKey: "order_id", as: "order" });
    OrderItem.belongsTo(db.Product, { foreignKey: "product_id", as: "product" });
  };

  return OrderItem;
};
