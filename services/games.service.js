const gamesModels = require('../modelsDB/games.models');

const createGameService = async (roomCode, player1) => {
  const existingGame = await gamesModels.findOne({ roomCode });
  if (existingGame) return null;
  const newGame = await gamesModels.create({ roomCode, player1 });
  return newGame;
};

module.exports = {
  createGameService,
};
