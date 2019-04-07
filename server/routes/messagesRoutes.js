import express from 'express';
import MessageController from '../controllers/MessageController';
import Auth from '../middleware/Auth';
import ValidateUserInput from '../middleware/UserValidator';
import ValidateMessageInput from '../middleware/MessagesValidator';

const Router = express.Router();

Router.use(express.json());

// Get all received emails for a user
Router.get(
  '/messages',
  Auth.checkToken,
  Auth.verifyToken,
  ValidateUserInput.checkUser,
  MessageController.getInbox,
);

// Get unread mails for a user
Router.get(
  '/messages/unread',
  ValidateUserInput.checkUser,
  Auth.checkToken,
  Auth.verifyToken,
  MessageController.getUnread,
);

// Get all sent emails for a user
Router.get(
  '/messages/sent',
  ValidateUserInput.checkUser,
  Auth.checkToken,
  Auth.verifyToken,
  MessageController.getSent,
);

// Get all a sent email for a user
Router.get(
  '/messages/sent/:id',
  ValidateUserInput.checkUser,
  Auth.checkToken,
  Auth.verifyToken,
  MessageController.getASent,
);

// Get a user email
Router.get(
  '/messages/:id',
  Auth.checkToken,
  Auth.verifyToken,
  MessageController.getAInbox,
);

// Send mail to individuals
Router.post(
  '/messages',
  Auth.checkToken,
  Auth.verifyToken,
  ValidateUserInput.checkUser,
  ValidateMessageInput.checkReceiver,
  ValidateMessageInput.checkFeilds,
  MessageController.create,
);

// Delete from inbox
Router.delete(
  '/messages/:id',
  ValidateUserInput.checkUser,
  Auth.checkToken,
  Auth.verifyToken,
  MessageController.deleteAInbox,
);

// Get a sent email for a user
Router.delete(
  '/messages/sent/:id',
  ValidateUserInput.checkUser,
  Auth.checkToken,
  Auth.verifyToken,
  MessageController.deleteASent,
);


export default Router;
