import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../server/app';
import UserModel from '../server/jsobjectsdb/models/User';


chai.use(chaiHttp);

const token = jwt.sign({
  userId: 3,
},
process.env.SECRET, { expiresIn: '7d' });

describe('/Post User', () => {
  it('Create USer Account on Sign up', (done) => {
    const newuser = {
      firstName: 'victor',
      lastName: 'tolulope',
      contactName: 'deviclistic23',
      password: 'jdnfmHYU67&hjfjf',
      confirmPassword: 'jdnfmHYU67&hjfjf',
    };

    chai.request(app)
      .post('/api/v1/users/auth/signup')
      .send(newuser)
      .end((err, res) => {
        if (err) done();
        chai.expect(res.status).to.equal(201);
        chai.expect(res.body).to.be.a('object');
        chai.expect(res.body.data).to.be.a('array');
        chai.expect(res.body.data[1]).to.be.a('object');
        chai.expect(res.body.data[1]).to.have.keys('message', 'mailaddress', 'newUser');
        chai.expect(res.body.data[1].newUser).to.have.keys('firstName', 'lastName', 'password', 'confirmPassword', 'id', 'contactName', 'createdOn', 'modifiedOn');
        done();
      });
  });
});

describe('/Signin User', () => {
  it('Sign in user and generate token', (done) => {
    const newuser = {
      firstName: 'victor',
      lastName: 'tolulope',
      contactName: 'deviclistic23',
      password: 'jdnfmHYU67&hjfjf',
      confirmPassword: 'jdnfmHYU67&hjfjf',
    };
    UserModel.createUser(newuser);
    const reguser = {
      contactName: 'deviclistic23',
      password: 'jdnfmHYU67&hjfjf',
    };
    chai.request(app)
      .post('/api/v1/users/auth/login')
      .send(reguser)
      .end((err, res) => {
        if (err) done(err);
        chai.expect(res.status).to.equal(200);
        chai.expect(res.body).to.be.a('object');
        chai.expect(res.body.data).to.be.a('array');
        chai.expect(res.body.data[0]).to.be.a('object');
        chai.expect(res.body.data[0]).to.have.key('token');
        done();
      });
  });
});

describe('/GET All Received mails', () => {
  it('It should get all received mails of auth user', (done) => {
    chai.request(app)
      .get('/api/v1/users/messages')
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) done(err);
        chai.expect(res.status).to.equal(200);
        chai.expect(res.body).to.be.a('object');
        chai.expect(res.body.data[0]).to.be.a('array');
        done();
      });
  });
});

describe('/GET All Unread mails', () => {
  it('It should get all unread mails of auth user', (done) => {
    chai.request(app)
      .get('/api/v1/users/messages/unread')
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) done(err);
        chai.expect(res.status).to.equal(200);
        chai.expect(res.body).to.be.a('object');
        chai.expect(res.body.data).to.be.a('array');
        done();
      });
  });
});


describe('/GET All Sent mails', () => {
  it('It should get all sent mails of auth user', (done) => {
    chai.request(app)
      .get('/api/v1/users/messages/sent')
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) done(err);
        chai.expect(res.status).to.equal(200);
        chai.expect(res.body).to.be.a('object');
        chai.expect(res.body.data[0]).to.be.a('array');
        done();
      });
  });
});


describe('Get A Mail', () => {
  it('It should return mail of auth user', (done) => {
    const newMail = {
      id: 63,
      createdOn: Date(),
      subject: 'test',
      message: "you're building",
      receiverId: 56,
      parentMessageId: 89,
      sentStatus: true,
      status: 'sent',
    };

    chai.request(app)
      .get(`/api/v1/users/messages/${newMail.id}`)
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) done(err);
        chai.expect(res.status).to.equal(200);
        chai.expect(res.body).to.be.a('object');
        chai.expect(res.body.data).to.be.a('array');
        done();
      });
  });
});

describe('/GET All Drafts', () => {
  it('It should get all drafts for auth user', (done) => {
    chai.request(app)
      .get('/api/v1/users/messages/drafts')
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) done(err);
        chai.expect(res.status).to.equal(200);
        chai.expect(res.body).to.be.a('object');
        chai.expect(res.body.data).to.be.a('array');
        done();
      });
  });
});

describe('/GET/:id a Draft mail', () => {
  it('It should get a draft mail from the database', (done) => {
    const newMail = {
      id: 56,
      subject: 'test',
      message: "you're building",
      parentMessageId: 'from habiib',
      status: false,
    };
    chai.request(app)
      .get(`/api/v1/users/messages/drafts/${newMail.id}`)
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) done(err);
        chai.expect(res.status).to.equal(200);
        chai.expect(res.body).to.be.a('object');
        done();
      });
  });
});
