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
  verifyToken: function () {
    var _verifyToken = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res, next) {
      var token, decoded, text, _ref, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              token = req.headers['x-access-token'];

              if (token) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(403).send({
                message: 'No Token Provided'
              }));

            case 3:
              _context.prev = 3;
              decoded = _jsonwebtoken.default.verify(token, process.env.SECRET);
              text = 'SELECT * FROM users WHERE email = $1';
              _context.next = 8;
              return _db.default.query(text, [decoded.userEmail]);

            case 8:
              _ref = _context.sent;
              rows = _ref.rows;

              if (rows[0]) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return", res.status(403).send({
                message: 'Session closed'
              }));

            case 12:
              req.user = {
                email: decoded.userEmail
              };
              return _context.abrupt("return", next());

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](3);
              return _context.abrupt("return", res.status(400).send({
                error: _context.t0
              }));

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 16]]);
    }));

    function verifyToken(_x, _x2, _x3) {
      return _verifyToken.apply(this, arguments);
    }

    return verifyToken;
  }()
};
var _default = Auth;
exports.default = _default;
//# sourceMappingURL=Auth.js.map