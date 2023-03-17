const schemas = require('../schemas');
const { ErrorClient } = require('../utils');

const statusMiddleware = (req, res, next) => {
  const { status } = req.body;
  const { error } = schemas.statusSchema.validate({ status });
  if (error) {
    const { message } = error.details[0];
    throw new ErrorClient(400, message);
  }
  next();
};

module.exports = { statusMiddleware };