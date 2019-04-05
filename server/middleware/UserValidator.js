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
      return next('Enter details');
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
      return next('Enter your first name, last name ');
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
      return next('Username should be at least 8 characters long');
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
      return next('Password should contain at least a lower and upper case, a digit');
    }
    return next();
  },

  /**
   * Check for security key
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  async restoreKey(req, res, next) {
    if (!req.body.securityKey) {
      return next('Enter security password to reset your password');
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
      return next('Enter email and password');
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
      const userEmail = await `${req.body.email.toLowerCase()}@epicmail.com`;
      const { rows } = await db.query(loginQuery, [userEmail]);
      return next(rows[0]);
    } catch (error) {
      return next(error);
    }
  },

  /**
   * Login password handler
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  async loginPassword(req, res, next) {
    const loginQuery = 'SELECT * FROM users WHERE email = $1';
    const userEmail = await `${req.body.email.toLowerCase()}@epicmail.com`;
    const { rows } = await db.query(loginQuery, [userEmail]);
    if (!Helper.comparePassword(req.body.password, rows[0].password)) {
      return next('Invalid password');
    }
    return next();
  },

  /**
   * Check is User is logged in
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  async checkUser(req, res, next) {
    if (!req.user) {
      return next('Login to your account');
    }
    return next();
  },
};

export default ValidateUserInput;
