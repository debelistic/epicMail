import UserModel from '../models/User';

const generateToken = (tokenLength) => {
  let token = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let index = 0; index < tokenLength; index += 1) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
};

const UserController = {
  createUser(req, res) {
    if (!req.body.firstName && !req.body.lastName && !req.body.contactName
        && !req.body.password && !req.body.confirmPassword) {
      return { message: 'All fields are required' };
    }

    if (!/^[a-z\d]{5,}$/i.test(req.body.contactName)) {
      return res.status(400).send({ message: 'Use valid contact name' });
    }
    if (!/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[$@#&!]).{6,}$/.test(req.body.password)) {
      return res.status(400).send({
        message: 'Password should contain at least a lower and upper case, a digit and special character',
      });
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).send({
        message: 'Password should match',
      });
    }
    const user = UserModel.createUser(req.body);
    return res.status(201).send(user);
  },

  signInUser(req, res) {
    if (!req.body.contactName && !req.body.password) {
      return res.status(400).send({ message: 'Required field empty' });
    }
    console.log(req.body);
    console.log(req.body.contactName);
    const user = UserModel.signIn(req.body.contactName);
    if (req.body.password === user.password) {
      const token = generateToken(90);
      return res.status(200).send(`token for ${user.contactName} is ${token}`);
    }
    return res.status(400).send({ message: 'invalid password' });
  },
};

export default UserController;
