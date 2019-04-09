import express from 'express';
import MessageController from '../controllers/MessageController';
import Auth from '../middleware/Auth';
import ValidateUserInput from '../middleware/UserValidator';
import ValidateMessageInput from '../middleware/MessagesValidator';

const Router = express.Router();

/**
 * Get inbox for a user
 */
Router.get(
  '/messages',
  Auth.checkToken,
  Auth.verifyToken,
  ValidateUserInput.checkUser,
  MessageController.getInbox,
);

/**
 * Get unread mails for a user
 */
Router.get(
  '/messages/unread',
  Auth.checkToken,
  Auth.verifyToken,
  ValidateUserInput.checkUser,
  MessageController.getUnread,
);

/**
 * Get all sent emails for a user
 */
Router.get(
  '/messages/sent',
  Auth.checkToken,
  Auth.verifyToken,
  ValidateUserInput.checkUser,
  MessageController.getSent,
);

/**
 * Get all draft for a user
 */
Router.get(
  '/messages/drafts',
  Auth.checkToken,
  Auth.verifyToken,
  ValidateUserInput.checkUser,
  MessageController.getDrafts,
);

/**
 * Get a sent email for a user
 */
Router.get(
  '/messages/sent/:id',
  Auth.checkToken,
  Auth.verifyToken,
  ValidateUserInput.checkUser,
  MessageController.getASent,
);

/**
 * Get a user specific inbox mail
 */
Router.get(
  '/messages/:id',
  Auth.checkToken,
  Auth.verifyToken,
  ValidateUserInput.checkUser,
  MessageController.getAInbox,
);

/**
 * Get a sent email for a user
 */
Router.get(
  '/messages/drafts/:id',
  Auth.checkToken,
  Auth.verifyToken,
  ValidateUserInput.checkUser,
  MessageController.getADraft,
);

/**
 * Send mail to individuals
 */
Router.post(
  '/messages',
  Auth.checkToken,
  Auth.verifyToken,
  ValidateUserInput.checkUser,
  ValidateMessageInput.checkReceiver,
  ValidateMessageInput.checkFeilds,
  MessageController.create,
);

/**
 * Delete a mail from inbox
 */
Router.delete(
  '/messages/:id',
  Auth.checkToken,
  Auth.verifyToken,
  ValidateUserInput.checkUser,
  MessageController.deleteAInbox,
);

/**
 * Delete a sent email for a user
 */
Router.delete(
  '/messages/sent/:id',
  Auth.checkToken,
  Auth.verifyToken,
  ValidateUserInput.checkUser,
  MessageController.deleteASent,
);


export default Router;
