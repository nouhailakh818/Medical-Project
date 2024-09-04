const express = require('express');
const userController = require('../controllers/user.controller');

// Route to get all users
app.get('/users', userController.getAllUsers);

// Route to get all roles
app.get('/roles', userController.getRoles);

// Route to assign a role to a user
app.post('/users/:id/assign-role', async (req, res) => {
  const userId = req.params.id;
  const { roleId } = req.body;

  try {
    // Trouver l'utilisateur par son ID
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ajouter le rôle à l'utilisateur (si vous utilisez une relation many-to-many)
    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    // Assigner le rôle (cela dépend de votre modèle et des associations, par exemple avec Sequelize)
    await user.addRole(role);

    res.status(200).json({ message: 'Role assigned successfully' });
  } catch (error) {
    console.error('Error assigning role:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Route to remove a role from a user
app.post('/users/:userId/remove-role', userController.removeRoleFromUser);

module.exports = router;
