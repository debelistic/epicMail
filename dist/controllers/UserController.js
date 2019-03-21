'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _Helper = require('../middleware/Helper');

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var UserController = {
  /**
     * create user
     */
  createUser: function createUser(req, res) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var hashPassword, hashSecurity, createUserQuery, values, _ref, rows, token;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (!(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password)) {
                _context.next = 3;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                status: 400,
                message: 'Enter your first name, last name and password'
              }));

            case 3:
              if (req.body.securityQuestion) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                status: 400,
                message: 'Enter your enter a security to question to keep your account safe'
              }));

            case 5:
              if (/^[a-z\d]{5,}$/i.test(req.body.email)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt('return', res.status(400).send({ message: 'Set a valid email address' }));

            case 7:
              if (/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[$@#&!]).{6,}$/.test(req.body.password)) {
                _context.next = 9;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                status: 400,
                message: 'Password should contain at least a lower and upper case, a digit and special character'
              }));

            case 9:
              hashPassword = _Helper2.default.hashPassword(req.body.password);
              hashSecurity = _Helper2.default.hashPassword(req.body.securityQuestion);
              createUserQuery = 'INSERT INTO\n        users(email, firstName, lastName, password, userImage, securityQuestion, createdOn, modifiedOn)\n        VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
              values = [req.body.email, req.body.firstName, req.body.lastName, hashPassword, req.body.userImage, hashSecurity, new Date(), new Date()];
              _context.next = 15;
              return _db2.default.query(createUserQuery, values);

            case 15:
              _ref = _context.sent;
              rows = _ref.rows;
              token = _Helper2.default.generateToken(rows[0].email);
              return _context.abrupt('return', res.status(201).send({
                status: 201,
                data: [token, 'New user created, your email is ' + rows[0].email + '@epicmail']
              }));

            case 21:
              _context.prev = 21;
              _context.t0 = _context['catch'](0);

              if (!(_context.t0.routine === '_bt_check_unique')) {
                _context.next = 25;
                break;
              }

              return _context.abrupt('return', res.status(400).send({ message: 'User email exists already' }));

            case 25:
              return _context.abrupt('return', res.status(400).send(_context.t0));

            case 26:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 21]]);
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

              if (!(!req.body.email || !req.body.password)) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({ message: 'Some values are missing' }));

            case 3:
              if (/^[a-z\d]{5,}$/i.test(req.body.email)) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({ message: 'Email not valid' }));

            case 5:
              loginQuery = 'SELECT * FROM users WHERE email = $1';
              _context2.next = 8;
              return _db2.default.query(loginQuery, [req.body.email]);

            case 8:
              _ref2 = _context2.sent;
              rows = _ref2.rows;

              if (rows[0]) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({ message: 'Invalid login details' }));

            case 12:
              if (_Helper2.default.comparePassword(req.body.password, rows[0].password)) {
                _context2.next = 14;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({ message: 'Invalid password' }));

            case 14:
              token = _Helper2.default.generateToken(rows[0].email);
              return _context2.abrupt('return', res.status(200).send({ token: token }));

            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2['catch'](0);
              return _context2.abrupt('return', res.status(400).send({ error: _context2.t0 }));

            case 21:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[0, 18]]);
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

              if (!(!req.body.securityQuestion || !req.body.password || !req.body.email)) {
                _context3.next = 3;
                break;
              }

              return _context3.abrupt('return', res.status(400).send({ message: 'A field or more is empty' }));

            case 3:
              getUserSecurityQuestion = 'SELECT * FROM users WHERE $1 = email';
              values = [req.body.email];
              _context3.next = 7;
              return _db2.default.query(getUserSecurityQuestion, values);

            case 7:
              _ref3 = _context3.sent;
              rows = _ref3.rows;

              if (rows) {
                _context3.next = 11;
                break;
              }

              return _context3.abrupt('return', res.status(400).send({ message: 'User not found' }));

            case 11:
              security = rows[0].securityquestion;
              answer = req.body.securityQuestion;

              if (_Helper2.default.comparePassword(answer, security)) {
                _context3.next = 15;
                break;
              }

              return _context3.abrupt('return', res.status(400).send({ message: 'Your answer is incorrect' }));

            case 15:
              newPassword = _Helper2.default.hashPassword(req.body.password);
              updateUserPassword = 'UPDATE users SET password=$1 WHERE $2 = email RETURNING *';
              _context3.next = 19;
              return _db2.default.query(updateUserPassword, [newPassword, req.body.email]);

            case 19:
              return _context3.abrupt('return', res.status(201).send({ message: 'Your password has been successfully changed' }));

            case 22:
              _context3.prev = 22;
              _context3.t0 = _context3['catch'](0);
              return _context3.abrupt('return', res.status(400).send({ error: _context3.t0 }));

            case 25:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this3, [[0, 22]]);
    }))();
  }
};

exports.default = UserController;
//# sourceMappingURL=UserController.js.map