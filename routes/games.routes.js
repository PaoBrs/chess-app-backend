const { Router } = require('express');
const { handlerCreateGame, handlerUpdateGame, handlerGetActiveGames } = require('../controller/games.controller');

const router = Router();

router.post('/create', [], handlerCreateGame);

router.patch('/update/:id', [], handlerUpdateGame);

router.get('/active', [], handlerGetActiveGames);

module.exports = router;
