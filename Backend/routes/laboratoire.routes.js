const express = require('express');
const router = express.Router();
const laboratoireController = require('../controllers/laboratoire.controller');
const upload = require('../config/multerConfig'); // Path to your multer configuration
const controller = require('../controllers/laboratoire.controller');

router.get('/laboratoires', laboratoireController.getLaboratoires);
router.post('/laboratoire', upload.single('image'), laboratoireController.updateLaboratoire);
router.get('/:id/medicaments', controller.getMedicationsByLabo);

module.exports = router;  
