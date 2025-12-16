module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      category_id: { type: DataTypes.UUID, allowNull: false },
      name: { type: DataTypes.STRING(120), allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      image_url: { type: DataTypes.TEXT, allowNull: true },
      is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    { tableName: "products", underscored: true, timestamps: true }
  );

  Product.associate = (db) => {
    Product.belongsTo(db.Category, { foreignKey: "category_id", as: "category" });
  };

  return Product;
};
