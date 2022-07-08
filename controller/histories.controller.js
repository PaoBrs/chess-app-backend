const { ObjectId } = require('mongoose').Types;
const { createHistoryService } = require('../services/histories.service');

const handlerCreateHistory = async (req, res) => {
  const { userId } = req.body;

  if (!ObjectId.isValid(userId)) return res.status(400).send('UserId is not a valid');

  const newHistory = await createHistoryService(userId);
  return res.status(200).json(newHistory);
};

module.exports = {
  handlerCreateHistory,
};
