import express from 'express';
import multer from 'multer';
import ValidateUserInput from '../middleware/UserValidator';
import UserController from '../controllers/UserController';

const Router = express.Router();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(new Error('Image should be pnj/jpeg/jpg format not more than 6mb'), false);
  }
};
const upload = multer({
  dest: 'uploads',
  limits: {
    fileSize: 1024 * 1024 * 6,
  },
  fileFilter,
});


// User Signup for an account
Router.post(
  '/auth/signup',
  ValidateUserInput.bodyCheck,
  upload.single('userImage'),
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
