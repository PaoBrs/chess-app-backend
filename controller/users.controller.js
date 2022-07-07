const { loginService } = require('../services/users.service');

const handlerLogin = async (req, res) => {
  const { username } = req.body;

  const user = await loginService(username);

  return res.status(200).json(user);
};

module.exports = {
  handlerLogin,
};
