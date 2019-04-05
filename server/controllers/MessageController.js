import db from '../db';

const MessageController = {

  /**
   * create a new message
   * @param { object } req
   * @param { object } res
   * @returns { object } message object
   */
  async create(req, res, next) {
    const messageStatus = (!req.body.receiverEmail) ? 'drafts' : 'unread';

    const createMessageQuery = `INSERT INTO
        messages(createdOn, receiverEmail, senderEmail, subject, message, parentMessageId, status)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`;
    const values = [
      new Date(),
      req.body.receiverEmail,
      req.user.email,
      req.body.subject.trim(),
      req.body.message,
      req.body.parentMessageId,
      messageStatus,
    ];

    try {
      const { rows } = await db.query(createMessageQuery, values);
      return res.status(201).send({
        status: 201,
        data: [{
          message: 'Your message has been sent',
          newsent: rows[0],
        }],
      });
    } catch (error) {
      return next(error);
    }
  },

  /**
   * get inbox for a user
   * @param { object } req
   * @param { object } res
   * @returns { object } inbox array
   */

  async getInbox(req, res, next) {
    const findInboxQuery = 'SELECT * FROM messages WHERE receiverEmail = $1';
    try {
      const { rows, rowCount } = await db.query(findInboxQuery, [req.user.email]);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return next(error);
    }
  },

  /**
   * get a user inbox message
   * @param { object } req
   * @param { object } res
   * @returns { object } inbox mail object
   */
  async getAInbox(req, res, next) {
    try {
      const findAInboxMailQuery = 'SELECT * FROM messages WHERE id=$1 AND receiverEmail = $2';
      const { rows } = await db.query(findAInboxMailQuery, [req.params.id, req.user.email]);
      const updateStatusQuery = 'UPDATE messages SET status=$1 WHERE receiverEmail = $2 RETURNING *';
      await db.query(updateStatusQuery, ['read', req.user.email]);
      return res.status(200).send({ rows });
    } catch (error) {
      return next(error);
    }
  },

  async getUnread(req, res, next) {
    try {
      const findAllUnreadQuery = 'SELECT * FROM messages WHERE receiverEmail = $1 AND status = $2';
      const { rows, rowCount } = await db.query(findAllUnreadQuery, [req.user.email, 'unread']);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return next(error);
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
  async getASent(req, res, next) {
    try {
      const findASentMailQuery = 'SELECT * FROM messages WHERE id = $1 AND senderEmail = $2';
      const { rows } = await db.query(findASentMailQuery, [req.params.id, req.user.email]);
      return res.status(200).send({ sent: rows[0] });
    } catch (error) {
      return next(error);
    }
  },

  /**
   * delete a mail from inbox
   * @param { object } req
   * @param { object } res
   * @returns { object } success or error
   */
  async deleteAInbox(req, res, next) {
    try {
      const deleteAInboxMailQuery = 'DELETE FROM messages WHERE id=$1 AND receiverEmail = $2 RETURNING *';
      const { rows } = await db.query(deleteAInboxMailQuery, [req.params.id, req.user.email]);
      return res.send({
        status: 204,
        message: 'deleted',
        mail: rows[0],
      });
    } catch (error) {
      return next(error);
    }
  },

  /**
   * delete a mail from sent
   * @param { object } req
   * @param { object } res
   * @returns { object } success or error
   */
  async deleteASent(req, res, next) {
    try {
      const deleteASentMailQuery = 'DELETE FROM messages WHERE id=$1 AND senderEmail = $2 RETURNING *';
      const { rows } = await db.query(deleteASentMailQuery, [req.params.id, req.user.email]);
      return res.send({
        status: 204,
        message: 'deleted',
        mail: rows[0],
      });
    } catch (error) {
      return next(error);
    }
  },
};

export default MessageController;
