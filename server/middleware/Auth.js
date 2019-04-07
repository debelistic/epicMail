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
      const { rows } = await db.query(text, [decoded.userEmail]);
      req.user = { email: decoded.userEmail };
      console.log(req.user);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  },
};

export default Auth;
