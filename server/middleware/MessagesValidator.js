import db from '../db';

const ValidateMessageInput = {
  async checkReceiver(req, res, next) {
    try {
      const checkReceiverEmailQuery = 'SELECT * FROM users WHERE $1=email';
      const { rows } = await db.query(checkReceiverEmailQuery, [req.body.receiverEmail]);
      return next(rows[0]);
    } catch (error) {
      return next(error);
    }
  },
  async checkSubject(req, res, next) {
    if (!req.body.subject || !req.body.message) {
      return next('Subject and Message should not be empty');
    }
    return next();
  },
};

export default ValidateMessageInput;
