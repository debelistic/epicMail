/* eslint-disable no-console */
import { Pool } from 'pg';
import { config } from 'dotenv';

config();

let dbURI;

if (process.env.NODE_ENV.trim() === 'test') {
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
        userImage TEXT,
        password VARCHAR(500) NOT NULL,
        recoveryEmail VARCHAR(500) UNIQUE NOT NULL,
        createdOn TIMESTAMP,
        modifiedOn TIMESTAMP
      )`;
  await pool.query(usersTableQuery);
};

/**
 * drop users table
 */

const dropUsersTable = async () => {
  const dropUsersQuery = 'DROP TABLE IF EXISTS users';
  await pool.query(dropUsersQuery);
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
  await pool.query(messageStatustypeQuery);
};

const dropmessageStatustype = async () => {
  const dropmessageStatustypeQuery = 'DROP TYPE IF EXISTS message_status';
  await pool.query(dropmessageStatustypeQuery);
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
    parentMessageId UUID,
    status message_status NOT NULL DEFAULT 'unread'
  )`;
  await pool.query(messageQuery);
};

/**
 * drop messages table
 */
const dropMessagesTable = async () => {
  const dropMessagesQuery = 'DROP TABLE IF EXISTS messages';
  await pool.query(dropMessagesQuery);
};

/**
 * create groups table
 */
const groupsTable = async () => {
  const groupQuery = `CREATE TABLE IF NOT EXISTS 
      groups(
        id UUID PRIMARY KEY,
        name VARCHAR(128) UNIQUE NOT NULL,
        description VARCHAR(500) NOT NULL,
        ownerId VARCHAR(128) NOT NULL
      )`;
  await pool.query(groupQuery);
};

/**
 * drop groups table
 */
const dropGroupsTable = async () => {
  const dropGroupsQuery = 'DROP TABLE IF EXISTS groups';
  await pool.query(dropGroupsQuery);
};

/**
 * create group members table
 */
const groupMembersTable = async () => {
  const groupMembersQuery = `CREATE TABLE IF NOT EXISTS 
      groupmembers(
        id SERIAL PRIMARY KEY,
        groupId UUID NOT NULL,
        role TEXT NOT NULL DEFAULT 'member',
        groupName VARCHAR(128) NOT NULL,
        memberId VARCHAR(128) NOT NULL
      )`;
  await pool.query(groupMembersQuery);
};

/**
 * drop group members
 */
const dropGroupMembersTable = async () => {
  const dropGroupMembersQuery = 'DROP TABLE IF EXISTS groupmembers';
  await pool.query(dropGroupMembersQuery);
};

/**
 * create group messages tables
 */
const groupMessagesTable = async () => {
  const groupMessagesQuery = `CREATE TABLE IF NOT EXISTS
      groupmessages(
        id UUID PRIMARY KEY,
        senderEmail VARCHAR(128) NOT NULL,
        groupId UUID NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        status message_status NOT NULL DEFAULT 'unread',
        parrentMessageId UUID
      )`;
  await pool.query(groupMessagesQuery);
};


/**
 * drop group messages tables
 */
const dropGroupMessage = async () => {
  const dropgroupMessageQuery = 'DROP TABLE IF EXISTS groupmessages';
  await pool.query(dropgroupMessageQuery);
};


const createAllTables = async () => {
  pool.connect();
  await createUsersTable();
  await messageStatustype();
  await createMessagesTable();
  await groupsTable();
  await groupMembersTable();
  await groupMessagesTable();
  pool.end();
};

const dropAllTables = async () => {
  pool.connect();
  await dropGroupMembersTable();
  await dropGroupMessage();
  await dropGroupsTable();
  await dropMessagesTable();
  await dropUsersTable();
  await dropmessageStatustype();
  pool.end();
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
