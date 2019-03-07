import express from 'express';
import UserController from '../controllers/UserController';
import MailController from '../controllers/MailController';
import Auth from '../dsmiddleware/AuthwithDS';

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

// Get all received emails for a user
router.get('/messages', Auth.verifyToken, MailController.getInbox);

// Get unread mails for a user
router.get('/messages/unread', Auth.verifyToken, MailController.getUnreadMail);

// Send mail to individuals
router.post('/messages', Auth.verifyToken, MailController.createMail);

// Get a user email
router.get('/messages/:id', Auth.verifyToken, MailController.getASentMail);


export default router;
