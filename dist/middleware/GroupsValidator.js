"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ValidateGroupsInput = {
  /**
   * Validate create group form
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  groupForm: function () {
    var _groupForm = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res, next) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!req.body.name || !req.body.description)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                message: 'If you are a registered user enter group name and description or Signup'
              }));

            case 2:
              return _context.abrupt("return", next());

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function groupForm(_x, _x2, _x3) {
      return _groupForm.apply(this, arguments);
    }

    return groupForm;
  }(),

  /**
   * Validate add member form
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  addMember: function () {
    var _addMember = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res, next) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!req.body.name || !req.body.membermail)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                message: 'Enter a group name and member mail'
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

    function addMember(_x4, _x5, _x6) {
      return _addMember.apply(this, arguments);
    }

    return addMember;
  }(),

  /**
   * Verify User Email
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  verifyMail: function () {
    var _verifyMail = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res, next) {
      var checkMemberEmailQuery, _ref, rows;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              checkMemberEmailQuery = 'SELECT * FROM groupmembers WHERE $1=groupId AND $2=memberId';
              _context3.next = 4;
              return _db.default.query(checkMemberEmailQuery, [req.params.id, req.user.email]);

            case 4:
              _ref = _context3.sent;
              rows = _ref.rows;

              if (!(rows[0] === undefined)) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("return", res.status(401).send({
                mesage: 'You are not a member'
              }));

            case 8:
              if (!(rows[0].memberid !== req.user.email)) {
                _context3.next = 10;
                break;
              }

              return _context3.abrupt("return", res.status(401).send({
                mesage: 'You are not a member of this group'
              }));

            case 10:
              return _context3.abrupt("return", next());

            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", res.status(400).send({
                error: _context3.t0
              }));

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 13]]);
    }));

    function verifyMail(_x7, _x8, _x9) {
      return _verifyMail.apply(this, arguments);
    }

    return verifyMail;
  }(),
  checkAdmin: function () {
    var _checkAdmin = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res, next) {
      var verifyAdminQuery, _ref2, rows;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              verifyAdminQuery = 'SELECT * FROM groupmembers WHERE memberId = $1 AND groupId = $2 AND role = $3';
              _context4.next = 4;
              return _db.default.query(verifyAdminQuery, [req.user.email, req.params.id, 'admin']);

            case 4:
              _ref2 = _context4.sent;
              rows = _ref2.rows;

              if (!(rows[0] === undefined)) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt("return", res.status(403).send({
                message: 'Admins Only.'
              }));

            case 8:
              if (!(rows[0].memberid !== req.user.email)) {
                _context4.next = 10;
                break;
              }

              return _context4.abrupt("return", res.status(403).send({
                message: 'Admins Only.'
              }));

            case 10:
              return _context4.abrupt("return", next());

            case 13:
              _context4.prev = 13;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", res.status(400).send({
                error: _context4.t0
              }));

            case 16:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 13]]);
    }));

    function checkAdmin(_x10, _x11, _x12) {
      return _checkAdmin.apply(this, arguments);
    }

    return checkAdmin;
  }(),
  checkMessageInput: function () {
    var _checkMessageInput = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(req, res, next) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!(!req.body.message || !req.user)) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt("return", res.status(400).send({
                message: 'enter a text'
              }));

            case 2:
              return _context5.abrupt("return", next());

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function checkMessageInput(_x13, _x14, _x15) {
      return _checkMessageInput.apply(this, arguments);
    }

    return checkMessageInput;
  }(),
  checkNewName: function () {
    var _checkNewName = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(req, res, next) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (req.body.newName) {
                _context6.next = 2;
                break;
              }

              return _context6.abrupt("return", res.status(400).send({
                status: 400,
                data: [{
                  message: 'enter new name'
                }]
              }));

            case 2:
              return _context6.abrupt("return", next());

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function checkNewName(_x16, _x17, _x18) {
      return _checkNewName.apply(this, arguments);
    }

    return checkNewName;
  }()
};
var _default = ValidateGroupsInput;
exports.default = _default;
//# sourceMappingURL=GroupsValidator.js.map