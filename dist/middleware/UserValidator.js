"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

var _Helper = _interopRequireDefault(require("./Helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ValidateUserInput = {
  /**
   * Check if request object is empty
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  bodyCheck: function () {
    var _bodyCheck = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res, next) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (req.body) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                message: 'Enter details'
              }));

            case 2:
              return _context.abrupt("return", next());

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function bodyCheck(_x, _x2, _x3) {
      return _bodyCheck.apply(this, arguments);
    }

    return bodyCheck;
  }(),

  /**
   * Validate Name fields
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  names: function () {
    var _names = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res, next) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!req.body.firstName || !req.body.lastName)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                message: 'Enter your first name and last name '
              }));

            case 2:
              return _context2.abrupt("return", next());

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function names(_x4, _x5, _x6) {
      return _names.apply(this, arguments);
    }

    return names;
  }(),

  /**
   * Validate Username
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  username: function () {
    var _username = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res, next) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(!req.body.username || !/^[a-z\d]{8,}$/i.test(req.body.username))) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return", res.status(400).send({
                message: 'Username should be at least 8 characters long'
              }));

            case 2:
              return _context3.abrupt("return", next());

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function username(_x7, _x8, _x9) {
      return _username.apply(this, arguments);
    }

    return username;
  }(),

  /**
   * Validate Password
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  password: function () {
    var _password = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res, next) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(!/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{6,}$/.test(req.body.password) || !req.body.password)) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt("return", res.status(400).send({
                message: 'Password should contain at least a lower and upper case, a digit'
              }));

            case 2:
              return _context4.abrupt("return", next());

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function password(_x10, _x11, _x12) {
      return _password.apply(this, arguments);
    }

    return password;
  }(),

  /**
   * Check for recovery email address
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  resetMail: function () {
    var _resetMail = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(req, res, next) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!(!req.body.recoveryEmail || !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(req.body.recoveryEmail))) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt("return", res.status(400).send({
                message: 'Enter a valid email addresss for recovery.'
              }));

            case 2:
              return _context5.abrupt("return", next());

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function resetMail(_x13, _x14, _x15) {
      return _resetMail.apply(this, arguments);
    }

    return resetMail;
  }(),

  /**
   * Validate Login Field
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  loginField: function () {
    var _loginField = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(req, res, next) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!(!req.body.email || !req.body.password)) {
                _context6.next = 2;
                break;
              }

              return _context6.abrupt("return", res.status(401).send({
                message: 'Enter email and password'
              }));

            case 2:
              return _context6.abrupt("return", next());

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function loginField(_x16, _x17, _x18) {
      return _loginField.apply(this, arguments);
    }

    return loginField;
  }(),

  /**
   * Login email handler
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  loginEmail: function () {
    var _loginEmail = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(req, res, next) {
      var loginQuery, userEmail, _ref, rows;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              loginQuery = 'SELECT * FROM users WHERE email = $1';
              _context7.next = 4;
              return "".concat(req.body.email.toLowerCase());

            case 4:
              userEmail = _context7.sent;
              _context7.next = 7;
              return _db.default.query(loginQuery, [userEmail]);

            case 7:
              _ref = _context7.sent;
              rows = _ref.rows;

              if (!(rows[0] === undefined)) {
                _context7.next = 11;
                break;
              }

              return _context7.abrupt("return", res.status(403).send({
                mesage: 'You are not a registered'
              }));

            case 11:
              if (!(rows[0].email !== userEmail)) {
                _context7.next = 13;
                break;
              }

              return _context7.abrupt("return", res.status(401).send({
                mesage: 'You are not a member of this group'
              }));

            case 13:
              return _context7.abrupt("return", next());

            case 16:
              _context7.prev = 16;
              _context7.t0 = _context7["catch"](0);
              return _context7.abrupt("return", res.status(400).send({
                message: 'Invaild email',
                error: _context7.t0
              }));

            case 19:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 16]]);
    }));

    function loginEmail(_x19, _x20, _x21) {
      return _loginEmail.apply(this, arguments);
    }

    return loginEmail;
  }(),

  /**
   * Login password handler
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  loginPassword: function () {
    var _loginPassword = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(req, res, next) {
      var loginQuery, userEmail, _ref2, rows;

      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              loginQuery = 'SELECT * FROM users WHERE email = $1';
              _context8.next = 3;
              return req.body.email.toLowerCase();

            case 3:
              userEmail = _context8.sent;
              _context8.next = 6;
              return _db.default.query(loginQuery, [userEmail]);

            case 6:
              _ref2 = _context8.sent;
              rows = _ref2.rows;

              if (_Helper.default.comparePassword(req.body.password, rows[0].password)) {
                _context8.next = 10;
                break;
              }

              return _context8.abrupt("return", res.status(401).send({
                message: 'Invalid Passowrd'
              }));

            case 10:
              return _context8.abrupt("return", next());

            case 11:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    function loginPassword(_x22, _x23, _x24) {
      return _loginPassword.apply(this, arguments);
    }

    return loginPassword;
  }(),

  /**
   * Check is User is logged in
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  checkUser: function () {
    var _checkUser = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9(req, res, next) {
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (req.user) {
                _context9.next = 2;
                break;
              }

              return _context9.abrupt("return", res.status(400).send({
                message: 'Login to your account'
              }));

            case 2:
              return _context9.abrupt("return", next());

            case 3:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    function checkUser(_x25, _x26, _x27) {
      return _checkUser.apply(this, arguments);
    }

    return checkUser;
  }(),
  checkRecoveryEmail: function () {
    var _checkRecoveryEmail = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10(req, res, next) {
      var checkQuery, _ref3, rows, message;

      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              checkQuery = 'SELECT * FROM users WHERE recoveryemail = $1';
              _context10.next = 3;
              return _db.default.query(checkQuery, [req.body.recoveryEmail]);

            case 3:
              _ref3 = _context10.sent;
              rows = _ref3.rows;
              message = 'The recovery email you entered is associated to an account';

              if (!rows[0]) {
                _context10.next = 8;
                break;
              }

              return _context10.abrupt("return", res.status(400).send({
                message: message
              }));

            case 8:
              return _context10.abrupt("return", next());

            case 9:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    function checkRecoveryEmail(_x28, _x29, _x30) {
      return _checkRecoveryEmail.apply(this, arguments);
    }

    return checkRecoveryEmail;
  }()
};
var _default = ValidateUserInput;
exports.default = _default;
//# sourceMappingURL=UserValidator.js.map