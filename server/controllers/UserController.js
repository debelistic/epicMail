import '@babel/polyfill';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { dataUri } from '../middleware/multer';
import { uploader, cloudinaryConfig } from '../config/cloudinaryConfig';
import { Transporter, MailOptions } from '../config/nodemailerConfig';
import db from '../db';
import Helper from '../middleware/Helper';

config();
cloudinaryConfig();

/** Queries */
const createUserQuery = `INSERT INTO
        users(email, firstName, lastName, userImage, password, recoveryEmail, createdOn, modifiedOn)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

const loginQuery = 'SELECT * FROM users WHERE email = $1';
const retreiveQuery = 'UPDATE users SET password=$1 WHERE recoveryEmail= $2 RETURNING *';
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
      const recoveryEmail = req.body.recoveryEmail.toLowerCase();
      const hashPassword = Helper.hashPassword(req.body.password);
      const emailAddress = `${req.body.username.toLowerCase()}@epicmail.com`;

      const file = await dataUri(req).content;
      const image = await uploader.upload(file);

      const values = [emailAddress, req.body.firstName,
        req.body.lastName, image.url, hashPassword, recoveryEmail, new Date(), new Date()];
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
      return res.status(500).send({
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
      return res.status(500).send({
        messgae: error,
      });
    }
  },

  /**
   * user enter recovery email to get password reset link
   * @param {object} req
   * @param {object} res
   */
  async forgetpass(req, res) {
    try {
      const { baseUrl } = req;
      const { recoveryEmail } = req.body;
      const { host } = req.headers;
      const uri = host + baseUrl;
      const token = jwt.sign({
        recoveryEmail,
      },
      process.env.SECRET, { expiresIn: '20m' });

      const message = await MailOptions(recoveryEmail, uri, token);
      await Transporter.sendMail(message);
      return res.status(200).send({
        status: 200,
        data: [{
          message: 'Your password reset link has been sent to your mail',
        }],
      });
    } catch (error) {
      return res.status(500).send({
        message: error,
      });
    }
  },

  /**
   * users reset password with  the link received
   * @param {object} req
   * @param {object} res
   */
  async resetpass(req, res) {
    try {
      const { password } = req.body;
      const { token } = req.params;
      const { recoveryEmail } = await jwt.verify(token, process.env.SECRET);
      const hashNewPassword = Helper.hashPassword(password.toLowerCase());

      const { rows } = await db.query(retreiveQuery, [hashNewPassword, recoveryEmail]);
      return res.status(201).send({
        status: 201,
        data: [{
          message: `${rows[0].firstname} You have successfully changed your password`,
        }],
      });
    } catch (error) {
      return res.status(500).send({
        message: error,
      });
    }
  },
};

export default UserController;
