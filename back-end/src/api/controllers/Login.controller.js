const { loginService } = require('../services');

const login = async (req, res) => {
  const { email, password } = req.body;
  const response = await loginService.login(email, password);
  res.status(200).json(response);
};

module.exports = { login };