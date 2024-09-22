const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');

router.get('/roles', roleController.getAllRoles);

module.exports = router;