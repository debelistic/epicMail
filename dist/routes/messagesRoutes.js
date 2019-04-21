"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _MessageController = _interopRequireDefault(require("../controllers/MessageController"));

var _Auth = _interopRequireDefault(require("../middleware/Auth"));

var _UserValidator = _interopRequireDefault(require("../middleware/UserValidator"));

var _MessagesValidator = _interopRequireDefault(require("../middleware/MessagesValidator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express.default.Router();
/**
 * Get inbox for a user
 */


Router.get('/messages', _Auth.default.checkToken, _Auth.default.verifyToken, _UserValidator.default.checkUser, _MessageController.default.getInbox);
/**
 * Get unread mails for a user
 */

Router.get('/messages/unread', _Auth.default.checkToken, _Auth.default.verifyToken, _UserValidator.default.checkUser, _MessageController.default.getUnread);
/**
 * Get all sent emails for a user
 */

Router.get('/messages/sent', _Auth.default.checkToken, _Auth.default.verifyToken, _UserValidator.default.checkUser, _MessageController.default.getSent);
/**
 * Get all draft for a user
 */

Router.get('/messages/drafts', _Auth.default.checkToken, _Auth.default.verifyToken, _UserValidator.default.checkUser, _MessageController.default.getDrafts);
/**
 * Get a sent email for a user
 */

Router.get('/messages/sent/:id', _Auth.default.checkToken, _Auth.default.verifyToken, _UserValidator.default.checkUser, _MessageController.default.getASent);
/**
 * Get a user specific inbox mail
 */

Router.get('/messages/:id', _Auth.default.checkToken, _Auth.default.verifyToken, _UserValidator.default.checkUser, _MessageController.default.getAInbox);
/**
 * Get a sent email for a user
 */

Router.get('/messages/drafts/:id', _Auth.default.checkToken, _Auth.default.verifyToken, _UserValidator.default.checkUser, _MessageController.default.getADraft);
/**
 * Send mail to individuals
 */

Router.post('/messages', _Auth.default.checkToken, _Auth.default.verifyToken, _UserValidator.default.checkUser, _MessagesValidator.default.checkReceiver, _MessagesValidator.default.checkFeilds, _MessageController.default.create);
/**
 * Delete a mail from inbox
 */

Router.delete('/messages/:id', _Auth.default.checkToken, _Auth.default.verifyToken, _UserValidator.default.checkUser, _MessageController.default.deleteAInbox);
/**
 * Delete a sent email for a user
 */

Router.delete('/messages/sent/:id', _Auth.default.checkToken, _Auth.default.verifyToken, _UserValidator.default.checkUser, _MessageController.default.deleteASent);
var _default = Router;
exports.default = _default;
//# sourceMappingURL=messagesRoutes.js.map