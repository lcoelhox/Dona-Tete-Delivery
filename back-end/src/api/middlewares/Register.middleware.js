const schemas = require('../schemas');
const { ErrorClient } = require('../utils');

const register = (req, _res, next) => {
  const { email, password, name } = req.body;
  const { error } = schemas.registerSchema.validate({ email, password, name });
  if (error) {
    const { message } = error.details[0];
    throw new ErrorClient(400, message);
  }
  next();
};

module.exports = { register };