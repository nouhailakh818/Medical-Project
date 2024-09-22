module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      medicamentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });
  
    OrderItem.associate = models => {
      OrderItem.belongsTo(models.Order, { foreignKey: 'orderId' });
    };
  
    return OrderItem;
  };
  