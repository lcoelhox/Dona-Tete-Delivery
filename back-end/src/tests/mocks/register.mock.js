const { validToken } = require('./login.mock');

const invalidsBody = [
  {
    body: { password: "123456", name: "Grupo 9 - Trybe" },
    message: "\"email\" is required"
  },
  {
    body: { email: "grupo9@email.com", password: "123456" },
    message: "\"name\" is required"
  },
  {
    body: { email: "grupo9@email.com", name: "Grupo 9 - Trybe" },
    message: "\"password\" is required"
  },
]

const wrongEmailBody = {
  email: "adm@deliveryapp.com",
  password: "123456",
  name: "Grupo 9 - Trybe"
}

const validbody = {
  email: "grupo9@email.com",
  password: "123456",
  name: "Grupo 9 - Trybe",
}

const userSecondCall = {
  id: 3,
  name: "Grupo 9 - Trybe",
  email: "grupo9@email.com",
  role: "customer",
}

const registerOutput = {
  name: "Grupo 9 - Trybe",
  email: "grupo9@email.com",
  role: "customer",
  token: validToken,
}

module.exports = {
  invalidsBody,
  wrongEmailBody,
  validbody,
  userSecondCall,
  registerOutput,
}