import uuidv4 from 'uuid/v4';
import db from '../db';

/** Queries */
const createMessageQuery = `INSERT INTO
        messages(createdOn, receiverEmail, senderEmail, subject, message, parentMessageId, status)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`;

const findInboxQuery = 'SELECT * FROM messages WHERE receiverEmail = $1';
const findAInboxMailQuery = 'SELECT * FROM messages WHERE id=$1 AND receiverEmail = $2';
const updateStatusQuery = 'UPDATE messages SET status=$1 WHERE receiverEmail = $2 RETURNING *';
const findAllUnreadQuery = 'SELECT * FROM messages WHERE receiverEmail = $1 AND status = $2';
const findSentQuery = 'SELECT * FROM messages WHERE senderEmail = $1';
const findASentMailQuery = 'SELECT * FROM messages WHERE id = $1 AND senderEmail = $2';
const findDraftQuery = 'SELECT * FROM messages WHERE senderEmail = $1 AND status = $2';
const findADraftQuery = 'SELECT * FROM messages WHERE id=$1 AND senderEmail = $2 AND status = $3';
const deleteAInboxMailQuery = 'DELETE FROM messages WHERE id=$1 AND receiverEmail = $2 RETURNING *';
const deleteASentMailQuery = 'DELETE FROM messages WHERE id=$1 AND senderEmail = $2 RETURNING *';


/** End of Queries */

const MessageController = {

  /**
   * create a new message
   * @param { object } req
   * @param { object } res
   * @returns { object } message object
   */
  async create(req, res) {
    const messageStatus = (!req.body.receiverEmail) ? 'draft' : 'unread';
    const values = [
      new Date(),
      req.body.receiverEmail,
      req.user.email,
      req.body.subject.toLowerCase(),
      req.body.message,
      uuidv4(),
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
      return res.status(500).send({
        mesage: error,
      });
    }
  },

  /**
   * get inbox for a user
   * @param { object } req
   * @param { object } res
   * @returns { object } inbox array
   */

  async getInbox(req, res) {
    try {
      const { rows, rowCount } = await db.query(findInboxQuery, [req.user.email]);
      return res.status(200).send({
        status: 200,
        count: `You have ${rowCount} messages.`,
        inbox: rows,
      });
    } catch (error) {
      return res.status(500).send({
        mesage: error,
      });
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
      const { rows } = await db.query(findAInboxMailQuery, [req.params.id, req.user.email]);
      await db.query(updateStatusQuery, ['read', req.user.email]);
      return res.status(200).send({
        status: 200,
        message: rows,
      });
    } catch (error) {
      return res.status(500).send({
        mesage: error,
      });
    }
  },

  async getUnread(req, res) {
    try {
      const { rows, rowCount } = await db.query(findAllUnreadQuery, [req.user.email, 'unread']);
      return res.status(200).send({
        status: 200,
        count: `You have ${rowCount} unread messages.`,
        unread: rows,
      });
    } catch (error) {
      return res.status(500).send({
        mesage: error,
      });
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
      const { rows, rowCount } = await db.query(findSentQuery, [req.user.email]);
      return res.status(200).send({
        status: 200,
        count: `You have sent messages ${rowCount}.`,
        sent: rows,
      });
    } catch (error) {
      return res.status(500).send({
        mesage: error,
      });
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
      const { rows } = await db.query(findASentMailQuery, [req.params.id, req.user.email]);
      return res.status(200).send({
        status: 200,
        message: rows,
      });
    } catch (error) {
      return res.status(500).send({
        mesage: error,
      });
    }
  },

  /**
   * get all draft mails
   * @param { object } req
   * @param { object } res
   * @returns { object } sent array
   */
  async getDrafts(req, res) {
    try {
      const { rows, rowCount } = await db.query(findDraftQuery, [req.user.email, 'draft']);
      return res.status(200).send({
        status: 200,
        count: `You have ${rowCount} drafts.`,
        drafts: rows,
      });
    } catch (error) {
      return res.status(500).send({
        mesage: error,
      });
    }
  },

  /**
   * get a draft
   * @param { object } req
   * @param { object } res
   * @returns { object } success or error
   */
  async getADraft(req, res) {
    try {
      const { rows } = await db.query(findADraftQuery, [req.params.id, req.user.email, 'draft']);
      return res.status(200).send({
        status: 200,
        message: rows,
      });
    } catch (error) {
      return res.status(500).send({
        mesage: error,
      });
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
      const { rows } = await db.query(deleteAInboxMailQuery, [req.params.id, req.user.email]);
      return res.status(204).send({
        status: 204,
        message: 'deleted',
        mail: rows[0],
      });
    } catch (error) {
      return res.status(500).send({
        mesage: error,
      });
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
      const { rows } = await db.query(deleteASentMailQuery, [req.params.id, req.user.email]);
      return res.status(204).send({
        status: 204,
        message: 'deleted',
        mail: rows[0],
      });
    } catch (error) {
      return res.status(500).send({
        mesage: error,
      });
    }
  },
};

export default MessageController;
