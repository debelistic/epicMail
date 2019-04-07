import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../server/app';

process.env.NODE_ENV = 'test';

const { expect } = chai;

chai.use(chaiHttp);

const token = jwt.sign({
  userEmail: 'franksaint@epicmail.com',
},
process.env.SECRET, { expiresIn: '7d' });

describe('Create User', () => {
  it('Create USer Account on Sign up', (done) => {
    const newuser = {
      username: 'franksaint',
      firstName: 'saint',
      lastName: 'saint',
      password: 'ghJUIlO9@gh',
      securityKey: 'brave',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(newuser)
      .end((err, res) => {
        if (err) done();
        expect(res.status).to.equal(201);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.body.status).to.equal(201);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.be.an('object');
        expect(res.body.data[0]).to.have.keys('token', 'message', 'email_address');
        done();
      });
  });
});

describe('Validate Username', () => {
  it('Return 400 status code if username is too short', (done) => {
    const newuser = {
      firstName: 'victor',
      lastName: 'tolulope',
      username: 'devi',
      password: 'frankmHYU67&hjfjf',
    };

    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(newuser)
      .end((err, res) => {
        if (err) done();
        chai.expect(res.status).to.equal(400);
        done();
      });
  });
});
describe('Validate Signup Form', () => {
  it('Return 400 status code if there is a missing field', (done) => {
    const newuser = {
      username: 'samsm',
      lastName: 'sam',
      password: 'ghJUIlO9@gh',
      securityKey: 'brave',
      createdOn: new Date(),
      modifiedOn: new Date(),
    };

    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(newuser)
      .end((err, res) => {
        if (err) done();
        chai.expect(res.status).to.equal(400);
        done();
      });
  });
});

describe('Valiadte Password', () => {
  it('Return 400 status code if password is not strong', (done) => {
    const newuser = {
      firstName: 'victor',
      lastName: 'tolulope',
      username: 'deviclistic23',
      password: 'jdnfmHYU',
    };

    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(newuser)
      .end((err, res) => {
        if (err) done();
        chai.expect(res.status).to.equal(400);
        done();
      });
  });
});

describe('Login User', () => {
  it('Sign User with Token', (done) => {
    const reguser = {
      email: 'franksaint@epicmail.com',
      password: 'ghJUIlO9@gh',
    };

    chai.request(app)
      .post('/api/v1/auth/login')
      .set('x-access-token', token)
      .send(reguser)
      .end((err, res) => {
        if (err) done(err);
        chai.expect(res.status).to.equal(200);
        chai.expect(res.body).to.be.a('object');
        chai.expect(res.body.data).to.be.a('array');
        chai.expect(res.body.data[0]).to.be.a('object');
        chai.expect(res.body.data[0]).to.have.property('token');
        done();
      });
  });
});

describe('Validate Login form', () => {
  it('Return 400 status code if there is a missing field', (done) => {
    const reguser = {};

    chai.request(app)
      .post('/api/v1/auth/login')
      .send(reguser)
      .end((err, res) => {
        if (err) done();
        chai.expect(res.status).to.equal(400);
        done();
      });
  });
});
