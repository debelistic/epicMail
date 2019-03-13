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

const createTables = () => {
  const userTableQuery = `CREATE TABLE IF NOT EXITS users(
     id UUID PRIMARY KEY,
     email VARCHAR(128) NOT NULL,
     firstName VARCHAR(128) NOT NULL,
     lastName VARCHAR(128) NOT NULL,
     password VARCHAR(128) NOT NULL,
   )`;

  pool.query(userTableQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    });
};
