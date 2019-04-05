import express from 'express';
import ValidateUserInput from '../middleware/UserValidator';
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
Router.post(
  '/auth/signup',
  ValidateUserInput.bodyCheck,
  ValidateUserInput.names,
  ValidateUserInput.username,
  ValidateUserInput.password,
  ValidateUserInput.restoreKey,
  UserController.createUser,
);

// User Signin
Router.post(
  '/auth/login',
  ValidateUserInput.loginField,
  ValidateUserInput.loginEmail,
  ValidateUserInput.loginPassword,
  UserController.login,
);

// Reset password

export default Router;
