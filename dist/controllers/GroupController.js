"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GroupsValidator = _interopRequireDefault(require("../middleware/GroupsValidator"));

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var GroupController = {
  /**
   * create user group
   * @param {object} req
   * @param {object} res
   * @returns {object} group
   */
  createGroup: function () {
    var _createGroup = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var createGroupQuery, values, _ref, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _GroupsValidator.default.addGroup(req, res);

              _GroupsValidator.default.addAdmin(req, res);

              createGroupQuery = "INSERT INTO\n    groups(name, description, ownerId)\n    VALUES($1, $2, $3)\n    returning *";
              values = [req.body.name.trim().toLowerCase(), req.body.description.trim().toLowerCase(), req.user.email.trim()];
              _context.prev = 4;
              _context.next = 7;
              return _db.default.query(createGroupQuery, values);

            case 7:
              _ref = _context.sent;
              rows = _ref.rows;
              return _context.abrupt("return", res.status(201).send({
                status: 201,
                data: [{
                  newgroup: rows[0]
                }]
              }));

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](4);

              if (!(_context.t0.routine === '_bt_check_unique')) {
                _context.next = 16;
                break;
              }

              return _context.abrupt("return", res.send({
                status: 400,
                message: 'Group already exist'
              }));

            case 16:
              return _context.abrupt("return", res.send({
                status: 400,
                error: _context.t0
              }));

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 12]]);
    }));

    function createGroup(_x, _x2) {
      return _createGroup.apply(this, arguments);
    }

    return createGroup;
  }(),

  /**
   * group owner add users join a group
   * @param {object} req
   * @param {object} res
   * @returns {object} group array
   */
  addGroupMembers: function () {
    var _addGroupMembers = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var addGroupMembersQuery, values, verifyAdminQuery, Result, Admin, _ref2, rows;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              addGroupMembersQuery = "INSERT INTO\n    groupmembers(groupId, groupName, memberId, role)\n    VALUES($1, $2, $3, $4) RETURNING *";
              values = [req.params.id, req.body.name, req.body.membermail, 'member'];
              _context2.prev = 2;

              _GroupsValidator.default.verifyMembermail(req, res);

              verifyAdminQuery = 'SELECT * FROM groups WHERE ownerId = $1 AND Id = $2';
              _context2.next = 7;
              return _db.default.query(verifyAdminQuery, [req.user.email, req.params.id]);

            case 7:
              Result = _context2.sent;
              Admin = Result.rows[0].ownerid;

              if (Admin) {
                _context2.next = 11;
                break;
              }

              return _context2.abrupt("return", res.status(403).send({
                message: 'Only Admins can add users'
              }));

            case 11:
              _context2.next = 13;
              return _db.default.query(addGroupMembersQuery, values);

            case 13:
              _ref2 = _context2.sent;
              rows = _ref2.rows;
              return _context2.abrupt("return", res.send({
                status: 201,
                data: [{
                  member: rows[0]
                }]
              }));

            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2["catch"](2);

              if (!(_context2.t0.routine === '_bt_check_unique')) {
                _context2.next = 22;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                status: 400,
                message: 'Member Eixts Already'
              }));

            case 22:
              return _context2.abrupt("return", res.send({
                status: 400,
                data: [{
                  err: _context2.t0
                }]
              }));

            case 23:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[2, 18]]);
    }));

    function addGroupMembers(_x3, _x4) {
      return _addGroupMembers.apply(this, arguments);
    }

    return addGroupMembers;
  }(),

  /**
   * sends message to a group where sender is member or owner
   * @param {object} req
   * @param {object} res
   * @returns {object} sent message
   */
  sendGroupMessage: function () {
    var _sendGroupMessage = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var groupMessageQuery, values, _ref3, rows;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(!req.body.message || !req.body.groupName || !req.user)) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return", res.status(400).send({
                message: 'enter a text'
              }));

            case 2:
              groupMessageQuery = "INSERT INTO\n      groupmessages(groupName, ownerId, subject, message, status)\n      VALUES($1, $2, $3, $4, $5)\n      returning *";
              values = [req.body.groupName, req.user.email, req.body.subject, req.body.message, 'unread'];
              _context3.prev = 4;
              _context3.next = 7;
              return _db.default.query(groupMessageQuery, values);

            case 7:
              _ref3 = _context3.sent;
              rows = _ref3.rows;
              return _context3.abrupt("return", res.status(201).send(rows[0]));

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](4);

              if (!(_context3.t0.routine === 'ri_ReportViolation')) {
                _context3.next = 16;
                break;
              }

              return _context3.abrupt("return", res.status(400).send({
                message: 'Not a group'
              }));

            case 16:
              return _context3.abrupt("return", res.status(400).send(_context3.t0));

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[4, 12]]);
    }));

    function sendGroupMessage(_x5, _x6) {
      return _sendGroupMessage.apply(this, arguments);
    }

    return sendGroupMessage;
  }(),

  /**
   * deletes a group member
   * @param {object} req
   * @param {object} res
   * @returns {object} group members array
   */
  deleteAGroupMember: function () {
    var _deleteAGroupMember = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var deleteAGroupMemberQuery, _ref4, rows;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              deleteAGroupMemberQuery = 'DELETE FROM groupmembers WHERE id=$1 AND groupId = $2 RETURNING *';
              _context4.prev = 1;
              _context4.next = 4;
              return _db.default.query(deleteAGroupMemberQuery, [req.prams.id, req.params.userid]);

            case 4:
              _ref4 = _context4.sent;
              rows = _ref4.rows;

              if (rows[0]) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt("return", res.status(400).send({
                status: 400,
                data: [{
                  message: 'member does not not exist'
                }]
              }));

            case 8:
              return _context4.abrupt("return", res.send({
                status: 204,
                data: [{
                  message: "You have removed ".concat(req.params.userid)
                }]
              }));

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4["catch"](1);
              return _context4.abrupt("return", res.status(400).send({
                status: 400,
                err: _context4.t0
              }));

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[1, 11]]);
    }));

    function deleteAGroupMember(_x7, _x8) {
      return _deleteAGroupMember.apply(this, arguments);
    }

    return deleteAGroupMember;
  }(),

  /**
   * get all groups
   * @param {object} req
   * @param {object} res
   * @returns {object} groups
   */
  getAllGroups: function () {
    var _getAllGroups = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(req, res) {
      var getGroupsQuery, _ref5, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              getGroupsQuery = 'SELECT * FROM groups';
              _context5.prev = 1;
              _context5.next = 4;
              return _db.default.query(getGroupsQuery);

            case 4:
              _ref5 = _context5.sent;
              rows = _ref5.rows;
              rowCount = _ref5.rowCount;
              return _context5.abrupt("return", res.send({
                status: 200,
                data: [{
                  rows: rows,
                  rowCount: rowCount
                }]
              }));

            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5["catch"](1);
              return _context5.abrupt("return", res.send({
                status: 400,
                data: [_context5.t0]
              }));

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[1, 10]]);
    }));

    function getAllGroups(_x9, _x10) {
      return _getAllGroups.apply(this, arguments);
    }

    return getAllGroups;
  }(),
  editGroupName: function () {
    var _editGroupName = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(req, res) {
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

              return _context6.abrupt("return", res.send({
                status: 400,
                data: [{
                  message: 'enter new name'
                }]
              }));

            case 4:
              _context6.next = 6;
              return _db.default.query(editGroupNameQuery, [req.body.newName, req.params.id]);

            case 6:
              newGroupName = _context6.sent;
              return _context6.abrupt("return", res.send({
                status: 200,
                data: [{
                  newname: newGroupName.rows[0]
                }]
              }));

            case 10:
              _context6.prev = 10;
              _context6.t0 = _context6["catch"](1);
              return _context6.abrupt("return", res.send({
                status: 400,
                data: [_context6.t0]
              }));

            case 13:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[1, 10]]);
    }));

    function editGroupName(_x11, _x12) {
      return _editGroupName.apply(this, arguments);
    }

    return editGroupName;
  }(),
  deleteGroup: function () {
    var _deleteGroup = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(req, res) {
      var deleteGroupQuery, _ref6, rows;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              // admin should delete group
              deleteGroupQuery = 'DELETE FROM groups WHERE $1=id AND $2=ownerId RETURNING *';
              _context7.prev = 1;
              _context7.next = 4;
              return _db.default.query(deleteGroupQuery, [req.params.id, req.user.email]);

            case 4:
              _ref6 = _context7.sent;
              rows = _ref6.rows;

              if (rows[0]) {
                _context7.next = 8;
                break;
              }

              return _context7.abrupt("return", res.send({
                status: 400,
                data: [{
                  message: 'Group not found'
                }]
              }));

            case 8:
              return _context7.abrupt("return", res.send({
                status: 204,
                data: [{
                  message: 'Group successfuly deleted'
                }]
              }));

            case 11:
              _context7.prev = 11;
              _context7.t0 = _context7["catch"](1);
              return _context7.abrupt("return", res.send({
                status: 400,
                data: [_context7.t0]
              }));

            case 14:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[1, 11]]);
    }));

    function deleteGroup(_x13, _x14) {
      return _deleteGroup.apply(this, arguments);
    }

    return deleteGroup;
  }()
};
var _default = GroupController;
exports.default = _default;
//# sourceMappingURL=GroupController.js.map