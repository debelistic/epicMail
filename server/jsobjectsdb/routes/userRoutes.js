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

// Get all sent emails user
router.get('/messages/sent', MailController.getSentMails);

// Get a user email
router.get('/messages/:id', Auth.verifyToken, MailController.getASentMail);

// Get drafts of a user
router.get('/messages/drafts', Auth.verifyToken, MailController.getDrafts);

// Get a draft
router.get('/messages/drafts/:id', Auth.verifyToken, MailController.getADraftMail);

// Delete from inbox
router.delete('/messages/:id', Auth.verifyToken, MailController.deleteInbox);


export default router;
