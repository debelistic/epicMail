import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../server/app';

const { expect } = chai;

chai.use(chaiHttp);

const recoveryemail = 'victormailservices@gmail.com';


describe('GET Index Page', () => {
  it('It should return index page', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.be.a('string');
        done();
      });
  });
});

// eslint-disable-next-line func-names
describe('Create User', function () {
  this.timeout(8000);
  it('Create USer Account on Sign up', (done) => {
    const newuser = {
      username: 'franksaint',
      firstName: 'saint',
      lastName: 'saint',
      password: 'ghJUIlO9@gh',
      recoveryEmail: 'victormailservices@gmail.com',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'multipart/form-data')
      .field(newuser)
      .attach('userImage', './uploads/test.png')
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.body.status).to.equal(201);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.be.an('object');
        expect(res.body.data[0]).to.have.keys('token', 'emailAddress', 'image');
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
        expect(res.status).to.equal(400);
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
      recoveryEmail: 'brave',
      createdOn: new Date(),
      modifiedOn: new Date(),
    };

    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(newuser)
      .end((err, res) => {
        if (err) done();
        expect(res.status).to.equal(400);
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
        expect(res.status).to.equal(400);
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
      .send(reguser)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.data).to.be.a('array');
        expect(res.body.data[0]).to.be.a('object');
        expect(res.body.data[0]).to.have.keys('token', 'message', 'image');
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
        expect(res.status).to.equal(401);
        done();
      });
  });
});


// send user link to reset password via email
// eslint-disable-next-line func-names
describe('User gets a link to reset password via email', function () {
  this.timeout(8000);
  const recoveryEmail = {
    recoveryEmail: recoveryemail,
  };
  it('Send user a link to reset password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/forgetpass')
      .send(recoveryEmail)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.a('array');
        expect(res.body.data[0]).to.be.a('object');
        expect(res.body.data[0]).to.have.key('message');
        done();
      });
  });
});


// user update password
describe('User resets password using sent link', () => {
  it('Resets user password', (done) => {
    const newpassword = {
      email: 'vincicode@epicmail.com',
      password: 'ghikloHJ@67',
    };
    const token = jwt.sign({
      recoveryEmail: 'victormailservices@gmail.com',
    },
    process.env.SECRET, { expiresIn: '7d' });

    chai.request(app)
      .post(`/api/v1/auth/resetpass/${token}`)
      .send(newpassword)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(201);
        expect(res.body.data).to.be.a('array');
        expect(res.body.data[0]).to.be.a('object');
        expect(res.body.data[0]).to.have.key('message');
        done();
      });
  });
});
