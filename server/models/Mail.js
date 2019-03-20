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
  await pool.query(messageStatustypeQuery, (res) => {
    console.log(res);
  });
};

const dropmessageStatustype = async () => {
  const dropmessageStatustypeQuery = 'DROP TYPE IF EXISTS message_status';
  await pool.query(dropmessageStatustypeQuery, (res) => {
    console.log(res);
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
  await pool.query(messageQuery, (res) => {
    console.log(res);
  });
};

/**
 * drop messages table
 */
const dropMessagesTable = async () => {
  const dropMessagesQuery = 'DROP TABLE IF EXISTS messages';
  await pool.query(dropMessagesQuery, (res) => {
    console.log(res);
  });
};