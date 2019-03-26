'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _Helper = require('../middleware/Helper');

var _Helper2 = _interopRequireDefault(_Helper);

var _UserValidator = require('../middleware/UserValidator');

var _UserValidator2 = _interopRequireDefault(_UserValidator);

var _Sanitize = require('../middleware/Sanitize');

var _Sanitize2 = _interopRequireDefault(_Sanitize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var UserController = {
  /**
     * create user
     */
  createUser: function createUser(req, res) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var securityKey, hashPassword, hashSecurity, emailAddress, createUserQuery, values, _ref, rows, token;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              _UserValidator2.default.signUpField(req, res);
              securityKey = _Sanitize2.default.trimAndLowerCase(req.body.securityKey);
              hashPassword = _Helper2.default.hashPassword(_Sanitize2.default.trimInput(req.body.password));
              hashSecurity = _Helper2.default.hashPassword(securityKey);
              emailAddress = _Sanitize2.default.trimAndLowerCase(req.body.username) + '@epicmail.com';
              createUserQuery = 'INSERT INTO\n        users(email, firstName, lastName, password, securitykey, createdOn, modifiedOn)\n        VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
              values = [emailAddress, req.body.firstName, req.body.lastName, hashPassword, hashSecurity, new Date(), new Date()];

              console.log({
                email: emailAddress,
                key: securityKey
              });
              _context.next = 11;
              return _db2.default.query(createUserQuery, values);

            case 11:
              _ref = _context.sent;
              rows = _ref.rows;
              token = _Helper2.default.generateToken(rows[0].email);
              return _context.abrupt('return', res.status(201).send({
                status: 201,
                data: [{
                  token: token,
                  message: 'Your account has been created',
                  email: 'Your epicmail address is ' + emailAddress
                }]
              }));

            case 17:
              _context.prev = 17;
              _context.t0 = _context['catch'](0);

              if (!(_context.t0.routine === '_bt_check_unique')) {
                _context.next = 21;
                break;
              }

              return _context.abrupt('return', res.send({
                status: 400,
                data: [{
                  message: 'User email exists already'
                }]
              }));

            case 21:
              return _context.abrupt('return', res.status(400).send({
                status: 400,
                message: _context.t0
              }));

            case 22:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 17]]);
    }))();
  },


  /**
   * user login
   */
  login: function login(req, res) {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var loginQuery, _ref2, rows, token;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;

              _UserValidator2.default.loginField(req, res);
              loginQuery = 'SELECT * FROM users WHERE email = $1';
              _context2.next = 5;
              return _db2.default.query(loginQuery, [req.body.email.trim()]);

            case 5:
              _ref2 = _context2.sent;
              rows = _ref2.rows;

              if (rows[0]) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({
                status: 400,
                data: [{
                  message: 'User not registered'
                }]
              }));

            case 9:
              if (_Helper2.default.comparePassword(req.body.password, rows[0].password)) {
                _context2.next = 11;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({ message: 'Invalid password' }));

            case 11:
              token = _Helper2.default.generateToken(rows[0].email);
              return _context2.abrupt('return', res.status(200).send({
                status: 200,
                data: [{
                  token: token,
                  message: 'Loggedin as ' + rows[0].email
                }]
              }));

            case 15:
              _context2.prev = 15;
              _context2.t0 = _context2['catch'](0);
              return _context2.abrupt('return', res.send({
                status: 400,
                error: _context2.t0
              }));

            case 18:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[0, 15]]);
    }))();
  },


  /**
   * users can reset password using their security question
   * @param {object} req
   * @param {object} res
   */
  resetPassword: function resetPassword(req, res) {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var getUserSecurityQuestion, values, _ref3, rows, security, answer, newPassword, updateUserPassword;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;

              _UserValidator2.default.resetPasswordField(req, res);
              getUserSecurityQuestion = 'SELECT * FROM users WHERE $1 = email';
              values = [req.body.email];
              _context3.next = 6;
              return _db2.default.query(getUserSecurityQuestion, values);

            case 6:
              _ref3 = _context3.sent;
              rows = _ref3.rows;

              if (rows) {
                _context3.next = 10;
                break;
              }

              return _context3.abrupt('return', res.status(400).send({ message: 'User not found' }));

            case 10:
              security = rows[0].securitykey;
              answer = req.body.securityKey.toLocaleLowerCase();

              if (_Helper2.default.comparePassword(answer, security)) {
                _context3.next = 14;
                break;
              }

              return _context3.abrupt('return', res.status(400).send({ message: 'Your answer is incorrect' }));

            case 14:
              newPassword = _Helper2.default.hashPassword(req.body.password);
              updateUserPassword = 'UPDATE users SET password=$1 WHERE $2 = email RETURNING *';
              _context3.next = 18;
              return _db2.default.query(updateUserPassword, [newPassword, req.body.email]);

            case 18:
              return _context3.abrupt('return', res.status(201).send({
                status: 201,
                data: [{
                  message: 'Your password has been successfully changed'
                }]
              }));

            case 21:
              _context3.prev = 21;
              _context3.t0 = _context3['catch'](0);
              return _context3.abrupt('return', res.status(400).send({
                status: 400,
                data: [{
                  error: _context3.t0
                }]
              }));

            case 24:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this3, [[0, 21]]);
    }))();
  }
};

exports.default = UserController;
//# sourceMappingURL=UserController.js.map