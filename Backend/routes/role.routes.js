// routes/role.routes.js
const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');

// Récupère tous les rôles disponibles
router.get('/roles', roleController.getAllRoles);

module.exports = router;