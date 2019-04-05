import express from 'express';
import GroupController from '../controllers/GroupController';
import Auth from '../middleware/Auth';

const Router = express.Router();

// create groups
Router.post('/groups', Auth.verifyToken, GroupController.createGroup);

// add members
Router.post('/groups/:id/users', Auth.verifyToken, GroupController.addGroupMembers);

// delete members
Router.delete('/groups/:id/users/:userid', Auth.verifyToken, GroupController.deleteAGroupMember);

// send group messages
Router.post('/groups/:id/messages', Auth.verifyToken, GroupController.sendGroupMessage);

// get groups
Router.get('/groups', Auth.verifyToken, GroupController.getAllGroups);

// patch group name
Router.patch('/groups/:id/:name', Auth.verifyToken, GroupController.editGroupName);

// delete group
Router.delete('/groups/:id', Auth.verifyToken, GroupController.deleteGroup);

export default Router;
