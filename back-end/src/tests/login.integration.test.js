const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const { 
  invalidsBody,
  wrongEmailBody,
  wrongPasswordBody,
  validBody,
  loginOutput,
  validToken,
} = require('./mocks/login.mock');
const app = require('../api/app');
const { User } = require('../database/models');
const { userOne } = require('./mocks/user.mock');

const { expect } = chai;
chai.use(chaiHttp);

describe('Login integration tests', function() {
  describe('failure cases', function() {
    afterEach(function() {
      sinon.restore();
    });

    invalidsBody.forEach((input, index) => {
      it(`${index + 1} - with invalid body it should return error`, async function() {
        const { body, status } = await chai.request(app).post('/login').send(input.body);
        expect(status).to.be.equal(400);
        expect(body).to.be.deep.equal({ message: input.message });
      });
    })

    it('with invalid email should return error', async function() {
      sinon.stub(User, 'findOne').resolves(undefined);

      const { body, status } = await chai.request(app).post('/login').send(wrongEmailBody);
      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({ message: 'Email or password are invalid' });
    });

    it('with invalid password should return error', async function() {
      sinon.stub(User, 'findOne').resolves(userOne);

      const { body, status } = await chai.request(app).post('/login').send(wrongPasswordBody);
      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({ message: 'Email or password are invalid' });
    });
  });

  describe('success cases', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('successfully should return the token', async function() {
      sinon.stub(User, 'findOne').resolves(userOne);
      sinon.stub(jwt, 'sign').returns(validToken);

      const { body, status } = await chai.request(app).post('/login').send(validBody);
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(loginOutput);
    });
  });
});