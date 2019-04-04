"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _GroupController = _interopRequireDefault(require("../controllers/GroupController"));

var _Auth = _interopRequireDefault(require("../middleware/Auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express.default.Router(); // create groups


Router.post('/groups', _Auth.default.verifyToken, _GroupController.default.createGroup); // add members

Router.post('/groups/:id/users', _Auth.default.verifyToken, _GroupController.default.addGroupMembers); // delete members

Router.delete('/groups/:id/users/:userid', _Auth.default.verifyToken, _GroupController.default.deleteAGroupMember); // send group messages

Router.post('/groups/:id/messages', _Auth.default.verifyToken, _GroupController.default.sendGroupMessage); // get groups

Router.get('/groups', _Auth.default.verifyToken, _GroupController.default.getAllGroups); // patch group name

Router.patch('/groups/:id/:name', _Auth.default.verifyToken, _GroupController.default.editGroupName); // delete group

Router.delete('/groups/:id', _Auth.default.verifyToken, _GroupController.default.deleteGroup);
var _default = Router;
exports.default = _default;
//# sourceMappingURL=groupsRoutes.js.map