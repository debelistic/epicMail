import chai from 'chai';
import UserModel from '../server/jsobjectsdb/models/User';
import randomId from '../server/jsobjectsdb/models/randomid';

describe('Mail Object', () => {
  it('Checks the instance of a mail Object', () => {
    const user = UserModel;
    chai.expect(user).to.be.an('object');
  });
});

describe('Create a User', () => {
  it('Return user object', () => {
    const newUser = {
      id: randomId(),
      firstName: 'Debe',
      lastName: 'Victor',
      contactName: 'annie',
      password: 'awoboyever.COM89',
      confirmPassword: 'awoboyever.COM89',
      createdOn: Date(),
      modifiedOn: Date(),
    };
    const user = UserModel.createUser(newUser);

    chai.expect(user).to.be.an('object');
  });
});


describe('Get User With Contact Name', () => {
  it('Return a user object', () => {
    const newUser = {
      id: randomId(),
      firstName: 'Debe',
      lastName: 'Victor',
      contactName: 'annie',
      password: 'awoboyever.COM89',
      confirmPassword: 'awoboyever.COM89',
      createdOn: Date(),
      modifiedOn: Date(),
    };
    UserModel.createUser(newUser);
    chai.expect(UserModel.getUserContactName(newUser.contactName)).to.be.an('object');
  });
});


describe('Get A User To Signin', () => {
  it('Return a User object', () => {
    const newUser = {
      id: randomId(),
      firstName: 'Debe',
      lastName: 'Victor',
      contactName: 'annie',
      password: 'awoboyever.COM89',
      createdOn: Date(),
      modifiedOn: Date(),
    };
    UserModel.createUser(newUser);
    chai.expect(UserModel.getAUser(newUser.contactName, newUser.password)).to.be.an('object');
  });
});

describe('Get A User With Id', () => {
  it('Return a User object', () => {
    const newUser = {
      firstName: 'Debe',
      lastName: 'Victor',
      contactName: 'annie',
      password: 'awoboyever.COM89',
      createdOn: Date(),
      modifiedOn: Date(),
    };
    UserModel.createUser(newUser);
    chai.expect(UserModel.getAUserWithId(newUser.id)).to.be.an('object');
  });
});


describe('Get A User With Id', () => {
  it('Return a User object', () => {
    const newUser = {
      firstName: 'Debe',
      lastName: 'Victor',
      contactName: 'annie',
      password: 'awoboyever.COM89',
      createdOn: Date(),
      modifiedOn: Date(),
    };
    const newUser1 = {
      firstName: 'Debe',
      lastName: 'Victor',
      contactName: 'annie',
      password: 'awoboyever.COM89',
      createdOn: Date(),
      modifiedOn: Date(),
    };
    UserModel.createUser(newUser);
    UserModel.createUser(newUser1);
    chai.expect(UserModel.getAllusers());
  });
});
