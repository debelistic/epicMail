import db from '../db';

const ValidateGroupsInput = {
  /**
   * Validate User
   * @param {object} req
   * @param {object} _res
   * @param {object} next
   */
  async user(req, _res, next) {
    if (!req.user) {
      return next('Signup to create groups');
    }
    return next();
  },

  /**
   * Validate create group form
   * @param {object} req
   * @param {object} _res
   * @param {object} next
   */
  async groupForm(req, _res, next) {
    if (!req.body.name || !req.body.description) {
      return next('If you are a registered user enter group name and description or Signup');
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
      return next('Enter a group name and member mail');
    }
    return next();
  },

  /**
   * Verify User Email
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  async verifyMail(req, _res, next) {
    try {
      const checkMemberEmailQuery = 'SELECT * FROM users WHERE $1=email';
      const { rows } = await db.query(checkMemberEmailQuery, [req.body.membermail]);
      return next(rows[0]);
    } catch (error) {
      return next(error);
    }
  },

  /**
   * Add Creator as Admin on Creating group
   * @param {object} req
   * @param {object} res
   */
  async addAdmin(req, _res, next) {
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
      return next(rows[0]);
    } catch (error) {
      return next(error);
    }
  },
};

export default ValidateGroupsInput;
