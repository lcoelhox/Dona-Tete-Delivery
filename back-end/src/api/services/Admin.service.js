const md5 = require('md5');
const { Op } = require('sequelize');
const { User } = require('../../database/models');
const { ErrorClient } = require('../utils');
const { adminValidations } = require('./validations');

const createUser = async (body, user) => {
  if (user.role !== 'administrator') throw new ErrorClient(401, 'Unauthorized');
  const { name, email, password, role } = body;
  await adminValidations.validateEmail(email);
  const hashPassword = md5(password);
  await User.create({ name, email, password: hashPassword, role });
};

const getAllUsers = async ({ role }) => {
  if (role !== 'administrator') throw new ErrorClient(401, 'Unauthorized');
  const users = User.findAll({
    where: { role: { [Op.not]: 'administrator' } },
    attributes: ['id', 'name', 'email', 'role'],
  });
  return users;
};

const deleteUserById = async (id, { role }) => {
  if (role !== 'administrator') throw new ErrorClient(401, 'Unauthorized');
  await adminValidations.validateId(id);

  await User.destroy({ where: { id } });
};

module.exports = {
  createUser,
  getAllUsers,
  deleteUserById,
};