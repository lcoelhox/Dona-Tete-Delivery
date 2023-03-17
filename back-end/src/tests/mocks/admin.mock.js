const usersOutput = [
  {
    id: 2,
    name: "Fulana Pereira",
    email: "fulana@deliveryapp.com",
    role: "seller"
  },
  {
    id: 3,
    name: "Cliente Zé Birita",
    email: "zebirita@email.com",
    role: "customer"
  }
]

const validBody = {
  name: "Grupo 9 - Trybe",
  password: "123456",
  email: "grupo9@email.com",
  role: "seller"
}

const invalidsBody = [
  {
    message: "\"name\" is required",
    body: {
      password: "123456",
      email: "grupo9@email.com",
      role: "seller"
    }
  },
  {
    message: "\"password\" is required",
    body: {
      name: "Grupo 9 - Trybe",
      email: "grupo9@email.com",
      role: "seller"
    }
  },
  {
    message: "\"email\" is required",
    body: {
      name: "Grupo 9 - Trybe",
      password: "123456",
      role: "seller"
    }
  },
  {
    message: "\"role\" is required",
    body: {
      name: "Grupo 9 - Trybe",
      password: "123456",
      email: "grupo9@email.com",
    }
  },
  {
    message: "\"role\" must be one of [administrator, seller, customer]",
    body: {
      name: "Grupo 9 - Trybe",
      password: "123456",
      email: "grupo9@email.com",
      role: "invalid"
    }
  },
]

const wrongEmailBody = {
  name: "Delivery App Admin",
  email: "adm@deliveryapp.com",
  password: "a4c86edecc5aee06eff8fdeda69e0d04",
  role: "administrator",
}

module.exports = { usersOutput, validBody, invalidsBody, wrongEmailBody };