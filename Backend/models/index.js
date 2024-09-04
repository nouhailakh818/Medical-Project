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

// Load models
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.laboratoire = require('../models/laboratoire.model.js')(sequelize, Sequelize.DataTypes);
db.medicament = require('../models/medicament.models.js')(sequelize, Sequelize.DataTypes);
db.laboMedic = require('../models/labo-medic.model.js')(sequelize, Sequelize.DataTypes);

db.Role = require('../models/role.models.js')(sequelize, Sequelize.DataTypes);
db.User = require('../models/user.models.js')(sequelize, Sequelize.DataTypes);

// Define associations
//db.laboratoire.associate(db);
//db.medicament.associate(db);

// Define relationships
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

/*db.laboratoire.belongsToMany(db.medicament, {
  through: "LaboMedicament",
  as: "medicament",
  foreignKey: "laboId"
});

db.medicament.belongsToMany(db.laboratoire, {
  through: "LaboMedicament",
  as: "laboratoire",
  foreignKey: "medicamentId"
});*/

db.laboMedic.belongsTo(db.laboratoire, {
  as: 'laboratoire',
});

db.laboMedic.belongsTo(db.medicament, {
  as: 'medicament',
});


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
