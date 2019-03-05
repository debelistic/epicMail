import Helper from './Helper';

/**
 * randomId function is from the discussion on this stackoverflow link
 * https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 * the function is modified here to generate 15 length character id for our data base
 */
const randomId = () => {
  let id = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let index = 0; index < 15; index += 1) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
};


class UserModel {
  constructor() {
    this.users = [];
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
    if (!newUser.firstName && !newUser.lastName
      && !newUser.contactName && !newUser.password
      && !newUser.confirmPassword) {
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
    const hashPassword = Helper.hashPassword(newUser.password);
    newUser.password = hashPassword;

    this.users.push(newUser);
    return {
      message: `User account created for ${newUser.firstName} ${newUser.lastName}`,
      mailaddress: `Your EPIC email address is ${newUser.contactName}`,
      newUser,
    };
  }

  getAuser(contactName) {
    const user = this.users.find(aUser => aUser.contactName === `${contactName}@epicmail.com`);
    return user;
  }

  getAUser(contactName, password) {
    const user = this.users.find(aUser => aUser.contactName === `${contactName}@epicmail.com`);

    if (!user.contactName && !user.password) {
      return { message: 'Signin details does not match' };
    }
    console.log(user);
    console.log('this is her password', password);
    if (!Helper.comparePassword(password, user.password)) {
      return { message: 'Invalid password' };
    }
    return user;
  }
}


export default new UserModel();
