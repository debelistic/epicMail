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
  newMessageInput: function () {
    var _newMessageInput = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var checkReceiverEmailQuery, _ref, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              checkReceiverEmailQuery = 'SELECT * FROM users WHERE $1=email';
              _context.next = 4;
              return _db.default.query(checkReceiverEmailQuery, [req.body.receiverEmail]);

            case 4:
              _ref = _context.sent;
              rows = _ref.rows;

              if (rows[0]) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", res.send({
                status: 400,
                data: [{
                  message: 'Receiver email does not exist'
                }]
              }));

            case 8:
              if (req.body.subject) {
                _context.next = 10;
                break;
              }

              return _context.abrupt("return", res.send({
                status: 400,
                data: [{
                  message: 'No subject is declared'
                }]
              }));

            case 10:
              if (req.body.message) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return", res.send({
                status: 400,
                data: [{
                  message: 'No message content'
                }]
              }));

            case 12:
              if (req.user) {
                _context.next = 14;
                break;
              }

              return _context.abrupt("return", res.send({
                status: 400,
                data: [{
                  message: 'Login to your account'
                }]
              }));

            case 14:
              if (!(req.user.email === req.body.receiverId)) {
                _context.next = 16;
                break;
              }

              return _context.abrupt("return", res.send({
                status: 400,
                data: [{
                  message: 'Your message will be moved to drafts'
                }]
              }));

            case 16:
              _context.next = 21;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", res.send({
                status: 400,
                data: [{
                  error: _context.t0
                }]
              }));

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 18]]);
    }));

    function newMessageInput(_x, _x2) {
      return _newMessageInput.apply(this, arguments);
    }

    return newMessageInput;
  }()
};
var _default = ValidateMessageInput;
exports.default = _default;
//# sourceMappingURL=MessagesValidator.js.map