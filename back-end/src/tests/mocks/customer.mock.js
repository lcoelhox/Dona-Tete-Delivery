const tokenNotCustomer = {
  id: 2,
  name: 'Fulana Pereira',
  email: 'fulana@deliveryapp.com',
  role: 'seller',
  iat: 1677667313
}

const tokenCustomer = {
  id: 3,
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  role: 'customer',
  iat: 1677667313
}

const allProducts = [
  {
    id: 1,
    name: "Skol Lata 250ml",
    price: "2.20",
    urlImage: "http://localhost:3001/images/skol_lata_350ml.jpg"
  },
  {
    id: 2,
    name: "Heineken 600ml",
    price: "7.50",
    urlImage: "http://localhost:3001/images/heineken_600ml.jpg"
  },
  {
    id: 3,
    name: "Antarctica Pilsen 300ml",
    price: "2.49",
    urlImage: "http://localhost:3001/images/antarctica_pilsen_300ml.jpg"
  },
]
const invalidsbody = [
  {
    message: "\"sellerId\" is required",
    body: {
      totalPrice: 59.5,
      deliveryAddress: "Avenida back-end, rua do Node",
      deliveryNumber: "10",
      products: [
        {
          id: 1,
          quantity: 10
        },
        {
          id: 2,
          quantity: 5 
        },
      ]
    }
  },
  {
    message: "\"totalPrice\" is required",
    body: {
      sellerId: 2,
      deliveryAddress: "Avenida back-end, rua do Node",
      deliveryNumber: "10",
      products: [
        {
          id: 1,
          quantity: 10
        },
        {
          id: 2,
          quantity: 5 
        },
      ]
    }
  },
  {
    message: "\"deliveryAddress\" is required",
    body: {
      sellerId: 2,
      totalPrice: 59.5,
      deliveryNumber: "10",
      products: [
        {
          id: 1,
          quantity: 10
        },
        {
          id: 2,
          quantity: 5 
        },
      ]
    }
  },
  {
    message: "\"deliveryNumber\" is required",
    body: {
      sellerId: 2,
      totalPrice: 59.5,
      deliveryAddress: "Avenida back-end, rua do Node",
      products: [
        {
          id: 1,
          quantity: 10
        },
        {
          id: 2,
          quantity: 5 
        },
      ]
    }
  },
  {
    message: "\"products\" is required",
    body: {
      sellerId: 2,
      totalPrice: 59.5,
      deliveryAddress: "Avenida back-end, rua do Node",
      deliveryNumber: "10",
    }
  },
  {
    message: "\"products[1].quantity\" is required",
    body: {
      sellerId: 2,
      totalPrice: 59.5,
      deliveryAddress: "Avenida back-end, rua do Node",
      deliveryNumber: "10",
      products: [
        {
          id: 1,
          quantity: 10
        },
        {
          id: 2,
        },
      ]
    }
  },
]

const validBody = {
  sellerId: 2,
  totalPrice: 59.5,
  deliveryAddress: "Avenida back-end, rua do Node",
  deliveryNumber: "10",
  products: [
    {
      id: 1,
      quantity: 10
    },
    {
      id: 2,
      quantity: 5 
    },
  ]
}

const productOne = { id: 1, price: '2.20' }
const productTwo = { id: 2, price: '7.50' }

const createSaleOutput = { id: 4 }

const allSellers = [
  {
    id: 2,
    name: "Fulana Pereira"
  }
]

module.exports = {
  tokenNotCustomer,
  allProducts,
  tokenCustomer,
  invalidsbody,
  validBody,
  productOne,
  productTwo,
  createSaleOutput,
  allSellers,
}