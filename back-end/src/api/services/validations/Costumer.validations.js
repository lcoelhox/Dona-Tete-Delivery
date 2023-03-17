const { Product, User } = require('../../../database/models');
const { ErrorClient } = require('../../utils');

const validateRepeatedId = (productsList) => {
  const ids = productsList.map(({ id }) => id);
  const repetition = ids.some((id) => ids.indexOf(id) !== ids.lastIndexOf(id));
  if (repetition) throw new ErrorClient(400, 'There are duplicate products in the product list');
};

const validateIds = async (productsList) => {
  const productsPromise = productsList.map(async ({ id }, index) => {
    const product = await Product
      .findOne({ where: { id }, raw: true, attributes: ['id', 'price'] });
    if (!product) throw new ErrorClient(404, 'Product not found');
    return { ...product, quantity: productsList[index].quantity };
  });
  const products = await Promise.all(productsPromise);
  return products;
};

const validateTotalPrice = (products, totalPrice) => {
  const price = products.reduce((acc, curr) => {
    const productTotal = curr.quantity * Number(curr.price);
    return acc + productTotal;
  }, 0);
  const isPriceNotEqual = Math.abs(+price - +totalPrice) >= 0.01;
  if (isPriceNotEqual) throw new ErrorClient(400, 'Invalid total price');
};

const validateSeller = async ({ sellerId }) => {
  const seller = await User.findOne({ where: { id: sellerId }, raw: true });
  if (!seller) throw new ErrorClient(404, 'Seller not found');
  if (seller.role !== 'seller') throw new ErrorClient(401, 'Is not a seller');
};

module.exports = { 
  validateIds,
  validateRepeatedId,
  validateTotalPrice,
  validateSeller,
};
