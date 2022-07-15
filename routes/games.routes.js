const { Router } = require('express');
const {
  handlerCreateGame,
  handlerUpdateGame,
  handlerGetActiveGames,
  handlerJoinGame,
} = require('../controller/games.controller');

const router = Router();

router.post('/create', [], handlerCreateGame);

router.patch('/update/:id', [], handlerUpdateGame);

router.get('/active', [], handlerGetActiveGames);

router.patch('/join', [], handlerJoinGame);

module.exports = router;
