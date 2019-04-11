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

  const user5values = [
    'petergolden@epicmail.com',
    'peter',
    'golden',
    'yh89uyightGH',
    'hashSecurity',
    new Date(),
    new Date(),
  ];

  await db.query(insertUser, user1values);
  await db.query(insertUser, user2values);
  await db.query(insertUser, user3values);
  await db.query(insertUser, user4values);
  await db.query(insertUser, user5values);
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

const insertGroups = async () => {
  const insertGroup = `INSERT INTO
    groups(id, name, description, ownerId)
    VALUES($1, $2, $3, $4) RETURNING *`;

  const group1 = [
    '5fd08cce-092e-454f-896d-acd78dedb478',
    'fries maker',
    'we make fries for a living',
    'franchesqa@epicmail.com',
  ];
  const group2 = [
    'ade0b372-7e17-4e3e-a3f3-d19e494d8333',
    'post writer',
    'fingers that change the world',
    'ojematthew@epicmail.com',
  ];
  const group3 = [
    'f04bd8ee-e63a-42e1-8264-d195df5316c8',
    'camp support',
    'helping campers enjoy camping',
    'toluniyin@epicmail.com',
  ];
  const group4 = [
    'cb73a9c9-07e2-4efd-8deb-1c71c25c6eed',
    'data students',
    'help students analyze and manipulate data',
    'vincicode@epicmail.com',
  ];
  const group5 = [
    '213be43d-69b5-4fc2-8475-c4ca6cf75124',
    'vs coder',
    'get the latest updates on vs code',
    'petergolden@epicmail.com',
  ];

  await db.query(insertGroup, group1);
  await db.query(insertGroup, group2);
  await db.query(insertGroup, group3);
  await db.query(insertGroup, group4);
  await db.query(insertGroup, group5);
};

const insertData = async () => {
  await insertUsers();
  await insertMessages();
  await insertGroups();
};

module.exports = {
  insertData,
};

require('make-runnable');
