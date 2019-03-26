/* eslint-disable consistent-return */
import db from '../db';

const ValidateMessageInput = {
  async newMessageInput(req, res) {
    try {
      const checkReceiverEmailQuery = 'SELECT * FROM users WHERE $1=email';
      const { rows } = await db.query(checkReceiverEmailQuery, [req.body.receiverEmail]);
      if (!rows[0]) {
        return res.send({
          status: 400,
          data: [{
            message: 'Receiver email does not exist',
          }],
        });
      }
      if (!req.body.subject) {
        return res.send({
          status: 400,
          data: [{
            message: 'No subject is declared',
          }],
        });
      }
      if (!req.body.message) {
        return res.send({
          status: 400,
          data: [{
            message: 'No message content',
          }],
        });
      }
      if (!req.user) {
        return res.send({
          status: 400,
          data: [{
            message: 'Login to your account',
          }],
        });
      }
      if (req.user.email === req.body.receiverId) {
        return res.send({
          status: 400,
          data: [{
            message: 'Your message will be moved to drafts',
          }],
        });
      }
    } catch (error) {
      return res.send({
        status: 400,
        data: [{
          error,
        }],
      });
    }
  },
};

export default ValidateMessageInput;
