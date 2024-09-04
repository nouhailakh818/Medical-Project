const { DataTypes } = require('sequelize');

module.exports =   (sequelize) => {
    const laboMedic = sequelize.define('laboMedic', {
       id: {
           type: DataTypes.INTEGER,
           allowNull: false,
           primaryKey: true,
           autoIncrement: true
       },
       laboId: {
           type: DataTypes.INTEGER,
           allowNull: false
       },
       medicamentId: {
           type: DataTypes.INTEGER,
           allowNull: false
       }
   }, {
    timestamps: false 
  });
  

   return laboMedic;
} 