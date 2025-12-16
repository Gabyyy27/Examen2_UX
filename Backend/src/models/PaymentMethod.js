module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "PaymentMethod",
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    { tableName: "payment_methods", underscored: true, timestamps: false }
  );
};
