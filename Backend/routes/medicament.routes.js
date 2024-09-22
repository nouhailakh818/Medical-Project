
const express = require('express');
const medicamentController = require('../controllers/medicamentController');
const medicamentControl = require('../controllers/addmedicamentController');
const router = express.Router();

router.get('/medicament', medicamentController.getMedicaments);

router.post('/medicament', medicamentControl.addMedicament);
router.put('/medicament/:id', medicamentController.updateMedicament); 
router.delete('/medicament/:id', medicamentController.deleteMedicament);


module.exports = router;
