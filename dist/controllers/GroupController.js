'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var GroupController = {
  /**
   * create user group
   * @param {object} req
   * @param {object} res
   * @returns {object} group
   */
  createGroup: function createGroup(req, res) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var createGroupQuery, values, _ref, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!req.body.name || !req.body.description || !req.user)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', res.status(400).send({ message: 'All fields are required' }));

            case 2:
              if (req.user.email) {
                _context.next = 4;
                break;
              }

              return _context.abrupt('return', res.status(403).send({ message: 'only registered users can make groups' }));

            case 4:
              createGroupQuery = 'INSERT INTO\n    groups(name, description, ownerId)\n    VALUES($1, $2, $3)\n    returning *';
              values = [req.body.name, req.body.description, req.user.email];
              _context.prev = 6;
              _context.next = 9;
              return _db2.default.query(createGroupQuery, values);

            case 9:
              _ref = _context.sent;
              rows = _ref.rows;
              return _context.abrupt('return', res.status(201).send(rows[0]));

            case 14:
              _context.prev = 14;
              _context.t0 = _context['catch'](6);
              return _context.abrupt('return', res.status(400).send(_context.t0));

            case 17:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[6, 14]]);
    }))();
  },


  /**
   * group owner add users join a group
   * @param {object} req
   * @param {object} res
   * @returns {object} group array
   */
  addGroupMembers: function addGroupMembers(req, res) {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var addGroupMembersQuery, values, verifyAdminQuery, Result, Admin, _ref2, rows;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (req.user.email) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt('return', res.status(403).send({ message: 'only registered users can make groups' }));

            case 2:
              if (!(!req.body.groupName || !req.body.groupId || !req.body.membermail)) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({ message: 'enter a group name and new mail' }));

            case 4:
              addGroupMembersQuery = 'INSERT INTO\n    groupmembers(id, groupId, groupName, memberId)\n    VALUES($1, $2, $3, $4) RETURNING *';
              values = [(0, _v2.default)(), req.body.groupId, req.body.groupName, req.body.membermail];
              _context2.prev = 6;
              verifyAdminQuery = 'SELECT * FROM groups WHERE ownerId = $1 AND Id = $2';
              _context2.next = 10;
              return _db2.default.query(verifyAdminQuery, [req.user.email, req.body.groupId]);

            case 10:
              Result = _context2.sent;
              Admin = Result.rows[0].ownerid;

              if (Admin) {
                _context2.next = 14;
                break;
              }

              return _context2.abrupt('return', res.status(403).send({ message: 'Only Admins can add users' }));

            case 14:
              _context2.next = 16;
              return _db2.default.query(addGroupMembersQuery, values);

            case 16:
              _ref2 = _context2.sent;
              rows = _ref2.rows;
              return _context2.abrupt('return', res.status(201).send({
                status: 201,
                newmember: rows[0].memberId
              }));

            case 21:
              _context2.prev = 21;
              _context2.t0 = _context2['catch'](6);

              if (!(_context2.t0.routine === '_bt_check_unique')) {
                _context2.next = 25;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({ message: 'Group Eixts Already' }));

            case 25:
              return _context2.abrupt('return', res.status(400).send({ err: _context2.t0 }));

            case 26:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[6, 21]]);
    }))();
  },


  /**
   * see group messages
   * @param {object} req
   * @param {object} res
   * @returns {object} array of group messages
   */
  seeGroupMessages: function seeGroupMessages(req, res) {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var findGroupMessagesQuery, _ref3, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(!req.body.groupName || !req.user)) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt('return', res.status(403).send({ message: 'you are not a member' }));

            case 2:
              findGroupMessagesQuery = 'SELECT * FROM groupmessages WHERE ownerId = $1 AND groupName = $2';
              _context3.prev = 3;
              _context3.next = 6;
              return _db2.default.query(findGroupMessagesQuery, [req.user.email, req.body.groupName]);

            case 6:
              _ref3 = _context3.sent;
              rows = _ref3.rows;
              rowCount = _ref3.rowCount;

              if (rows[0]) {
                _context3.next = 11;
                break;
              }

              return _context3.abrupt('return', res.status(403).send({ message: 'you are not a member' }));

            case 11:
              return _context3.abrupt('return', res.status(200).send({ rows: rows, rowCount: rowCount }));

            case 14:
              _context3.prev = 14;
              _context3.t0 = _context3['catch'](3);
              return _context3.abrupt('return', res.status(400).send(_context3.t0));

            case 17:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this3, [[3, 14]]);
    }))();
  },


  /**
   * returns an array of group members
   * @param {object} req
   * @param {object} res
   * @returns {object} group members array
   */
  seeGroupMembers: function seeGroupMembers(req, res) {
    var _this4 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var seeGroupMembersQuery, _ref4, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(!req.body.groupName || !req.user)) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt('return', res.status(403).send({ message: 'you are not a member' }));

            case 2:
              seeGroupMembersQuery = 'SELECT * FROM groupmembers WHERE memberId = $1 AND groupName = $2';
              _context4.prev = 3;
              _context4.next = 6;
              return _db2.default.query(seeGroupMembersQuery, [req.user.email, req.body.groupName]);

            case 6:
              _ref4 = _context4.sent;
              rows = _ref4.rows;
              rowCount = _ref4.rowCount;

              if (rows[0]) {
                _context4.next = 11;
                break;
              }

              return _context4.abrupt('return', res.status(403).send({ message: 'you are not a member' }));

            case 11:
              return _context4.abrupt('return', res.status(200).send({ rows: rows, rowCount: rowCount }));

            case 14:
              _context4.prev = 14;
              _context4.t0 = _context4['catch'](3);
              return _context4.abrupt('return', res.status(400).send(_context4.t0));

            case 17:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this4, [[3, 14]]);
    }))();
  },


  /**
   * sends message to a group where sender is member or owner
   * @param {object} req
   * @param {object} res
   * @returns {object} sent message
   */
  sendGroupMessage: function sendGroupMessage(req, res) {
    var _this5 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var groupMessageQuery, values, _ref5, rows;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!(!req.body.message || !req.body.groupName || !req.user)) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt('return', res.status(400).send({ message: 'enter a text' }));

            case 2:
              groupMessageQuery = 'INSERT INTO\n      groupmessages(message, groupName, ownerId)\n      VALUES($1, $2, $3)\n      returning *';
              values = [req.body.message, req.body.groupName, req.user.email];
              _context5.prev = 4;
              _context5.next = 7;
              return _db2.default.query(groupMessageQuery, values);

            case 7:
              _ref5 = _context5.sent;
              rows = _ref5.rows;
              return _context5.abrupt('return', res.status(201).send(rows[0]));

            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5['catch'](4);

              if (!(_context5.t0.routine === 'ri_ReportViolation')) {
                _context5.next = 16;
                break;
              }

              return _context5.abrupt('return', res.status(400).send({ message: 'Not a group' }));

            case 16:
              return _context5.abrupt('return', res.status(400).send(_context5.t0));

            case 17:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this5, [[4, 12]]);
    }))();
  },


  /**
   * deletes a group member
   * @param {object} req
   * @param {object} res
   * @returns {object} group members array
   */
  deleteAGroupMember: function deleteAGroupMember(req, res) {
    var _this6 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var deleteAGroupMemberQuery, _ref6, rows;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!(!req.body.memberId || !req.body.groupName)) {
                _context6.next = 2;
                break;
              }

              return _context6.abrupt('return', res.status(400).send({ message: 'Some fields are missing' }));

            case 2:
              deleteAGroupMemberQuery = 'DELETE FROM groupmembers WHERE memberId=$1 AND groupName = $2';
              _context6.prev = 3;
              _context6.next = 6;
              return _db2.default.query(deleteAGroupMemberQuery, [req.body.memberId, req.body.groupName]);

            case 6:
              _ref6 = _context6.sent;
              rows = _ref6.rows;

              if (rows[0]) {
                _context6.next = 10;
                break;
              }

              return _context6.abrupt('return', res.status(404).send({ message: 'member does not not exist' }));

            case 10:
              return _context6.abrupt('return', res.send({ message: 'You have removed ' + req.body.memberId }));

            case 13:
              _context6.prev = 13;
              _context6.t0 = _context6['catch'](3);
              return _context6.abrupt('return', res.status(400).send(_context6.t0));

            case 16:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this6, [[3, 13]]);
    }))();
  },

  /**
   * deletes a group message
   * @param {object} req
   * @param {object} res
   * @returns {object} group members array
   */
  deleteAGroupMessage: function deleteAGroupMessage(req, res) {
    var _this7 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var deleteAGroupMessagesQuery, verifyAdminQuery, Result, Admin, _ref7, rows;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!(!req.body.id || !req.body.groupName || !req.user.email)) {
                _context7.next = 2;
                break;
              }

              return _context7.abrupt('return', res.status(400).send({ message: 'Some fields are missing' }));

            case 2:
              deleteAGroupMessagesQuery = 'DELETE FROM groupmessages WHERE id=$1 AND groupName = $2';
              _context7.prev = 3;
              verifyAdminQuery = 'SELECT * FROM groups WHERE ownerId = $1 AND Id = $2';
              _context7.next = 7;
              return _db2.default.query(verifyAdminQuery, [req.user.email, req.params.groupId]);

            case 7:
              Result = _context7.sent;
              Admin = Result.rows[0].ownerid;

              if (!(!Admin === req.user.email)) {
                _context7.next = 11;
                break;
              }

              return _context7.abrupt('return', res.status(403).send({ message: 'Only Admins can delete users' }));

            case 11:
              _context7.next = 13;
              return _db2.default.query(deleteAGroupMessagesQuery, [req.body.memberId, req.body.groupName]);

            case 13:
              _ref7 = _context7.sent;
              rows = _ref7.rows;

              if (rows[0]) {
                _context7.next = 17;
                break;
              }

              return _context7.abrupt('return', res.status(404).send({ message: 'member does not not exist' }));

            case 17:
              return _context7.abrupt('return', res.send({ message: 'You have removed ' + req.body.memberId }));

            case 20:
              _context7.prev = 20;
              _context7.t0 = _context7['catch'](3);
              return _context7.abrupt('return', res.status(400).send(_context7.t0));

            case 23:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, _this7, [[3, 20]]);
    }))();
  }
};

exports.default = GroupController;
//# sourceMappingURL=GroupController.js.map