"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("uuid/v4"));

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/** Queries */
var createGroupQuery = "INSERT INTO\n    groups(id, name, description, ownerId)\n    VALUES($1, $2, $3, $4) RETURNING *";
var addGroupMembersQuery = "INSERT INTO\n    groupmembers(groupId, groupName, memberId, role)\n    VALUES($1, $2, $3, $4) RETURNING *";
var addGroupAdminQuery = "INSERT INTO\n    groupmembers(groupId, groupName, memberId, role)\n    VALUES($1, $2, $3, $4) RETURNING *";
var groupMessageQuery = "INSERT INTO\n    groupmessages(id, groupId, senderEmail, subject, message, status)\n    VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
var getGroupMssgQuery = 'SELECT FROM groupmessages WHERE groupId = $1';
var deleteAGroupMemberQuery = 'DELETE FROM groupmembers WHERE groupId=$1 AND memberId = $2 RETURNING *';
var editGroupNameQuery = 'UPDATE groups SET name=$1 WHERE id= $2 RETURNING *';
var deleteGroupQuery = 'DELETE FROM groups WHERE $1=id AND $2=ownerId RETURNING *';
/** End of Queries */

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
      var values, _ref, rows, adminvalues;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              values = [(0, _v.default)(), req.body.name.trim().toLowerCase(), req.body.description.trim().toLowerCase(), req.user.email.trim()];
              _context.prev = 1;
              _context.next = 4;
              return _db.default.query(createGroupQuery, values);

            case 4:
              _ref = _context.sent;
              rows = _ref.rows;
              adminvalues = [rows[0].id, req.body.name.trim().toLowerCase(), req.user.email.trim(), 'admin'];
              _context.next = 9;
              return _db.default.query(addGroupAdminQuery, adminvalues);

            case 9:
              return _context.abrupt("return", res.status(201).send({
                status: 201,
                data: [{
                  status: 201,
                  newgroup: rows[0]
                }]
              }));

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](1);
              return _context.abrupt("return", res.send({
                status: 500,
                error: _context.t0
              }));

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 12]]);
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
      var values, _ref2, rows;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              values = [req.params.id, req.body.name, req.body.membermail, 'member'];
              _context2.prev = 1;
              _context2.next = 4;
              return _db.default.query(addGroupMembersQuery, values);

            case 4:
              _ref2 = _context2.sent;
              rows = _ref2.rows;
              return _context2.abrupt("return", res.status(201).send({
                status: 201,
                data: [{
                  status: 201,
                  member: rows[0]
                }]
              }));

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", res.send({
                status: 500,
                data: [{
                  error: _context2.t0
                }]
              }));

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 9]]);
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
      var values, _ref3, rows;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              values = [(0, _v.default)(), req.params.id, req.user.email, req.body.subject, req.body.message, 'unread'];
              _context3.prev = 1;
              _context3.next = 4;
              return _db.default.query(groupMessageQuery, values);

            case 4:
              _ref3 = _context3.sent;
              rows = _ref3.rows;
              return _context3.abrupt("return", res.status(201).send({
                status: 201,
                data: [{
                  message: rows[0]
                }]
              }));

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](1);
              return _context3.abrupt("return", res.status(500).send({
                message: _context3.t0
              }));

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 9]]);
    }));

    function sendGroupMessage(_x5, _x6) {
      return _sendGroupMessage.apply(this, arguments);
    }

    return sendGroupMessage;
  }(),

  /**
   * returns an array of messages for a group
   * @param {object} req
   * @param {object} res
   */
  getGroupMessages: function () {
    var _getGroupMessages = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var _ref4, rows;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _db.default.query(getGroupMssgQuery, [req.params.id]);

            case 3:
              _ref4 = _context4.sent;
              rows = _ref4.rows;
              return _context4.abrupt("return", res.status(200).send({
                status: 200,
                data: [{
                  messages: rows
                }]
              }));

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", res.status(500).send({
                error: _context4.t0
              }));

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 8]]);
    }));

    function getGroupMessages(_x7, _x8) {
      return _getGroupMessages.apply(this, arguments);
    }

    return getGroupMessages;
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
    regeneratorRuntime.mark(function _callee5(req, res) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _db.default.query(deleteAGroupMemberQuery, [req.params.id, req.params.userid]);

            case 3:
              return _context5.abrupt("return", res.status(204).send({
                status: 204,
                data: [{
                  message: "You have removed ".concat(req.params.userid)
                }]
              }));

            case 6:
              _context5.prev = 6;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", res.status(500).send({
                status: 500,
                err: _context5.t0
              }));

            case 9:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 6]]);
    }));

    function deleteAGroupMember(_x9, _x10) {
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
    regeneratorRuntime.mark(function _callee6(req, res) {
      var getGroupsQuery, _ref5, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              getGroupsQuery = 'SELECT * FROM groups';
              _context6.prev = 1;
              _context6.next = 4;
              return _db.default.query(getGroupsQuery);

            case 4:
              _ref5 = _context6.sent;
              rows = _ref5.rows;
              rowCount = _ref5.rowCount;
              return _context6.abrupt("return", res.status(200).send({
                status: 200,
                data: [{
                  message: "There are ".concat(rowCount, " groups"),
                  groups: rows
                }]
              }));

            case 10:
              _context6.prev = 10;
              _context6.t0 = _context6["catch"](1);
              return _context6.abrupt("return", res.status(500).send({
                status: 500,
                data: [_context6.t0]
              }));

            case 13:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[1, 10]]);
    }));

    function getAllGroups(_x11, _x12) {
      return _getAllGroups.apply(this, arguments);
    }

    return getAllGroups;
  }(),

  /**
   * edit group name
   * @param { object } req
   * @param { object } res
   * @returns { object } success or error
   */
  editGroupName: function () {
    var _editGroupName = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(req, res) {
      var _ref6, rows;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _db.default.query(editGroupNameQuery, [req.body.newName, req.params.id]);

            case 3:
              _ref6 = _context7.sent;
              rows = _ref6.rows;
              return _context7.abrupt("return", res.status(200).send({
                status: 200,
                data: [{
                  newname: rows[0].name
                }]
              }));

            case 8:
              _context7.prev = 8;
              _context7.t0 = _context7["catch"](0);
              return _context7.abrupt("return", res.status(500).send({
                status: 500,
                data: [_context7.t0]
              }));

            case 11:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 8]]);
    }));

    function editGroupName(_x13, _x14) {
      return _editGroupName.apply(this, arguments);
    }

    return editGroupName;
  }(),

  /**
   * delete a group
   * @param { object } req
   * @param { object } res
   * @returns { object } success or error
   */
  deleteGroup: function () {
    var _deleteGroup = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(req, res) {
      var _ref7, rows;

      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return _db.default.query(deleteGroupQuery, [req.params.id, req.user.email]);

            case 3:
              _ref7 = _context8.sent;
              rows = _ref7.rows;
              return _context8.abrupt("return", res.status(204).send({
                status: 204,
                data: [{
                  message: "".concat(rows, " has been deleted")
                }]
              }));

            case 8:
              _context8.prev = 8;
              _context8.t0 = _context8["catch"](0);
              return _context8.abrupt("return", res.status(500).send({
                status: 500,
                data: [_context8.t0]
              }));

            case 11:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 8]]);
    }));

    function deleteGroup(_x15, _x16) {
      return _deleteGroup.apply(this, arguments);
    }

    return deleteGroup;
  }()
};
var _default = GroupController;
exports.default = _default;
//# sourceMappingURL=GroupController.js.map