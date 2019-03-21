import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
  comparePassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
  },

  /**
   * Generate Token
   */
  generateToken(email) {
    console.log(email);
    const token = jwt.sign({
      userEmail: email,
    },
    process.env.SECRET, { expiresIn: '5d' });
    return token;
  },
};
export default Helper;
