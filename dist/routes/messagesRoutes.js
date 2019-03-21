'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _MessageController = require('../controllers/MessageController');

var _MessageController2 = _interopRequireDefault(_MessageController);

var _Auth = require('../middleware/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express2.default.Router();

Router.use(_express2.default.json());

// Get all received emails for a user
Router.get('/messages', _Auth2.default.verifyToken, _MessageController2.default.getInbox);

// Get unread mails for a user
Router.get('/messages/unread', _Auth2.default.verifyToken, _MessageController2.default.getUnread);

// Get all sent emails for a user
Router.get('/messages/sent', _Auth2.default.verifyToken, _MessageController2.default.getSent);

// Get all a sent email for a user
Router.get('/messages/sent/:id', _Auth2.default.verifyToken, _MessageController2.default.getASent);

// Get a user email
Router.get('/messages/:id', _Auth2.default.verifyToken, _MessageController2.default.getAInbox);

// Send mail to individuals
Router.post('/messages', _Auth2.default.verifyToken, _MessageController2.default.create);

// Delete from inbox
Router.delete('/messages/:id', _Auth2.default.verifyToken, _MessageController2.default.deleteAInbox);

// Get a sent email for a user
Router.delete('/messages/sent/:id', _Auth2.default.verifyToken, _MessageController2.default.deleteASent);

exports.default = Router;
//# sourceMappingURL=messagesRoutes.js.map