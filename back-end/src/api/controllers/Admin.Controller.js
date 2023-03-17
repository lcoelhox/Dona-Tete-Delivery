const { adminService } = require('../services');

const createUser = async (req, res) => {
  const { name, email, password, role, user } = req.body;
  await adminService.createUser({ name, email, password, role }, user);
  res.status(201).end();
};

const getAllUsers = async (req, res) => {
  const { user } = req.body;
  const users = await adminService.getAllUsers(user);
  res.status(200).json(users);
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  await adminService.deleteUserById(id, user);
  res.status(204).end();
};

module.exports = { 
  createUser,
  getAllUsers,
  deleteUserById,
};
