import jwt from 'jsonwebtoken';
import db from '../db';

const Auth = {
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];

    if (!token) {
      return res.status(403).send({ message: 'No Token Provided' });
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decoded.userId]);
      if (!rows[0]) {
        return res.status(403).send({ message: 'Session closed' });
      }
      req.user = { id: decoded.userId };
      next();
    } catch (error) {
      return res.status(400).send({ error });
    }
  },
};

export default Auth;
