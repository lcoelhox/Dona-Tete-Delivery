const { Sale, User } = require('../../../database/models');
const { ErrorClient } = require('../../utils');

const validateId = async (saleId, typeId, id) => {
  const sale = await Sale.findOne({ 
    where: { id: saleId, [typeId]: id },
    include: [
      {
        model: User,
        as: 'seller',
        attributes: ['name'],
      },
    ],
  });
  if (!sale) throw new ErrorClient(404, 'Sale not found');
  return sale;
};

const validateStatus = async (id, status) => {
  const sale = await Sale.findOne({ where: { id } });
  if (
    sale.status !== 'Em Trânsito' 
    || status !== 'Entregue'
  ) throw new ErrorClient(401, 'Unauthorized');
};

module.exports = { validateId, validateStatus };