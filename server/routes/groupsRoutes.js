import express from 'express';
import GroupController from '../controllers/GroupController';
import Auth from '../middleware/Auth';
import ValidateUserInput from '../middleware/UserValidator';
import ValidateGroupsInput from '../middleware/GroupsValidator';

const Router = express.Router();

// create groups
Router.post(
  '/groups',
  Auth.checkToken,
  Auth.verifyToken,
  ValidateUserInput.checkUser,
  ValidateGroupsInput.groupForm,
  GroupController.createGroup,
);

// admin add members
Router.post(
  '/groups/:id/users',
  Auth.checkToken,
  Auth.verifyToken,
  ValidateUserInput.checkUser,
  ValidateGroupsInput.checkAdmin,
  GroupController.addGroupMembers,
);

// admin delete members
Router.delete(
  '/groups/:id/users/:userid',
  Auth.checkToken,
  Auth.verifyToken,
  ValidateUserInput.checkUser,
  ValidateGroupsInput.checkAdmin,
  GroupController.deleteAGroupMember,
);

// send group messages
Router.post(
  '/groups/:id/messages',
  Auth.checkToken,
  Auth.verifyToken,
  ValidateUserInput.checkUser,
  ValidateGroupsInput.verifyMail,
  ValidateGroupsInput.checkMessageInput,
  GroupController.sendGroupMessage,
);

// get group messages
Router.get(
  '/groups/:id/messages',
  Auth.checkToken,
  Auth.verifyToken,
  ValidateUserInput.checkUser,
  ValidateGroupsInput.verifyMail,
  GroupController.getGroupMessages,
);

// get groups
Router.get(
  '/groups',
  Auth.checkToken,
  Auth.verifyToken,
  ValidateUserInput.checkUser,
  GroupController.getAllGroups,
);

// admin patch group name
Router.patch(
  '/groups/:id/name',
  Auth.checkToken,
  Auth.verifyToken,
  ValidateUserInput.checkUser,
  ValidateGroupsInput.checkAdmin,
  ValidateGroupsInput.checkNewName,
  GroupController.editGroupName,
);

// admin delete group
Router.delete(
  '/groups/:id',
  Auth.checkToken,
  Auth.verifyToken,
  ValidateGroupsInput.checkAdmin,
  GroupController.deleteGroup,
);

export default Router;
