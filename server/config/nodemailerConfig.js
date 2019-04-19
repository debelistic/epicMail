import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();

const Transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: 'true',
  port: '465',
  auth: {
    type: 'OAuth2',
    user: 'victorawotidebe@gmail.com',
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

/**
 * Email sent to user to reset password
 * @param {userEmailAddress} String:user email address
 * @param {username}  String:user first name
 * @param {host} String:request host address
 * @param {token} SecureToken:token
 * @returns{email}Email:reset password mail
 */
const MailOptions = async (useraddress, username, host, token) => ({
  from: 'EpicMail <victorawotidebe@gmail.com>',
  to: useraddress,
  subject: 'Epicmail Password Reset',
  text: `Hi ${username},
          You requested to change your password, if you did not
          ignore this message. This link expires in 20 minutes
          Your password link is 
          http://${host}/auth/resetpass/${token}`,
});

export {
  Transporter,
  MailOptions,
};
