const { ErrorClient, handleToken } = require('../utils');

const tokenMiddleware = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) throw new ErrorClient(401, 'Invalid token');
  const user = handleToken.verifyToken(token);
  req.body = { ...req.body, user };
  next();
};

module.exports = tokenMiddleware;