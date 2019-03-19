"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Helper = {
  /**
   * Hash Password Method
   */
  hashPassword: function hashPassword(password) {
    return _bcrypt.default.hashSync(password, _bcrypt.default.genSaltSync(5));
  },

  /**
   * Compare Password
   */
  comparePassword: function comparePassword(password, hashPassword) {
    return _bcrypt.default.compareSync(password, hashPassword);
  },

  /**
   * Generate Token
   */
  generateToken: function generateToken(id) {
    var token = _jsonwebtoken.default.sign({
      userId: id
    }, process.env.SECRET, {
      expiresIn: '7d'
    });

    return token;
  }
};
var _default = Helper;
exports.default = _default;
//# sourceMappingURL=Helper.js.map