'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint-disable consistent-return */

var ValidateUserInput = {
  signUpField: function signUpField(req, res) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (req.body.firstName) {
                _context.next = 3;
                break;
              }

              return _context.abrupt('return', res.send({
                status: 400,
                data: [{
                  message: 'Enter your first name'
                }]
              }));

            case 3:
              if (req.body.lastName) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return', res.send({
                status: 400,
                data: [{
                  message: 'Enter your last name'
                }]
              }));

            case 5:
              if (/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[$@#&!]).{6,}$/.test(req.body.password)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                status: 400,
                data: [{
                  message: 'Password should contain at least a lower and upper case, a digit and any of $,@,#,&,!'
                }]
              }));

            case 7:
              if (req.body.username) {
                _context.next = 9;
                break;
              }

              return _context.abrupt('return', res.send({
                status: 400,
                data: [{
                  message: 'Enter your username'
                }]
              }));

            case 9:
              if (/^[a-z\d]{8,}$/i.test(req.body.username)) {
                _context.next = 11;
                break;
              }

              return _context.abrupt('return', res.send({
                status: 400,
                data: [{
                  message: 'username should be at least 8 characters long'
                }]
              }));

            case 11:
              if (req.body.password) {
                _context.next = 13;
                break;
              }

              return _context.abrupt('return', res.send({
                status: 400,
                data: [{
                  message: 'Enter password'
                }]
              }));

            case 13:
              if (req.body.securityKey) {
                _context.next = 15;
                break;
              }

              return _context.abrupt('return', res.status(400).send({
                status: 400,
                data: [{
                  message: 'enter security password to reset your password'
                }]
              }));

            case 15:
              _context.next = 20;
              break;

            case 17:
              _context.prev = 17;
              _context.t0 = _context['catch'](0);
              return _context.abrupt('return', res.send({
                status: 400,
                data: [_context.t0]
              }));

            case 20:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 17]]);
    }))();
  },
  loginField: function loginField(req, res) {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;

              if (req.body.email) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt('return', res.send({
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

              return _context2.abrupt('return', res.send({
                status: 400,
                data: [{
                  message: 'Enter your password'
                }]
              }));

            case 5:
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2['catch'](0);
              return _context2.abrupt('return', res.send({
                status: 400,
                data: [_context2.t0]
              }));

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[0, 7]]);
    }))();
  },
  resetPasswordField: function resetPasswordField(req, res) {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;

              if (req.body.email) {
                _context3.next = 3;
                break;
              }

              return _context3.abrupt('return', res.send({
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

              return _context3.abrupt('return', res.send({
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

              return _context3.abrupt('return', res.send({
                status: 400,
                data: [{
                  message: 'Enter your a new password'
                }]
              }));

            case 7:
              _context3.next = 12;
              break;

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3['catch'](0);
              return _context3.abrupt('return', res.send({
                status: 400,
                data: [_context3.t0]
              }));

            case 12:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this3, [[0, 9]]);
    }))();
  }
};

exports.default = ValidateUserInput;
//# sourceMappingURL=UserValidator.js.map