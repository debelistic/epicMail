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

// Get sent mails for a user
router.get('/messages/sent', Auth.verifyToken, MailController.getSentMails);


export default router;
