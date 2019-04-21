"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("@babel/polyfill");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = require("dotenv");

var _multer = require("../middleware/multer");

var _cloudinaryConfig = require("../config/cloudinaryConfig");

var _nodemailerConfig = require("../config/nodemailerConfig");

var _db = _interopRequireDefault(require("../db"));

var _Helper = _interopRequireDefault(require("../middleware/Helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _dotenv.config)();
(0, _cloudinaryConfig.cloudinaryConfig)();
/** Queries */

var createUserQuery = "INSERT INTO\n        users(email, firstName, lastName, userImage, password, recoveryEmail, createdOn, modifiedOn)\n        VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
var loginQuery = 'SELECT * FROM users WHERE email = $1';
var retreiveQuery = 'UPDATE users SET password=$1 WHERE recoveryEmail= $2 RETURNING *';
/** End of Queries */

var UserController = {
  /**
   * Create user controller
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} user
   */
  createUser: function () {
    var _createUser = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var recoveryEmail, hashPassword, emailAddress, file, image, values, _ref, rows, token;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              recoveryEmail = req.body.recoveryEmail.toLowerCase();
              hashPassword = _Helper.default.hashPassword(req.body.password);
              emailAddress = "".concat(req.body.username.toLowerCase(), "@epicmail.com");
              _context.next = 6;
              return (0, _multer.dataUri)(req).content;

            case 6:
              file = _context.sent;
              _context.next = 9;
              return _cloudinaryConfig.uploader.upload(file);

            case 9:
              image = _context.sent;
              values = [emailAddress, req.body.firstName, req.body.lastName, image.url, hashPassword, recoveryEmail, new Date(), new Date()];
              _context.next = 13;
              return _db.default.query(createUserQuery, values);

            case 13:
              _ref = _context.sent;
              rows = _ref.rows;
              token = _Helper.default.generateToken(rows[0].email);
              return _context.abrupt("return", res.status(201).send({
                status: 201,
                data: [{
                  token: token,
                  emailAddress: "Your epicmail address is ".concat(rows[0].email),
                  image: rows[0].userimage
                }]
              }));

            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", res.status(500).send({
                message: _context.t0
              }));

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 19]]);
    }));

    function createUser(_x, _x2) {
      return _createUser.apply(this, arguments);
    }

    return createUser;
  }(),

  /**
   * Login controller
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} user
   */
  login: function () {
    var _login = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var userEmail, _ref2, rows, token;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return req.body.email.toLowerCase();

            case 3:
              userEmail = _context2.sent;
              _context2.next = 6;
              return _db.default.query(loginQuery, [userEmail]);

            case 6:
              _ref2 = _context2.sent;
              rows = _ref2.rows;
              token = _Helper.default.generateToken(rows[0].email);
              return _context2.abrupt("return", res.status(200).send({
                status: 200,
                data: [{
                  token: token,
                  message: "Loggedin as ".concat(rows[0].email),
                  image: rows[0].userimage
                }]
              }));

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", res.status(500).send({
                messgae: _context2.t0
              }));

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 12]]);
    }));

    function login(_x3, _x4) {
      return _login.apply(this, arguments);
    }

    return login;
  }(),

  /**
   * user enter recovery email to get password reset link
   * @param {object} req
   * @param {object} res
   */
  forgetpass: function () {
    var _forgetpass = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var baseUrl, recoveryEmail, host, uri, token, message;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              baseUrl = req.baseUrl;
              recoveryEmail = req.body.recoveryEmail;
              host = req.headers.host;
              uri = host + baseUrl;
              token = _jsonwebtoken.default.sign({
                recoveryEmail: recoveryEmail
              }, process.env.SECRET, {
                expiresIn: '20m'
              });
              _context3.next = 8;
              return (0, _nodemailerConfig.MailOptions)(recoveryEmail, uri, token);

            case 8:
              message = _context3.sent;
              _context3.next = 11;
              return _nodemailerConfig.Transporter.sendMail(message);

            case 11:
              return _context3.abrupt("return", res.status(200).send({
                status: 200,
                data: [{
                  message: 'Your password reset link has been sent to your mail'
                }]
              }));

            case 14:
              _context3.prev = 14;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", res.status(500).send({
                message: _context3.t0
              }));

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 14]]);
    }));

    function forgetpass(_x5, _x6) {
      return _forgetpass.apply(this, arguments);
    }

    return forgetpass;
  }(),

  /**
   * users can reset password the link received
   * @param {object} req
   * @param {object} res
   */
  resetpass: function () {
    var _resetpass = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var password, token, _ref3, recoveryEmail, hashNewPassword, _ref4, rows;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              password = req.body.password;
              token = req.params.token;
              _context4.next = 5;
              return _jsonwebtoken.default.verify(token, process.env.SECRET);

            case 5:
              _ref3 = _context4.sent;
              recoveryEmail = _ref3.recoveryEmail;
              hashNewPassword = _Helper.default.hashPassword(password.toLowerCase());
              _context4.next = 10;
              return _db.default.query(retreiveQuery, [hashNewPassword, recoveryEmail]);

            case 10:
              _ref4 = _context4.sent;
              rows = _ref4.rows;
              return _context4.abrupt("return", res.status(201).send({
                status: 201,
                data: [{
                  message: "".concat(rows[0].firstname, " You have successfully changed your password")
                }]
              }));

            case 15:
              _context4.prev = 15;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", res.status(500).send({
                message: _context4.t0
              }));

            case 18:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 15]]);
    }));

    function resetpass(_x7, _x8) {
      return _resetpass.apply(this, arguments);
    }

    return resetpass;
  }()
};
var _default = UserController;
exports.default = _default;
//# sourceMappingURL=UserController.js.map