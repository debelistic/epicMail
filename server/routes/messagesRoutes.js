import express from 'express';
import MailController from '../controllers/MessageController';

const Router = express.Router();

Router.use(express.json());
Router.use(express.urlencoded('x-www-form-urlencoded'));

// Get all received emails for a user
Router.get('/user/messages', MailController.getInbox);

// Get unread mails for a user
Router.get('/user/messages/unread', MailController.getUnreadMail);

// Get all sent emails for a user
Router.get('/user/messages/sent', MailController.getSentMails);

// Get a user email
Router.get('/user/messages/:id', MailController.getAInboxMail);

// Send mail to individuals
Router.post('/user/message', MailController.createMail);

// Delete from inbox
Router.delete('/user/message/:id', MailController.deleteInbox);

// Get a sent email for a user
Router.get('/user/messages/sent/:id', MailController.getASentMail);


export default Router;
