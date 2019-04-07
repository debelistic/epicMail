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

describe('Validate Message Input Field', () => {
  it('Return 400 status code if there is a missing field', (done) => {
    const newmail = {
      subject: 'victor',
      message: 'jnnvjfnvtmj jvfrmjv',
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
        expect(res.body.data[0]).to.be.a('array');
        done();
      });
  });
});

describe('/GET All Unread mails', () => {
  it('It should get all unread mails of auth user', (done) => {
    chai.request(app)
      .get('/api/v1/messages/unread')
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.data).to.be.a('array');
        done();
      });
  });
});


describe('/GET All Sent mails', () => {
  it('It should get all sent mails of auth user', (done) => {
    chai.request(app)
      .get('/api/v1/messages/sent')
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.data[0]).to.be.a('array');
        done();
      });
  });
});


describe('Get A Mail', () => {
  it('It should return specific mail of a user', (done) => {
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
      .get(`/api/v1/messages/${newMail.id}`)
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.data).to.be.a('array');
        done();
      });
  });
});

// describe('/GET All Drafts', () => {
//   it('It should get all drafts for auth user', (done) => {
//     chai.request(app)
//       .get('/api/v1/messages/drafts')
//       .set('x-access-token', token)
//       .end((err, res) => {
//         if (err) done(err);
//         expect(res.status).to.equal(200);
//         expect(res.body).to.be.a('object');
//         expect(res.body.data).to.be.a('array');
//         done();
//       });
//   });
// });

// describe('Delete A Mail', () => {
//   it('It return 404 status code', (done) => {
//     chai.request(app)
//       .delete('/api/v1/messages/13')
//       .set('x-access-token', token)
//       .end((err, res) => {
//         if (err) done(err);
//         expect(res.status).to.equal(404);
//         done();
//       });
//   });
// });
