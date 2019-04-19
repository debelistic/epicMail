import express from 'express';
import { multerUploads } from '../middleware/multer';
import ValidateUserInput from '../middleware/UserValidator';
import UserController from '../controllers/UserController';

const Router = express.Router();


// User Signup for an account
Router.post(
  '/auth/signup',
  ValidateUserInput.bodyCheck,
  multerUploads,
  ValidateUserInput.names,
  ValidateUserInput.username,
  ValidateUserInput.password,
  ValidateUserInput.resetMail,
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

// Forget password
Router.post(
  '/auth/forgetpass',
  UserController.forgetpass,
);

// Reset Password
Router.post(
  '/auth/resetpass/:token',
  UserController.resetpass,
);

export default Router;
