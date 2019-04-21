"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = require("dotenv");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _dotenv.config)();
var CheckToken = {
  checkIfExpired: function () {
    var _checkIfExpired = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res, next) {
      var token;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              token = req.params.token;
              _context.next = 4;
              return _jsonwebtoken.default.verify(token, process.env.SECRET);

            case 4:
              return _context.abrupt("return", next());

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", res.status(403).send({
                message: 'Token is expired',
                error: _context.t0
              }));

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));

    function checkIfExpired(_x, _x2, _x3) {
      return _checkIfExpired.apply(this, arguments);
    }

    return checkIfExpired;
  }()
};
var _default = CheckToken;
exports.default = _default;
//# sourceMappingURL=TokenHelper.js.map