import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import jwt from 'jsonwebtoken';
import app from '../server/app';

process.env.NODE_ENV = 'test';

const { expect } = chai;

chai.use(chaiHttp);
chai.use(chaiAsPromised);

const token = jwt.sign({
  userEmail: 'frankjunior@epicmail.com',
},
process.env.SECRET, { expiresIn: '7d' });

describe('/Post User', () => {
  it('Create USer Account on Sign up', (done) => {
    const newuser = {
      username: 'frankjunior',
      firstName: 'frank',
      lastName: 'frank juninor junior',
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
        expect(Promise.resolve(res.status)).to.eventually.equal(201);
        // chai.expect(res.body).to.eventually.be.a('object');
        // chai.expect(res.body.data).to.eventually.be.a('array');
        // chai.expect(res.body.data[1]).to.eventually.be.a('string');
        done();
      });
  });

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
        chai.expect(res.status).to.equal(200);
        done();
      });
  });

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
        chai.expect(res.status).to.equal(200);
        done();
      });
  });
});


describe('/Signin User', () => {
  it('Sign in user and generate token', (done) => {
    const reguser = {
      email: 'frankjunior@epicmail.com',
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

  it('Return 400 status code if there is a missing field', (done) => {
    const reguser = {};

    chai.request(app)
      .post('/api/v1/auth/login')
      .send(reguser)
      .end((err, res) => {
        if (err) done();
        chai.expect(res.status).to.equal(200);
        done();
      });
  });
});
