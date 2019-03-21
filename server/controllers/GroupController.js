import db from '../db';
import randomId from '../middleware/randomid';

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
      randomId(),
      req.body.groupId,
      req.body.groupName,
      req.body.membermail,
    ];
    try {
      const verifyAdminQuery = 'SELECT * FROM groups WHERE ownerId = $1 AND Id = $2';
      const Result = await db.query(verifyAdminQuery, [req.user.email, req.body.groupId]);
      const Admin = Result.rows[0].ownerid;
      if (!Admin === req.user.email) {
        return res.status(403).send({ message: 'Only Admins can add users' });
      }
      const { rows } = await db.query(addGroupMembersQuery, values);
      return res.status(201).send(rows[0]);
    } catch (err) {
      return res.status(400).send(err);
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
    const findGroupMessagesQuery = 'SELECT * FROM groupmessages WHERE memberId = $1 AND groupName = $2';
    try {
      // eslint-disable-next-line max-len
      const { rows, rowCount } = await db.query(findGroupMessagesQuery, [req.user.id, req.body.groupName]);
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
    const seeGroupMembersQuery = 'SELECT * FROM groupmember WHERE memberId = $1 AND groupName = $2';
    try {
      // eslint-disable-next-line max-len
      const { rows, rowCount } = await db.query(seeGroupMembersQuery, [req.user.id, req.body.groupName]);
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
      req.user.id,
    ];
    try {
      const { rows } = await db.query(groupMessageQuery, values);
      return res.status(201).send(rows[0]);
    } catch (err) {
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
    const deleteAGroupMemberQuery = 'DELETE FROM groupmembers WHERE memberId=$1 AND ownerId = $2';
    try {
      const { rows } = await db.query(deleteAGroupMemberQuery, [req.body.memberId, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'memberdoes not not exist' });
      }
      return res.status(204).send({ message: 'deleted' });
    } catch (err) {
      return res.status(400).send(err);
    }
  },
};

export default GroupController;
