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
Router.post('/groups/:id/users', _Auth2.default.verifyToken, _GroupController2.default.addGroupMembers);

// delete members
Router.delete('/groups/:id/users/:userid', _Auth2.default.verifyToken, _GroupController2.default.deleteAGroupMember);

// send group messages
Router.post('/groups/:id/messages', _Auth2.default.verifyToken, _GroupController2.default.sendGroupMessage);

// get groups
Router.get('/groups', _Auth2.default.verifyToken, _GroupController2.default.getAllGroups);

// patch group name
Router.patch('/groups/:id/:name', _Auth2.default.verifyToken, _GroupController2.default.editGroupName);

// delete group
Router.delete('/groups/:id', _Auth2.default.verifyToken, _GroupController2.default.deleteGroup);

exports.default = Router;
//# sourceMappingURL=groupsRoutes.js.map