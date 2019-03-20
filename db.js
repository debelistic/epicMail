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

const createUsersTable = async () => {
  const usersTableQuery = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(500) UNIQUE NOT NULL,
        firstName VARCHAR(500) NOT NULL,
        lastName VARCHAR(500) NOT NULL,
        password VARCHAR(500) NOT NULL,
        userImage VARCHAR(500),
        securityQuestion VARCHAR(500) NOT NULL,
        createdOn TIMESTAMP,
        modifiedOn TIMESTAMP
      )`;
  console.log('about to create users table');
  await pool.query(usersTableQuery)
    .then((res) => {
      console.log('users table created', res);
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * drop users table
 */

const dropUsersTable = async () => {
  const dropUsersQuery = 'DROP TABLE IF EXISTS users';
  console.log('users table about to be droped');
  await pool.query(dropUsersQuery)
    .then((res) => {
      console.log('users table droped');
      console.log(res);
    })
    .catch((res) => {
      console.log(res);
    });
};

/**
 * create messages status type
 */
const messageStatustype = async () => {
  const messageStatustypeQuery = `CREATE TYPE message_status AS ENUM
  (
    'read',
    'unread',
    'draft'
  )`;

  await pool.query(messageStatustypeQuery)
    .then((res) => {
      console.log('enum created', res);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const dropmessageStatustype = async () => {
  const dropmessageStatustypeQuery = 'DROP TYPE IF EXISTS message_status';
  await pool.query(dropmessageStatustypeQuery)
    .then((res) => {
      console.log('enum deleted', res);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * create messages table
 */
const createMessagesTable = async () => {
  const messageQuery = `CREATE TABLE IF NOT EXISTS
  messages(
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP,
    receiverEmail VARCHAR(500),
    senderEmail VARCHAR(500) REFERENCES users (email),
    subject TEXT NOT NULL DEFAULT 'No Subject',
    message TEXT NOT NULL DEFAULT 'No Message',
    parentMessageId INT DEFAULT 1,
    status message_status NOT NULL DEFAULT 'draft'
  )`;
  console.log('about to create message table');
  await pool.query(messageQuery)
    .then((res) => {
      console.log('message table created', res);
    })
    .catch((err) => {
      console.log('table not created', err);
    });
};

/**
 * drop messages table
 */
const dropMessagesTable = async () => {
  const dropMessagesQuery = 'DROP TABLE IF EXISTS messages';
  await pool.query(dropMessagesQuery)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * create groups table
 */
const groupsTable = async () => {
  const groupQuery = `CREATE TABLE IF NOT EXISTS 
      groups(
        id SERIAL PRIMARY KEY,
        name VARCHAR(128) UNIQUE NOT NULL,
        description VARCHAR(500) NOT NULL,
        ownerId VARCHAR(128) NOT NULL
      )`;
  console.log('about to table create');
  await pool.query(groupQuery)
    .then((res) => {
      console.log('groups table created ', res);
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * drop groups table
 */
const dropGroupsTable = async () => {
  const dropGroupsQuery = 'DROP TABLE IF EXISTS groups';
  await pool.query(dropGroupsQuery)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * create group members table
 */
const groupMembersTable = async () => {
  const groupMembersQuery = `CREATE TABLE IF NOT EXISTS 
      groupmembers(
        id UUID PRIMARY KEY,
        groupId VARCHAR(128) UNIQUE NOT NULL,
        groupName VARCHAR(128) UNIQUE NOT NULL,
        memberId VARCHAR(128) UNIQUE NOT NULL
      )`;
  console.log('about to table create');
  await pool.query(groupMembersQuery)
    .then((res) => {
      console.log('group members table created', res);
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * drop group members
 */
const dropGroupMembersTable = async () => {
  const dropGroupMembersQuery = 'DROP TABLE IF EXISTS groupmembers';
  await pool.query(dropGroupMembersQuery)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * create group messages tables
 */
const groupMessagesTable = async () => {
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
  await pool.query(groupMessagesQuery)
    .then((res) => {
      console.log('group messages table created', res);
    })
    .catch((err) => {
      console.log(err);
    });
};


/**
 * drop group messages tables
 */
const dropGroupMessage = async () => {
  const dropgroupMessageQuery = 'DROP TABLE IF EXISTS groupmessages';
  await pool.query(dropgroupMessageQuery)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};


const createAllTables = () => {
  createUsersTable();
  messageStatustype();
  createMessagesTable();
  groupsTable();
  groupMembersTable();
  groupMessagesTable();
};

const dropAllTables = () => {
  dropGroupMembersTable();
  dropGroupMessage();
  dropGroupsTable();
  dropUsersTable();
  dropmessageStatustype();
  dropMessagesTable();
};

pool.on('remove', () => {
  pool.end();
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
  dropmessageStatustype,
  dropAllTables,
};

require('make-runnable');
