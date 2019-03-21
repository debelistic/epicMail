import uuidv4 from 'uuid/v4';
import db from '../db';

const GroupController = {
  /**
   * create user group
   * @param {object} req
   * @param {object} res
   * @returns {object} group
   */
  async createGroup(req, res) {
    if (!req.body.name || !req.body.description || !req.user) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    if (!req.user.email) {
      return res.status(403).send({ message: 'only registered users can make groups' });
    }
    const createGroupQuery = `INSERT INTO
    groups(name, description, ownerId)
    VALUES($1, $2, $3)
    returning *`;
    const values = [
      req.body.name,
      req.body.description,
      req.user.email,
    ];
    try {
      const { rows } = await db.query(createGroupQuery, values);
      return res.status(201).send(rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  /**
   * group owner add users join a group
   * @param {object} req
   * @param {object} res
   * @returns {object} group array
   */
  async addGroupMembers(req, res) {
    if (!req.user.email) {
      return res.status(403).send({ message: 'only registered users can make groups' });
    }
    if (!req.body.groupName || !req.body.groupId || !req.body.membermail) {
      return res.status(400).send({ message: 'enter a group name and new mail' });
    }

    const addGroupMembersQuery = `INSERT INTO
    groupmembers(id, groupId, groupName, memberId)
    VALUES($1, $2, $3, $4) RETURNING *`;
    const values = [
      uuidv4(),
      req.body.groupId,
      req.body.groupName,
      req.body.membermail,
    ];
    try {
      const verifyAdminQuery = 'SELECT * FROM groups WHERE ownerId = $1 AND Id = $2';
      const Result = await db.query(verifyAdminQuery, [req.user.email, req.body.groupId]);
      const Admin = Result.rows[0].ownerid;
      if (!Admin) {
        return res.status(403).send({ message: 'Only Admins can add users' });
      }
      const { rows } = await db.query(addGroupMembersQuery, values);
      return res.status(201).send({
        status: 201,
        newmember: rows[0].memberId,
      });
    } catch (err) {
      if (err.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'Group Eixts Already' });
      }
      return res.status(400).send({ err });
    }
  },


  /**
   * see group messages
   * @param {object} req
   * @param {object} res
   * @returns {object} array of group messages
   */
  async seeGroupMessages(req, res) {
    if (!req.body.groupName || !req.user) {
      return res.status(403).send({ message: 'you are not a member' });
    }
    const findGroupMessagesQuery = 'SELECT * FROM groupmessages WHERE ownerId = $1 AND groupName = $2';
    try {
      // eslint-disable-next-line max-len
      const { rows, rowCount } = await db.query(findGroupMessagesQuery, [req.user.email, req.body.groupName]);
      if (!rows[0]) {
        return res.status(403).send({ message: 'you are not a member' });
      }
      return res.status(200).send({ rows, rowCount });
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  /**
   * returns an array of group members
   * @param {object} req
   * @param {object} res
   * @returns {object} group members array
   */
  async seeGroupMembers(req, res) {
    if (!req.body.groupName || !req.user) {
      return res.status(403).send({ message: 'you are not a member' });
    }
    const seeGroupMembersQuery = 'SELECT * FROM groupmembers WHERE memberId = $1 AND groupName = $2';
    try {
      // eslint-disable-next-line max-len
      const { rows, rowCount } = await db.query(seeGroupMembersQuery, [req.user.email, req.body.groupName]);
      if (!rows[0]) {
        return res.status(403).send({ message: 'you are not a member' });
      }
      return res.status(200).send({ rows, rowCount });
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  /**
   * sends message to a group where sender is member or owner
   * @param {object} req
   * @param {object} res
   * @returns {object} sent message
   */
  async sendGroupMessage(req, res) {
    if (!req.body.message || !req.body.groupName || !req.user) {
      return res.status(400).send({ message: 'enter a text' });
    }
    const groupMessageQuery = `INSERT INTO
      groupmessages(message, groupName, ownerId)
      VALUES($1, $2, $3)
      returning *`;
    const values = [
      req.body.message,
      req.body.groupName,
      req.user.email,
    ];
    try {
      const { rows } = await db.query(groupMessageQuery, values);
      return res.status(201).send(rows[0]);
    } catch (err) {
      if (err.routine === 'ri_ReportViolation') {
        return res.status(400).send({ message: 'Not a group' });
      }
      return res.status(400).send(err);
    }
  },


  /**
   * deletes a group member
   * @param {object} req
   * @param {object} res
   * @returns {object} group members array
   */
  async deleteAGroupMember(req, res) {
    if (!req.body.memberId || !req.body.groupName) {
      return res.status(400).send({ message: 'Some fields are missing' });
    }
    const deleteAGroupMemberQuery = 'DELETE FROM groupmembers WHERE memberId=$1 AND groupName = $2';
    try {
      // eslint-disable-next-line max-len
      const { rows } = await db.query(deleteAGroupMemberQuery, [req.body.memberId, req.body.groupName]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'member does not not exist' });
      }
      return res.send({ message: `You have removed ${req.body.memberId}` });
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  /**
   * deletes a group message
   * @param {object} req
   * @param {object} res
   * @returns {object} group members array
   */
  async deleteAGroupMessage(req, res) {
    if (!req.body.id || !req.body.groupName || !req.user.email) {
      return res.status(400).send({ message: 'Some fields are missing' });
    }
    const deleteAGroupMessagesQuery = 'DELETE FROM groupmessages WHERE id=$1 AND groupName = $2';
    try {
      const verifyAdminQuery = 'SELECT * FROM groups WHERE ownerId = $1 AND Id = $2';
      const Result = await db.query(verifyAdminQuery, [req.user.email, req.params.groupId]);
      const Admin = Result.rows[0].ownerid;
      if (!Admin === req.user.email) {
        return res.status(403).send({ message: 'Only Admins can delete users' });
      }
      // eslint-disable-next-line max-len
      const { rows } = await db.query(deleteAGroupMessagesQuery, [req.body.memberId, req.body.groupName]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'member does not not exist' });
      }
      return res.send({ message: `You have removed ${req.body.memberId}` });
    } catch (err) {
      return res.status(400).send(err);
    }
  },
};

export default GroupController;
