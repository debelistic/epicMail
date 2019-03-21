"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _MessageController = _interopRequireDefault(require("../controllers/MessageController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express.default.Router();

Router.use(_express.default.json());
Router.use(_express.default.urlencoded('x-www-form-urlencoded')); // Get all received emails for a user

Router.get('/user/messages', _MessageController.default.getInbox); // Get unread mails for a user

Router.get('/user/messages/unread', _MessageController.default.getUnreadMail); // Get all sent emails for a user

Router.get('/user/messages/sent', _MessageController.default.getSentMails); // Get a user email

Router.get('/user/messages/:id', _MessageController.default.getAInboxMail); // Send mail to individuals

Router.post('/user/message', _MessageController.default.createMail); // Delete from inbox

Router.delete('/user/message/:id', _MessageController.default.deleteInbox); // Get a sent email for a user

Router.get('/user/messages/sent/:id', _MessageController.default.getASentMail);
var _default = Router;
exports.default = _default;
//# sourceMappingURL=messagesRoutes.js.map