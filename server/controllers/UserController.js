import db from '../db';
import Helper from '../middleware/Helper';

const UserController = {
  /**
     * create user
     */
  async createUser(req, res) {
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
      return res.status(400).send({
        status: 400,
        message: 'Enter your first name, last name and password',
      });
    }
    if (!/^[a-z\d]{5,}$/i.test(req.body.email)) {
      return res.status(400).send({ message: 'Set a valid email address' });
    }
    if (!/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[$@#&!]).{6,}$/.test(req.body.password)) {
      return res.status(400).send({
        status: 400,
        message: 'Password should contain at least a lower and upper case, a digit and special character',
      });
    }

    const hashPassword = Helper.hashPassword(req.body.password);
    const hashSecurity = Helper.hashPassword(req.body.securityQuestion);

    const createUserQuery = `INSERT INTO
      users(email, firstName, lastName, password, userImage, securityQuestion, createdOn, modifiedOn)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)`;
    const values = [
      req.body.email,
      req.body.firstName,
      req.body.lastName,
      hashPassword,
      req.body.userImage,
      hashSecurity,
      new Date(),
      new Date(),
    ];

    try {
      const { rows } = await db.query(createUserQuery, values);
      const token = Helper.generateToken(rows[0].id);

      return res.status(201).send({
        status: 201,
        data: [
          token,
          `New user created, your email is ${rows[0].email}`,
        ],
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User email exists already' });
      }
      return res.status(400).send({ error });
    }
  },

  /**
   * user login
   */
  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'Some values are missing' });
    }
    if (!/^[a-z\d]{5,}$/i.test(req.body.email)) {
      return res.status(400).send({ message: 'Email not valid' });
    }
    const loginQuery = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(loginQuery, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({ message: 'Invalid login details' });
      }
      if (!Helper.comparePassword(req.body.password, rows[0].password)) {
        return res.status(400).send({ message: 'Invalid password' });
      }
      const token = Helper.generateToken(rows[0].id);
      return res.status(200).send({ token });
    } catch (error) {
      return res.status(400).send({ error });
    }
  },

  /**
   * users can reset password using their security question
   * @param {object} req
   * @param {object} res
   */
  async resetPassword(req, res) {
    // get user question
    const getUserSecurityQuestion = 'SELECT FROM users WHERE $1 = id AND $2 = securityQuestion AND $3 =password';
    const values = [
      req.user.id,
      req.body.securityQuestion,
      req.body.password,
    ];
    // validate the response
    // update password
    try {
      const rows = await db.query(getUserSecurityQuestion, values);
      if (!rows) {
        return res.status(400).send({ message: 'User not found' });
      }
      console.log(rows);
      if (!Helper.comparePassword(req.body.securityQuestion, rows[1])) {
        return res.status(400).send({ message: 'Your answer is incorrect' });
      }
      const updateUserPassword = 'UPDATE FROM users WHERE $1 = id AND $3 =password';

      return res.status(201).send({ message: 'Your password has been successfully changed' });
    } catch (error) {
      return res.status(400).send({ error });
    }
  },
};

export default UserController;
