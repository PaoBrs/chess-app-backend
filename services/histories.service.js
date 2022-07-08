const historiesModel = require('../modelsDB/histories.model');

const createHistoryService = async (userId) => {
  const newHistory = await historiesModel.create({ userId });
  return newHistory;
};

module.exports = {
  createHistoryService,
};
