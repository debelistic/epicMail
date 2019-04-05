/* eslint-disable consistent-return */
import db from '../db';

const ValidateGroupsInput = {
  async addGroup(req, res) {
    try {
      if (!req.body.name) {
        return res.send({
          status: 400,
          message: 'Enter name',
        });
      }
      if (!req.body.description) {
        return res.send({
          status: 400,
          message: 'Enter description',
        });
      }
      if (!req.user.email) {
        return res.send({
          status: 403,
          message: 'Only members can create groups',
        });
      }
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.send({
          status: 400,
          message: 'Group already exist',
        });
      }
      return res.send({
        status: 400,
        error,
      });
    }
  },
  async verifyMembermail(req, res) {
    try {
      const checkMemberEmailQuery = 'SELECT * FROM users WHERE $1=email';
      const { rows } = await db.query(checkMemberEmailQuery, [req.body.membermail]);
      if (!rows[0]) {
        return res.send({
          status: 400,
          data: [{
            message: 'Receiver email does not exist',
          }],
        });
      }
      if (!req.user.email) {
        return res.status(403).send({
          status: 403,
          message: 'only registered users can make groups',
        });
      }
      if (!req.body.name || !req.body.membermail) {
        return res.status(400).send({
          status: 400,
          message: 'enter a group name and member mail',
        });
      }
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({
          status: 400,
          message: 'Member Eixts Already',
        });
      }
      return res.send({
        error,
      });
    }
  },
  async addAdmin(req, res) {
    try {
      const addGroupAdminQuery = `INSERT INTO
      groupmembers(groupId, groupName, memberId, role)
      VALUES($1, $2, $3, $4) RETURNING *`;
      const adminvalues = [
        req.params.id,
        req.body.name,
        req.user.email,
        'admin',
      ];
      const { rows } = await db.query(addGroupAdminQuery, adminvalues);
      return rows[0];
    } catch (error) {
      return res.send({
        error,
      });
    }
  },
};

export default ValidateGroupsInput;
