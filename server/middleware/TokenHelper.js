import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const CheckToken = {
  async checkIfExpired(req, res, next) {
    try {
      const { token } = req.params;
      await jwt.verify(token, process.env.SECRET);
      return next();
    } catch (error) {
      return res.status(403).send({
        message: 'Token is expired',
        error,
      });
    }
  },
};

export default CheckToken;
