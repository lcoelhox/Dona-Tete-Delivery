const { salesService } = require('../services');

const getAllSales = async (req, res) => {
  const { user } = req.body;
  const sales = await salesService.getAllSales(user);
  res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { user } = req.body;
  const { id } = req.params;
  const sale = await salesService.getSaleById(id, user);
  res.status(200).json(sale);
};

const changeStatus = async (req, res) => {
  const { id } = req.params;
  const { status, user } = req.body;
  await salesService.changeStatus(id, status, user);
  res.status(201).end();
};

module.exports = { 
  getAllSales,
  getSaleById,
  changeStatus,
};