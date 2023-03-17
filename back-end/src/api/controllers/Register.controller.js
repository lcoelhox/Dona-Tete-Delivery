const { registerService } = require('../services');

const register = async (req, res) => {
  const response = await registerService.register(req.body);
  res.status(201).json(response);
};

module.exports = { register };