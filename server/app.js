import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './jsobjectsdb/routes/userRoutes';
import MailController from './jsobjectsdb/controllers/MailController';
import UserController from './jsobjectsdb/controllers/UserController';
import Auth from './jsobjectsdb/dsmiddleware/AuthwithDS';


const app = express();

dotenv.config();

app.use(express.json());
app.use('/api/v1/users', userRoutes);

app.get('/', (req, res) => {
  res.send('welcome');
});

app.post('/mail', MailController.createMail);
app.post('/user', Auth.verifyToken, UserController.createUser);
app.post('/user/signin', UserController.signInUser);
app.get('/user/:id', UserController.getARegUser);
app.get('/users', UserController.getAllUsers);
app.get('/mail', MailController.getAll);
app.get('/mail/sent', MailController.getSentMails);
app.get('/mail/sent/:id', MailController.getASentMail);
app.get('/mail/drafts', MailController.getDrafts);
app.get('/mail/drafts/:id', MailController.getADraftMail);

const port = process.env.PORT;

app.listen(port);

export default app;
