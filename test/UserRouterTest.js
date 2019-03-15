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
      .post('/api/v1/auth/signup')
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

  it('Return 400 status code if there is a missing field', (done) => {
    const newuser = {};

    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(newuser)
      .end((err, res) => {
        if (err) done();
        chai.expect(res.status).to.equal(400);
        done();
      });
  });

  it('Return 400 status code if password is not strong', (done) => {
    const newuser = {
      firstName: 'victor',
      lastName: 'tolulope',
      contactName: 'deviclistic23',
      password: 'jdnfmHYU',
      confirmPassword: 'jdnfmHYU',
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

  it('Return 400 status code if password does not match', (done) => {
    const newuser = {
      firstName: 'victor',
      lastName: 'tolulope',
      contactName: 'deviclistic23',
      password: 'frankmHYU67&hjfjf',
      confirmPassword: 'jdnfmHYU67&hjfjf',
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
  it('Return 400 status code if contact name is too short', (done) => {
    const newuser = {
      firstName: 'victor',
      lastName: 'tolulope',
      contactName: 'devi',
      password: 'frankmHYU67&hjfjf',
      confirmPassword: 'jdnfmHYU67&hjfjf',
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

describe('/Send Message', () => {
  it('A User Send message', (done) => {
    const newmail = {
      subject: 'victor',
      message: 'jnnvjfnvtmj jvfrmjv',
      sentStatus: 'Drafts',
      status: true,
    };

    chai.request(app)
      .post('/api/v1//user/message')
      .set('x-access-token', token)
      .send(newmail)
      .end((err, res) => {
        if (err) done();
        chai.expect(res.status).to.equal(201);
        chai.expect(res.body).to.be.a('object');
        chai.expect(res.body.data).to.be.a('array');
        chai.expect(res.body.data[0]).to.be.a('object');
        done();
      });
  });

  it('Return 400 status code if there is a missing field', (done) => {
    const newmail = {
      subject: 'victor',
      message: 'jnnvjfnvtmj jvfrmjv',
      status: true,
    };

    chai.request(app)
      .post('/api/v1//user/message')
      .set('x-access-token', token)
      .send(newmail)
      .end((err, res) => {
        if (err) done();
        chai.expect(res.status).to.equal(400);
        done();
      });
  });
});

describe('/Signin User', () => {
  it('Sign in user and generate token', (done) => {
    const newuser = {
      firstName: 'victor',
      lastName: 'tolulope',
      contactName: 'devicddlistic23',
      password: 'jdnfmHYU67&hjfjf',
      confirmPassword: 'jdnfmHYU67&hjfjf',
    };
    UserModel.createUser(newuser);
    const reguser = {
      contactName: 'devicddlistic23',
      password: 'jdnfmHYU67&hjfjf',
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
        chai.expect(res.body.data[0]).to.have.key('token');
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
        chai.expect(res.status).to.equal(400);
        done();
      });
  });
});

describe('/GET All Received mails', () => {
  it('It should get all received mails of auth user', (done) => {
    chai.request(app)
      .get('/api/v1/user/messages')
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
      .get('/api/v1/user/messages/unread')
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
      .get('/api/v1/user/messages/sent')
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
      .get(`/api/v1/user/messages/${newMail.id}`)
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
      .get('/api/v1/user/messages/drafts')
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

describe('Delete A Mail', () => {
  it('It return 404 status code', (done) => {
    chai.request(app)
      .delete('/api/v1/user/message/13')
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) done(err);
        chai.expect(res.status).to.equal(404);
        done();
      });
  });
});
