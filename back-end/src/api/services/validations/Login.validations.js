const md5 = require('md5');
const { User } = require('../../../database/models');
const { ErrorClient } = require('../../utils');

const validatePassword = async (email, password) => {
  const user = await User.findOne({ where: { email }, raw: true });
  if (!user) throw new ErrorClient(404, 'Email or password are invalid');
  const hashPassword = md5(password);
  if (hashPassword !== user.password) throw new ErrorClient(404, 'Email or password are invalid');
  const { password: hash, ...userWithoutPassword } = user; 
  return userWithoutPassword;
};

module.exports = { validatePassword };