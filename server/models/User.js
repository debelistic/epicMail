import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool {
  
}
/**
 * create users table
 */

const UserModel = {
  async createUsersTable() {
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
    pool.query(usersTableQuery, (res) => {
      console.log(res);
    });
  },
  async dropUsersTable() {
    const dropUsersQuery = 'DROP TABLE IF EXISTS users';
    console.log('users table about to be droped');
    pool.query(dropUsersQuery, (res) => {
      console.log(res);
    });
  },
};

export default UserModel;
