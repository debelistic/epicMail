import express from 'express';
import MailController from '../controllers/MessageController';
import Auth from '../middleware/Auth';

const Router = express.Router();

Router.use(express.json());

// Get all received emails for a user
Router.get('/messages', Auth.verifyToken, MailController.getInbox);

// Get unread mails for a user
Router.get('/messages/unread', MailController.getUnread);

// Get all sent emails for a user
Router.get('/messages/sent', Auth.verifyToken, MailController.getSent);

// Get all a sent email for a user
Router.get('/messages/sent/:id', Auth.verifyToken, MailController.getASent);

// Get a user email
Router.get('/messages/:id', Auth.verifyToken, MailController.getAInbox);

// Send mail to individuals
Router.post('/messages', Auth.verifyToken, MailController.create);

// Delete from inbox
Router.delete('/message/:id', Auth.verifyToken, MailController.deleteAInbox);

// Get a sent email for a user
Router.delete('/messages/sent/:id', Auth.verifyToken, MailController.deleteASent);


export default Router;
