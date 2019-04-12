import jwt from 'jsonwebtoken';
import db from '../db';

const Auth = {
  async checkToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(403).send({ message: 'No Token Provided' });
    }
    return next();
  },
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    try {
      /**
       * (Synchronous) If a callback is not supplied,
       * function acts synchronously. Returns the payload
       * decoded if the signature is valid and optional
       * expiration, audience, or issuer are valid. If not, it will throw the error.
       */
      const decoded = jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE email = $1';
      await db.query(text, [decoded.userEmail]);
      req.user = { email: decoded.userEmail };
      return next();
    } catch (error) {
      return res.status(403).send({
        message: 'Forbidden',
        error,
      });
    }
  },
};

export default Auth;
