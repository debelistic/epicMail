import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../server/app';

const { expect } = chai;

chai.use(chaiHttp);

const token = jwt.sign(
  { userEmail: 'vincicode@epicmail.com' },
  process.env.SECRET,
  { expiresIn: '7d' },
);


describe('Create Groups', () => {
  it('Add a new group', (done) => {
    const newgroup = {
      name: 'bigCoder',
      description: 'this is testing groups',
    };

    chai.request(app)
      .post('/api/v1/groups')
      .set('x-access-token', token)
      .send(newgroup)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(201);
        expect(res.body).to.be.a('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.be.a('object');
        expect(res.body.data[0]).to.have.keys('status', 'newgroup');
        done();
      });
  });
});

// describe('Add Members', () => {
//   it('Add member to a group', (done) => {
//     const newMember = {
//       name: 'franchess',
//       membermail: 'franchesqa@epicmail.com',
//     };

//     chai.request(app)
//       .post('/api/v1/groups/:id/users')
//       .set('x-access-token', token)
//       .send(newMember)
//       .end((err, res) => {
//         if (err) done(err);
//         expect(res.status).to.equal(201);
//         expect(res.body).to.be.a('object');
//         expect(res.body.data).to.be.an('array');
//         expect(res.body.data[0]).to.be.a('object');
//         expect(res.body.data[0]).to.have.key('member');
//         done();
//       });
//   });
// });

// describe('Delete Memebers', () => {
//   it('Delete a group member', (done) => {
//     chai.request(app)
//       .delete('/api/v1/groups/:id/users/:userid')
//       .set('x-access-token', token)
//       .end((err, res) => {
//         if (err) done(err);
//         expect(res.status).to.equal(204);
//         done();
//       });
//   });
// });

// describe('Send Group Messages', () => {
//   it('Send message to a group', (done) => {
//     const groupMessage = {
//       subject: 'group message',
//       message: 'testing our group messages',
//     };

//     chai.request(app)
//       .post('/api/v1/groups/:id/messages')
//       .set('x-access-token', token)
//       .send(groupMessage)
//       .end((err, res) => {
//         if (err) done(err);
//         expect(res.status).to.equal(201);
//         expect(res.body).to.be.a('object');
//         expect(res.body.data).to.be.an('array');
//         expect(res.body.data[0]).to.be.a('object');
//         expect(res.body.data[0]).to.have.key('message');
//         done();
//       });
//   });
// });

// describe('Get Groups', () => {
//   it('Get all groups', (done) => {
//     chai.request(app)
//       .get('/api/v1/groups')
//       .set('x-access-token', token)
//       .end((err, res) => {
//         if (err) done(err);
//         expect(res.status).to.equal(200);
//         expect(res.body).to.be.a('object');
//         expect(res.body).to.have.keys('status', 'data');
//         expect(res.body.data).to.be.a('array');
//         expect(res.body.data[0]).to.be.a('object');
//         expect(res.body.data[0].groups).to.be.a('array');
//         done();
//       });
//   });
// });

// describe('Edit Group Name', () => {
//   it('Edit exisiting group name', (done) => {
//     const newGroupName = {
//       newname: 'code Strenght',
//     };

//     chai.request(app)
//       .patch('/api/v1/groups/:id/:name')
//       .set('x-access-token', token)
//       .send(newGroupName)
//       .end((err, res) => {
//         if (err) done(err);
//         expect(res.status).to.equal(204);
//         expect(res.body).to.be.a('object');
//         expect(res.body).to.have.keys('status', 'data');
//         expect(res.body.data).to.be.a('array');
//         expect(res.body.data[0]).to.be.a('object');
//         expect(res.body.data[0].newname).to.be.a('string');
//         done();
//       });
//   });
// });

// describe('Delete Groups', () => {
//   it('Delete A Group', (done) => {
//     chai.request(app)
//       .delete('/api/v1/groups/:id')
//       .set('x-access-token', token)
//       .end((err, res) => {
//         if (err) done(err);
//         expect(res.status).to.equal(204);
//         done();
//       });
//   });
// });
