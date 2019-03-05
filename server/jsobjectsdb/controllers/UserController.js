import Helper from '../models/Helper';
import UserModel from '../models/User';

const UserController = {
  createUser(req, res) {
    if (!req.body.firstName && !req.body.lastName && !req.body.contactName
        && !req.body.password && !req.body.confirmPassword) {
      return res.status(400).send({ message: 'All fields are required' });
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


    const user = UserModel.getAuser(req.body.contactName);
    if (!user.contactName && !user.password) {
      return res.status(400).send({ message: 'Signin details does not match' });
    }

    if (!Helper.comparePassword(req.body.password, user.password)) {
      return res.status(400).send({ message: 'Invalid password' });
    }


    const token = Helper.generateToken(user.id);
    return res.status(200).send(token);
  },

  getARegUser(req, res) {
    if (!req.body.contactName && !req.body.password) {
      return res.status(400).send({ message: 'Required field empty' });
    }

    const user = UserModel.getAUser(req.body.contactName, req.body.password);

    return res.status(201).send({ user });
  },
};

export default UserController;
