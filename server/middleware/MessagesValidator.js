import db from '../db';

const ValidateMessageInput = {
  async checkReceiver(req, res, next) {
    if (req.body.receiverEmail) {
      const checkReceiverEmailQuery = 'SELECT * FROM users WHERE $1=email';
      await db.query(checkReceiverEmailQuery, [req.body.receiverEmail]);
      return next();
    }
    return next();
  },
  async checkFeilds(req, res, next) {
    if (!req.body.subject || !req.body.message) {
      return res.status(400).send({
        message: 'Subject and Message should not be empty',
      });
    }
    return next();
  },
};

export default ValidateMessageInput;
