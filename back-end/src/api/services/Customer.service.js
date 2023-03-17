const { Product, sequelize, Sale, SaleProduct, User } = require('../../database/models');
const { ErrorClient } = require('../utils');
const { customerValidations } = require('./validations');

const getAllProducts = async ({ role }) => {
  if (role !== 'customer') throw new ErrorClient(401, 'Unauthorized');
  const products = await Product.findAll();
  return products;
};

const createSale = async (body, userId) => {
  const { sellerId, totalPrice, deliveryAddress, deliveryNumber, products } = body;
  const t = await sequelize.transaction();
  try {
    const { id: saleId } = await Sale.create(
      { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, raw: true },
      { transaction: t },
    );
    const saleProductPromise = products.map(async ({ id, quantity }) => {
      await SaleProduct.create({ saleId, productId: id, quantity }, { transaction: t });
    });

    await Promise.all(saleProductPromise);
    await t.commit();
    return saleId;
  } catch (error) {
    await t.rollback();
    throw new ErrorClient(500, 'Internal error');
  }
};

const checkout = async (body) => {
  const { products, totalPrice, user: { id, role } } = body;
  if (role !== 'customer') throw new ErrorClient(401, 'Unauthorized');
  customerValidations.validateRepeatedId(products);
  const productsList = await customerValidations.validateIds(products);
  customerValidations.validateTotalPrice(productsList, totalPrice);
  await customerValidations.validateSeller(body, id);
  const saleId = await createSale(body, id);
  return saleId;
};

const getAllSellers = () => {
  const sellers = User.findAll({
    where: { role: 'seller' },
    attributes: ['id', 'name'],
  });
  return sellers;
  };

module.exports = {
  getAllProducts,
  getAllSellers,
  checkout,
};
