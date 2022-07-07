const { createGameService } = require('../services/games.service');

const handlerCreateGame = async (req, res) => {
  const { roomCode } = req.body;
  const game = await createGameService(roomCode);
  if (game) {
    return res.status(200).json(game);
  }
  return res.status(400).json('This roomCode already exists');
};

module.exports = {
  handlerCreateGame,
};
