const loginMiddlewares = require('./Login.middlewares');
const errorMidleware = require('./Error.middleware');
const registerMiddlewares = require('./Register.middleware');
const tokenMiddleware = require('./Token.middleware');
const customerMiddlewares = require('./Customer.middlewares');
const adminMiddlewares = require('./Admin.middlewares');
const salesMiddlewares = require('./Sales.middlewares');

module.exports = {
  loginMiddlewares,
  errorMidleware,
  registerMiddlewares,
  tokenMiddleware,
  customerMiddlewares,
  adminMiddlewares,
  salesMiddlewares,
};