module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', { // Use singular form for model names
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
    tableName: 'users', // Ensure table name is in plural or as required
    timestamps: true // Optional: to add createdAt and updatedAt columns
  });

  // Association method
  User.associate = (models) => {
    User.belongsToMany(models.Role, {
      through: 'UserRoles',
      as: 'roles',
      foreignKey: 'userId'
    });
  };
  
  
  return User;
}
