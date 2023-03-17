const joi = require('joi');

const product = joi.object().keys({
  id: joi.number().required(),
  quantity: joi.number().required(),
});

const checkoutSchema = joi.object({
  sellerId: joi.number().required(),
  totalPrice: joi.number().required(),
  deliveryAddress: joi.string().required(),
  deliveryNumber: joi.string().required(),
  products: joi.array().items(product).required(),
});

module.exports = checkoutSchema;