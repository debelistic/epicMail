import Helper from '../models/Helper';
import UserModel from '../models/User';

const UserController = {
  createUser(req, res) {
    if (!req.body.firstName || !req.body.lastName || !req.body.contactName
        || !req.body.password || !req.body.confirmPassword) {
      return res.status(403).send({
        status: 403,
        message: 'All fields are required',
      });
    }

    if (!/^[a-z\d]{5,}$/i.test(req.body.contactName)) {
      return res.status(403).send({ message: 'Use valid contact name' });
    }
    if (!/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[$@#&!]).{6,}$/.test(req.body.password)) {
      return res.status(403).send({
        status: 403,
        message: 'Password should contain at least a lower and upper case, a digit and special character',
      });
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(403).send({
        status: 403,
        message: 'Password should match',
      });
    }
    const newuser = UserModel.createUser(req.body);
    const token = Helper.generateToken(req.body.id);
    return res.status(201).send({
      status: 201,
      data: [
        token,
        newuser,
      ],
    });
  },

  signInUser(req, res) {
    if (!req.body.contactName || !req.body.password) {
      return res.status(403).send({
        status: 403,
        message: 'Required field empty',
      });
    }


    const user = UserModel.getAwithContactName(req.body.contactName);
    if (!user) {
      return res.status(403).send({
        status: 403,
        message: 'Signin details does not match',
      });
    }

    if (!Helper.comparePassword(req.body.password, user.password)) {
      return res.status(403).send({
        status: 403,
        message: 'Invalid password',
      });
    }

    if (!user.contactName === undefined) {
      return res.status(403).send({
        status: 403,
        message: 'User not registered',
      });
    }


    const token = Helper.generateToken(user.id);
    return res.status(200).send({
      status: 200,
      data: [
        { token },
      ],
    });
  },

  getARegUser(req, res) {
    if (!req.body.contactName || !req.body.password) {
      return res.status(400).send({ message: 'Required field empty' });
    }

    const user = UserModel.getAUser(req.body.contactName, req.body.password);

    return res.status(201).send({ user });
  },

  getAllUsers(req, res) {
    const users = UserModel.getAllusers();

    return res.status(200).send(users);
  },
};

export default UserController;
