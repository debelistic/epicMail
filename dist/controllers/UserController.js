"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
    regeneratorRuntime.mark(function _callee(req, res) {
      var hashPassword, createUserQuery, values, _ref, rows, token;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 400,
                message: 'Enter your first name, last name and password'
              }));

            case 2:
              if (/^[a-z\d]{5,}$/i.test(req.body.email)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                message: 'Set a valid email address'
              }));

            case 4:
              if (/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[$@#&!]).{6,}$/.test(req.body.password)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 400,
                message: 'Password should contain at least a lower and upper case, a digit and special character'
              }));

            case 6:
              hashPassword = _Helper.default.hashPassword(req.body.password);
              createUserQuery = "INSERT INTO\n      users(email, firstName, lastName, passowrd)\n      VALUES($1, $2, $3, $4)";
              values = [req.body.email, req.body.firstName, req.body.lastName, hashPassword];
              _context.prev = 9;
              _context.next = 12;
              return _db.default.query(createUserQuery, values);

            case 12:
              _ref = _context.sent;
              rows = _ref.rows;
              token = _Helper.default.generateToken(rows[0].id);
              return _context.abrupt("return", res.status(201).send({
                token: token
              }));

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](9);

              if (!(_context.t0.routine === '_bt_check_unique')) {
                _context.next = 22;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                message: 'User email exists already'
              }));

            case 22:
              return _context.abrupt("return", res.status(400).send({
                error: _context.t0
              }));

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[9, 18]]);
    }));

    function createUser(_x, _x2) {
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
    regeneratorRuntime.mark(function _callee2(req, res) {
      var loginQuery, _ref2, rows, token;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!req.body.email || !req.body.password)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                message: 'Some values are missing'
              }));

            case 2:
              if (/^[a-z\d]{5,}$/i.test(req.body.email)) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                message: 'Email not valid'
              }));

            case 4:
              loginQuery = 'SELECT * FROM users WHERE email = $1';
              _context2.prev = 5;
              _context2.next = 8;
              return _db.default.query(loginQuery, [req.body.email]);

            case 8:
              _ref2 = _context2.sent;
              rows = _ref2.rows;

              if (rows[0]) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                message: 'Invalid login details'
              }));

            case 12:
              if (_Helper.default.comparePassword(rows[0].password, req.body.password)) {
                _context2.next = 14;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                message: 'Invalid password'
              }));

            case 14:
              token = _Helper.default.generateToken(rows[0].id);
              return _context2.abrupt("return", res.status(200).send({
                token: token
              }));

            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2["catch"](5);
              return _context2.abrupt("return", res.status(400).send({
                error: _context2.t0
              }));

            case 21:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[5, 18]]);
    }));

    function login(_x3, _x4) {
      return _login.apply(this, arguments);
    }

    return login;
  }()
};
var _default = UserController;
exports.default = _default;
//# sourceMappingURL=UserController.js.map