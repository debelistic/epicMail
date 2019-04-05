import ValidateGroupsInput from '../middleware/GroupsValidator';
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
    groups(name, description, ownerId)
    VALUES($1, $2, $3)
    returning *`;
    const values = [
      req.body.name.trim().toLowerCase(),
      req.body.description.trim().toLowerCase(),
      req.user.email.trim(),
    ];
    try {
      const { rows } = await db.query(createGroupQuery, values);
      return res.status(201).send({
        status: 201,
        data: [{
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
      ValidateGroupsInput.verifyMembermail(req, res);
      const verifyAdminQuery = 'SELECT * FROM groups WHERE ownerId = $1 AND Id = $2';
      const Result = await db.query(verifyAdminQuery, [req.user.email, req.params.id]);
      const Admin = Result.rows[0].ownerid;
      if (!Admin) {
        return res.status(403).send({ message: 'Only Admins can add users' });
      }
      const { rows } = await db.query(addGroupMembersQuery, values);
      return res.send({
        status: 201,
        data: [
          {
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
    if (!req.body.message || !req.body.groupName || !req.user) {
      return res.status(400).send({ message: 'enter a text' });
    }
    const groupMessageQuery = `INSERT INTO
      groupmessages(groupName, ownerId, subject, message, status)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      req.body.groupName,
      req.user.email,
      req.body.subject,
      req.body.message,
      'unread',
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
    const deleteAGroupMemberQuery = 'DELETE FROM groupmembers WHERE id=$1 AND groupId = $2 RETURNING *';
    try {
      const { rows } = await db.query(deleteAGroupMemberQuery, [req.prams.id, req.params.userid]);
      if (!rows[0]) {
        return res.status(400).send({
          status: 400,
          data: [{
            message: 'member does not not exist',
          }],
        });
      }
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
      return res.send({
        status: 200,
        data: [
          {
            rows,
            rowCount,
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
      if (!req.body.newName) {
        return res.send({
          status: 400,
          data: [
            {
              message: 'enter new name',
            },
          ],
        });
      }
      const newGroupName = await db.query(editGroupNameQuery, [req.body.newName, req.params.id]);
      return res.send({
        status: 200,
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
      if (!rows[0]) {
        return res.send({
          status: 400,
          data: [
            {
              message: 'Group not found',
            },
          ],
        });
      }
      return res.send({
        status: 204,
        data: [{
          message: 'Group successfuly deleted',
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
