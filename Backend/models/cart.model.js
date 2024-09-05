const { DataTypes } = require('sequelize');
const { sequelize } = require('.');

module.exports = (sequelize) => {
const Cart = sequelize.define('Cart', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  medicamentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Medicaments',
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

return  Cart;
}