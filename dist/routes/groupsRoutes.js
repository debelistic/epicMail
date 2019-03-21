'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _GroupController = require('../controllers/GroupController');

var _GroupController2 = _interopRequireDefault(_GroupController);

var _Auth = require('../middleware/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express2.default.Router();

// create groups
Router.post('/groups', _Auth2.default.verifyToken, _GroupController2.default.createGroup);

// add members
Router.post('/addgroupmembers', _Auth2.default.verifyToken, _GroupController2.default.addGroupMembers);

// delete members
Router.delete('/deletegroupmembers', _Auth2.default.verifyToken, _GroupController2.default.deleteAGroupMember);
// send group messages
Router.post('/sendgroupmessages', _Auth2.default.verifyToken, _GroupController2.default.sendGroupMessage);

// see group messages
Router.post('/seegroupmessages', _Auth2.default.verifyToken, _GroupController2.default.seeGroupMessages);

// see group messages
Router.post('/seegroupmembers', _Auth2.default.verifyToken, _GroupController2.default.seeGroupMembers);

// delete group messages from my inbox
// dlete group messages by admin

exports.default = Router;
//# sourceMappingURL=groupsRoutes.js.map