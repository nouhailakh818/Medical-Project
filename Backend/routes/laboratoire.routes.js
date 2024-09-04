const express = require('express');
const router = express.Router();
const laboratoireController = require('../controllers/laboratoire.controller');
const upload = require('../config/multerConfig'); // Path to your multer configuration

router.get('/laboratoires', laboratoireController.getLaboratoires);
router.post('/laboratoire', upload.single('image'), laboratoireController.updateLaboratoire);
router.get('/:id/medicament',laboratoireController.getMedicationsForLaboratoire);
module.exports = router;  
