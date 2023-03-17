const { handleToken } = require('../utils');
const { loginValidations } = require('./validations');

const login = async (email, password) => {
  const user = await loginValidations.validatePassword(email, password);
  const token = handleToken.createToken(user);
  const { id, ...userWithoutId } = user;
  return { ...userWithoutId, token };
};

module.exports = { login };
