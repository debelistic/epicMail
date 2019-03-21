"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Auth = {
  verifyToken: function verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];

    if (!token) {
      return res.status(403).send({
        message: 'No Token Provided'
      });
    }

    var decoded = _jsonwebtoken.default.verify(token, process.env.SECRET);

    if (_User.default.getAllusers().length === 0) {
      return res.status(403).send({
        message: 'Session closed'
      });
    }

    if (!_User.default.getAUserWithId(decoded.userId.id)) {
      return res.status(403).send({
        messae: 'User not registered'
      });
    }

    return next();
  }
};
var _default = Auth;
exports.default = _default;
//# sourceMappingURL=AuthwithDS.js.map