const tokenSeller = {
  id: 2,
  name: 'Fulana Pereira',
  email: 'fulana@deliveryapp.com',
  role: 'seller',
  iat: 1677667313
}

const tokenNotSeller = {
  id: 2,
  name: 'Fulana Pereira',
  email: 'fulana@deliveryapp.com',
  role: 'customer',
  iat: 1677667313
}

const tokenCustomer = {
  id: 3,
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  role: 'customer',
  iat: 1677667313
}

const salesOutput = [
  {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: "112.50",
    deliveryAddress: "Rua Grupo 9, Trybe",
    deliveryNumber: "10",
    saleDate: "2023-02-15T08:42:25.000Z",
    status: "Pendente"
  },
]

const sale = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: '112.50',
  deliveryAddress: 'Rua Grupo 9, Trybe',
  deliveryNumber: '10',
  saleDate: "2023-02-15T08:42:25.000Z",
  status: 'Pendente',
  seller: {
    name: "Fulana Pereira"
  }
}

const saleInTransit = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: '112.50',
  deliveryAddress: 'Rua Grupo 9, Trybe',
  deliveryNumber: '10',
  saleDate: "2023-02-15T08:42:25.000Z",
  status: 'Em Trânsito'
}

const saleOutput = [
  {
    quantity: 15,
    product: {
      id: 2,
      name: "Heineken 600ml",
      price: "7.50",
      urlImage: "http://localhost:3001/images/heineken_600ml.jpg"
    }
  }
]

const saleByIdOutput = {
  orderId: 1,
  totalPrice: "112.50",
  seller: "Fulana Pereira",
  saleDate: "2023-02-15T08:42:25.000Z",
  status: "Pendente",
  products: [
    {
      quantity: 15,
      product: {
        id: 2,
        name: "Heineken 600ml",
        price: "7.50",
        urlImage: "http://localhost:3001/images/heineken_600ml.jpg"
      }
    }
  ]
}

const allSellers = [
  {
    sellerId: 2,
    name: "Fulana Pereira"
  }
]

const invalidsbody = [
  { 
    message: "\"status\" is required",
    body: { }
  },
  { 
    message: "\"status\" must be one of [Pendente, Preparando, Em Trânsito, Entregue]",
    body: { status: 'invalid'}
  },
]

const validBody = { status: 'Em Trânsito'}

module.exports = {
  tokenSeller,
  tokenNotSeller,
  salesOutput,
  sale,
  saleOutput,
  saleByIdOutput,
  tokenCustomer,
  allSellers,
  invalidsbody,
  validBody,
  saleInTransit,
}