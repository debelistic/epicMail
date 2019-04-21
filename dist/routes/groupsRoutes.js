"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _GroupController = _interopRequireDefault(require("../controllers/GroupController"));

var _Auth = _interopRequireDefault(require("../middleware/Auth"));

var _UserValidator = _interopRequireDefault(require("../middleware/UserValidator"));

var _GroupsValidator = _interopRequireDefault(require("../middleware/GroupsValidator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express.default.Router(); // create groups


Router.post('/groups', _Auth.default.checkToken, _Auth.default.verifyToken, _UserValidator.default.checkUser, _GroupsValidator.default.groupForm, _GroupController.default.createGroup); // admin add members

Router.post('/groups/:id/users', _Auth.default.checkToken, _Auth.default.verifyToken, _UserValidator.default.checkUser, _GroupsValidator.default.checkAdmin, _GroupController.default.addGroupMembers); // admin delete members

Router.delete('/groups/:id/users/:userid', _Auth.default.checkToken, _Auth.default.verifyToken, _UserValidator.default.checkUser, _GroupsValidator.default.checkAdmin, _GroupController.default.deleteAGroupMember); // send group messages

Router.post('/groups/:id/messages', _Auth.default.checkToken, _Auth.default.verifyToken, _UserValidator.default.checkUser, _GroupsValidator.default.verifyMail, _GroupsValidator.default.checkMessageInput, _GroupController.default.sendGroupMessage); // get group messages

Router.get('/groups/:id/messages', _Auth.default.checkToken, _Auth.default.verifyToken, _UserValidator.default.checkUser, _GroupsValidator.default.verifyMail, _GroupController.default.getGroupMessages); // get groups

Router.get('/groups', _Auth.default.checkToken, _Auth.default.verifyToken, _UserValidator.default.checkUser, _GroupController.default.getAllGroups); // admin patch group name

Router.patch('/groups/:id/name', _Auth.default.checkToken, _Auth.default.verifyToken, _UserValidator.default.checkUser, _GroupsValidator.default.checkAdmin, _GroupsValidator.default.checkNewName, _GroupController.default.editGroupName); // admin delete group

Router.delete('/groups/:id', _Auth.default.checkToken, _Auth.default.verifyToken, _GroupsValidator.default.checkAdmin, _GroupController.default.deleteGroup);
var _default = Router;
exports.default = _default;
//# sourceMappingURL=groupsRoutes.js.map