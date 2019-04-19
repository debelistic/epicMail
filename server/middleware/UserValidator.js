import db from '../db';
import Helper from './Helper';

const ValidateUserInput = {

  /**
   * Check if request object is empty
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  async bodyCheck(req, res, next) {
    if (!req.body) {
      return res.status(400).send({
        message: 'Enter details',
      });
    }
    return next();
  },


  /**
   * Validate Name fields
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  async names(req, res, next) {
    if (!req.body.firstName || !req.body.lastName) {
      return res.status(400).send({
        message: 'Enter your first name and last name ',
      });
    }
    return next();
  },

  /**
   * Validate Username
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  async username(req, res, next) {
    if (!req.body.username || !/^[a-z\d]{8,}$/i.test(req.body.username)) {
      return res.status(400).send({
        message: 'Username should be at least 8 characters long',
      });
    }
    return next();
  },

  /**
   * Validate Password
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  async password(req, res, next) {
    if (!/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{6,}$/.test(req.body.password) || !req.body.password) {
      return res.status(400).send({
        message: 'Password should contain at least a lower and upper case, a digit',
      });
    }
    return next();
  },

  /**
   * Check for recovery email address
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  async restoreKey(req, res, next) {
    if (!req.body.recoveryEmail) {
      return res.status(400).send({
        message: 'Enter a email addresss to reset your password, should you need to.',
      });
    }
    return next();
  },

  /**
   * Validate Login Field
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  async loginField(req, res, next) {
    if (!req.body.email || !req.body.password) {
      return res.status(401).send({
        message: 'Enter email and password',
      });
    }
    return next();
  },

  /**
   * Login email handler
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  async loginEmail(req, res, next) {
    try {
      const loginQuery = 'SELECT * FROM users WHERE email = $1';
      const userEmail = await `${req.body.email.toLowerCase()}`;
      const { rows } = await db.query(loginQuery, [userEmail]);
      if (rows[0] === undefined) {
        return res.status(403).send({
          mesage: 'You are not a registered',
        });
      }
      if (rows[0].email !== userEmail) {
        return res.status(401).send({
          mesage: 'You are not a member of this group',
        });
      }
      return next();
    } catch (error) {
      return res.status(400).send({
        message: 'Invaild email',
        error,
      });
    }
  },

  /**
   * Login password handler
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  async loginPassword(req, res, next) {
    try {
      const loginQuery = 'SELECT * FROM users WHERE email = $1';
      const userEmail = await req.body.email.toLowerCase();
      const { rows } = await db.query(loginQuery, [userEmail]);
      if (!Helper.comparePassword(req.body.password, rows[0].password)) {
        return res.status(401).send({
          message: 'Invalid Passowrd',
        });
      }
      return next();
    } catch (error) {
      return res.status(400).send({
        error,
      });
    }
  },

  /**
   * Check is User is logged in
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  async checkUser(req, res, next) {
    if (!req.user) {
      return res.status(400).send({
        message: 'Login to your account',
      });
    }
    return next();
  },
};

export default ValidateUserInput;
