const { Sale, SaleProduct, Product } = require('../../database/models');
const { salesValidations } = require('./validations');

const getAllSales = async ({ id, role }) => {
  const typeId = role === 'seller' ? 'sellerId' : 'userId'; 
  const sales = await Sale.findAll({ 
    where: { [typeId]: id }, raw: true });
  return sales;
};

const getSaleById = async (saleId, { role, id }) => {
  const typeId = role === 'seller' ? 'sellerId' : 'userId';
  const { 
    totalPrice, seller: { name }, saleDate, status, id: orderId,
  } = await salesValidations.validateId(saleId, typeId, id);
  const products = await SaleProduct.findAll({ 
    where: { saleId },
    attributes: ['quantity'],
    include: [
      {
        model: Product,
        as: 'product',
        attributes: ['id', 'name', 'price', 'urlImage'],
      },
    ],
  });

  return { orderId, totalPrice, saleDate, status, seller: name, products };
};

const changeStatus = async (id, status, { role }) => {
  if (role === 'customer') await salesValidations.validateStatus(id, status);
  await Sale.update({ status }, { where: { id } });
};

module.exports = { 
  getAllSales, 
  getSaleById,
  changeStatus,
};