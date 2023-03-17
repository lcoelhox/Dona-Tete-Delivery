const { User } = require('../../database/models');
const { registerValidations } = require('./validations');
const { handleToken } = require('../utils');

const register = async ({ name, email, password }) => {
  const hashedPassword = await registerValidations.validateEmail(email, password);
  await User.create({ name, email, password: hashedPassword });
  const user = await User.findOne({ where: { email }, raw: true });
  const token = handleToken.createToken(user);
  const { id, password: hashPassword, ...userWithoutId } = user;
  return { ...userWithoutId, token };
};

module.exports = { register };