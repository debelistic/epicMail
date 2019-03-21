'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Auth = {
  verifyToken: function verifyToken(req, res, next) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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

              return _context.abrupt('return', res.status(403).send({ message: 'No Token Provided' }));

            case 3:
              _context.prev = 3;
              decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
              text = 'SELECT * FROM users WHERE email = $1';
              _context.next = 8;
              return _db2.default.query(text, [decoded.userEmail]);

            case 8:
              _ref = _context.sent;
              rows = _ref.rows;

              if (rows[0]) {
                _context.next = 12;
                break;
              }

              return _context.abrupt('return', res.status(403).send({ message: 'Session closed' }));

            case 12:
              req.user = { email: decoded.userEmail };
              return _context.abrupt('return', next());

            case 16:
              _context.prev = 16;
              _context.t0 = _context['catch'](3);
              return _context.abrupt('return', res.status(400).send({ error: _context.t0 }));

            case 19:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[3, 16]]);
    }))();
  }
};

exports.default = Auth;
//# sourceMappingURL=Auth.js.map