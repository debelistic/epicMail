import '@babel/polyfill';
import db from '../db';
import Helper from '../middleware/Helper';

const UserController = {
  /**
     * create user
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
          email_address: `Your epicmail address is ${emailAddress}`,
        }],
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({
          message: 'User alredy exist',
        });
      }
      return next(error);
    }
  },

  /**
   * user login
   */
  async login(req, res, next) {
    try {
      const loginQuery = 'SELECT * FROM users WHERE email = $1';
      const userEmail = await `${req.body.email.toLowerCase()}@epicmail.com`;
      const { rows } = await db.query(loginQuery, [userEmail]);
      if (!rows[0]) {
        return res.status(400).send({
          message: 'User not registerd',
        });
      }
      if (!Helper.comparePassword(req.body.password, rows[0].password)) {
        return res.status(400).send({ message: 'Invalid password' });
      }
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
  async resetPassword(req, res, next) {
    try {
      const getUserSecurityQuestion = 'SELECT * FROM users WHERE $1 = email';
      const values = [
        req.body.email,
      ];
      const { rows } = await db.query(getUserSecurityQuestion, values);
      if (!rows) {
        return res.status(400).send({ message: 'User not found' });
      }

      const security = rows[0].securitykey;
      const answer = req.body.securityKey.toLocaleLowerCase();
      if (!Helper.comparePassword(answer, security)) {
        return res.status(400).send({ message: 'Your answer is incorrect' });
      }

      const newPassword = Helper.hashPassword(req.body.password);
      const updateUserPassword = 'UPDATE users SET password=$1 WHERE $2 = email RETURNING *';
      await db.query(updateUserPassword, [newPassword, req.body.email]);
      return res.status(201).send({
        status: 201,
        data: [{
          message: 'Your password has been successfully changed',
        }],
      });
    } catch (error) {
      return next(error);
    }
  },
};

export default UserController;
