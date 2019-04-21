"use strict";

var _pg = require("pg");

var _dotenv = require("dotenv");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require('@babel/polyfill');

(0, _dotenv.config)();
var dbURI;

if (process.env.NODE_ENV.trim() === 'test') {
  dbURI = process.env.TEST_DATABASE_URL;
} else {
  dbURI = process.env.DATABASE_URL;
}

var pool = new _pg.Pool({
  connectionString: dbURI
});
pool.on('connect', function () {
  console.log('connected to db');
});
/**
 * create users table
 */

var createUsersTable =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var usersTableQuery;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            usersTableQuery = "CREATE TABLE IF NOT EXISTS\n      users(\n        id SERIAL PRIMARY KEY,\n        email VARCHAR(500) UNIQUE NOT NULL,\n        firstName VARCHAR(500) NOT NULL,\n        lastName VARCHAR(500) NOT NULL,\n        userImage TEXT,\n        password VARCHAR(500) NOT NULL,\n        recoveryEmail VARCHAR(500) UNIQUE NOT NULL,\n        createdOn TIMESTAMP,\n        modifiedOn TIMESTAMP\n      )";
            _context.next = 3;
            return pool.query(usersTableQuery);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createUsersTable() {
    return _ref.apply(this, arguments);
  };
}();
/**
 * drop users table
 */


var dropUsersTable =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var dropUsersQuery;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dropUsersQuery = 'DROP TABLE IF EXISTS users';
            _context2.next = 3;
            return pool.query(dropUsersQuery);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function dropUsersTable() {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * create messages status type
 */


var messageStatustype =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var messageStatustypeQuery;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            messageStatustypeQuery = "CREATE TYPE message_status AS ENUM\n  (\n    'read',\n    'unread',\n    'draft'\n  )";
            _context3.next = 3;
            return pool.query(messageStatustypeQuery);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function messageStatustype() {
    return _ref3.apply(this, arguments);
  };
}();

var dropmessageStatustype =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var dropmessageStatustypeQuery;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            dropmessageStatustypeQuery = 'DROP TYPE IF EXISTS message_status';
            _context4.next = 3;
            return pool.query(dropmessageStatustypeQuery);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function dropmessageStatustype() {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * create messages table
 */


var createMessagesTable =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5() {
    var messageQuery;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            messageQuery = "CREATE TABLE IF NOT EXISTS\n  messages(\n    id SERIAL PRIMARY KEY,\n    createdOn TIMESTAMP,\n    receiverEmail VARCHAR(500),\n    senderEmail VARCHAR(500) REFERENCES users (email),\n    subject TEXT NOT NULL DEFAULT 'No Subject',\n    message TEXT NOT NULL DEFAULT 'No Message',\n    parentMessageId UUID,\n    status message_status NOT NULL DEFAULT 'unread'\n  )";
            _context5.next = 3;
            return pool.query(messageQuery);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function createMessagesTable() {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * drop messages table
 */


var dropMessagesTable =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6() {
    var dropMessagesQuery;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            dropMessagesQuery = 'DROP TABLE IF EXISTS messages';
            _context6.next = 3;
            return pool.query(dropMessagesQuery);

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function dropMessagesTable() {
    return _ref6.apply(this, arguments);
  };
}();
/**
 * create groups table
 */


var groupsTable =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7() {
    var groupQuery;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            groupQuery = "CREATE TABLE IF NOT EXISTS \n      groups(\n        id UUID PRIMARY KEY,\n        name VARCHAR(128) UNIQUE NOT NULL,\n        description VARCHAR(500) NOT NULL,\n        ownerId VARCHAR(128) NOT NULL\n      )";
            _context7.next = 3;
            return pool.query(groupQuery);

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function groupsTable() {
    return _ref7.apply(this, arguments);
  };
}();
/**
 * drop groups table
 */


var dropGroupsTable =
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8() {
    var dropGroupsQuery;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            dropGroupsQuery = 'DROP TABLE IF EXISTS groups';
            _context8.next = 3;
            return pool.query(dropGroupsQuery);

          case 3:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function dropGroupsTable() {
    return _ref8.apply(this, arguments);
  };
}();
/**
 * create group members table
 */


var groupMembersTable =
/*#__PURE__*/
function () {
  var _ref9 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9() {
    var groupMembersQuery;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            groupMembersQuery = "CREATE TABLE IF NOT EXISTS \n      groupmembers(\n        id SERIAL PRIMARY KEY,\n        groupId UUID NOT NULL,\n        role TEXT NOT NULL DEFAULT 'member',\n        groupName VARCHAR(128) NOT NULL,\n        memberId VARCHAR(128) NOT NULL\n      )";
            _context9.next = 3;
            return pool.query(groupMembersQuery);

          case 3:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function groupMembersTable() {
    return _ref9.apply(this, arguments);
  };
}();
/**
 * drop group members
 */


var dropGroupMembersTable =
/*#__PURE__*/
function () {
  var _ref10 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10() {
    var dropGroupMembersQuery;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            dropGroupMembersQuery = 'DROP TABLE IF EXISTS groupmembers';
            _context10.next = 3;
            return pool.query(dropGroupMembersQuery);

          case 3:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function dropGroupMembersTable() {
    return _ref10.apply(this, arguments);
  };
}();
/**
 * create group messages tables
 */


var groupMessagesTable =
/*#__PURE__*/
function () {
  var _ref11 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee11() {
    var groupMessagesQuery;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            groupMessagesQuery = "CREATE TABLE IF NOT EXISTS\n      groupmessages(\n        id UUID PRIMARY KEY,\n        senderEmail VARCHAR(128) NOT NULL,\n        groupId UUID NOT NULL,\n        subject TEXT NOT NULL,\n        message TEXT NOT NULL,\n        status message_status NOT NULL DEFAULT 'unread',\n        parrentMessageId UUID\n      )";
            _context11.next = 3;
            return pool.query(groupMessagesQuery);

          case 3:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function groupMessagesTable() {
    return _ref11.apply(this, arguments);
  };
}();
/**
 * drop group messages tables
 */


var dropGroupMessage =
/*#__PURE__*/
function () {
  var _ref12 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee12() {
    var dropgroupMessageQuery;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            dropgroupMessageQuery = 'DROP TABLE IF EXISTS groupmessages';
            _context12.next = 3;
            return pool.query(dropgroupMessageQuery);

          case 3:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));

  return function dropGroupMessage() {
    return _ref12.apply(this, arguments);
  };
}();

var createAllTables =
/*#__PURE__*/
function () {
  var _ref13 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee13() {
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            pool.connect();
            _context13.next = 3;
            return createUsersTable();

          case 3:
            _context13.next = 5;
            return messageStatustype();

          case 5:
            _context13.next = 7;
            return createMessagesTable();

          case 7:
            _context13.next = 9;
            return groupsTable();

          case 9:
            _context13.next = 11;
            return groupMembersTable();

          case 11:
            _context13.next = 13;
            return groupMessagesTable();

          case 13:
            pool.end();

          case 14:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));

  return function createAllTables() {
    return _ref13.apply(this, arguments);
  };
}();

var dropAllTables =
/*#__PURE__*/
function () {
  var _ref14 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee14() {
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            pool.connect();
            _context14.next = 3;
            return dropGroupMembersTable();

          case 3:
            _context14.next = 5;
            return dropGroupMessage();

          case 5:
            _context14.next = 7;
            return dropGroupsTable();

          case 7:
            _context14.next = 9;
            return dropMessagesTable();

          case 9:
            _context14.next = 11;
            return dropUsersTable();

          case 11:
            _context14.next = 13;
            return dropmessageStatustype();

          case 13:
            pool.end();

          case 14:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));

  return function dropAllTables() {
    return _ref14.apply(this, arguments);
  };
}();

pool.on('remove', function () {
  pool.end();
  console.log('client removed');
  process.exit(0);
});
module.exports = {
  createAllTables: createAllTables,
  createUsersTable: createUsersTable,
  messageStatustype: messageStatustype,
  createMessagesTable: createMessagesTable,
  groupsTable: groupsTable,
  groupMembersTable: groupMembersTable,
  groupMessagesTable: groupMessagesTable,
  dropUsersTable: dropUsersTable,
  dropMessagesTable: dropMessagesTable,
  dropGroupsTable: dropGroupsTable,
  dropGroupMembersTable: dropGroupMembersTable,
  dropGroupMessage: dropGroupMessage,
  dropmessageStatustype: dropmessageStatustype,
  dropAllTables: dropAllTables
};

require('make-runnable');
//# sourceMappingURL=models.js.map