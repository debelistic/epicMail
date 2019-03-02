import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  dev: process.env.NODE_ENV,
};
