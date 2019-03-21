'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var MessageController = {

  /**
   * create a new message
   * @param { object } req
   * @param { object } res
   * @returns { object } message object
   */
  create: function create(req, res) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var createMessageQuery, values, _ref, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!req.body.subject || !req.body.message || !req.body.status || !req.body.receiverId)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', res.status(400).send({ message: 'You have one or more empty fields' }));

            case 2:
              if (!(req.user.email === req.body.receiverId)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt('return', res.status(400).send({ message: 'You should save as sraft instead' }));

            case 4:
              if (req.user) {
                _context.next = 6;
                break;
              }

              return _context.abrupt('return', res.status(400).send({ message: 'User not logged in' }));

            case 6:
              createMessageQuery = 'INSERT INTO\n        messages(createdOn, receiverEmail, senderEmail, subject, message, parentMessageId, status)\n        VALUES($1, $2, $3, $4, $5, $6, $7)\n        RETURNING *';
              values = [new Date(), req.body.receiverId, req.user.email, req.body.subject, req.body.message, req.body.parentMessageId, req.body.status];
              _context.prev = 8;
              _context.next = 11;
              return _db2.default.query(createMessageQuery, values);

            case 11:
              _ref = _context.sent;
              rows = _ref.rows;
              return _context.abrupt('return', res.status(201).send(rows[0]));

            case 16:
              _context.prev = 16;
              _context.t0 = _context['catch'](8);
              return _context.abrupt('return', res.status(400).send(_context.t0));

            case 19:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[8, 16]]);
    }))();
  },


  /**
   * get inbox for a user
   * @param { object } req
   * @param { object } res
   * @returns { object } inbox array
   */

  getInbox: function getInbox(req, res) {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
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

              return _context2.abrupt('return', res.status(403).send({ message: 'Login to your account' }));

            case 4:
              _context2.next = 6;
              return _db2.default.query(findInboxQuery, [req.user.email]);

            case 6:
              _ref2 = _context2.sent;
              rows = _ref2.rows;
              rowCount = _ref2.rowCount;
              return _context2.abrupt('return', res.status(200).send({ rows: rows, rowCount: rowCount }));

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2['catch'](1);
              return _context2.abrupt('return', res.status(400).send(_context2.t0));

            case 15:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[1, 12]]);
    }))();
  },


  /**
   * get a user inbox message
   * @param { object } req
   * @param { object } res
   * @returns { object } inbox mail object
   */
  getAInbox: function getAInbox(req, res) {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
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

              return _context3.abrupt('return', res.status(403).send({ message: 'Login to your account' }));

            case 4:
              _context3.next = 6;
              return _db2.default.query(findAInboxMailQuery, [req.params.id, req.user.email]);

            case 6:
              _ref3 = _context3.sent;
              rows = _ref3.rows;

              if (rows[0]) {
                _context3.next = 10;
                break;
              }

              return _context3.abrupt('return', res.status(404).send({ message: 'we could not find your mail' }));

            case 10:
              updateStatusQuery = 'UPDATE messages SET status=$1 WHERE receiverEmail = $2 RETURNING *';
              _context3.next = 13;
              return _db2.default.query(updateStatusQuery, ['read', req.user.email]);

            case 13:
              return _context3.abrupt('return', res.status(200).send({ rows: rows }));

            case 16:
              _context3.prev = 16;
              _context3.t0 = _context3['catch'](0);
              return _context3.abrupt('return', res.status(400).send({ err: _context3.t0 }));

            case 19:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this3, [[0, 16]]);
    }))();
  },
  getUnread: function getUnread(req, res) {
    var _this4 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
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

              return _context4.abrupt('return', res.status(403).send({ message: 'Login to your account' }));

            case 4:
              _context4.next = 6;
              return _db2.default.query(findAllUnreadQuery, [req.user.email, 'unread']);

            case 6:
              _ref4 = _context4.sent;
              rows = _ref4.rows;
              rowCount = _ref4.rowCount;
              return _context4.abrupt('return', res.status(200).send({ rows: rows, rowCount: rowCount }));

            case 12:
              _context4.prev = 12;
              _context4.t0 = _context4['catch'](0);
              return _context4.abrupt('return', res.status(400).send({ err: _context4.t0 }));

            case 15:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this4, [[0, 12]]);
    }))();
  },


  /**
   * get all sent mails
   * @param { object } req
   * @param { object } res
   * @returns { object } sent array
   */
  getSent: function getSent(req, res) {
    var _this5 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
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

              return _context5.abrupt('return', res.status(403).send({ message: 'Login to your account' }));

            case 4:
              _context5.next = 6;
              return _db2.default.query(findSentQuery, [req.user.email]);

            case 6:
              _ref5 = _context5.sent;
              rows = _ref5.rows;
              rowCount = _ref5.rowCount;
              return _context5.abrupt('return', res.status(200).send({ rows: rows, rowCount: rowCount }));

            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5['catch'](0);
              return _context5.abrupt('return', res.status(400).send(_context5.t0));

            case 15:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this5, [[0, 12]]);
    }))();
  },


  /**
   * get a user sent mail
   * @param { object } req
   * @param { object } res
   * @returns { object } sent mail object
   */
  getASent: function getASent(req, res) {
    var _this6 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var findASentMailQuery, _ref6, rows;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              findASentMailQuery = 'SELECT * FROM messages WHERE id = $1 AND senderEmail = $2';
              _context6.next = 4;
              return _db2.default.query(findASentMailQuery, [req.params.id, req.user.email]);

            case 4:
              _ref6 = _context6.sent;
              rows = _ref6.rows;

              if (rows[0]) {
                _context6.next = 8;
                break;
              }

              return _context6.abrupt('return', res.status(404).send({ message: 'we could not find your mail' }));

            case 8:
              return _context6.abrupt('return', res.status(200).send({ sent: rows[0] }));

            case 11:
              _context6.prev = 11;
              _context6.t0 = _context6['catch'](0);
              return _context6.abrupt('return', res.status(400).send(_context6.t0));

            case 14:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this6, [[0, 11]]);
    }))();
  },


  /**
   * delete a mail from inbox
   * @param { object } req
   * @param { object } res
   * @returns { object } success or error
   */
  deleteAInbox: function deleteAInbox(req, res) {
    var _this7 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var deleteAInboxMailQuery, _ref7, rows;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              deleteAInboxMailQuery = 'DELETE FROM messages WHERE id=$1 AND receiverEmail = $2 RETURNING *';
              _context7.next = 4;
              return _db2.default.query(deleteAInboxMailQuery, [req.params.id, req.user.email]);

            case 4:
              _ref7 = _context7.sent;
              rows = _ref7.rows;

              if (rows[0]) {
                _context7.next = 8;
                break;
              }

              return _context7.abrupt('return', res.status(404).send({ message: 'we could not find your mail' }));

            case 8:
              return _context7.abrupt('return', res.send({
                status: 204,
                message: 'deleted'
              }));

            case 11:
              _context7.prev = 11;
              _context7.t0 = _context7['catch'](0);
              return _context7.abrupt('return', res.status(400).send(_context7.t0));

            case 14:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, _this7, [[0, 11]]);
    }))();
  },


  /**
   * delete a mail from sent
   * @param { object } req
   * @param { object } res
   * @returns { object } success or error
   */
  deleteASent: function deleteASent(req, res) {
    var _this8 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      var deleteASentMailQuery, _ref8, rows;

      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              deleteASentMailQuery = 'DELETE FROM messages WHERE id=$1 AND senderEmail = $2 RETURNING *';
              _context8.next = 4;
              return _db2.default.query(deleteASentMailQuery, [req.params.id, req.user.email]);

            case 4:
              _ref8 = _context8.sent;
              rows = _ref8.rows;

              if (rows[0]) {
                _context8.next = 8;
                break;
              }

              return _context8.abrupt('return', res.status(404).send({ message: 'we could not find your mail' }));

            case 8:
              return _context8.abrupt('return', res.send({
                status: 204,
                message: 'deleted'
              }));

            case 11:
              _context8.prev = 11;
              _context8.t0 = _context8['catch'](0);
              return _context8.abrupt('return', res.status(400).send(_context8.t0));

            case 14:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, _this8, [[0, 11]]);
    }))();
  }
};

exports.default = MessageController;
//# sourceMappingURL=MessageController.js.map