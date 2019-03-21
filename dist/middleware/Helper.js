'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Helper = {
  /**
   * Hash Password Method
   */
  hashPassword: function hashPassword(password) {
    return _bcrypt2.default.hashSync(password, _bcrypt2.default.genSaltSync(5));
  },


  /**
   * Compare Password
   */
  comparePassword: function comparePassword(password, hashPassword) {
    return _bcrypt2.default.compareSync(password, hashPassword);
  },


  /**
   * Generate Token
   */
  generateToken: function generateToken(email) {
    var token = _jsonwebtoken2.default.sign({
      userEmail: email
    }, process.env.SECRET, { expiresIn: '5d' });
    return token;
  }
};
exports.default = Helper;
//# sourceMappingURL=Helper.js.map