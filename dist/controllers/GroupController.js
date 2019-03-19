"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
              if (!(!req.body.name || !req.body.description || req.user)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                message: 'All fields are required'
              }));

            case 2:
              createGroupQuery = "INSER INTO\n    groups(name, description, ownerId)\n    VALUES($1, $2, $3)\n    returning *";
              values = [req.body.name, req.body.description, req.user.id];
              _context.prev = 4;
              _context.next = 7;
              return _db.default.query(createGroupQuery, values);

            case 7:
              _ref = _context.sent;
              rows = _ref.rows;
              return _context.abrupt("return", res.status(201).send(rows[0]));

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](4);
              return _context.abrupt("return", res.status(400).send(_context.t0));

            case 15:
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
  joinGroup: function () {
    var _joinGroup = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var joinGroupQuery, values, _ref2, rows;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!req.body.groupName || !req.user)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                message: 'enter a group name'
              }));

            case 2:
              joinGroupQuery = "INSER INTO\n    groupmembers(groupName, memberId)\n    VALUES($1, $2)\n    returning *";
              values = [req.body.groupName, req.user.id];
              _context2.prev = 4;
              _context2.next = 7;
              return _db.default.query(joinGroupQuery, values);

            case 7:
              _ref2 = _context2.sent;
              rows = _ref2.rows;
              return _context2.abrupt("return", res.status(201).send(rows[0]));

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](4);
              return _context2.abrupt("return", res.status(400).send(_context2.t0));

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[4, 12]]);
    }));

    function joinGroup(_x3, _x4) {
      return _joinGroup.apply(this, arguments);
    }

    return joinGroup;
  }(),

  /**
   * see group messages
   * @param {object} req
   * @param {object} res
   * @returns {object} array of group messages
   */
  seeGroupMessages: function () {
    var _seeGroupMessages = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var findGroupMessagesQuery, _ref3, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(!req.body.groupName || !req.user)) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return", res.status(403).send({
                message: 'you are not a member'
              }));

            case 2:
              findGroupMessagesQuery = 'SELECT * FROM groupmessages WHERE memberId = $1 AND groupName = $2';
              _context3.prev = 3;
              _context3.next = 6;
              return _db.default.query(findGroupMessagesQuery, [req.user.id, req.body.groupName]);

            case 6:
              _ref3 = _context3.sent;
              rows = _ref3.rows;
              rowCount = _ref3.rowCount;

              if (rows[0]) {
                _context3.next = 11;
                break;
              }

              return _context3.abrupt("return", res.status(403).send({
                message: 'you are not a member'
              }));

            case 11:
              return _context3.abrupt("return", res.status(200).send({
                rows: rows,
                rowCount: rowCount
              }));

            case 14:
              _context3.prev = 14;
              _context3.t0 = _context3["catch"](3);
              return _context3.abrupt("return", res.status(400).send(_context3.t0));

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[3, 14]]);
    }));

    function seeGroupMessages(_x5, _x6) {
      return _seeGroupMessages.apply(this, arguments);
    }

    return seeGroupMessages;
  }(),

  /**
   * returns an array of group members
   * @param {object} req
   * @param {object} res
   * @returns {object} group members array
   */
  seeGroupMembers: function () {
    var _seeGroupMembers = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var seeGroupMembersQuery, _ref4, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(!req.body.groupName || !req.user)) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt("return", res.status(403).send({
                message: 'you are not a member'
              }));

            case 2:
              seeGroupMembersQuery = 'SELECT * FROM groupmember WHERE memberId = $1 AND groupName = $2';
              _context4.prev = 3;
              _context4.next = 6;
              return _db.default.query(seeGroupMembersQuery, [req.user.id, req.body.groupName]);

            case 6:
              _ref4 = _context4.sent;
              rows = _ref4.rows;
              rowCount = _ref4.rowCount;

              if (rows[0]) {
                _context4.next = 11;
                break;
              }

              return _context4.abrupt("return", res.status(403).send({
                message: 'you are not a member'
              }));

            case 11:
              return _context4.abrupt("return", res.status(200).send({
                rows: rows,
                rowCount: rowCount
              }));

            case 14:
              _context4.prev = 14;
              _context4.t0 = _context4["catch"](3);
              return _context4.abrupt("return", res.status(400).send(_context4.t0));

            case 17:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[3, 14]]);
    }));

    function seeGroupMembers(_x7, _x8) {
      return _seeGroupMembers.apply(this, arguments);
    }

    return seeGroupMembers;
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
    regeneratorRuntime.mark(function _callee5(req, res) {
      var groupMessageQuery, values, _ref5, rows;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!(!req.body.message || !req.body.groupName || !req.user)) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt("return", res.status(400).send({
                message: 'enter a text'
              }));

            case 2:
              groupMessageQuery = "INSER INTO\n      groupmessages(message, groupName, ownerId)\n      VALUES($1, $2, $3)\n      returning *";
              values = [req.body.message, req.body.groupName, req.user.id];
              _context5.prev = 4;
              _context5.next = 7;
              return _db.default.query(groupMessageQuery, values);

            case 7:
              _ref5 = _context5.sent;
              rows = _ref5.rows;
              return _context5.abrupt("return", res.status(201).send(rows[0]));

            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5["catch"](4);
              return _context5.abrupt("return", res.status(400).send(_context5.t0));

            case 15:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[4, 12]]);
    }));

    function sendGroupMessage(_x9, _x10) {
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
    regeneratorRuntime.mark(function _callee6(req, res) {
      var deleteAGroupMemberQuery, _ref6, rows;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              deleteAGroupMemberQuery = 'DELETE FROM groupmembers WHERE memberId=$1 AND ownerId = $2';
              _context6.prev = 1;
              _context6.next = 4;
              return _db.default.query(deleteAGroupMemberQuery, [req.body.memberId, req.user.id]);

            case 4:
              _ref6 = _context6.sent;
              rows = _ref6.rows;

              if (rows[0]) {
                _context6.next = 8;
                break;
              }

              return _context6.abrupt("return", res.status(404).send({
                message: 'memberdoes not not exist'
              }));

            case 8:
              return _context6.abrupt("return", res.status(204).send({
                message: 'deleted'
              }));

            case 11:
              _context6.prev = 11;
              _context6.t0 = _context6["catch"](1);
              return _context6.abrupt("return", res.status(400).send(_context6.t0));

            case 14:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[1, 11]]);
    }));

    function deleteAGroupMember(_x11, _x12) {
      return _deleteAGroupMember.apply(this, arguments);
    }

    return deleteAGroupMember;
  }()
};
var _default = GroupController;
exports.default = _default;
//# sourceMappingURL=GroupController.js.map