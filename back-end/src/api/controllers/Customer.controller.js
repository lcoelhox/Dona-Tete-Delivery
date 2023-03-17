const { customerService } = require('../services');

const getAllProducts = async (req, res) => {
  const { user } = req.body;
  const products = await customerService.getAllProducts(user);
  res.status(200).json(products);
};

const getAllSellers = async (_req, res) => {
  const sellers = await customerService.getAllSellers();
  res.status(200).json(sellers);
};

const checkout = async (req, res) => {
  const id = await customerService.checkout(req.body);
  res.status(201).json({ id });
};

module.exports = { 
  getAllProducts,
  getAllSellers,
  checkout,
};
