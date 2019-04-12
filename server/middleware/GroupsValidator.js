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
      const checkMemberEmailQuery = 'SELECT * FROM users WHERE $1=groupId AND $2=memberId';
      await db.query(checkMemberEmailQuery, [req.params.id, req.user.email]);
      return next();
    } catch (error) {
      return res.status(403).send({
        message: 'You are probably not registered',
        error,
      });
    }
  },

  async checkAdmin(req, res, next) {
    try {
      const verifyAdminQuery = 'SELECT * FROM groups WHERE ownerId = $1 AND Id = $2';
      await db.query(verifyAdminQuery, [req.user.email, req.params.id]);
      return next();
    } catch (error) {
      return res.send(403).send({
        message: 'Only Admins',
        error,
      });
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
      return res.status(400).send({
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
