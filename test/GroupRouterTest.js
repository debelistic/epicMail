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

describe('Add Members', () => {
  it('Add member to a group', (done) => {
    const newMember = {
      name: 'franchess',
      membermail: 'franchesqa@epicmail.com',
    };

    chai.request(app)
      .post('/api/v1/groups/5fd08cce-092e-454f-896d-acd78dedb478/users')
      .set('x-access-token', token)
      .send(newMember)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(201);
        expect(res.body).to.be.a('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.be.a('object');
        expect(res.body.data[0]).to.have.key('member');
        done();
      });
  });
});

describe('Delete Memebers', () => {
  it('Delete a group member', (done) => {
    chai.request(app)
      .delete('/api/v1/groups/5fd08cce-092e-454f-896d-acd78dedb478/users/ojematthew@epicmail.com')
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(204);
        done();
      });
  });
});

describe('Send Group Messages', () => {
  const memTtoken = jwt.sign(
    { userEmail: 'toluniyin@epicmail.com' },
    process.env.SECRET,
    { expiresIn: '7d' },
  );
  it('Send message to a group', (done) => {
    const groupMessage = {
      subject: 'group message',
      message: 'testing our group messages',
    };

    chai.request(app)
      .post('/api/v1/groups/ade0b372-7e17-4e3e-a3f3-d19e494d8333/messages')
      .set('x-access-token', memTtoken)
      .send(groupMessage)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(201);
        expect(res.body).to.be.a('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.be.a('object');
        expect(res.body.data[0]).to.have.key('message');
        done();
      });
  });
});

describe('Get Groups', () => {
  it('Get all groups', (done) => {
    chai.request(app)
      .get('/api/v1/groups')
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.keys('status', 'data');
        expect(res.body.data).to.be.a('array');
        expect(res.body.data[0]).to.be.a('object');
        expect(res.body.data[0].groups).to.be.a('array');
        done();
      });
  });
});

describe('Edit Group Name', () => {
  it('Edit exisiting group name', (done) => {
    const memTtoken = jwt.sign(
      { userEmail: 'toluniyin@epicmail.com' },
      process.env.SECRET,
      { expiresIn: '7d' },
    );
    const newGroupName = {
      newname: 'code Strenght',
    };

    chai.request(app)
      .patch('/api/v1/groups/f04bd8ee-e63a-42e1-8264-d195df5316c8/camp support')
      .set('x-access-token', memTtoken)
      .send(newGroupName)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(204);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.keys('status', 'data');
        expect(res.body.data).to.be.a('array');
        expect(res.body.data[0]).to.be.a('object');
        expect(res.body.data[0].newname).to.be.a('string');
        done();
      });
  });
});

describe('Delete Groups', () => {
  it('Delete A Group', (done) => {
    const memTtoken = jwt.sign(
      { userEmail: 'toluniyin@epicmail.com' },
      process.env.SECRET,
      { expiresIn: '7d' },
    );
    chai.request(app)
      .delete('/api/v1/groups/f04bd8ee-e63a-42e1-8264-d195df5316c8')
      .set('x-access-token', memTtoken)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(204);
        done();
      });
  });
});
