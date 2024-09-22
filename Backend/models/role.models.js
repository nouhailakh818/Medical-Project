module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define('Role', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      unique: true
    }
  }, {
    tableName: 'roles' 
  });

  return Role;
};
