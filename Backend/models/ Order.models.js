module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    totalPrice: DataTypes.FLOAT,
    status: DataTypes.STRING,
    factureId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Factures',
        key: 'id',
      },
      allowNull: true, 
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.Facture, { foreignKey: 'factureId', as: 'facture' });
    Order.hasMany(models.OrderItem, { foreignKey: 'orderId', as: 'items' });
  };

  return Order;
};
