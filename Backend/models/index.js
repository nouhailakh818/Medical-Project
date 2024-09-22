const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.laboratoire = require('../models/laboratoire.model.js')(sequelize, Sequelize.DataTypes);
db.medicament = require('../models/medicament.models.js')(sequelize, Sequelize.DataTypes);  
db.laboMedic = require('../models/labo-medic.model.js')(sequelize, Sequelize.DataTypes);
db.Article = require('../models/article.model.js')(sequelize, Sequelize.DataTypes); 
db.Order = require('../models/ Order.models.js')(sequelize, Sequelize.DataTypes); 
db.OrderItem = require('../models/OrderItem.models.js')(sequelize, Sequelize.DataTypes);  
db.Role = require('../models/role.models.js')(sequelize, Sequelize.DataTypes);  
db.User = require('../models/user.models.js')(sequelize, Sequelize.DataTypes);  
db.Facture = require('../models/Facture.models.js')(sequelize, Sequelize.DataTypes); 

db.laboratoire.associate(db);
db.medicament.associate(db);

db.Role.belongsToMany(db.User, {
  through: "UserRoles",
  as: "users",
  foreignKey: "roleId"
});
db.User.belongsToMany(db.Role, {
  through: "UserRoles",
  as: "roles",
  foreignKey: "userId"
});

db.Order.hasMany(db.OrderItem, { foreignKey: 'orderId', as: 'items' });
db.OrderItem.belongsTo(db.Order, { foreignKey: 'orderId', as: 'order' });

db.Facture.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });
db.Facture.belongsTo(db.Order, { foreignKey: 'orderId', as: 'order' });

db.laboratoire.belongsToMany(db.medicament, { through: 'laboMedics', foreignKey: 'laboId' });
db.medicament.belongsToMany(db.laboratoire, { through: 'laboMedics', foreignKey: 'medicamentId' });



db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
