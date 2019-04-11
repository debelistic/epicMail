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
    const createGroupQuery = `INSERT INTO
    groups(id, name, description, ownerId)
    VALUES($1, $2, $3, $4) RETURNING *`;
    const values = [
      uuidv4(),
      req.body.name.trim().toLowerCase(),
      req.body.description.trim().toLowerCase(),
      req.user.email.trim(),
    ];

    const addGroupAdminQuery = `INSERT INTO
      groupmembers(groupId, groupName, memberId, role)
      VALUES($1, $2, $3, $4) RETURNING *`;
    try {
      const { rows } = await db.query(createGroupQuery, values);
      const adminvalues = [
        rows[0].id,
        req.body.name.trim().toLowerCase(),
        req.user.email.trim(),
        'admin',
      ];
      console.log(rows);
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
        status: 400,
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
    const addGroupMembersQuery = `INSERT INTO
    groupmembers(groupId, groupName, memberId, role)
    VALUES($1, $2, $3, $4) RETURNING *`;
    const values = [
      req.params.id,
      req.body.name,
      req.body.membermail,
      'member',
    ];
    try {
      const { rows } = await db.query(addGroupMembersQuery, values);
      return res.send({
        status: 201,
        data: [
          {
            status: 201,
            member: rows[0],
          },
        ],
      });
    } catch (err) {
      return res.send({
        status: 400,
        data: [
          {
            err,
          },
        ],
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
    const groupMessageQuery = `INSERT INTO
      groupmessages(id, groupId, senderEmail, subject, message, status)
      VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
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
      return res.status(400).send({
        message: err,
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
    const deleteAGroupMemberQuery = 'DELETE FROM groupmembers WHERE id=$1 AND groupId = $2 RETURNING *';
    try {
      await db.query(deleteAGroupMemberQuery, [req.prams.id, req.params.userid]);

      return res.send({
        status: 204,
        data: [{
          message: `You have removed ${req.params.userid}`,
        }],
      });
    } catch (err) {
      return res.status(400).send({
        status: 400,
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
      return res.send({
        status: 400,
        data: [
          error,
        ],
      });
    }
  },

  async editGroupName(req, res) {
    const editGroupNameQuery = 'UPDATE groups SET name=$1 WHERE id= $2 RETURNING *';
    try {
      const newGroupName = await db.query(editGroupNameQuery, [req.body.newName, req.params.id]);
      return res.status(204).send({
        status: 204,
        data: [{
          newname: newGroupName.rows[0],
        }],
      });
    } catch (error) {
      return res.send({
        status: 400,
        data: [
          error,
        ],
      });
    }
  },

  async deleteGroup(req, res) {
    // admin should delete group
    const deleteGroupQuery = 'DELETE FROM groups WHERE $1=id AND $2=ownerId RETURNING *';
    try {
      const { rows } = await db.query(deleteGroupQuery, [req.params.id, req.user.email]);
      return res.send({
        status: 204,
        data: [{
          message: `${rows} has been deleted`,
        }],
      });
    } catch (error) {
      return res.send({
        status: 400,
        data: [
          error,
        ],
      });
    }
  },
};

export default GroupController;
