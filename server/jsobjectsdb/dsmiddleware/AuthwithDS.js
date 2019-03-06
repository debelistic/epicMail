import jwt from 'jsonwebtoken';
import UserModel from '../models/User';

const Auth = {
  verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];

    if (!token) {
      return res.status(403).send({ message: 'No Token Provided' });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    if (UserModel.getAllusers.length === 0) {
      return res.status(403).send({ message: 'Session closed' });
    }

    if (!UserModel.getAUserWithId(decoded.userId.id)) {
      return res.status(403).send({ messae: 'User not registered' });
    }
    return next();
  },
};


export default Auth;
