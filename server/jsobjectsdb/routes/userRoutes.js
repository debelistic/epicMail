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

// Send mail to individuals
router.post('/user/message', Auth.verifyToken, MailController.createMail);

// Get all sent emails user
router.get('/user/messages/sent', MailController.getSentMails);

// Get a user email
router.get('/user/messages/:id', Auth.verifyToken, MailController.getASentMail);

// Get drafts of a user
router.get('/user/messages/draft', Auth.verifyToken, MailController.getAllUnsent);

// Get a draft
router.get('/user/messages/drafts/:id', Auth.verifyToken, MailController.getADraftMail);

// Delete from inbox
router.delete('/user/message/:id', Auth.verifyToken, MailController.deleteInbox);


export default router;
