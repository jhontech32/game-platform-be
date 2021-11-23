const express = require('express');
const router = express.Router();
const game = require('../controllers/game');

router.post('/rps', game.playSuit);

module.exports = router;