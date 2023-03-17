const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const app = require('../api/app');
const { userSeller, userOne } = require('./mocks/user.mock');
const { validToken } = require('./mocks/login.mock');
const { usersOutput, validBody, invalidsBody, wrongEmailBody } = require('./mocks/admin.mock');
const { User } = require('../database/models');

const { expect } = chai;
chai.use(chaiHttp);

describe('Admin integration tests', function() {
  describe('getting all registered users', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('without the token in the request it should return error', async function() {
      const { body, status } = await chai.request(app).get('/admin/manage');

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid token' });
    });

    it('with invalid token should return error', async function() {
      const { body, status } = await chai.request(app).get('/admin/manage').set({ authorization: 'invalidToken' });
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid token' });
    });

    it('if the user is not an administrator, it should return an error', async function() {
      sinon.stub(jwt, 'verify').returns(userSeller);

      const { body, status } = await chai.request(app).get('/admin/manage').set({ authorization: validToken });
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Unauthorized' });
    });

    it('successfully should return the list of users', async function() {
      sinon.stub(jwt, 'verify').returns(userOne);
      sinon.stub(User, 'findAll').resolves(usersOutput)

      const { body, status } = await chai.request(app).get('/admin/manage').set({ authorization: validToken });
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(usersOutput);
    })
  });

  describe('removing a user', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('without the token in the request it should return error', async function() {
      const { body, status } = await chai.request(app).delete('/admin/manage/1');

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid token' });
    });

    it('with invalid token should return error', async function() {
      const { body, status } = await chai.request(app).delete('/admin/manage/1').set({ authorization: 'invalidToken' });
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid token' });
    });

    it('if the user is not an administrator, it should return an error', async function() {
      sinon.stub(jwt, 'verify').returns(userSeller);

      const { body, status } = await chai.request(app).delete('/admin/manage/1').set({ authorization: validToken });
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Unauthorized' });
    });

    it('with invalid userid should return error', async function() {
      sinon.stub(jwt, 'verify').returns(userOne);
      sinon.stub(User, 'findByPk').resolves(undefined);

      const { body, status } = await chai.request(app).delete('/admin/manage/1').set({ authorization: validToken });
      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({ message: 'User not found' });
    });

    it('successfully should return status 204', async function() {
      sinon.stub(jwt, 'verify').returns(userOne);
      sinon.stub(User, 'findByPk').resolves(usersOutput[0]);
      sinon.stub(User, 'destroy').resolves(1);

      const { status } = await chai.request(app).delete('/admin/manage/2').set({ authorization: validToken });
      expect(status).to.be.equal(204);
    });
  });

  describe('creating a user', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('without the token in the request it should return error', async function() {
      const { body, status } = await chai.request(app).post('/admin/manage');

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid token' });
    });

    it('with invalid token should return error', async function() {
      const { body, status } = await chai.request(app).post('/admin/manage').set({ authorization: 'invalidToken' });
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid token' });
    });

    it('if the user is not an administrator, it should return an error', async function() {
      sinon.stub(jwt, 'verify').returns(userSeller);

      const { body, status } = await chai.request(app).post('/admin/manage').send(validBody).set({ authorization: validToken });
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Unauthorized' });
    });

    invalidsBody.forEach((input, index) => {
      it(`${index + 1} - with invalid body it should return error`, async function() {
        sinon.stub(jwt, 'verify').returns(userOne);
        const { body, status } = await chai.request(app).post('/admin/manage').send(input.body).set({ authorization: validToken });
        expect(status).to.be.equal(400);
        expect(body).to.be.deep.equal({ message: input.message });
      });
    })

    it('with invalid email should return error', async function() {
      sinon.stub(jwt, 'verify').returns(userOne);
      sinon.stub(User, 'findOne').resolves(userOne);

      const { body, status } = await chai.request(app).post('/admin/manage').send(wrongEmailBody).set({ authorization: validToken });
      expect(status).to.be.equal(409);
      expect(body).to.be.deep.equal({ message: 'Email is in use'});
    });

    it('successfully should return status 201', async function() {
      sinon.stub(jwt, 'verify').returns(userOne);
      sinon.stub(User, 'findOne').resolves(undefined);
      sinon.stub(User, 'create').resolves(1);


      const { status } = await chai.request(app).post('/admin/manage').send(validBody).set({ authorization: validToken });
      expect(status).to.be.equal(201);
    });
  });
});