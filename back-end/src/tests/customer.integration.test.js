const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');
const jwt = require('jsonwebtoken');
const { 
  tokenNotCustomer,
  tokenCustomer,
  allProducts,
  invalidsbody,
  validBody,
  productOne,
  productTwo,
  createSaleOutput
} = require('./mocks/customer.mock');
const { validToken } = require('./mocks/login.mock');
const { Product, User, Sale, SaleProduct, sequelize } = require('../database/models');
const { userOne, userSeller } = require('./mocks/user.mock');
const { allSellers, tokenSeller } = require('./mocks/sales.mock');

const { expect } = chai;

chai.use(chaiHttp);

describe('Customer integration tests', function() {
  describe('getting all products for a customer', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('without the token in the request it should return error', async function() {
      const { body, status } = await chai.request(app).get('/customer/products');

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid token' });
    });

    it('with invalid token should return error', async function() {
      const { body, status } = await chai.request(app).get('/customer/products').set({ authorization: 'invalidToken' });
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid token' });
    });

    it ('when the user is not a client, it should return an error', async function() {
      sinon.stub(jwt, 'verify').returns(tokenNotCustomer);

      const { body, status } = await chai.request(app).get('/customer/products').set({ authorization: validToken });
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Unauthorized' });
    })

    it('successfully should return the list of products', async function() {
      sinon.stub(jwt, 'verify').returns(tokenCustomer);
      sinon.stub(Product, 'findAll').resolves(allProducts);

      const { body, status } = await chai.request(app).get('/customer/products').set({ authorization: validToken });
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(allProducts);
    });
  });

  describe('registering a new purchase', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('without the token in the request it should return error', async function() {
      const { body, status } = await chai.request(app).post('/customer/checkout');

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid token' });
    });

    it('with invalid token should return error', async function() {
      const { body, status } = await chai.request(app).post('/customer/checkout').set({ authorization: 'invalidToken' });
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid token' });
    });

    invalidsbody.forEach((input, index) => {
      it(`${index + 1} - with invalid body it should return error`, async function() {
        sinon.stub(jwt, 'verify').returns(tokenCustomer);
        const { body, status } = await chai.request(app).post('/customer/checkout').send(input.body).set({ authorization: validToken });
        expect(status).to.be.equal(400);
        expect(body).to.be.deep.equal({ message: input.message });
      });
    })

    it('if the user is not a customer, it should return an error', async function() {
      sinon.stub(jwt, 'verify').returns(tokenNotCustomer);

      const { body, status } = await chai.request(app).post('/customer/checkout').send(validBody).set({ authorization: validToken });
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Unauthorized' });
    });

    it('if there are repeated products, it should return an error', async function() {
      sinon.stub(jwt, 'verify').returns(tokenCustomer);
      validBody.products[0].id = 2;

      const { body, status } = await chai.request(app).post('/customer/checkout').send(validBody).set({ authorization: validToken });

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'There are duplicate products in the product list' });
    });

    it('with invalid product ID should return error', async function() {
      sinon.stub(jwt, 'verify').returns(tokenCustomer);
      sinon.stub(Product, 'findOne').resolves(undefined)
      validBody.products[0].id = 999;

      const { body, status } = await chai.request(app).post('/customer/checkout').send(validBody).set({ authorization: validToken });

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({ message: 'Product not found' });
    });

    it('with wrong total price should return error', async function() {
      sinon.stub(jwt, 'verify').returns(tokenCustomer);
      sinon.stub(Product, 'findOne')
        .onFirstCall().resolves(productOne)
        .onSecondCall().resolves(productTwo);
      validBody.products[0].id = 1;
      validBody.totalPrice = 999;

      const { body, status } = await chai.request(app).post('/customer/checkout').send(validBody).set({ authorization: validToken });

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'Invalid total price' });
    });

    it('if the seller is not registered, it should return error', async function() {
      sinon.stub(User, 'findOne').resolves(undefined);
      sinon.stub(jwt, 'verify').returns(tokenCustomer);
      sinon.stub(Product, 'findOne')
        .onFirstCall().resolves(productOne)
        .onSecondCall().resolves(productTwo);
      validBody.totalPrice = 59.5;
      validBody.userId = 3;
      validBody.sellerId = 999;

      const { body, status } = await chai.request(app).post('/customer/checkout').send(validBody).set({ authorization: validToken });

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({ message: 'Seller not found' });
    });

    it('with invalid seller ID should return error', async function() {
      sinon.stub(User, 'findOne').resolves(userOne);
      sinon.stub(jwt, 'verify').returns(tokenCustomer);
      sinon.stub(Product, 'findOne')
        .onFirstCall().resolves(productOne)
        .onSecondCall().resolves(productTwo);
      validBody.sellerId = 1;

      const { body, status } = await chai.request(app).post('/customer/checkout').send(validBody).set({ authorization: validToken });

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Is not a seller' });
    });

    it('with internal problems should return status 500', async function() {
      sinon.stub(User, 'findOne').resolves(userSeller);
      sinon.stub(jwt, 'verify').returns(tokenCustomer);
      sinon.stub(Sale, 'create').resolves(undefined);
      sinon.stub(SaleProduct, 'create').resolves(true);
      sinon.stub(Product, 'findOne')
        .onFirstCall().resolves(productOne)
        .onSecondCall().resolves(productTwo);
      validBody.sellerId = 2;

      const { body, status } = await chai.request(app).post('/customer/checkout').send(validBody).set({ authorization: validToken });

      expect(status).to.be.equal(500);
      expect(body).to.be.deep.equal({ message:  'Internal error' });
    })

    it('successfully should return status 201', async function() {
      sinon.stub(User, 'findOne').resolves(userSeller);
      sinon.stub(jwt, 'verify').returns(tokenCustomer);
      sinon.stub(Sale, 'create').resolves(createSaleOutput);
      sinon.stub(SaleProduct, 'create').resolves(true);
      sinon.stub(Product, 'findOne')
        .onFirstCall().resolves(productOne)
        .onSecondCall().resolves(productTwo);

      const { status } = await chai.request(app).post('/customer/checkout').send(validBody).set({ authorization: validToken });


      expect(status).to.be.equal(201);
    });
  });

  describe('getting all sellers', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('without the token in the request it should return error', async function() {
      const { body, status } = await chai.request(app).get('/customer/seller');

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid token' });
    });

    it('with invalid token should return error', async function() {
      const { body, status } = await chai.request(app).get('/customer/seller').set({ authorization: 'invalidToken' });
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid token' });
    });

    it('with success it should return the list of sellerss', async function() {
      sinon.stub(jwt, 'verify').returns(tokenCustomer);
      sinon.stub(User, 'findAll').resolves(allSellers);

      const { body, status } = await chai.request(app).get('/customer/seller').set({ authorization: validToken });
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(allSellers);
    })
  });
});