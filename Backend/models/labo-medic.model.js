
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    const laboMedic = sequelize.define('laboMedics', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
      laboId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'laboratoire',
          key: 'id',
        },
      },
      medicamentId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'medicament',
          key: 'id',
        },
      },
    }, {
      tableName: 'laboMedics',
      timestamps: false,
    });
  
    return laboMedic;
  };
  