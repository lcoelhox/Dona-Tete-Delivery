const schemas = require('../schemas');
const { ErrorClient } = require('../utils');

const login = (req, res, next) => {
  const { email, password } = req.body;
  const { error } = schemas.loginSchema.validate({ email, password });
  if (error) {
    const { message } = error.details[0];
    throw new ErrorClient(400, message);
  }
  next();
};

module.exports = { login };