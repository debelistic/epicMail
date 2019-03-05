import UserModel from '../models/User';

const UserController = {
  createUser(req, res) {
    if (!req.body.firstName && !req.body.lastName && !req.body.contacName
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
    if (!req.body.contacName && !req.body.password) {
      return res.status(400).send({ message: 'Required field empty' });
    }
    console.log(req.body);
    const user = UserModel.signIn(req.body);
    return res.status(200).send(user);
  },
};

export default UserController;
