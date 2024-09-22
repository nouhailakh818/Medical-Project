module.exports = (sequelize, DataTypes) => {
  const Facture = sequelize.define('Facture', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Orders',
        key: 'id',
      },
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
  });

  Facture.associate = (models) => {
    Facture.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
    Facture.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Facture;
};
