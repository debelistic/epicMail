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
    if (!req.user) {
      return res.status(400).send({ message: 'User not logged in' });
    }
    const createMessageQuery = `INSERT INTO
        messages(subject, message, parentMessageId, status, senderId, receiverId)
        VALUES($1, $2, $3, $4, $5, $6)
        returning *`;
    const values = [
      req.body.subject,
      req.body.message,
      req.body.parentMessageId,
      req.body.status,
      req.user.id,
      req.body.receiverId,
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
    const findInboxQuery = 'SELECT * FROM messages WHERE receiverId = $1';
    try {
      const { rows, rowCount } = await db.query(findInboxQuery, [req.user.id]);
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
    const findAInboxMailQuery = 'SELECT FROM messages WHERE id=$1 AND receiverId = $2';
    try {
      const { rows } = await db.query(findAInboxMailQuery, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'we could not find your mail' });
      }
      return res.status(200).send({ mail: rows[0] });
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  /**
   * get all sent mails
   * @param { object } req
   * @param { object } res
   * @returns { object } sent array
   */
  async getSent(req, res) {
    const findSentQuery = 'SELECT * FROM messages WHERE senderId = $1';
    try {
      const { rows, rowCount } = await db.query(findSentQuery, [req.user.id]);
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
    const findASentMailQuery = 'SELECT * FROM messages WHERE id = $1 AND senderId = $2';
    try {
      const { rows } = await db.query(findASentMailQuery, [req.params.id, req.user.id]);
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
    const deleteAInboxMailQuery = 'DELETE FROM messages WHERE id=$1 AND receiverId = $2';
    try {
      const { rows } = await db.query(deleteAInboxMailQuery, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'we could not find your mail' });
      }
      return res.status(204).send({ message: 'deleted' });
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
    const deleteASentMailQuery = 'DELETE FROM messages WHERE id=$1 AND senderId = $2';
    try {
      const { rows } = await db.query(deleteASentMailQuery, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'we could not find your mail' });
      }
      return res.status(204).send({ message: 'deleted' });
    } catch (err) {
      return res.status(400).send(err);
    }
  },
};

export default MessageController;
