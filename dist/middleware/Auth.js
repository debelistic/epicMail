"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Auth = {
  checkToken: function () {
    var _checkToken = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res, next) {
      var token;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              token = req.headers['x-access-token'];

              if (token) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(401).send({
                message: 'No Token Provided'
              }));

            case 3:
              return _context.abrupt("return", next());

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function checkToken(_x, _x2, _x3) {
      return _checkToken.apply(this, arguments);
    }

    return checkToken;
  }(),
  verifyToken: function () {
    var _verifyToken = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res, next) {
      var token, decoded, text;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              token = req.headers['x-access-token'];
              _context2.prev = 1;

              /**
               * (Synchronous) If a callback is not supplied,
               * function acts synchronously. Returns the payload
               * decoded if the signature is valid and optional
               * expiration, audience, or issuer are valid. If not, it will throw the error.
               */
              decoded = _jsonwebtoken.default.verify(token, process.env.SECRET);
              text = 'SELECT * FROM users WHERE email = $1';
              _context2.next = 6;
              return _db.default.query(text, [decoded.userEmail]);

            case 6:
              req.user = {
                email: decoded.userEmail
              };
              return _context2.abrupt("return", next());

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", res.status(403).send({
                message: 'Forbidden',
                error: _context2.t0
              }));

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 10]]);
    }));

    function verifyToken(_x4, _x5, _x6) {
      return _verifyToken.apply(this, arguments);
    }

    return verifyToken;
  }()
};
var _default = Auth;
exports.default = _default;
//# sourceMappingURL=Auth.js.map