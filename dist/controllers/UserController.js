"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("@babel/polyfill");

var _db = _interopRequireDefault(require("../db"));

var _Helper = _interopRequireDefault(require("../middleware/Helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var UserController = {
  /**
     * create user
     */
  createUser: function () {
    var _createUser = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res, next) {
      var securityKey, hashPassword, hashSecurity, emailAddress, createUserQuery, values, _ref, rows, token;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              securityKey = req.body.securityKey.toLowerCase();
              hashPassword = _Helper.default.hashPassword(req.body.password);
              hashSecurity = _Helper.default.hashPassword(securityKey);
              emailAddress = "".concat(req.body.username.toLowerCase(), "@epicmail.com");
              createUserQuery = "INSERT INTO\n        users(email, firstName, lastName, password, securitykey, createdOn, modifiedOn)\n        VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *";
              values = [emailAddress, req.body.firstName, req.body.lastName, hashPassword, hashSecurity, new Date(), new Date()];
              console.log({
                email: emailAddress,
                key: securityKey
              });
              _context.next = 10;
              return _db.default.query(createUserQuery, values);

            case 10:
              _ref = _context.sent;
              rows = _ref.rows;
              token = _Helper.default.generateToken(rows[0].email);
              return _context.abrupt("return", res.status(201).send({
                status: 201,
                data: [{
                  token: token,
                  message: 'Your account has been created',
                  email: "Your epicmail address is ".concat(emailAddress)
                }]
              }));

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](0);

              if (!(_context.t0.routine === '_bt_check_unique')) {
                _context.next = 20;
                break;
              }

              return _context.abrupt("return", next('User Already Exists'));

            case 20:
              return _context.abrupt("return", next(_context.t0));

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 16]]);
    }));

    function createUser(_x, _x2, _x3) {
      return _createUser.apply(this, arguments);
    }

    return createUser;
  }(),

  /**
   * user login
   */
  login: function () {
    var _login = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res, next) {
      var loginQuery, userEmail, _ref2, rows, token;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              loginQuery = 'SELECT * FROM users WHERE email = $1';
              _context2.next = 4;
              return req.body.email;

            case 4:
              userEmail = _context2.sent;
              _context2.next = 7;
              return _db.default.query(loginQuery, [userEmail]);

            case 7:
              _ref2 = _context2.sent;
              rows = _ref2.rows;

              if (rows[0]) {
                _context2.next = 11;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                status: 400,
                data: [{
                  message: 'User not registered'
                }]
              }));

            case 11:
              if (_Helper.default.comparePassword(req.body.password, rows[0].password)) {
                _context2.next = 13;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                message: 'Invalid password'
              }));

            case 13:
              token = _Helper.default.generateToken(rows[0].email);
              return _context2.abrupt("return", res.status(200).send({
                status: 200,
                data: [{
                  token: token,
                  message: "Loggedin as ".concat(rows[0].email)
                }]
              }));

            case 17:
              _context2.prev = 17;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", next(_context2.t0));

            case 20:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 17]]);
    }));

    function login(_x4, _x5, _x6) {
      return _login.apply(this, arguments);
    }

    return login;
  }(),

  /**
   * users can reset password using their security question
   * @param {object} req
   * @param {object} res
   */
  resetPassword: function () {
    var _resetPassword = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res, next) {
      var getUserSecurityQuestion, values, _ref3, rows, security, answer, newPassword, updateUserPassword;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              getUserSecurityQuestion = 'SELECT * FROM users WHERE $1 = email';
              values = [req.body.email];
              _context3.next = 5;
              return _db.default.query(getUserSecurityQuestion, values);

            case 5:
              _ref3 = _context3.sent;
              rows = _ref3.rows;

              if (rows) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt("return", res.status(400).send({
                message: 'User not found'
              }));

            case 9:
              security = rows[0].securitykey;
              answer = req.body.securityKey.toLocaleLowerCase();

              if (_Helper.default.comparePassword(answer, security)) {
                _context3.next = 13;
                break;
              }

              return _context3.abrupt("return", res.status(400).send({
                message: 'Your answer is incorrect'
              }));

            case 13:
              newPassword = _Helper.default.hashPassword(req.body.password);
              updateUserPassword = 'UPDATE users SET password=$1 WHERE $2 = email RETURNING *';
              _context3.next = 17;
              return _db.default.query(updateUserPassword, [newPassword, req.body.email]);

            case 17:
              return _context3.abrupt("return", res.status(201).send({
                status: 201,
                data: [{
                  message: 'Your password has been successfully changed'
                }]
              }));

            case 20:
              _context3.prev = 20;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", next(_context3.t0));

            case 23:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 20]]);
    }));

    function resetPassword(_x7, _x8, _x9) {
      return _resetPassword.apply(this, arguments);
    }

    return resetPassword;
  }()
};
var _default = UserController;
exports.default = _default;
//# sourceMappingURL=UserController.js.map