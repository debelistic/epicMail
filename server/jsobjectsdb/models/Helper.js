import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from './User';

const Helper = {
  /**
   * Hash Password Method
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5));
  },

  /**
   * Compare Password
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(hashPassword, password);
  },

  /**
   * Generate Token
   */
  generateToken(id) {
    const token = jwt.sign({
      userId: UserModel.getAUserWithId(id),
    },
    process.env.SECRET, { expiresIn: '7d' });
    return token;
  },
};
export default Helper;
