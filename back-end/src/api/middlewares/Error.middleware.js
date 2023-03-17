const { JsonWebTokenError } = require('jsonwebtoken');
const { ErrorClient } = require('../utils');

const errorMidleware = (err, _req, res, _next) => {
  if (err instanceof ErrorClient) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  console.log('ERR: ', err);
  return res.status(500).json({ message: 'Internal error' });
};

module.exports = errorMidleware;