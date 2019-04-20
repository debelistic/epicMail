import uuidv4 from 'uuid/v4';
import db from '../db';

/** Queries */
const createGroupQuery = `INSERT INTO
    groups(id, name, description, ownerId)
    VALUES($1, $2, $3, $4) RETURNING *`;

const addGroupMembersQuery = `INSERT INTO
    groupmembers(groupId, groupName, memberId, role)
    VALUES($1, $2, $3, $4) RETURNING *`;

const addGroupAdminQuery = `INSERT INTO
    groupmembers(groupId, groupName, memberId, role)
    VALUES($1, $2, $3, $4) RETURNING *`;

const groupMessageQuery = `INSERT INTO
    groupmessages(id, groupId, senderEmail, subject, message, status)
    VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;

const getGroupMssgQuery = 'SELECT FROM groupmessages WHERE groupId = $1';
const deleteAGroupMemberQuery = 'DELETE FROM groupmembers WHERE groupId=$1 AND memberId = $2 RETURNING *';
const editGroupNameQuery = 'UPDATE groups SET name=$1 WHERE id= $2 RETURNING *';
const deleteGroupQuery = 'DELETE FROM groups WHERE $1=id AND $2=ownerId RETURNING *';

/** End of Queries */


const GroupController = {
  /**
   * create user group
   * @param {object} req
   * @param {object} res
   * @returns {object} group
   */
  async createGroup(req, res) {
    const values = [
      uuidv4(),
      req.body.name.trim().toLowerCase(),
      req.body.description.trim().toLowerCase(),
      req.user.email.trim(),
    ];

    try {
      const { rows } = await db.query(createGroupQuery, values);
      const adminvalues = [
        rows[0].id,
        req.body.name.trim().toLowerCase(),
        req.user.email.trim(),
        'admin',
      ];
      await db.query(addGroupAdminQuery, adminvalues);
      return res.status(201).send({
        status: 201,
        data: [{
          status: 201,
          newgroup: rows[0],
        }],
      });
    } catch (error) {
      return res.send({
        status: 500,
        error,
      });
    }
  },

  /**
   * group owner add users join a group
   * @param {object} req
   * @param {object} res
   * @returns {object} group array
   */
  async addGroupMembers(req, res) {
    const values = [
      req.params.id,
      req.body.name,
      req.body.membermail,
      'member',
    ];
    try {
      const { rows } = await db.query(addGroupMembersQuery, values);
      return res.status(201).send({
        status: 201,
        data: [{
          status: 201,
          member: rows[0],
        }],
      });
    } catch (error) {
      return res.send({
        status: 500,
        data: [{
          error,
        }],
      });
    }
  },

  /**
   * sends message to a group where sender is member or owner
   * @param {object} req
   * @param {object} res
   * @returns {object} sent message
   */
  async sendGroupMessage(req, res) {
    const values = [
      uuidv4(),
      req.params.id,
      req.user.email,
      req.body.subject,
      req.body.message,
      'unread',
    ];
    try {
      const { rows } = await db.query(groupMessageQuery, values);
      return res.status(201).send({
        status: 201,
        data: [{
          message: rows[0],
        }],
      });
    } catch (err) {
      return res.status(500).send({
        message: err,
      });
    }
  },

  /**
   * returns an array of messages for a group
   * @param {object} req
   * @param {object} res
   */
  async getGroupMessages(req, res) {
    try {
      const { rows } = await db.query(getGroupMssgQuery, [req.params.id]);
      return res.status(200).send({
        status: 200,
        data: [{
          messages: rows,
        }],
      });
    } catch (error) {
      return res.status(500).send({
        error,
      });
    }
  },

  /**
   * deletes a group member
   * @param {object} req
   * @param {object} res
   * @returns {object} group members array
   */
  async deleteAGroupMember(req, res) {
    try {
      await db.query(deleteAGroupMemberQuery, [req.params.id, req.params.userid]);

      return res.status(204).send({
        status: 204,
        data: [{
          message: `You have removed ${req.params.userid}`,
        }],
      });
    } catch (err) {
      return res.status(500).send({
        status: 500,
        err,
      });
    }
  },

  /**
   * get all groups
   * @param {object} req
   * @param {object} res
   * @returns {object} groups
   */
  async getAllGroups(req, res) {
    const getGroupsQuery = 'SELECT * FROM groups';
    try {
      const { rows, rowCount } = await db.query(getGroupsQuery);
      return res.status(200).send({
        status: 200,
        data: [
          {
            message: `There are ${rowCount} groups`,
            groups: rows,
          },
        ],
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        data: [
          error,
        ],
      });
    }
  },

  /**
   * edit group name
   * @param { object } req
   * @param { object } res
   * @returns { object } success or error
   */
  async editGroupName(req, res) {
    try {
      const { rows } = await db.query(editGroupNameQuery, [req.body.newName, req.params.id]);
      return res.status(200).send({
        status: 200,
        data: [{
          newname: rows[0].name,
        }],
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        data: [
          error,
        ],
      });
    }
  },


  /**
   * delete a group
   * @param { object } req
   * @param { object } res
   * @returns { object } success or error
   */
  async deleteGroup(req, res) {
    try {
      const { rows } = await db.query(deleteGroupQuery, [req.params.id, req.user.email]);
      return res.status(204).send({
        status: 204,
        data: [{
          message: `${rows} has been deleted`,
        }],
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        data: [
          error,
        ],
      });
    }
  },
};

export default GroupController;
