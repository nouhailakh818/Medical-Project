const User = require("../models").User;
const Role = require("../models").Role;

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
// Assign roles to a user
exports.assignRoles = async (req, res) => {
  console.log(req.params?.id)
  const userId = req.params.id;
  const roleId = req.body.roleId;

  //res.send(userId )

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const roles = await Role.findAll({ where: { id: roleId } });
    await user.setRoles([roles[0].id]); // Assuming you have setRoles method defined

    res.json({ message: "Roles assigned successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error assigning roles", error: err });
  }
};
exports.removeRoleFromUser = async (req, res) => {
  const userId = req.params.userId;
  const { roleId } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the role from the user
    await user.removeRole(roleId);

    res.json({ message: "Role removed successfully" });
  } catch (error) {
    console.error("Error removing role from user:", error);
    res.status(500).json({ message: "Error removing role from user", error });
  }
};
