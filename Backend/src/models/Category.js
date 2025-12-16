module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      name: { type: DataTypes.STRING(80), allowNull: false, unique: true },
      is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    { tableName: "categories", underscored: true, timestamps: true }
  );

  Category.associate = (db) => {
    Category.hasMany(db.Product, { foreignKey: "category_id", as: "products" });
  };

  return Category;
};
