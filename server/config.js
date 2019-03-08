import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  dev: process.env.NODE_ENV,
  port: process.env.PORT,
  sercet: process.env.SECRET,
};
