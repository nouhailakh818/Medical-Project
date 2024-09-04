// routes/board.routes.js

const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board.controller');

router.get('/all-access', boardController.allAccess);
router.get('/user-board', boardController.userBoard);
router.get('/admin-board', boardController.adminBoard);
router.get('/moderator-board', boardController.moderatorBoard);

module.exports = router;
