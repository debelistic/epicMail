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
      const checkMemberEmailQuery = 'SELECT * FROM groupmembers WHERE $1=groupId AND $2=memberId';
      const { rows } = await db.query(checkMemberEmailQuery, [req.params.id, req.user.email]);
      if (rows[0] === undefined) {
        return res.status(401).send({
          mesage: 'You are not a member',
        });
      }
      if (rows[0].memberid !== req.user.email) {
        return res.status(401).send({
          mesage: 'You are not a member of this group',
        });
      }
      return next();
    } catch (error) {
      return res.status(400).send({
        error,
      });
    }
  },

  async checkAdmin(req, res, next) {
    try {
      const verifyAdminQuery = 'SELECT * FROM groupmembers WHERE memberId = $1 AND groupId = $2 AND role = $3';
      const { rows } = await db.query(verifyAdminQuery, [req.user.email, req.params.id, 'admin']);
      if (rows[0] === undefined) {
        return res.status(403).send({
          message: 'Admins Only.',
        });
      }
      if (rows[0].memberid !== req.user.email) {
        return res.status(403).send({
          message: 'Admins Only.',
        });
      }

      return next();
    } catch (error) {
      return res.status(400).send({
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
