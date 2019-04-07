import '@babel/polyfill';
import db from '../db';
import Helper from '../middleware/Helper';

const UserController = {
  /**
   * Create user controller
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} user
   */
  async createUser(req, res, next) {
    try {
      const securityKey = req.body.securityKey.toLowerCase();
      const hashPassword = Helper.hashPassword(req.body.password);
      const hashSecurity = Helper.hashPassword(securityKey);
      const emailAddress = `${req.body.username.toLowerCase()}@epicmail.com`;

      const createUserQuery = `INSERT INTO
        users(email, firstName, lastName, password, securitykey, createdOn, modifiedOn)
        VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
      const values = [
        emailAddress,
        req.body.firstName,
        req.body.lastName,
        hashPassword,
        hashSecurity,
        new Date(),
        new Date(),
      ];

      const { rows } = await db.query(createUserQuery, values);
      const token = Helper.generateToken(rows[0].email);

      return res.status(201).send({
        status: 201,
        data: [{
          token,
          message: 'Your account has been created',
          email_address: `Your epicmail address is ${rows[0].email}`,
        }],
      });
    } catch (error) {
      return next(error);
    }
  },

  /**
   * Login controller
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} user
   */
  async login(req, res, next) {
    try {
      const loginQuery = 'SELECT * FROM users WHERE email = $1';
      const userEmail = await `${req.body.email.toLowerCase()}`;
      const { rows } = await db.query(loginQuery, [userEmail]);
      const token = Helper.generateToken(rows[0].email);
      return res.status(200).send({
        status: 200,
        data: [{
          token,
          message: `Loggedin as ${rows[0].email}`,
        }],
      });
    } catch (error) {
      return next(error);
    }
  },

  /**
   * users can reset password using their security question
   * @param {object} req
   * @param {object} res
   */
};

export default UserController;
