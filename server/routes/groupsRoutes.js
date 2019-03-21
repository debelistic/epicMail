import express from 'express';
import GroupController from '../controllers/GroupController';
import Auth from '../middleware/Auth';

const Router = express.Router();

// create groups
Router.post('/groups', Auth.verifyToken, GroupController.createGroup);

// add members
Router.post('/addgroupmembers', Auth.verifyToken, GroupController.addGroupMembers);

// delete members
// send group messages
// delete group messages from my inbox
// dlete group messages by admin

export default Router;
