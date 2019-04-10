import db from '../db';

const ValidateGroupsInput = {
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

  async checkAdmin(req, res, next) {
    try {
      const verifyAdminQuery = 'SELECT * FROM groups WHERE ownerId = $1 AND Id = $2';
      await db.query(verifyAdminQuery, [req.user.email, req.params.id]);
      return next();
    } catch (error) {
      return next(error);
    }
  },

  async checkMessageInput(req, res, next) {
    if (!req.body.message || !req.user) {
      return res.status(400).send({ message: 'enter a text' });
    }
    return next();
  },

  async checkNewName(req, res, next) {
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
    return next();
  },
};

export default ValidateGroupsInput;
