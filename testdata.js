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

module.exports = {
  insertUsers,
};

require('make-runnable');
