// controllers/role.controller.js
const Role = require('../models/role.model');

// Récupère tous les rôles disponibles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles.map(role => role.name));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
