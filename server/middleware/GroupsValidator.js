import db from '../db';

const ValidateGroupsInput = {
  /**
   * Validate User
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  async user(req, res, next) {
    if (!req.user) {
      return res.status(400).send({
        message: 'Signup to create groups',
      });
    }
    return next();
  },

  /**
   * Validate create group form
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  async groupForm(req, res, next) {
    if (!req.body.name || !req.body.description) {
      return res.status(400).send({
        message: 'If you are a registered user enter group name and description or Signup',
      });
    }
    return next();
  },

  /**
   * Validate add member form
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  async addMember(req, res, next) {
    if (!req.body.name || !req.body.membermail) {
      return res.status(400).send({
        message: 'Enter a group name and member mail',
      });
    }
    return next();
  },

  /**
   * Verify User Email
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  async verifyMail(req, res, next) {
    try {
      const checkMemberEmailQuery = 'SELECT * FROM users WHERE $1=email';
      await db.query(checkMemberEmailQuery, [req.body.membermail]);
      return next();
    } catch (error) {
      return next(error);
    }
  },

  /**
   * Add Creator as Admin on Creating group
   * @param {object} req
   * @param {object} res
   */
  async addAdmin(req, res, next) {
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
      await db.query(addGroupAdminQuery, adminvalues);
      return next();
    } catch (error) {
      return next(error);
    }
  },
};

export default ValidateGroupsInput;
