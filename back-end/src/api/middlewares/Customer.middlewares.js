const schemas = require('../schemas');
const { ErrorClient } = require('../utils');

const checkoutMiddleware = (req, res, next) => {
  const { sellerId, totalPrice, deliveryAddress, deliveryNumber, products } = req.body;
  const { error } = schemas.checkoutSchema
    .validate({ sellerId, totalPrice, deliveryAddress, deliveryNumber, products });
  if (error) {
    const { message } = error.details[0];
    throw new ErrorClient(400, message);
  }
  next();
};

module.exports = { checkoutMiddleware };