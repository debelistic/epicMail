"use strict";

var _v = _interopRequireDefault(require("uuid/v4"));

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require('@babel/polyfill');
/** Start dummy users */


var user1values = ['franchesqa@epicmail.com', 'franchess', 'sandra', 'yh89uyightGH', 'frahashSecuritythe@ymail.com', new Date(), new Date()];
var user2values = ['ojematthew@epicmail.com', 'ifeoluwa', 'matthew', 'yh89uyightGH', 'fghashSecurityy@us.uk', new Date(), new Date()];
var user3values = ['toluniyin@epicmail.com', 'toluwalope', 'iyinoluwa', 'yh89uyightGH', 'wehashSecurity45@fiv.com', new Date(), new Date()];
var user4values = ['vincicode@epicmail.com', 'vinci', 'lorenzo', 'yh89uyightGH', 'victormailservices@gmail.com', new Date(), new Date()];
var user5values = ['petergolden@epicmail.com', 'peter', 'golden', 'yh89uyightGH', 'hashSecurity34tyk@we.com', new Date(), new Date()];
/** End dummy users */

/** Start dummy messages */

var mssg1values = [new Date(), 'ojematthew@epicmail.com', 'vincicode@epicmail.com', 'testdata', 'testing with mocha is fun', (0, _v.default)(), 'unread'];
var mssg2values = [new Date(), 'ojematthew@epicmail.com', 'vincicode@epicmail.com', 'grepping', 'npm testing api, api is application....', (0, _v.default)(), 'unread'];
var mssg3values = [new Date(), 'toluniyin@epicmail.com', 'vincicode@epicmail.com', 'testdata', 'testing with mocha is fun', (0, _v.default)(), 'unread'];
var mssg4values = [new Date(), 'franchesqa@epicmail.com', 'vincicode@epicmail.com', 'grepping', 'npm testing api, api is application....', (0, _v.default)(), 'unread'];
var mssg5values = [new Date(), 'vincicode@epicmail.com', 'franchesqa@epicmail.com', 'grepping', 'npm testing api, api is application....', (0, _v.default)(), 'unread'];
var mssg6values = [new Date(), 'vincicode@epicmail.com', 'ojematthew@epicmail.com', 'grepping', 'npm testing api, api is application....', (0, _v.default)(), 'unread'];
var mssg7values = [new Date(), 'vincicode@epicmail.com', 'toluniyin@epicmail.com', 'testdata', 'testing with mocha is fun', (0, _v.default)(), 'unread'];
var mssg8values = [new Date(), 'vincicode@epicmail.com', 'franchesqa@epicmail.com', 'grepping', 'npm testing api, api is application....', (0, _v.default)(), 'draft'];
var mssg9values = [new Date(), 'vincicode@epicmail.com', 'ojematthew@epicmail.com', 'grepping', 'npm testing api, api is application....', (0, _v.default)(), 'draft'];
var mssg10values = [new Date(), 'vincicode@epicmail.com', 'toluniyin@epicmail.com', 'testdata', 'testing with mocha is fun', (0, _v.default)(), 'draft'];
/** End dummy messages */

/** Start dummy groups */

var group1 = ['5fd08cce-092e-454f-896d-acd78dedb478', 'fries maker', 'we make fries for a living', 'franchesqa@epicmail.com'];
var group2 = ['ade0b372-7e17-4e3e-a3f3-d19e494d8333', 'post writer', 'fingers that change the world', 'ojematthew@epicmail.com'];
var group3 = ['f04bd8ee-e63a-42e1-8264-d195df5316c8', 'camp support', 'helping campers enjoy camping', 'toluniyin@epicmail.com'];
var group4 = ['cb73a9c9-07e2-4efd-8deb-1c71c25c6eed', 'data students', 'help students analyze and manipulate data', 'vincicode@epicmail.com'];
var group5 = ['213be43d-69b5-4fc2-8475-c4ca6cf75124', 'vs coder', 'get the latest updates on vs code', 'petergolden@epicmail.com'];
/** End dummy groups */

/** Start dummy groups members */

var friesadmin = ['5fd08cce-092e-454f-896d-acd78dedb478', 'fries maker', 'franchesqa@epicmail.com', 'admin'];
var friesMember1 = ['5fd08cce-092e-454f-896d-acd78dedb478', 'fries maker', 'ojematthew@epicmail.com', 'member'];
var friesMember2 = ['5fd08cce-092e-454f-896d-acd78dedb478', 'fries maker', 'toluniyin@epicmail.com', 'member'];
var writersAdmin = ['ade0b372-7e17-4e3e-a3f3-d19e494d8333', 'post writer', 'ojematthew@epicmail.com', 'admin'];
var writersMember1 = ['ade0b372-7e17-4e3e-a3f3-d19e494d8333', 'post writer', 'ojematthew@epicmail.com', 'member'];
var writersMember2 = ['ade0b372-7e17-4e3e-a3f3-d19e494d8333', 'post writer', 'toluniyin@epicmail.com', 'member'];
var campAdmin = ['f04bd8ee-e63a-42e1-8264-d195df5316c8', 'camp support', 'toluniyin@epicmail.com', 'admin'];
/** End dummy groups members */

/** Start dummy groups messgaes */

var message1 = ['dde4e871-d3de-4290-9cb5-2a15a1fbcfa8', '5fd08cce-092e-454f-896d-acd78dedb478', 'ojematthew@epicmail.com', 'testing group message', 'Ensure to Setup Environment variables', 'unread'];
var message2 = ['15b1bb03-042c-449f-8443-c4ced7dae934', '5fd08cce-092e-454f-896d-acd78dedb478', 'ojematthew@epicmail.com', 'testing group message', 'Ensure to Setup Environment variables', 'unread'];
var message3 = ['8e97d9e7-905b-4b6c-93aa-cce23790bf8b', '5fd08cce-092e-454f-896d-acd78dedb478', 'ojematthew@epicmail.com', 'testing group message', 'Ensure to Setup Environment variables', 'unread'];
var message4 = ['ab0b0739-c03e-4606-aff5-376eb2c146c6', 'ade0b372-7e17-4e3e-a3f3-d19e494d8333', 'ojematthew@epicmail.com', 'testing group message', 'Ensure to Setup Environment variables', 'unread'];
var message5 = ['e950ae91-60d8-43e6-98f2-49009dff7683', 'ade0b372-7e17-4e3e-a3f3-d19e494d8333', 'ojematthew@epicmail.com', 'testing group message', 'Ensure to Setup Environment variables', 'unread'];
/** End dummy groups messgaes */

var insertUsers =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var insertUser;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            insertUser = "INSERT INTO\n  users(email, firstName, lastName, password, recoveryEmail, createdOn, modifiedOn)\n  VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *";
            _context.next = 3;
            return _db.default.query(insertUser, user1values);

          case 3:
            _context.next = 5;
            return _db.default.query(insertUser, user2values);

          case 5:
            _context.next = 7;
            return _db.default.query(insertUser, user3values);

          case 7:
            _context.next = 9;
            return _db.default.query(insertUser, user4values);

          case 9:
            _context.next = 11;
            return _db.default.query(insertUser, user5values);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function insertUsers() {
    return _ref.apply(this, arguments);
  };
}();

var insertMessages =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var insertMessage;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            insertMessage = "INSERT INTO\n        messages(createdOn, receiverEmail, senderEmail, subject, message, parentMessageId, status)\n        VALUES($1, $2, $3, $4, $5, $6, $7)\n        RETURNING *";
            _context2.next = 3;
            return _db.default.query(insertMessage, mssg1values);

          case 3:
            _context2.next = 5;
            return _db.default.query(insertMessage, mssg2values);

          case 5:
            _context2.next = 7;
            return _db.default.query(insertMessage, mssg3values);

          case 7:
            _context2.next = 9;
            return _db.default.query(insertMessage, mssg4values);

          case 9:
            _context2.next = 11;
            return _db.default.query(insertMessage, mssg5values);

          case 11:
            _context2.next = 13;
            return _db.default.query(insertMessage, mssg6values);

          case 13:
            _context2.next = 15;
            return _db.default.query(insertMessage, mssg7values);

          case 15:
            _context2.next = 17;
            return _db.default.query(insertMessage, mssg8values);

          case 17:
            _context2.next = 19;
            return _db.default.query(insertMessage, mssg9values);

          case 19:
            _context2.next = 21;
            return _db.default.query(insertMessage, mssg10values);

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function insertMessages() {
    return _ref2.apply(this, arguments);
  };
}();

var insertGroups =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var insertGroup;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            insertGroup = "INSERT INTO\n    groups(id, name, description, ownerId)\n    VALUES($1, $2, $3, $4) RETURNING *";
            _context3.next = 3;
            return _db.default.query(insertGroup, group1);

          case 3:
            _context3.next = 5;
            return _db.default.query(insertGroup, group2);

          case 5:
            _context3.next = 7;
            return _db.default.query(insertGroup, group3);

          case 7:
            _context3.next = 9;
            return _db.default.query(insertGroup, group4);

          case 9:
            _context3.next = 11;
            return _db.default.query(insertGroup, group5);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function insertGroups() {
    return _ref3.apply(this, arguments);
  };
}();

var insertGroupMembers =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var addGroupMembersQuery;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            addGroupMembersQuery = "INSERT INTO\n    groupmembers(groupId, groupName, memberId, role)\n    VALUES($1, $2, $3, $4) RETURNING *";
            _context4.next = 3;
            return _db.default.query(addGroupMembersQuery, friesadmin);

          case 3:
            _context4.next = 5;
            return _db.default.query(addGroupMembersQuery, friesMember1);

          case 5:
            _context4.next = 7;
            return _db.default.query(addGroupMembersQuery, friesMember2);

          case 7:
            _context4.next = 9;
            return _db.default.query(addGroupMembersQuery, writersAdmin);

          case 9:
            _context4.next = 11;
            return _db.default.query(addGroupMembersQuery, writersMember1);

          case 11:
            _context4.next = 13;
            return _db.default.query(addGroupMembersQuery, writersMember2);

          case 13:
            _context4.next = 15;
            return _db.default.query(addGroupMembersQuery, campAdmin);

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function insertGroupMembers() {
    return _ref4.apply(this, arguments);
  };
}();

var insertGroupMessages =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5() {
    var groupMessageQuery;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            groupMessageQuery = "INSERT INTO\n      groupmessages(id, groupId, senderEmail, subject, message, status)\n      VALUES($1, $2, $3, $4, $5, $6)\n      returning *";
            _context5.next = 3;
            return _db.default.query(groupMessageQuery, message1);

          case 3:
            _context5.next = 5;
            return _db.default.query(groupMessageQuery, message2);

          case 5:
            _context5.next = 7;
            return _db.default.query(groupMessageQuery, message3);

          case 7:
            _context5.next = 9;
            return _db.default.query(groupMessageQuery, message4);

          case 9:
            _context5.next = 11;
            return _db.default.query(groupMessageQuery, message5);

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function insertGroupMessages() {
    return _ref5.apply(this, arguments);
  };
}();

var insertData =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6() {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return insertUsers();

          case 2:
            _context6.next = 4;
            return insertMessages();

          case 4:
            _context6.next = 6;
            return insertGroups();

          case 6:
            _context6.next = 8;
            return insertGroupMembers();

          case 8:
            _context6.next = 10;
            return insertGroupMessages();

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function insertData() {
    return _ref6.apply(this, arguments);
  };
}();

module.exports = {
  insertData: insertData
};

require('make-runnable');
//# sourceMappingURL=testdata.js.map