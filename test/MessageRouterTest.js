import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../server/app';

const { expect } = chai;

chai.use(chaiHttp);

const token = jwt.sign({
  userEmail: 'vincicode@epicmail.com',
},
process.env.SECRET, { expiresIn: '7d' });

describe('Send Message', () => {
  it('A User Send message', (done) => {
    const newmail = {
      subject: 'message tests',
      message: 'This is for testing',
      receiverEmail: 'franchesqa@epicmail.com',
    };

    chai.request(app)
      .post('/api/v1/messages')
      .set('x-access-token', token)
      .send(newmail)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(201);
        expect(res.body).to.be.a('object');
        expect(res.body.data).to.be.a('array');
        expect(res.body.data[0]).to.be.a('object');
        done();
      });
  });
});

describe('Save as draft', () => {
  it('Save as draft if receiver is not specified', (done) => {
    const newmail = {
      subject: 'chai test',
      message: 'developin backend skils',
    };

    chai.request(app)
      .post('/api/v1/messages')
      .set('x-access-token', token)
      .send(newmail)
      .end((err, res) => {
        if (err) done();
        expect(res.status).to.equal(201);
        expect(res.body).to.be.a('object');
        expect(res.body.data).to.be.a('array');
        expect(res.body.data[0]).to.be.a('object');
        expect(res.body.data[0].newsent).to.be.a('object');
        done();
      });
  });
});

describe('Return 400 status code if there is a missing field', () => {
  it('Return 400 status code', (done) => {
    const newmail = {
      subject: 'chai test',
    };

    chai.request(app)
      .post('/api/v1/messages')
      .set('x-access-token', token)
      .send(newmail)
      .end((err, res) => {
        if (err) done();
        expect(res.status).to.equal(400);
        done();
      });
  });
});

describe('GET All Inbox', () => {
  it('It should get all received mails of auth user', (done) => {
    chai.request(app)
      .get('/api/v1/messages')
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.keys('status', 'count', 'inbox');
        expect(res.body.count).to.be.a('string');
        expect(res.body.inbox).to.be.a('array');
        done();
      });
  });
});

describe('GET All Unread mails', () => {
  it('It should get all unread mails of auth user', (done) => {
    chai.request(app)
      .get('/api/v1/messages/unread')
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.keys('status', 'count', 'unread');
        expect(res.body.count).to.be.a('string');
        expect(res.body.unread).to.be.a('array');
        done();
      });
  });
});


describe('GET All Sent mails', () => {
  it('It should get all sent mails of auth user', (done) => {
    chai.request(app)
      .get('/api/v1/messages/sent')
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.keys('status', 'count', 'sent');
        expect(res.body.count).to.be.a('string');
        expect(res.body.sent).to.be.a('array');
        done();
      });
  });
});


describe('Get A Mail From Inbox', () => {
  it('It should return specific mail of a user', (done) => {
    chai.request(app)
      .get('/api/v1/messages/5')
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.keys('status', 'message');
        expect(res.body.message).to.be.a('array');
        done();
      });
  });
});

describe('Get A Sent Mail', () => {
  it('It should return a sent mail of a user', (done) => {
    chai.request(app)
      .get('/api/v1/messages/sent/2')
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.keys('status', 'message');
        expect(res.body.message).to.be.a('array');
        done();
      });
  });
});

describe('GET All Drafts', () => {
  it('It should get all drafts for auth user', (done) => {
    chai.request(app)
      .get('/api/v1/messages/drafts')
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.keys('status', 'count', 'drafts');
        expect(res.body.count).to.be.a('string');
        expect(res.body.drafts).to.be.a('array');
        done();
      });
  });
});

describe('Get A Draft', () => {
  it('It should return a draft of a user', (done) => {
    chai.request(app)
      .get('/api/v1/messages/drafts/10')
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.keys('status', 'message');
        expect(res.body.message).to.be.a('array');
        done();
      });
  });
});

describe('Delete A Mail', () => {
  it('Delete a mail from inbox', (done) => {
    chai.request(app)
      .delete('/api/v1/messages/3')
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(204);
        done();
      });
  });
});

describe('Delete A Sent Mail', () => {
  it('Delete a mail from sent', (done) => {
    chai.request(app)
      .delete('/api/v1/messages/sent/3')
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(204);
        done();
      });
  });
});
