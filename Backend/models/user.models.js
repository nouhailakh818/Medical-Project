module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', { 
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    tableName: 'users', 
  
  });

  User.associate = (models) => {
    User.belongsToMany(models.Role, {
      through: 'UserRoles',
      as: 'roles',
      foreignKey: 'userId'
    });
  };
  
  
  return User;
}
