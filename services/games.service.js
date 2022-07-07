const gamesModels = require('../modelsDB/games.models');

const createGameService = async (roomCode) => {
  const existingGame = await gamesModels.findOne({ roomCode });
  if (existingGame) return null;
  const newGame = await gamesModels.create({ roomCode });
  return newGame;
};

module.exports = {
  createGameService,
};
