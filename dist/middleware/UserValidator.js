"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ValidateUserInput = {
  signUpField: function () {
    var _signUpField = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res, next) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (req.body) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 400,
                data: [{
                  message: 'Enter details'
                }]
              }));

            case 3:
              if (req.body.firstName) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 400,
                data: [{
                  message: 'Enter your first name'
                }]
              }));

            case 5:
              if (req.body.lastName) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 400,
                data: [{
                  message: 'Enter your last name'
                }]
              }));

            case 7:
              if (/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[$@#&!]).{6,}$/.test(req.body.password)) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 400,
                data: [{
                  message: 'Password should contain at least a lower and upper case, a digit and any of $,@,#,&,!'
                }]
              }));

            case 9:
              if (req.body.username) {
                _context.next = 11;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 400,
                data: [{
                  message: 'Enter your username'
                }]
              }));

            case 11:
              if (/^[a-z\d]{8,}$/i.test(req.body.username)) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 400,
                data: [{
                  message: 'username should be at least 8 characters long'
                }]
              }));

            case 13:
              if (req.body.password) {
                _context.next = 15;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 400,
                data: [{
                  message: 'Enter password'
                }]
              }));

            case 15:
              if (req.body.securityKey) {
                _context.next = 17;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 400,
                data: [{
                  message: 'enter security password to reset your password'
                }]
              }));

            case 17:
              return _context.abrupt("return", next());

            case 20:
              _context.prev = 20;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", next(_context.t0));

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 20]]);
    }));

    function signUpField(_x, _x2, _x3) {
      return _signUpField.apply(this, arguments);
    }

    return signUpField;
  }(),
  loginField: function () {
    var _loginField = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res, next) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;

              if (req.body.email) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                status: 400,
                data: [{
                  message: 'Enter your email address'
                }]
              }));

            case 3:
              if (req.body.password) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                status: 400,
                data: [{
                  message: 'Enter your password'
                }]
              }));

            case 5:
              return _context2.abrupt("return", next());

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", next(_context2.t0));

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 8]]);
    }));

    function loginField(_x4, _x5, _x6) {
      return _loginField.apply(this, arguments);
    }

    return loginField;
  }(),
  resetPasswordField: function () {
    var _resetPasswordField = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res, next) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;

              if (req.body.email) {
                _context3.next = 3;
                break;
              }

              return _context3.abrupt("return", res.send({
                status: 400,
                data: [{
                  message: 'Enter your email address'
                }]
              }));

            case 3:
              if (req.body.securityKey) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt("return", res.send({
                status: 400,
                data: [{
                  message: 'Enter your security key'
                }]
              }));

            case 5:
              if (req.body.password) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", res.send({
                status: 400,
                data: [{
                  message: 'Enter your a new password'
                }]
              }));

            case 7:
              return _context3.abrupt("return", next());

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", next(_context3.t0));

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 10]]);
    }));

    function resetPasswordField(_x7, _x8, _x9) {
      return _resetPasswordField.apply(this, arguments);
    }

    return resetPasswordField;
  }()
};
var _default = ValidateUserInput;
exports.default = _default;
//# sourceMappingURL=UserValidator.js.map