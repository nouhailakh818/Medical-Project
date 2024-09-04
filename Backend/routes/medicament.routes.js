
const express = require('express');
const medicamentController = require('../controllers/medicamentController');
const medicamentControl = require('../controllers/addmedicamentController');

const router = express.Router();

router.get('/medicament', medicamentController.getMedicaments);

router.post('/medicament', medicamentControl.addMedicament);


module.exports = router;
