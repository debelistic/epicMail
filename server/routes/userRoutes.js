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
Router.post('/auth/signup', ValidateUserInput.signUpField, UserController.createUser);

// User Signin
Router.post('/auth/login', ValidateUserInput.loginField, UserController.login);

// Reset password
Router.post('/auth/reset', ValidateUserInput.resetPasswordField, UserController.resetPassword);

export default Router;
