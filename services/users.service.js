const usersModel = require('../modelsDB/users.model');

const loginService = async (username) => {
  const existingUser = await usersModel.findOne({ username });

  if (existingUser) return existingUser;

  const newUser = await usersModel.create({ username });

  return newUser;
};

module.exports = {
  loginService,
};
