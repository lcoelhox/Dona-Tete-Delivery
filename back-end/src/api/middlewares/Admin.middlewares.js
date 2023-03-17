const schemas = require('../schemas');
const { ErrorClient } = require('../utils');

const createUserMiddleware = (req, res, next) => {
  const { email, password, name, role } = req.body;
  const { error } = schemas.adminSchema.validate({ email, password, name, role });
  if (error) {
    const { message } = error.details[0];
    throw new ErrorClient(400, message);
  }
  next();
};

module.exports = { createUserMiddleware };