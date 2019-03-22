import express from 'express';
import UserController from '../controllers/UserController';

const Router = express.Router();

Router.use(express.json());


Router.get('/', (req, res) => {
  res.send({
    status: 200,
    message: 'EPIC MAIL',
  });
});

// User Signup for an account
Router.post('/auth/signup', UserController.createUser);

// User Signin
Router.post('/auth/login', UserController.login);

// Reset password
Router.post('/auth/reset', UserController.resetPassword);

export default Router;
