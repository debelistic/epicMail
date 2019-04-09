import uuidv4 from 'uuid/v4';
import db from './server/db';

const insertUsers = async () => {
  const insertUser = `INSERT INTO
  users(email, firstName, lastName, password, securitykey, createdOn, modifiedOn)
  VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
  const user1values = [
    'franchesqa@epicmail.com',
    'franchess',
    'sandra',
    'yh89uyightGH',
    'hashSecurity',
    new Date(),
    new Date(),
  ];

  const user2values = [
    'ojematthew@epicmail.com',
    'ifeoluwa',
    'matthew',
    'yh89uyightGH',
    'hashSecurity',
    new Date(),
    new Date(),
  ];

  const user3values = [
    'toluniyin@epicmail.com',
    'toluwalope',
    'iyinoluwa',
    'yh89uyightGH',
    'hashSecurity',
    new Date(),
    new Date(),
  ];

  const user4values = [
    'vincicode@epicmail.com',
    'vinci',
    'lorenzo',
    'yh89uyightGH',
    'hashSecurity',
    new Date(),
    new Date(),
  ];

  await db.query(insertUser, user1values);
  await db.query(insertUser, user2values);
  await db.query(insertUser, user3values);
  await db.query(insertUser, user4values);
};

const insertMessages = async () => {
  const insertMessage = `INSERT INTO
        messages(createdOn, receiverEmail, senderEmail, subject, message, parentMessageId, status)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`;
  const mssg1values = [
    new Date(),
    'ojematthew@epicmail.com',
    'vincicode@epicmail.com',
    'testdata',
    'testing with mocha is fun',
    uuidv4(),
    'unread',
  ];

  const mssg2values = [
    new Date(),
    'ojematthew@epicmail.com',
    'vincicode@epicmail.com',
    'grepping',
    'npm testing api, api is application....',
    uuidv4(),
    'unread',
  ];

  const mssg3values = [
    new Date(),
    'toluniyin@epicmail.com',
    'vincicode@epicmail.com',
    'testdata',
    'testing with mocha is fun',
    uuidv4(),
    'unread',
  ];

  const mssg4values = [
    new Date(),
    'franchesqa@epicmail.com',
    'vincicode@epicmail.com',
    'grepping',
    'npm testing api, api is application....',
    uuidv4(),
    'unread',
  ];

  const mssg5values = [
    new Date(),
    'vincicode@epicmail.com',
    'franchesqa@epicmail.com',
    'grepping',
    'npm testing api, api is application....',
    uuidv4(),
    'unread',
  ];

  const mssg6values = [
    new Date(),
    'vincicode@epicmail.com',
    'ojematthew@epicmail.com',
    'grepping',
    'npm testing api, api is application....',
    uuidv4(),
    'unread',
  ];

  const mssg7values = [
    new Date(),
    'vincicode@epicmail.com',
    'toluniyin@epicmail.com',
    'testdata',
    'testing with mocha is fun',
    uuidv4(),
    'unread',
  ];

  const mssg8values = [
    new Date(),
    'vincicode@epicmail.com',
    'franchesqa@epicmail.com',
    'grepping',
    'npm testing api, api is application....',
    uuidv4(),
    'draft',
  ];

  const mssg9values = [
    new Date(),
    'vincicode@epicmail.com',
    'ojematthew@epicmail.com',
    'grepping',
    'npm testing api, api is application....',
    uuidv4(),
    'draft',
  ];

  const mssg10values = [
    new Date(),
    'vincicode@epicmail.com',
    'toluniyin@epicmail.com',
    'testdata',
    'testing with mocha is fun',
    uuidv4(),
    'draft',
  ];

  await db.query(insertMessage, mssg1values);
  await db.query(insertMessage, mssg2values);
  await db.query(insertMessage, mssg3values);
  await db.query(insertMessage, mssg4values);
  await db.query(insertMessage, mssg5values);
  await db.query(insertMessage, mssg6values);
  await db.query(insertMessage, mssg7values);
  await db.query(insertMessage, mssg8values);
  await db.query(insertMessage, mssg9values);
  await db.query(insertMessage, mssg10values);
};

const insertData = async () => {
  await insertUsers();
  await insertMessages();
};

module.exports = {
  insertData,
};

require('make-runnable');
