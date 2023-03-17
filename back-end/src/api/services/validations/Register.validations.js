const md5 = require('md5');
const { User } = require('../../../database/models');
const { ErrorClient } = require('../../utils');

const validateEmail = async (email, password) => {
  const emailAvailable = await User.findOne({ where: { email } });
  if (emailAvailable) throw new ErrorClient(409, 'E-mail is already in use');
  const hashedPassword = md5(password);
  return hashedPassword;
};

module.exports = { validateEmail };