import nodemailer from 'nodemailer';
import { config } from 'dotenv';
import xoauth2 from 'xoauth2';

config();

const xoauth2gen = xoauth2.createXOAuth2Generator({
  type: 'OAuth2',
  user: 'victorawotidebe@gmail.com',
  clientId: process.env.OAUTH_CLIENT_ID,
  clientSecret: process.env.OAUTH_CLIENT_SECRET,
  refreshToken: process.env.OAUTH_REFRESH_TOKEN,
});

const Transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: 'true',
  port: '465',
  auth: xoauth2gen,
});

export default Transporter;
