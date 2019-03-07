import express from 'express';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';
import UserController from '../server/jsobjectsdb/controllers/UserController';

chai.use(chaiHttp);
app.use(express.json());

describe('/Post Mail', () => {
  it('Create Mail when user fills form', (done) => {
    const newuser = {
      firstName: 'victor',
      lastName: 'tolulope',
      contactName: 'deviclistic23',
      password: 'jdnfmHYU67&hjfjf',
      confirmPassword: 'jdnfmHYU67&hjfjf',
    };
    chai.request(app)
      .post('/auth/signup', UserController.createUser)
      .send(newuser)
      .end((err, res) => {
        if (err) done();

        res.should.have.status(201);
        // res.body.should.an('object');
        // res.body.should.have.property('firstName');
        // res.body.should.have.property('lastName');
        // res.body.should.have.property('password');
        // res.body.should.have.property('confirmPassword');
        done();
      });
  });
});

// describe('/Signin User', () => {
//   it('Sign in user and generate token', (done) => {
//     const newuser = {
//       contactName: 'deviclistic23',
//       password: 'awoboyEVERcom89@',
//     };
//     chai.request(app)
//       .post('/user', Mail.createMail())
//       .send(newuser)
//       .end((err, res) => {
//         if (err) done(err);
//         res.should.have.status(200);
//         res.body.should.an('object');
//         res.body.should.have.property('contactName');
//         res.body.should.have.property('password');
//         done();
//       });
//   });
// });

// describe('/GET All Sent mails', () => {
//   it('It should get all sent mails in the database', (done) => {
//     chai.request(app)
//       .get('/mail/sent', Mail.getSentMails())
//       .end((err, res) => {
//         if (err) done(err);
//         res.should.have.status(200);
//         res.body.should.be.an('array');
//         done();
//       });
//   });
// });


// describe('/GET/:id a Sent mail', () => {
//   it('It should get a sent mail in the database', (done) => {
//     const newMail = {
//       id: randomid,
//       subject: 'test',
//       message: "you're building",
//       parentMessageId: 'from habiib',
//       status: true,
//     };
//     chai.request(app)
//       .get(`/mail/sent/${newMail.id}`, Mail.getASentMail())
//       .end((err, res) => {
//         if (err) done(err);
//         res.should.have.status(200);
//         res.body.should.be.an('array');
//         done();
//       });
//   });
// });

// describe('/GET All Drafts', () => {
//   it('It should get all drafts in the database', (done) => {
//     chai.request(app)
//       .get('/mail/drafts', Mail.getDrafts())
//       .end((err, res) => {
//         if (err) done(err);
//         res.should.have.status(200);
//         res.body.should.be.an('array');
//         done();
//       });
//   });
// });

// describe('/GET/:id a Draft mail', () => {
//   it('It should get a draft mail from the database', (done) => {
//     const newMail = {
//       id: randomid,
//       subject: 'test',
//       message: "you're building",
//       parentMessageId: 'from habiib',
//       status: false,
//     };
//     chai.request(app)
//       .get(`/mail/drafts/${newMail.id}`, Mail.getADraftMail())
//       .end((err, res) => {
//         if (err) done(err);
//         res.should.have.status(200);
//         res.body.should.be.an('array');
//         done();
//       });
//   });
// });
