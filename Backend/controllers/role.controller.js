const Role = require('../models/role.model');

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles.map(role => role.name));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
