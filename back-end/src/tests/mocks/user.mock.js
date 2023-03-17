const { validToken } = require('./login.mock');

const userOne = {
  id: 1,
  name: "Delivery App Admin",
  email: "adm@deliveryapp.com",
  password: "a4c86edecc5aee06eff8fdeda69e0d04",
  role: "administrator",
}

const userSeller = {
  id: 2,
  name: "Fulana Pereira",
  email: "fulana@deliveryapp.com",
  role: "seller",
  token: validToken,
}

module.exports = { 
  userOne,
  userSeller,
};