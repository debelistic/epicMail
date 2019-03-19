"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

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
      var createMessageQuery, values, _ref, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // if (!req.body.subject || !req.body.message || !req.body.status || !req.body.receiverId) {
              //   return res.status(400).send({ message: 'You have one or more empty fields' });
              // }
              // if (!req.user) {
              //   return res.status(400).send({ message: 'User not logged in' });
              // }
              createMessageQuery = "INSERT INTO\n        messages(senderId, receiverId, subject, message, parentMessageId, status)\n        VALUES($1, $2, $3, $4, $5, $6)\n        returning *";
              values = [req.body.user, req.body.receiverId, req.body.subject, req.body.message, req.body.parentMessageId, req.body.status];
              _context.prev = 2;
              _context.next = 5;
              return _db.default.query(createMessageQuery, values);

            case 5:
              _ref = _context.sent;
              rows = _ref.rows;
              return _context.abrupt("return", res.status(201).send(rows[0]));

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](2);
              return _context.abrupt("return", res.status(400).send(_context.t0));

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
      var findInboxQuery, _ref2, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              findInboxQuery = 'SELECT * FROM messages WHERE receiverId = $1';
              _context2.prev = 1;
              _context2.next = 4;
              return _db.default.query(findInboxQuery, [req.user.id]);

            case 4:
              _ref2 = _context2.sent;
              rows = _ref2.rows;
              rowCount = _ref2.rowCount;
              return _context2.abrupt("return", res.status(200).send({
                rows: rows,
                rowCount: rowCount
              }));

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", res.status(400).send(_context2.t0));

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 10]]);
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
      var findAInboxMailQuery, _ref3, rows;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              findAInboxMailQuery = 'SELECT FROM messages WHERE id=$1 AND receiverId = $2';
              _context3.prev = 1;
              _context3.next = 4;
              return _db.default.query(findAInboxMailQuery, [req.params.id, req.user.id]);

            case 4:
              _ref3 = _context3.sent;
              rows = _ref3.rows;

              if (rows[0]) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("return", res.status(404).send({
                message: 'we could not find your mail'
              }));

            case 8:
              return _context3.abrupt("return", res.status(200).send({
                mail: rows[0]
              }));

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](1);
              return _context3.abrupt("return", res.status(400).send(_context3.t0));

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 11]]);
    }));

    function getAInbox(_x5, _x6) {
      return _getAInbox.apply(this, arguments);
    }

    return getAInbox;
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
    regeneratorRuntime.mark(function _callee4(req, res) {
      var findSentQuery, _ref4, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              findSentQuery = 'SELECT * FROM messages WHERE senderId = $1';
              _context4.prev = 1;
              _context4.next = 4;
              return _db.default.query(findSentQuery, [req.user.id]);

            case 4:
              _ref4 = _context4.sent;
              rows = _ref4.rows;
              rowCount = _ref4.rowCount;
              return _context4.abrupt("return", res.status(200).send({
                rows: rows,
                rowCount: rowCount
              }));

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](1);
              return _context4.abrupt("return", res.status(400).send(_context4.t0));

            case 13:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[1, 10]]);
    }));

    function getSent(_x7, _x8) {
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
    regeneratorRuntime.mark(function _callee5(req, res) {
      var findASentMailQuery, _ref5, rows;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              findASentMailQuery = 'SELECT * FROM messages WHERE id = $1 AND senderId = $2';
              _context5.prev = 1;
              _context5.next = 4;
              return _db.default.query(findASentMailQuery, [req.params.id, req.user.id]);

            case 4:
              _ref5 = _context5.sent;
              rows = _ref5.rows;

              if (rows[0]) {
                _context5.next = 8;
                break;
              }

              return _context5.abrupt("return", res.status(404).send({
                message: 'we could not find your mail'
              }));

            case 8:
              return _context5.abrupt("return", res.status(200).send({
                sent: rows[0]
              }));

            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5["catch"](1);
              return _context5.abrupt("return", res.status(400).send(_context5.t0));

            case 14:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[1, 11]]);
    }));

    function getASent(_x9, _x10) {
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
    regeneratorRuntime.mark(function _callee6(req, res) {
      var deleteAInboxMailQuery, _ref6, rows;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              deleteAInboxMailQuery = 'DELETE FROM messages WHERE id=$1 AND receiverId = $2';
              _context6.prev = 1;
              _context6.next = 4;
              return _db.default.query(deleteAInboxMailQuery, [req.params.id, req.user.id]);

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

    function deleteAInbox(_x11, _x12) {
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
    regeneratorRuntime.mark(function _callee7(req, res) {
      var deleteASentMailQuery, _ref7, rows;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              deleteASentMailQuery = 'DELETE FROM messages WHERE id=$1 AND senderId = $2';
              _context7.prev = 1;
              _context7.next = 4;
              return _db.default.query(deleteASentMailQuery, [req.params.id, req.user.id]);

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
              return _context7.abrupt("return", res.status(204).send({
                message: 'deleted'
              }));

            case 11:
              _context7.prev = 11;
              _context7.t0 = _context7["catch"](1);
              return _context7.abrupt("return", res.status(400).send(_context7.t0));

            case 14:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[1, 11]]);
    }));

    function deleteASent(_x13, _x14) {
      return _deleteASent.apply(this, arguments);
    }

    return deleteASent;
  }()
};
var _default = MessageController;
exports.default = _default;
//# sourceMappingURL=MessageController.js.map