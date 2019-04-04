"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

var _MessagesValidator = _interopRequireDefault(require("../middleware/MessagesValidator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var MessageController = {
  /**
   * create a new message
   * @param { object } req
   * @param { object } res
   * @returns { object } message object
   */
  create: function () {
    var _create = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var messageStatus, createMessageQuery, values, _ref, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _MessagesValidator.default.newMessageInput(req, res);

              if (!req.body.receiverEmail) {
                messageStatus = 'drafts';
              } else {
                messageStatus = 'unread';
              }

              createMessageQuery = "INSERT INTO\n        messages(createdOn, receiverEmail, senderEmail, subject, message, parentMessageId, status)\n        VALUES($1, $2, $3, $4, $5, $6, $7)\n        RETURNING *";
              values = [new Date(), req.body.receiverEmail, req.user.email, req.body.subject.trim(), req.body.message, req.body.parentMessageId, messageStatus];
              _context.prev = 4;
              _context.next = 7;
              return _db.default.query(createMessageQuery, values);

            case 7:
              _ref = _context.sent;
              rows = _ref.rows;
              return _context.abrupt("return", res.status(201).send({
                status: 201,
                data: [{
                  message: 'Your message has been sent',
                  newsent: rows[0]
                }]
              }));

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](4);
              return _context.abrupt("return", res.status(400).send({
                status: 400,
                err: _context.t0
              }));

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 12]]);
    }));

    function create(_x, _x2) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),

  /**
   * get inbox for a user
   * @param { object } req
   * @param { object } res
   * @returns { object } inbox array
   */
  getInbox: function () {
    var _getInbox = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var findInboxQuery, _ref2, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              findInboxQuery = 'SELECT * FROM messages WHERE receiverEmail = $1';
              _context2.prev = 1;

              if (req.user.email) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt("return", res.status(403).send({
                message: 'Login to your account'
              }));

            case 4:
              _context2.next = 6;
              return _db.default.query(findInboxQuery, [req.user.email]);

            case 6:
              _ref2 = _context2.sent;
              rows = _ref2.rows;
              rowCount = _ref2.rowCount;
              return _context2.abrupt("return", res.status(200).send({
                rows: rows,
                rowCount: rowCount
              }));

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", res.status(400).send(_context2.t0));

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 12]]);
    }));

    function getInbox(_x3, _x4) {
      return _getInbox.apply(this, arguments);
    }

    return getInbox;
  }(),

  /**
   * get a user inbox message
   * @param { object } req
   * @param { object } res
   * @returns { object } inbox mail object
   */
  getAInbox: function () {
    var _getAInbox = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var findAInboxMailQuery, _ref3, rows, updateStatusQuery;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              findAInboxMailQuery = 'SELECT * FROM messages WHERE id=$1 AND receiverEmail = $2';

              if (req.user.email) {
                _context3.next = 4;
                break;
              }

              return _context3.abrupt("return", res.status(403).send({
                message: 'Login to your account'
              }));

            case 4:
              _context3.next = 6;
              return _db.default.query(findAInboxMailQuery, [req.params.id, req.user.email]);

            case 6:
              _ref3 = _context3.sent;
              rows = _ref3.rows;

              if (rows[0]) {
                _context3.next = 10;
                break;
              }

              return _context3.abrupt("return", res.status(404).send({
                message: 'we could not find your mail'
              }));

            case 10:
              updateStatusQuery = 'UPDATE messages SET status=$1 WHERE receiverEmail = $2 RETURNING *';
              _context3.next = 13;
              return _db.default.query(updateStatusQuery, ['read', req.user.email]);

            case 13:
              return _context3.abrupt("return", res.status(200).send({
                rows: rows
              }));

            case 16:
              _context3.prev = 16;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", res.status(400).send({
                err: _context3.t0
              }));

            case 19:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 16]]);
    }));

    function getAInbox(_x5, _x6) {
      return _getAInbox.apply(this, arguments);
    }

    return getAInbox;
  }(),
  getUnread: function () {
    var _getUnread = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var findAllUnreadQuery, _ref4, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              findAllUnreadQuery = 'SELECT * FROM messages WHERE receiverEmail = $1 AND status = $2';

              if (req.user.email) {
                _context4.next = 4;
                break;
              }

              return _context4.abrupt("return", res.status(403).send({
                message: 'Login to your account'
              }));

            case 4:
              _context4.next = 6;
              return _db.default.query(findAllUnreadQuery, [req.user.email, 'unread']);

            case 6:
              _ref4 = _context4.sent;
              rows = _ref4.rows;
              rowCount = _ref4.rowCount;
              return _context4.abrupt("return", res.status(200).send({
                rows: rows,
                rowCount: rowCount
              }));

            case 12:
              _context4.prev = 12;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", res.status(400).send({
                err: _context4.t0
              }));

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 12]]);
    }));

    function getUnread(_x7, _x8) {
      return _getUnread.apply(this, arguments);
    }

    return getUnread;
  }(),

  /**
   * get all sent mails
   * @param { object } req
   * @param { object } res
   * @returns { object } sent array
   */
  getSent: function () {
    var _getSent = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(req, res) {
      var findSentQuery, _ref5, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              findSentQuery = 'SELECT * FROM messages WHERE senderEmail = $1';

              if (req.user.email) {
                _context5.next = 4;
                break;
              }

              return _context5.abrupt("return", res.status(403).send({
                message: 'Login to your account'
              }));

            case 4:
              _context5.next = 6;
              return _db.default.query(findSentQuery, [req.user.email]);

            case 6:
              _ref5 = _context5.sent;
              rows = _ref5.rows;
              rowCount = _ref5.rowCount;
              return _context5.abrupt("return", res.status(200).send({
                rows: rows,
                rowCount: rowCount
              }));

            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", res.status(400).send(_context5.t0));

            case 15:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 12]]);
    }));

    function getSent(_x9, _x10) {
      return _getSent.apply(this, arguments);
    }

    return getSent;
  }(),

  /**
   * get a user sent mail
   * @param { object } req
   * @param { object } res
   * @returns { object } sent mail object
   */
  getASent: function () {
    var _getASent = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(req, res) {
      var findASentMailQuery, _ref6, rows;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              findASentMailQuery = 'SELECT * FROM messages WHERE id = $1 AND senderEmail = $2';
              _context6.next = 4;
              return _db.default.query(findASentMailQuery, [req.params.id, req.user.email]);

            case 4:
              _ref6 = _context6.sent;
              rows = _ref6.rows;

              if (rows[0]) {
                _context6.next = 8;
                break;
              }

              return _context6.abrupt("return", res.status(404).send({
                message: 'we could not find your mail'
              }));

            case 8:
              return _context6.abrupt("return", res.status(200).send({
                sent: rows[0]
              }));

            case 11:
              _context6.prev = 11;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", res.status(400).send(_context6.t0));

            case 14:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 11]]);
    }));

    function getASent(_x11, _x12) {
      return _getASent.apply(this, arguments);
    }

    return getASent;
  }(),

  /**
   * delete a mail from inbox
   * @param { object } req
   * @param { object } res
   * @returns { object } success or error
   */
  deleteAInbox: function () {
    var _deleteAInbox = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(req, res) {
      var deleteAInboxMailQuery, _ref7, rows;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              deleteAInboxMailQuery = 'DELETE FROM messages WHERE id=$1 AND receiverEmail = $2 RETURNING *';
              _context7.next = 4;
              return _db.default.query(deleteAInboxMailQuery, [req.params.id, req.user.email]);

            case 4:
              _ref7 = _context7.sent;
              rows = _ref7.rows;

              if (rows[0]) {
                _context7.next = 8;
                break;
              }

              return _context7.abrupt("return", res.status(404).send({
                message: 'we could not find your mail'
              }));

            case 8:
              return _context7.abrupt("return", res.send({
                status: 204,
                message: 'deleted'
              }));

            case 11:
              _context7.prev = 11;
              _context7.t0 = _context7["catch"](0);
              return _context7.abrupt("return", res.status(400).send(_context7.t0));

            case 14:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 11]]);
    }));

    function deleteAInbox(_x13, _x14) {
      return _deleteAInbox.apply(this, arguments);
    }

    return deleteAInbox;
  }(),

  /**
   * delete a mail from sent
   * @param { object } req
   * @param { object } res
   * @returns { object } success or error
   */
  deleteASent: function () {
    var _deleteASent = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(req, res) {
      var deleteASentMailQuery, _ref8, rows;

      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              deleteASentMailQuery = 'DELETE FROM messages WHERE id=$1 AND senderEmail = $2 RETURNING *';
              _context8.next = 4;
              return _db.default.query(deleteASentMailQuery, [req.params.id, req.user.email]);

            case 4:
              _ref8 = _context8.sent;
              rows = _ref8.rows;

              if (rows[0]) {
                _context8.next = 8;
                break;
              }

              return _context8.abrupt("return", res.status(404).send({
                message: 'we could not find your mail'
              }));

            case 8:
              return _context8.abrupt("return", res.send({
                status: 204,
                message: 'deleted'
              }));

            case 11:
              _context8.prev = 11;
              _context8.t0 = _context8["catch"](0);
              return _context8.abrupt("return", res.status(400).send(_context8.t0));

            case 14:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 11]]);
    }));

    function deleteASent(_x15, _x16) {
      return _deleteASent.apply(this, arguments);
    }

    return deleteASent;
  }()
};
var _default = MessageController;
exports.default = _default;
//# sourceMappingURL=MessageController.js.map