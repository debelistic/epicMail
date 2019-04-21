"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailOptions = exports.Transporter = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _dotenv = require("dotenv");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _dotenv.config)();

var Transporter = _nodemailer.default.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: 'true',
  port: '465',
  auth: {
    type: 'OAuth2',
    user: 'victorawotidebe@gmail.com',
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN
  }
});
/**
 * Email sent to user to reset password
 * @param {userEmailAddress} String:user email address
 * @param {username}  String:user first name
 * @param {host} String:request host address
 * @param {token} SecureToken:token
 * @returns{email}Email:reset password mail
 */


exports.Transporter = Transporter;

var MailOptions =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(useraddress, host, token) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", {
              from: 'EpicMail <victorawotidebe@gmail.com>',
              to: useraddress,
              subject: 'Epicmail Password Reset',
              text: "Hi, You requested to change your password, if you did not\n          ignore this message. This link expires in 20 minutes\n          Your password link is \n          http://".concat(host, "/auth/resetpass/").concat(token)
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function MailOptions(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.MailOptions = MailOptions;
//# sourceMappingURL=nodemailerConfig.js.map