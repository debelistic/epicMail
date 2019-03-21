import express from 'express';
import GroupController from '../controllers/GroupController';
import Auth from '../middleware/Auth';

const Router = express.Router();

// create groups
Router.post('/groups', Auth.verifyToken, GroupController.createGroup);

// add members
Router.post('/addgroupmembers', Auth.verifyToken, GroupController.addGroupMembers);

// delete members
Router.delete('/deletegroupmembers', Auth.verifyToken, GroupController.deleteAGroupMember);
// send group messages
Router.post('/sendgroupmessages', Auth.verifyToken, GroupController.sendGroupMessage);

// see group messages
Router.post('/seegroupmessages', Auth.verifyToken, GroupController.seeGroupMessages);

// see group messages
Router.post('/seegroupmembers', Auth.verifyToken, GroupController.seeGroupMembers);


// delete group messages from my inbox
// dlete group messages by admin

export default Router;
