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
      const decoded = jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE email = $1';
      const { rows } = await db.query(text, [decoded.userEmail]);
      req.user = { email: decoded.userEmail };
      return next(rows[0]);
    } catch (error) {
      return next(error);
    }
  },
};

export default Auth;
