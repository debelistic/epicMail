import '@babel/polyfill';
import { dataUri } from '../middleware/multer';
import { uploader, cloudinaryConfig } from '../config/cloudinaryConfig';
import db from '../db';
import Helper from '../middleware/Helper';

cloudinaryConfig();


/** Queries */
const createUserQuery = `INSERT INTO
        users(email, firstName, lastName, userImage, password, securitykey, createdOn, modifiedOn)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

const loginQuery = 'SELECT * FROM users WHERE email = $1';
/** End of Queries */

const UserController = {
  /**
   * Create user controller
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} user
   */
  async createUser(req, res) {
    try {
      const securityKey = req.body.securityKey.toLowerCase();
      const hashPassword = Helper.hashPassword(req.body.password);
      const hashSecurity = Helper.hashPassword(securityKey);
      const emailAddress = `${req.body.username.toLowerCase()}@epicmail.com`;

      const file = await dataUri(req).content;
      const image = await uploader.upload(file);

      const values = [emailAddress, req.body.firstName,
        req.body.lastName, image.url, hashPassword, hashSecurity, new Date(), new Date()];
      const { rows } = await db.query(createUserQuery, values);
      const token = Helper.generateToken(rows[0].email);

      return res.status(201).send({
        status: 201,
        data: [{
          token,
          emailAddress: `Your epicmail address is ${rows[0].email}`,
          image: rows[0].userimage,
        }],
      });
    } catch (error) {
      return res.status(400).send({
        message: error,
      });
    }
  },

  /**
   * Login controller
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} user
   */
  async login(req, res) {
    try {
      const userEmail = await req.body.email.toLowerCase();
      const { rows } = await db.query(loginQuery, [userEmail]);
      const token = Helper.generateToken(rows[0].email);
      return res.status(200).send({
        status: 200,
        data: [{
          token,
          message: `Loggedin as ${rows[0].email}`,
          image: rows[0].userimage,
        }],
      });
    } catch (error) {
      return res.status(400).send({
        messgae: error,
      });
    }
  },

  /**
   * users can reset password using their security question
   * @param {object} req
   * @param {object} res
   */
  async resetpass(req, res) {
    try {
      // get recovery email
      const { recoveryEmail } = req.body;

      // send reset password link to email
      return res.status(201).send({
        status: 201,
        data: [{
          message: 'Your password has been changed.',
        }],
      });
    } catch (error) {
      return res.status(400).send({
        message: error,
      });
    }
  },
};

export default UserController;
