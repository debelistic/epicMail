import db from '../db';

const MessageController = {

  /**
   * create a new message
   * @param { object } req
   * @param { object } res
   * @returns { object } message object
   */
  async create(req, res) {
    if (!req.body.subject || !req.body.message || !req.body.status || !req.body.receiverId) {
      return res.status(400).send({ message: 'You have one or more empty fields' });
    }
    if (req.user.email === req.body.receiverId) {
      return res.status(400).send({ message: 'You should save as sraft instead' });
    }
    if (!req.user) {
      return res.status(400).send({ message: 'User not logged in' });
    }
    const createMessageQuery = `INSERT INTO
        messages(createdOn, receiverEmail, senderEmail, subject, message, parentMessageId, status)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`;
    const values = [
      new Date(),
      req.body.receiverId,
      req.user.email,
      req.body.subject,
      req.body.message,
      req.body.parentMessageId,
      req.body.status,
    ];

    try {
      const { rows } = await db.query(createMessageQuery, values);
      return res.status(201).send(rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  /**
   * get inbox for a user
   * @param { object } req
   * @param { object } res
   * @returns { object } inbox array
   */

  async getInbox(req, res) {
    const findInboxQuery = 'SELECT * FROM messages WHERE receiverEmail = $1';
    try {
      if (!req.user.email) {
        return res.status(403).send({ message: 'Login to your account' });
      }
      const { rows, rowCount } = await db.query(findInboxQuery, [req.user.email]);
      return res.status(200).send({ rows, rowCount });
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  /**
   * get a user inbox message
   * @param { object } req
   * @param { object } res
   * @returns { object } inbox mail object
   */
  async getAInbox(req, res) {
    try {
      const findAInboxMailQuery = 'SELECT * FROM messages WHERE id=$1 AND receiverEmail = $2';
      if (!req.user.email) {
        return res.status(403).send({ message: 'Login to your account' });
      }

      const { rows } = await db.query(findAInboxMailQuery, [req.params.id, req.user.email]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'we could not find your mail' });
      }
      const updateStatusQuery = 'UPDATE messages SET status=$1 WHERE receiverEmail = $2 RETURNING *';
      await db.query(updateStatusQuery, ['read', req.user.email]);
      return res.status(200).send({ rows });
    } catch (err) {
      return res.status(400).send({ err });
    }
  },

  async getUnread(req, res) {
    try {
      const findAllUnreadQuery = 'SELECT * FROM messages WHERE receiverEmail = $1 AND status = $2';
      if (!req.user.email) {
        return res.status(403).send({ message: 'Login to your account' });
      }
      const { rows, rowCount } = await db.query(findAllUnreadQuery, [req.user.email, 'unread']);
      return res.status(200).send({ rows, rowCount });
    } catch (err) {
      return res.status(400).send({ err });
    }
  },

  /**
   * get all sent mails
   * @param { object } req
   * @param { object } res
   * @returns { object } sent array
   */
  async getSent(req, res) {
    try {
      const findSentQuery = 'SELECT * FROM messages WHERE senderEmail = $1';
      if (!req.user.email) {
        return res.status(403).send({ message: 'Login to your account' });
      }
      const { rows, rowCount } = await db.query(findSentQuery, [req.user.email]);
      return res.status(200).send({ rows, rowCount });
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  /**
   * get a user sent mail
   * @param { object } req
   * @param { object } res
   * @returns { object } sent mail object
   */
  async getASent(req, res) {
    try {
      const findASentMailQuery = 'SELECT * FROM messages WHERE id = $1 AND senderEmail = $2';
      const { rows } = await db.query(findASentMailQuery, [req.params.id, req.user.email]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'we could not find your mail' });
      }
      return res.status(200).send({ sent: rows[0] });
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  /**
   * delete a mail from inbox
   * @param { object } req
   * @param { object } res
   * @returns { object } success or error
   */
  async deleteAInbox(req, res) {
    try {
      const deleteAInboxMailQuery = 'DELETE FROM messages WHERE id=$1 AND receiverEmail = $2 RETURNING *';
      const { rows } = await db.query(deleteAInboxMailQuery, [req.params.id, req.user.email]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'we could not find your mail' });
      }
      return res.send({
        status: 204,
        message: 'deleted',
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  /**
   * delete a mail from sent
   * @param { object } req
   * @param { object } res
   * @returns { object } success or error
   */
  async deleteASent(req, res) {
    try {
      const deleteASentMailQuery = 'DELETE FROM messages WHERE id=$1 AND senderEmail = $2 RETURNING *';
      const { rows } = await db.query(deleteASentMailQuery, [req.params.id, req.user.email]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'we could not find your mail' });
      }
      return res.send({
        status: 204,
        message: 'deleted',
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  },
};

export default MessageController;
