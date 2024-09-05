// models/medicament.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const medicament = sequelize.define('medicament', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    expiration_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'medicament',
    timestamps: false
  });

  medicament.associate = (models) => {
    medicament.belongsToMany(models.laboratoire, {
      through: 'laboMedics',
      foreignKey: 'medicamentId',
      otherKey: 'laboId',
    });
  };

  return medicament;
};
