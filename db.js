/* eslint-disable no-console */
import { Pool } from 'pg';
import { config } from 'dotenv';

config();

let dbURI;

if (process.env.NODE_ENV === 'test') {
  dbURI = process.env.TEST_DATABASE_URL;
} else {
  dbURI = process.env.DATABASE_URL;
}

const pool = new Pool({
  connectionString: dbURI,
});

pool.on('connect', () => {
  console.log('connected to db');
});


/**
 * create users table
 */

const createUsersTable = () => {
  const usersTableQuery = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(200) UNIQUE NOT NULL,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        password VARCHAR(40) NOT NULL,
        userImage VARCHAR(500),
        createdOn TIMESTAMP,
        modifiedOn TIMESTAMP
      )`;
  console.log('about to table create');
  pool.query(usersTableQuery)
    .then((res) => {
      console.log('users table created', res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * drop users table
 */

const dropUsersTable = () => {
  const dropUsersQuery = 'DROP TABLE IF EXISTS users';
  console.log('users table about to be droped');
  pool.query(dropUsersQuery)
    .then((res) => {
      console.log('users table droped', res);
      console.log(res);
      pool.end();
    })
    .catch((res) => {
      console.log(res);
      pool.end();
    });
};

/**
 * create messages status type
 */
const messageStatustype = () => {
  const messageStatustypeQuery = `CREATE TYPE IF NOT EXISTS mssg_status AS ENUM
    (
      'read',
      'unread'
    )`;

  pool.query(messageStatustypeQuery)
    .then((res) => {
      console.log('enum created', res);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * create messages table
 */
const createMessagesTable = () => {
  const messageQuery = `CREATE TABLE IF NOT EXISTS
  messages(
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP,
    receiverId VARCHAR(40) NOT NULL,
    senderId VARCHAR(40) UNIQUE NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    parentMessageId INT DEFAULT 1,
    status mssg_status NOT NULL,
    FOREIGN KEY (senderId) REFERENCES users (email) ON DELETE CASCADE 
  )`;
  console.log('about to table create');
  pool.query(messageQuery)
    .then((res) => {
      console.log('message table created', res);
      pool.end();
    })
    .catch((err) => {
      console.log('table not created', err);
      pool.end();
    });
};

/**
 * drop messages table
 */
const dropMessagesTable = () => {
  const dropMessagesQuery = 'DROP TABLE IF EXISTS messages';
  pool.query(dropMessagesQuery)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * create groups table
 */
const groupsTable = () => {
  const groupQuery = `CREATE TABLE IF NOT EXISTS 
      groups(
        id SERIAL PRIMARY KEY,
        name VARCHAR(128) UNIQUE NOT NULL,
        description VARCHAR(500) NOT NULL,
        ownerId VARCHAR(128) NOT NULL
      )`;
  console.log('about to table create');
  pool.query(groupQuery)
    .then((res) => {
      console.log('groups table created ', res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * drop groups table
 */
const dropGroupsTable = () => {
  const dropGroupsQuery = 'DROP TABLE IF EXISTS groups';
  pool.query(dropGroupsQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * create group members table
 */
const groupMembersTable = () => {
  const groupMembersQuery = `CREATE TABLE IF NOT EXISTS 
      groupmembers(
        id UUID PRIMARY KEY,
        groupId VARCHAR(128) UNIQUE NOT NULL,
        groupName VARCHAR(128) UNIQUE NOT NULL,
        memberId VARCHAR(128) UNIQUE NOT NULL
      )`;
  console.log('about to table create');
  pool.query(groupMembersQuery)
    .then((res) => {
      console.log('group members table created', res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * drop group members
 */
const dropGroupMembersTable = () => {
  const dropGroupMembersQuery = 'DROP TABLE IF EXISTS groupmembers';
  pool.query(dropGroupMembersQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * create group messages tables
 */
const groupMessagesTable = () => {
  const groupMessagesQuery = `CREATE TABLE IF NOT EXISTS
      groupmessages(
        id SERIAL PRIMARY KEY,
        ownerId VARCHAR(128) UNIQUE NOT NULL,
        groupName VARCHAR(128) UNIQUE NOT NULL,
        message TEXT NOT NULL,
        parrentMessageId SERIAL,
        FOREIGN KEY (groupName) REFERENCES groups (name)
      )`;
  console.log('about to table create');
  pool.query(groupMessagesQuery)
    .then((res) => {
      console.log('group messages table created', res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


/**
 * drop group messages tables
 */
const dropGroupMessage = () => {
  const dropgroupMessageQuery = 'DROP TABLE IF EXISTS groupmessages';
  pool.query(dropgroupMessageQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


const createAllTables = () => {
  createUsersTable();
  createMessagesTable();
  messageStatustype();
  groupsTable();
  groupMembersTable();
  groupMessagesTable();
};

const dropAllTables = () => {
  dropUsersTable();
  dropMessagesTable();
  dropGroupsTable();
  dropGroupMembersTable();
  dropGroupMessage();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createAllTables,
  createUsersTable,
  messageStatustype,
  createMessagesTable,
  groupsTable,
  groupMembersTable,
  groupMessagesTable,
  dropUsersTable,
  dropMessagesTable,
  dropGroupsTable,
  dropGroupMembersTable,
  dropGroupMessage,
  dropAllTables,
};

require('make-runnable');
