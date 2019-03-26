'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* eslint-disable consistent-return */


var ValidateGroupsInput = {
  addGroup: function addGroup(req, res) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (req.body.name) {
                _context.next = 3;
                break;
              }

              return _context.abrupt('return', res.send({
                status: 400,
                message: 'Enter name'
              }));

            case 3:
              if (req.body.description) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return', res.send({
                status: 400,
                message: 'Enter description'
              }));

            case 5:
              if (req.user.email) {
                _context.next = 7;
                break;
              }

              return _context.abrupt('return', res.send({
                status: 403,
                message: 'Only members can create groups'
              }));

            case 7:
              _context.next = 14;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context['catch'](0);

              if (!(_context.t0.routine === '_bt_check_unique')) {
                _context.next = 13;
                break;
              }

              return _context.abrupt('return', res.send({
                status: 400,
                message: 'Group already exist'
              }));

            case 13:
              return _context.abrupt('return', res.send({
                status: 400,
                error: _context.t0
              }));

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 9]]);
    }))();
  },
  verifyMembermail: function verifyMembermail(req, res) {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var checkMemberEmailQuery, _ref, rows;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              checkMemberEmailQuery = 'SELECT * FROM users WHERE $1=email';
              _context2.next = 4;
              return _db2.default.query(checkMemberEmailQuery, [req.body.membermail]);

            case 4:
              _ref = _context2.sent;
              rows = _ref.rows;

              if (rows[0]) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt('return', res.send({
                status: 400,
                data: [{
                  message: 'Receiver email does not exist'
                }]
              }));

            case 8:
              if (req.user.email) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt('return', res.status(403).send({
                status: 403,
                message: 'only registered users can make groups'
              }));

            case 10:
              if (!(!req.body.name || !req.body.membermail)) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({
                status: 400,
                message: 'enter a group name and member mail'
              }));

            case 12:
              _context2.next = 19;
              break;

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2['catch'](0);

              if (!(_context2.t0.routine === '_bt_check_unique')) {
                _context2.next = 18;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({
                status: 400,
                message: 'Member Eixts Already'
              }));

            case 18:
              return _context2.abrupt('return', res.send({
                error: _context2.t0
              }));

            case 19:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[0, 14]]);
    }))();
  },
  addAdmin: function addAdmin(req, res) {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var addGroupAdminQuery, adminvalues, _ref2, rows;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              addGroupAdminQuery = 'INSERT INTO\n      groupmembers(groupId, groupName, memberId, role)\n      VALUES($1, $2, $3, $4) RETURNING *';
              adminvalues = [req.params.id, req.body.name, req.user.email, 'admin'];
              _context3.next = 5;
              return _db2.default.query(addGroupAdminQuery, adminvalues);

            case 5:
              _ref2 = _context3.sent;
              rows = _ref2.rows;
              return _context3.abrupt('return', rows[0]);

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3['catch'](0);
              return _context3.abrupt('return', res.send({
                error: _context3.t0
              }));

            case 13:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this3, [[0, 10]]);
    }))();
  }
};

exports.default = ValidateGroupsInput;
//# sourceMappingURL=GroupsValidator.js.map