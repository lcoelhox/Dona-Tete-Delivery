const loginRouter = require('./Login.routes');
const registerRouter = require('./Register.routes');
const customerRouter = require('./Customer.routes');
const adminRouter = require('./Admin.routes');
const salesRouter = require('./Sales.routes');

module.exports = {
  loginRouter,
  registerRouter,
  customerRouter,
  adminRouter,
  salesRouter,
};