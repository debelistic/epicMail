import express from 'express';
import UserController from '../controllers/UserController';
// import Auth from '../dsmiddleware/AuthwithDS';

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
  res.send({
    status: 200,
    message: 'EPIC MAIL',
  });
});

// User Signup for an account
router.post('/auth/signup', UserController.createUser);

// User Signin
router.post('/auth/login', UserController.signInUser);

export default router;
