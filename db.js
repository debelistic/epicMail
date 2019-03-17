/* eslint-disable no-console */
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
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
        email VARCHAR(40) UNIQUE NOT NULL,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        password VARCHAR(40) NOT NULL,
        userImage VARCHAR(500),
        createdOn TIMESTAMP,
        modifiedOn TIMESTAMP
      )`;

  pool.query(usersTableQuery)
    .then((res) => {
      console.log('table created', res);
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
  const dropUsersQuery = 'DROP TABLE IF EXISTS users RETURNING *';
  pool.query(dropUsersQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((res) => {
      console.log(res);
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
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        parentMessageId SERIAL DEFAULT 1,
        status TEXT NOT NULL,
        FOREIGN KEY (senderId) REFRENCES users (id),
        receiverId VARCHAR(40) NOT NULL
      )`;

  pool.query(messageQuery)
    .then((res) => {
      console.log('message table created', res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * drop messages table
 */
const dropMessagesTable = () => {
  const dropMessagesQuery = 'DROP TABLE IF EXISTS messages RETURNING *';
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
        name VARCHAR(128) NOT NULL,
        description VARCHAR(500) NOT NULL,
        FOREIGN KEY (ownerId) REFRENCES users (id)
      )`;

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
  const dropGroupsQuery = 'DROP TABLE IF EXISTS groups RETURNING *';
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
  const groupMembersQuery = `CREATE TABLE IF NOT EXIST 
      groupmembers(
        id UIDD PRIMARY KEY,
        FOREIGN KEY (groupId) REFRENCES groups (id) ON DELETE CASCADE,
        FOREIGN KEY (groupName) REFRENCES groups (name) ON DELETE CASCADE,
        FOREIGN KEY (memberId) REFRENCES users (id) ON DELETE CASCADE,
      )`;

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
        FOREIGN KEY (ownerId) REFRENCES groupmembers (memberId) NOT NULL,
        FOREIGN KEY (groupName) REFRENCES groupmembers (groupName) NOT NULL,
        message TEXT NOT NULL,
        parrentMessageId SERIAL
      )`;
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
  const dropgroupMessageQuery = 'DROP TABLE IF EXISTS groupmessages RETURNING *';
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
  createUsersTable,
  createMessagesTable,
  groupsTable,
  groupMembersTable,
  groupMessagesTable,
  createAllTables,
  dropUsersTable,
  dropMessagesTable,
  dropGroupsTable,
  dropGroupMembersTable,
  dropGroupMessage,
  dropAllTables,
};

require('make-runnable');
