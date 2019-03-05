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

const generateToken = (tokenLength) => {
  let token = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let index = 0; index < tokenLength; index += 1) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
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
    if (!/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[$@#&!]).{6,}$/.test(newUser.password)) {
      return {
        message: 'Password should contain at least a lower and upper case, a digit and special character',
      };
    }
    if (newUser.password !== newUser.confirmPassword) {
      return {
        message: 'Password should match',
      };
    }
    this.users.push(newUser);
    return {
      message: `User account created for ${newUser.firstName} ${newUser.lastName}`,
      mailaddress: `Your EPIC email address is ${newUser.contactName}`,
      newUser,
    };
  }

  signIn(contactName) {
    const user = this.users.find(aUser => aUser.contactName === contactName);
    if (!user.contactName && !user.password) {
      return { message: 'Signin details does not match' };
    }
    const token = generateToken(90);
    return token;
  }

  getAUSer(contactName) {
    const user = this.users.find(aUser => aUser.contacName === contactName);
    if (!user.contactName && !user.password) {
      return { message: 'Signin details does not match' };
    }
    return user;
  }
}


export default new UserModel();
