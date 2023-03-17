const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const app = require('../api/app');
const { User } = require('../database/models');
const { invalidsBody, wrongEmailBody, userSecondCall, validbody, registerOutput } = require('./mocks/register.mock');
const { userOne } = require('./mocks/user.mock');
const { validToken } = require('./mocks/login.mock');
const { expect } = chai;
chai.use(chaiHttp);

describe('Register integration tests', function() {
  describe('failure cases', function() {
    afterEach(function() {
      sinon.restore();
    });

    invalidsBody.forEach((input, index) => {
      it(`${index + 1} - with invalid body it should return error`, async function() {
        const { body, status } = await chai.request(app).post('/register').send(input.body);
        expect(status).to.be.equal(400);
        expect(body).to.be.deep.equal({ message: input.message });
      });
    })

    it('with invalid email should return error', async function() {
      sinon.stub(User, 'findOne').resolves(userOne);

      const { body, status } = await chai.request(app).post('/register').send(wrongEmailBody);
      expect(status).to.be.equal(409);
      expect(body).to.be.deep.equal({ message: 'E-mail is already in use' });
    });
  });

  describe('success case', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('successfully should return the token', async function() {
      sinon.stub(jwt, 'sign').returns(validToken);
      sinon.stub(User, 'create').resolves([1]);
      sinon.stub(User, 'findOne')
        .onFirstCall().resolves(undefined)
        .onSecondCall().resolves(userSecondCall);

      const { body, status } = await chai.request(app).post('/register').send(validbody);
      expect(status).to.be.equal(201);
      expect(body).to.be.deep.equal(registerOutput);
    });
  });
});