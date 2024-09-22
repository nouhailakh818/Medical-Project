const express = require('express');
const userController = require('../controllers/user.controller');

app.get('/users', userController.getAllUsers);

app.get('/roles', userController.getRoles);

app.post('/users/:id/assign-role', async (req, res) => {
  const userId = req.params.id;
  const { roleId } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    await user.addRole(role);

    res.status(200).json({ message: 'Role assigned successfully' });
  } catch (error) {
    console.error('Error assigning role:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.post('/users/:userId/remove-role', userController.removeRoleFromUser);

module.exports = router;
