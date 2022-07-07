const { Router } = require('express');
const { handlerCreateGame } = require('../controller/games.controller');

const router = Router();

router.post('/create', [], handlerCreateGame);

module.exports = router;
