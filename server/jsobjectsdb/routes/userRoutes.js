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
router.get('/user/messages', Auth.verifyToken, MailController.getInbox);

// Get unread mails for a user
router.get('/user/messages/unread', Auth.verifyToken, MailController.getUnreadMail);

// Get all sent emails for a user
router.get('/user/messages/sent', MailController.getSentMails);

// Get a user email
router.get('/user/messages/:id', Auth.verifyToken, MailController.getAInboxMail);

// Send mail to individuals
router.post('/user/message', Auth.verifyToken, MailController.createMail);

// Delete from inbox
router.delete('/user/message/:id', Auth.verifyToken, MailController.deleteInbox);

// Get a sent email for a user
router.get('/user/messages/sent/:id', MailController.getASentMail);


export default router;
