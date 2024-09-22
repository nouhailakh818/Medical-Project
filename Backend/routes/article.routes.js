const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig'); 
const articleController = require('../controllers/article.controller');

router.post('/', upload.single('image'), articleController.create);

router.get('/', articleController.findAll);

router.get('/:id', articleController.findOne);

router.put('/:id', upload.single('image'), articleController.update);

router.delete('/:id', articleController.delete);

module.exports = router;
