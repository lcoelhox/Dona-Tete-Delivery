const { User } = require('../../../database/models');
const { ErrorClient } = require('../../utils');

const validateId = async (id) => {
  const isIdValid = await User.findByPk(id);
  if (!isIdValid) throw new ErrorClient(404, 'User not found');
};

const validateEmail = async (email) => {
  const isEmailValid = await User.findOne({ where: { email } });
  if (isEmailValid) throw new ErrorClient(409, 'Email is in use');
};

module.exports = {
  validateId,
  validateEmail,
};