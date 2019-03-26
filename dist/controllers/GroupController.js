'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _GroupsValidator = require('../middleware/GroupsValidator');

var _GroupsValidator2 = _interopRequireDefault(_GroupsValidator);

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
              _GroupsValidator2.default.addGroup(req, res);
              _GroupsValidator2.default.addAdmin(req, res);
              createGroupQuery = 'INSERT INTO\n    groups(name, description, ownerId)\n    VALUES($1, $2, $3)\n    returning *';
              values = [req.body.name.trim().toLowerCase(), req.body.description.trim().toLowerCase(), req.user.email.trim()];
              _context.prev = 4;
              _context.next = 7;
              return _db2.default.query(createGroupQuery, values);

            case 7:
              _ref = _context.sent;
              rows = _ref.rows;
              return _context.abrupt('return', res.status(201).send({
                status: 201,
                data: [{
                  newgroup: rows[0]
                }]
              }));

            case 12:
              _context.prev = 12;
              _context.t0 = _context['catch'](4);

              if (!(_context.t0.routine === '_bt_check_unique')) {
                _context.next = 16;
                break;
              }

              return _context.abrupt('return', res.send({
                status: 400,
                message: 'Group already exist'
              }));

            case 16:
              return _context.abrupt('return', res.send({
                status: 400,
                error: _context.t0
              }));

            case 17:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[4, 12]]);
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
              addGroupMembersQuery = 'INSERT INTO\n    groupmembers(groupId, groupName, memberId, role)\n    VALUES($1, $2, $3, $4) RETURNING *';
              values = [req.params.id, req.body.name, req.body.membermail, 'member'];
              _context2.prev = 2;

              _GroupsValidator2.default.verifyMembermail(req, res);
              verifyAdminQuery = 'SELECT * FROM groups WHERE ownerId = $1 AND Id = $2';
              _context2.next = 7;
              return _db2.default.query(verifyAdminQuery, [req.user.email, req.params.id]);

            case 7:
              Result = _context2.sent;
              Admin = Result.rows[0].ownerid;

              if (Admin) {
                _context2.next = 11;
                break;
              }

              return _context2.abrupt('return', res.status(403).send({ message: 'Only Admins can add users' }));

            case 11:
              _context2.next = 13;
              return _db2.default.query(addGroupMembersQuery, values);

            case 13:
              _ref2 = _context2.sent;
              rows = _ref2.rows;
              return _context2.abrupt('return', res.send({
                status: 201,
                data: [{
                  member: rows[0]
                }]
              }));

            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2['catch'](2);

              if (!(_context2.t0.routine === '_bt_check_unique')) {
                _context2.next = 22;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({
                status: 400,
                message: 'Member Eixts Already'
              }));

            case 22:
              return _context2.abrupt('return', res.send({
                status: 400,
                data: [{
                  err: _context2.t0
                }]
              }));

            case 23:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[2, 18]]);
    }))();
  },


  /**
   * sends message to a group where sender is member or owner
   * @param {object} req
   * @param {object} res
   * @returns {object} sent message
   */
  sendGroupMessage: function sendGroupMessage(req, res) {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var groupMessageQuery, values, _ref3, rows;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(!req.body.message || !req.body.groupName || !req.user)) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt('return', res.status(400).send({ message: 'enter a text' }));

            case 2:
              groupMessageQuery = 'INSERT INTO\n      groupmessages(groupName, ownerId, subject, message, status)\n      VALUES($1, $2, $3, $4, $5)\n      returning *';
              values = [req.body.groupName, req.user.email, req.body.subject, req.body.message, 'unread'];
              _context3.prev = 4;
              _context3.next = 7;
              return _db2.default.query(groupMessageQuery, values);

            case 7:
              _ref3 = _context3.sent;
              rows = _ref3.rows;
              return _context3.abrupt('return', res.status(201).send(rows[0]));

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3['catch'](4);

              if (!(_context3.t0.routine === 'ri_ReportViolation')) {
                _context3.next = 16;
                break;
              }

              return _context3.abrupt('return', res.status(400).send({ message: 'Not a group' }));

            case 16:
              return _context3.abrupt('return', res.status(400).send(_context3.t0));

            case 17:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this3, [[4, 12]]);
    }))();
  },


  /**
   * deletes a group member
   * @param {object} req
   * @param {object} res
   * @returns {object} group members array
   */
  deleteAGroupMember: function deleteAGroupMember(req, res) {
    var _this4 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var deleteAGroupMemberQuery, _ref4, rows;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              deleteAGroupMemberQuery = 'DELETE FROM groupmembers WHERE id=$1 AND groupId = $2 RETURNING *';
              _context4.prev = 1;
              _context4.next = 4;
              return _db2.default.query(deleteAGroupMemberQuery, [req.prams.id, req.params.userid]);

            case 4:
              _ref4 = _context4.sent;
              rows = _ref4.rows;

              if (rows[0]) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt('return', res.status(400).send({
                status: 400,
                data: [{
                  message: 'member does not not exist'
                }]
              }));

            case 8:
              return _context4.abrupt('return', res.send({
                status: 204,
                data: [{
                  message: 'You have removed ' + req.params.userid
                }]
              }));

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4['catch'](1);
              return _context4.abrupt('return', res.status(400).send({
                status: 400,
                err: _context4.t0
              }));

            case 14:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this4, [[1, 11]]);
    }))();
  },


  /**
   * get all groups
   * @param {object} req
   * @param {object} res
   * @returns {object} groups
   */
  getAllGroups: function getAllGroups(req, res) {
    var _this5 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var getGroupsQuery, _ref5, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              getGroupsQuery = 'SELECT * FROM groups';
              _context5.prev = 1;
              _context5.next = 4;
              return _db2.default.query(getGroupsQuery);

            case 4:
              _ref5 = _context5.sent;
              rows = _ref5.rows;
              rowCount = _ref5.rowCount;
              return _context5.abrupt('return', res.send({
                status: 200,
                data: [{
                  rows: rows,
                  rowCount: rowCount
                }]
              }));

            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5['catch'](1);
              return _context5.abrupt('return', res.send({
                status: 400,
                data: [_context5.t0]
              }));

            case 13:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this5, [[1, 10]]);
    }))();
  },
  editGroupName: function editGroupName(req, res) {
    var _this6 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var editGroupNameQuery, newGroupName;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              editGroupNameQuery = 'UPDATE groups SET name=$1 WHERE id= $2 RETURNING *';
              _context6.prev = 1;

              if (req.body.newName) {
                _context6.next = 4;
                break;
              }

              return _context6.abrupt('return', res.send({
                status: 400,
                data: [{
                  message: 'enter new name'
                }]
              }));

            case 4:
              _context6.next = 6;
              return _db2.default.query(editGroupNameQuery, [req.body.newName, req.params.id]);

            case 6:
              newGroupName = _context6.sent;
              return _context6.abrupt('return', res.send({
                status: 200,
                data: [{
                  newname: newGroupName.rows[0]
                }]
              }));

            case 10:
              _context6.prev = 10;
              _context6.t0 = _context6['catch'](1);
              return _context6.abrupt('return', res.send({
                status: 400,
                data: [_context6.t0]
              }));

            case 13:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this6, [[1, 10]]);
    }))();
  },
  deleteGroup: function deleteGroup(req, res) {
    var _this7 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var deleteGroupQuery, _ref6, rows;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              // admin should delete group
              deleteGroupQuery = 'DELETE FROM groups WHERE $1=id AND $2=ownerId RETURNING *';
              _context7.prev = 1;
              _context7.next = 4;
              return _db2.default.query(deleteGroupQuery, [req.params.id, req.user.email]);

            case 4:
              _ref6 = _context7.sent;
              rows = _ref6.rows;

              if (rows[0]) {
                _context7.next = 8;
                break;
              }

              return _context7.abrupt('return', res.send({
                status: 400,
                data: [{
                  message: 'Group not found'
                }]
              }));

            case 8:
              return _context7.abrupt('return', res.send({
                status: 204,
                data: [{
                  message: 'Group successfuly deleted'
                }]
              }));

            case 11:
              _context7.prev = 11;
              _context7.t0 = _context7['catch'](1);
              return _context7.abrupt('return', res.send({
                status: 400,
                data: [_context7.t0]
              }));

            case 14:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, _this7, [[1, 11]]);
    }))();
  }
};

exports.default = GroupController;
//# sourceMappingURL=GroupController.js.map