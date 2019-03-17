import db from '../db';

const GroupController = {
  /**
   * create user group
   * @param {object} req 
   * @param {object} res 
   * @returns {object} group
   */
  async createGroup(req, res) {
    if (!req.body.name || !req.body.description || req.user) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const createGroupQuery = `INSER INTO
    groups(name, description, ownerId)
    VALUES($1, $2, $3)
    returning *`;
    const values = [
      req.body.name,
      req.body.description,
      req.user.id,
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
  async joinGroup(req, res) {
    if (!req.body.groupName || !req.user) {
      return res.status(400).send({ message: 'enter a group name' });
    }
    const joinGroupQuery = `INSER INTO
    groupmembers(groupName, memberId)
    VALUES($1, $2)
    returning *`;
    const values = [
      req.body.groupName,
      req.user.id,
    ];
    try {
      const { rows } = await db.query(joinGroupQuery, values);
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
    const groupMessageQuery = `INSER INTO
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

  // delete group members
};

export default GroupController;
