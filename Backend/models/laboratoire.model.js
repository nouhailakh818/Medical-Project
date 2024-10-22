const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const laboratoire = sequelize.define('laboratoire', {
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
      type: DataTypes.TEXT
    },
    location_labo: {
      type: DataTypes.STRING
    },
    phone_number: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'laboratoire',
    timestamps: false 
  });

  laboratoire.associate = (models) => {
    laboratoire.belongsToMany(models.medicament, {
      through: 'laboMedics',
      foreignKey: 'laboId',
      otherKey: 'medicamentId',
    });
  };

  return laboratoire;
};
