module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      status: { type: DataTypes.STRING(20), allowNull: false, defaultValue: "CART" },
      delivery_type_id: { type: DataTypes.UUID, allowNull: true },
      payment_method_id: { type: DataTypes.UUID, allowNull: true },
      delivery_address: { type: DataTypes.TEXT, allowNull: true },
      subtotal: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
      delivery_fee: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
      total: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
    },
    { tableName: "orders", underscored: true, timestamps: true }
  );

  Order.associate = (db) => {
    Order.belongsTo(db.DeliveryType, { foreignKey: "delivery_type_id", as: "deliveryType" });
    Order.belongsTo(db.PaymentMethod, { foreignKey: "payment_method_id", as: "paymentMethod" });
    Order.hasMany(db.OrderItem, { foreignKey: "order_id", as: "items" });
  };

  return Order;
};
