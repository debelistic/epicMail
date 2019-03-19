import HelperModule from './Helper';
import randomId from './randomid';

class UserModel {
  constructor() {
    this.users = [
      {
        firstName: 'victor',
        lastName: 'tolulope',
        contactName: 'deviclistic23',
        password: 'hjrjfhrjf9980GH#',
        confirmPassword: 'hjrjfhrjf9980GH#',
      },
      {
        firstName: 'test',
        lastName: 'annie',
        contactName: 'funmilayo',
        password: 'tyrywruJKU89$',
        confirmPassword: 'tyrywruJKU89$',
      },
    ];
  }

  createUser(user) {
    const newUser = {
      id: randomId(),
      firstName: user.firstName,
      lastName: user.lastName,
      contactName: `${user.contactName}@epicmail.com`,
      password: user.password,
      confirmPassword: user.confirmPassword,
      createdOn: Date(),
      modifiedOn: Date(),
    };
    if (!newUser.firstName || !newUser.lastName
      || !newUser.contactName || !newUser.password
      || !newUser.confirmPassword) {
      return { message: 'All fields are required' };
    }
    if (!/^[a-z\d]{5,}$/i.test(user.contactName)) {
      return { message: 'Use a valid contact name' };
    }
    if (newUser.password !== newUser.confirmPassword) {
      return {
        message: 'Password should match',
      };
    }
    const hashPassword = HelperModule.hashPassword(newUser.password);
    const hashConfirmPassword = HelperModule.hashPassword(newUser.confirmPassword);
    newUser.password = hashPassword;
    newUser.confirmPassword = hashConfirmPassword;

    this.users.push(newUser);
    return {
      message: `User account created for ${newUser.firstName} ${newUser.lastName}`,
      mailaddress: `Your EPIC email address is ${newUser.contactName}`,
      newUser,
    };
  }

  getUserContactName(contactName) {
    const user = this.users.find(aUser => aUser.contactName === `${contactName}@epicmail.com`);
    return user;
  }

  getAUser(contactName, password) {
    const user = this.users.find(aUser => aUser.contactName === `${contactName}@epicmail.com`);

    if (!user.contactName || !user.password) {
      return { message: 'Signin details does not match' };
    }

    if (!HelperModule.comparePassword(password, user.password)) {
      return { message: 'Invalid password' };
    }
    return user;
  }

  getAUserWithId(id) {
    const user = this.users.find(auser => auser.id === id);
    return user;
  }

  getAllusers() {
    return this.users;
  }
}


export default new UserModel();
