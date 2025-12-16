module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "DeliveryType",
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      fee: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
      is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    { tableName: "delivery_types", underscored: true, timestamps: false }
  );
};
