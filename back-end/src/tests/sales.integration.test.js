const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');
const jwt = require('jsonwebtoken');
const { 
  tokenSeller,
  salesOutput,
  sale,
  saleOutput,
  saleByIdOutput,
  tokenCustomer,
  invalidsbody,
  validBody,
  saleInTransit,
} = require('./mocks/sales.mock');
const { validToken } = require('./mocks/login.mock');
const { Sale, SaleProduct, User } = require('../database/models');

const { expect } = chai;
chai.use(chaiHttp);

describe('Sales integration tests', function () {
  describe('getting all sales from a seller or customer', function() {
    afterEach(function() {
      sinon.restore();
    });
    
    it('without the token in the request it should return error', async function() {
      const { body, status } = await chai.request(app).get('/sales/orders');

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid token' });
    });

    it('with invalid token should return error', async function() {
      const { body, status } = await chai.request(app).get('/sales/orders').set({ authorization: 'invalidToken' });
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid token' });
    });

    it('if the user is a seller, it should return the sales list', async function() {
      sinon.stub(jwt, 'verify').returns(tokenSeller);
      sinon.stub(Sale, 'findAll').resolves(salesOutput);

      const { body, status } = await chai.request(app).get('/sales/orders').set({ authorization: validToken });
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(salesOutput);
    });

    it('if the user is a customer, it should return the sales list', async function() {
      sinon.stub(jwt, 'verify').returns(tokenCustomer);
      sinon.stub(Sale, 'findAll').resolves(salesOutput);

      const { body, status } = await chai.request(app).get('/sales/orders').set({ authorization: validToken });
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(salesOutput);
    });
  });

  describe('getting sale by id', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('without the token in the request, it should return error', async function() {
      const { body, status } = await chai.request(app).get('/sales/orders/1');

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid token' });
    });

    it('with invalid token should return error', async function() {
      const { body, status } = await chai.request(app).get('/sales/orders/1').set({ authorization: 'invalidToken' });
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid token' });
    });

    it('when ID is invalid it should return error', async function() {
      sinon.stub(jwt, 'verify').returns(tokenSeller);
      sinon.stub(Sale, 'findOne').resolves(undefined);

      const { body, status } = await chai.request(app).get('/sales/orders/999').set({ authorization: validToken });
      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({ message: 'Sale not found' });
    });

    it('if the user is a seller, it should return the order', async function() {
      sinon.stub(jwt, 'verify').returns(tokenSeller);
      sinon.stub(Sale, 'findOne').resolves(sale);
      sinon.stub(SaleProduct, 'findAll').resolves(saleOutput);

      const { body, status } = await chai.request(app).get('/sales/orders/1').set({ authorization: validToken });
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(saleByIdOutput);
    });

    it('if the user is a customer, it should return the order', async function() {
      sinon.stub(jwt, 'verify').returns(tokenCustomer);
      sinon.stub(Sale, 'findOne').resolves(sale);
      sinon.stub(SaleProduct, 'findAll').resolves(saleOutput);

      const { body, status } = await chai.request(app).get('/sales/orders/1').set({ authorization: validToken });
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(saleByIdOutput);
    });
  });

  describe('changing sale status when user is seller', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('without the token in the request, it should return error', async function() {
      const { body, status } = await chai.request(app).patch('/sales/orders/1');

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid token' });
    });

    it('with invalid token should return error', async function() {
      const { body, status } = await chai.request(app).patch('/sales/orders/1').set({ authorization: 'invalidToken' });
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid token' });
    });

    invalidsbody.forEach((input, index) => {
      it(`${index + 1} - with invalid body it should return error`, async function() {
        sinon.stub(jwt, 'verify').returns(tokenSeller);
        const { body, status } = await chai.request(app).patch('/sales/orders/1').send(input.body).set({ authorization: validToken });

        expect(status).to.be.equal(400);
        expect(body).to.be.deep.equal({ message: input.message });
      });
    })

    it('successfully should return status 201', async function() {
      sinon.stub(jwt, 'verify').returns(tokenSeller);
      sinon.stub(Sale, 'update').resolves(1);

      const { status } = await chai.request(app).patch('/sales/orders/1').send(validBody).set({ authorization: validToken });
      expect(status).to.be.equal(201);
    });
  });

  describe('changing order status when user is customer', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('without the token in the request, it should return error', async function() {
      const { body, status } = await chai.request(app).patch('/sales/orders/1');

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid token' });
    });

    it('with invalid token should return error', async function() {
      const { body, status } = await chai.request(app).patch('/sales/orders/1').set({ authorization: 'invalidToken' });
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid token' });
    });

    it('when the status is not "Entregue" it should return error', async function() {
      sinon.stub(jwt, 'verify').returns(tokenCustomer);
      sinon.stub(Sale, 'findOne').resolves(saleInTransit);

      const { body, status } = await chai.request(app).patch('/sales/orders/1').send(validBody).set({ authorization: validToken });

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Unauthorized' });
    });

    it('when the current order status is not "In Transit" it should return error', async function() {
      sinon.stub(jwt, 'verify').returns(tokenCustomer);
      sinon.stub(Sale, 'findOne').resolves(sale);
      validBody.status = "Entregue";
      const { body, status } = await chai.request(app).patch('/sales/orders/1').send(validBody).set({ authorization: validToken });

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Unauthorized' });
    });

    it('successfully should return status 201', async function() {
      sinon.stub(jwt, 'verify').returns(tokenSeller);
      sinon.stub(Sale, 'findOne').resolves(saleInTransit);
      sinon.stub(Sale, 'update').resolves(1);

      const { status } = await chai.request(app).patch('/sales/orders/1').send(validBody).set({ authorization: validToken });
      expect(status).to.be.equal(201);
    });
  });
});
