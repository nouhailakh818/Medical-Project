
const express = require('express');
const router = express.Router();
const factureController = require('../controllers/factureController'); 

router.get('/', factureController.getAllFactures);
router.post('/', factureController.createFacture); 
router.delete('/:id', factureController.deleteFacture); 
router.put('/:factureId/validate', factureController.validateFacture); 
module.exports = router;

