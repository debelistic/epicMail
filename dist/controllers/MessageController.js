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
var createMessageQuery = "INSERT INTO\n        messages(createdOn, receiverEmail, senderEmail, subject, message, parentMessageId, status)\n        VALUES($1, $2, $3, $4, $5, $6, $7)\n        RETURNING *";
var findInboxQuery = 'SELECT * FROM messages WHERE receiverEmail = $1';
var findAInboxMailQuery = 'SELECT * FROM messages WHERE id=$1 AND receiverEmail = $2';
var updateStatusQuery = 'UPDATE messages SET status=$1 WHERE receiverEmail = $2 RETURNING *';
var findAllUnreadQuery = 'SELECT * FROM messages WHERE receiverEmail = $1 AND status = $2';
var findSentQuery = 'SELECT * FROM messages WHERE senderEmail = $1';
var findASentMailQuery = 'SELECT * FROM messages WHERE id = $1 AND senderEmail = $2';
var findDraftQuery = 'SELECT * FROM messages WHERE senderEmail = $1 AND status = $2';
var findADraftQuery = 'SELECT * FROM messages WHERE id=$1 AND senderEmail = $2 AND status = $3';
var deleteAInboxMailQuery = 'DELETE FROM messages WHERE id=$1 AND receiverEmail = $2 RETURNING *';
var deleteASentMailQuery = 'DELETE FROM messages WHERE id=$1 AND senderEmail = $2 RETURNING *';
/** End of Queries */

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
      var messageStatus, values, _ref, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              messageStatus = !req.body.receiverEmail ? 'draft' : 'unread';
              values = [new Date(), req.body.receiverEmail, req.user.email, req.body.subject.toLowerCase(), req.body.message, (0, _v.default)(), messageStatus];
              _context.prev = 2;
              _context.next = 5;
              return _db.default.query(createMessageQuery, values);

            case 5:
              _ref = _context.sent;
              rows = _ref.rows;
              return _context.abrupt("return", res.status(201).send({
                status: 201,
                data: [{
                  message: 'Your message has been sent',
                  newsent: rows[0]
                }]
              }));

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](2);
              return _context.abrupt("return", res.status(500).send({
                mesage: _context.t0
              }));

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 10]]);
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
      var _ref2, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _db.default.query(findInboxQuery, [req.user.email]);

            case 3:
              _ref2 = _context2.sent;
              rows = _ref2.rows;
              rowCount = _ref2.rowCount;
              return _context2.abrupt("return", res.status(200).send({
                status: 200,
                count: "You have ".concat(rowCount, " messages."),
                inbox: rows
              }));

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", res.status(500).send({
                mesage: _context2.t0
              }));

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 9]]);
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
      var _ref3, rows;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _db.default.query(findAInboxMailQuery, [req.params.id, req.user.email]);

            case 3:
              _ref3 = _context3.sent;
              rows = _ref3.rows;
              _context3.next = 7;
              return _db.default.query(updateStatusQuery, ['read', req.user.email]);

            case 7:
              return _context3.abrupt("return", res.status(200).send({
                status: 200,
                message: rows
              }));

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", res.status(500).send({
                mesage: _context3.t0
              }));

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 10]]);
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
      var _ref4, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _db.default.query(findAllUnreadQuery, [req.user.email, 'unread']);

            case 3:
              _ref4 = _context4.sent;
              rows = _ref4.rows;
              rowCount = _ref4.rowCount;
              return _context4.abrupt("return", res.status(200).send({
                status: 200,
                count: "You have ".concat(rowCount, " unread messages."),
                unread: rows
              }));

            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", res.status(500).send({
                mesage: _context4.t0
              }));

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 9]]);
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
      var _ref5, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _db.default.query(findSentQuery, [req.user.email]);

            case 3:
              _ref5 = _context5.sent;
              rows = _ref5.rows;
              rowCount = _ref5.rowCount;
              return _context5.abrupt("return", res.status(200).send({
                status: 200,
                count: "You have sent messages ".concat(rowCount, "."),
                sent: rows
              }));

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", res.status(500).send({
                mesage: _context5.t0
              }));

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 9]]);
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
      var _ref6, rows;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _db.default.query(findASentMailQuery, [req.params.id, req.user.email]);

            case 3:
              _ref6 = _context6.sent;
              rows = _ref6.rows;
              return _context6.abrupt("return", res.status(200).send({
                status: 200,
                message: rows
              }));

            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", res.status(500).send({
                mesage: _context6.t0
              }));

            case 11:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 8]]);
    }));

    function getASent(_x11, _x12) {
      return _getASent.apply(this, arguments);
    }

    return getASent;
  }(),

  /**
   * get all draft mails
   * @param { object } req
   * @param { object } res
   * @returns { object } sent array
   */
  getDrafts: function () {
    var _getDrafts = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(req, res) {
      var _ref7, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _db.default.query(findDraftQuery, [req.user.email, 'draft']);

            case 3:
              _ref7 = _context7.sent;
              rows = _ref7.rows;
              rowCount = _ref7.rowCount;
              return _context7.abrupt("return", res.status(200).send({
                status: 200,
                count: "You have ".concat(rowCount, " drafts."),
                drafts: rows
              }));

            case 9:
              _context7.prev = 9;
              _context7.t0 = _context7["catch"](0);
              return _context7.abrupt("return", res.status(500).send({
                mesage: _context7.t0
              }));

            case 12:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 9]]);
    }));

    function getDrafts(_x13, _x14) {
      return _getDrafts.apply(this, arguments);
    }

    return getDrafts;
  }(),

  /**
   * get a draft
   * @param { object } req
   * @param { object } res
   * @returns { object } success or error
   */
  getADraft: function () {
    var _getADraft = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(req, res) {
      var _ref8, rows;

      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return _db.default.query(findADraftQuery, [req.params.id, req.user.email, 'draft']);

            case 3:
              _ref8 = _context8.sent;
              rows = _ref8.rows;
              return _context8.abrupt("return", res.status(200).send({
                status: 200,
                message: rows
              }));

            case 8:
              _context8.prev = 8;
              _context8.t0 = _context8["catch"](0);
              return _context8.abrupt("return", res.status(500).send({
                mesage: _context8.t0
              }));

            case 11:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 8]]);
    }));

    function getADraft(_x15, _x16) {
      return _getADraft.apply(this, arguments);
    }

    return getADraft;
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
    regeneratorRuntime.mark(function _callee9(req, res) {
      var _ref9, rows;

      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return _db.default.query(deleteAInboxMailQuery, [req.params.id, req.user.email]);

            case 3:
              _ref9 = _context9.sent;
              rows = _ref9.rows;
              return _context9.abrupt("return", res.status(204).send({
                status: 204,
                message: 'deleted',
                mail: rows[0]
              }));

            case 8:
              _context9.prev = 8;
              _context9.t0 = _context9["catch"](0);
              return _context9.abrupt("return", res.status(500).send({
                mesage: _context9.t0
              }));

            case 11:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 8]]);
    }));

    function deleteAInbox(_x17, _x18) {
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
    regeneratorRuntime.mark(function _callee10(req, res) {
      var _ref10, rows;

      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _context10.next = 3;
              return _db.default.query(deleteASentMailQuery, [req.params.id, req.user.email]);

            case 3:
              _ref10 = _context10.sent;
              rows = _ref10.rows;
              return _context10.abrupt("return", res.status(204).send({
                status: 204,
                message: 'deleted',
                mail: rows[0]
              }));

            case 8:
              _context10.prev = 8;
              _context10.t0 = _context10["catch"](0);
              return _context10.abrupt("return", res.status(500).send({
                mesage: _context10.t0
              }));

            case 11:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[0, 8]]);
    }));

    function deleteASent(_x19, _x20) {
      return _deleteASent.apply(this, arguments);
    }

    return deleteASent;
  }()
};
var _default = MessageController;
exports.default = _default;
//# sourceMappingURL=MessageController.js.map