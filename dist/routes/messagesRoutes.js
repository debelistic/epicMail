"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _MessageController = _interopRequireDefault(require("../controllers/MessageController"));

var _Auth = _interopRequireDefault(require("../middleware/Auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express.default.Router();

Router.use(_express.default.json()); // Get all received emails for a user

Router.get('/messages', _Auth.default.verifyToken, _MessageController.default.getInbox); // Get unread mails for a user

Router.get('/messages/unread', _Auth.default.verifyToken, _MessageController.default.getUnread); // Get all sent emails for a user

Router.get('/messages/sent', _Auth.default.verifyToken, _MessageController.default.getSent); // Get all a sent email for a user

Router.get('/messages/sent/:id', _Auth.default.verifyToken, _MessageController.default.getASent); // Get a user email

Router.get('/messages/:id', _Auth.default.verifyToken, _MessageController.default.getAInbox); // Send mail to individuals

Router.post('/messages', _Auth.default.verifyToken, _MessageController.default.create); // Delete from inbox

Router.delete('/messages/:id', _Auth.default.verifyToken, _MessageController.default.deleteAInbox); // Get a sent email for a user

Router.delete('/messages/sent/:id', _Auth.default.verifyToken, _MessageController.default.deleteASent);
var _default = Router;
exports.default = _default;
//# sourceMappingURL=messagesRoutes.js.map