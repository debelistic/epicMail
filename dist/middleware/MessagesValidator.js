"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ValidateMessageInput = {
  checkReceiver: function () {
    var _checkReceiver = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res, next) {
      var checkReceiverEmailQuery;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!req.body.receiverEmail) {
                _context.next = 5;
                break;
              }

              checkReceiverEmailQuery = 'SELECT * FROM users WHERE $1=email';
              _context.next = 4;
              return _db.default.query(checkReceiverEmailQuery, [req.body.receiverEmail]);

            case 4:
              return _context.abrupt("return", next());

            case 5:
              return _context.abrupt("return", next());

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function checkReceiver(_x, _x2, _x3) {
      return _checkReceiver.apply(this, arguments);
    }

    return checkReceiver;
  }(),
  checkFeilds: function () {
    var _checkFeilds = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res, next) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!req.body.subject || !req.body.message)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                message: 'Subject and Message should not be empty'
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

    function checkFeilds(_x4, _x5, _x6) {
      return _checkFeilds.apply(this, arguments);
    }

    return checkFeilds;
  }()
};
var _default = ValidateMessageInput;
exports.default = _default;
//# sourceMappingURL=MessagesValidator.js.map