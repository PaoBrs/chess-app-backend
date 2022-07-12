const gamesModels = require('../modelsDB/games.models');
const { createGameService } = require('../services/games.service');

const handlerCreateGame = async (req, res) => {
  const { roomCode, player1 } = req.body;
  const game = await createGameService(roomCode, player1);
  if (game) {
    return res.status(200).json(game);
  }
  return res.status(400).json('This roomCode already exists');
};

const handlerUpdateGame = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const updatedGame = await gamesModels.findByIdAndUpdate(id, body, { new: true });

  return res.status(200).json(updatedGame);
};

const handlerGetActiveGames = async (req, res) => {
  const games = await gamesModels.find({ isCompleted: false });
  return res.json(games);
};

module.exports = {
  handlerCreateGame,
  handlerUpdateGame,
  handlerGetActiveGames,
};
