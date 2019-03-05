import express from 'express';
import MailController from './jsobjectsdb/controllers/MailController';
import UserController from './jsobjectsdb/controllers/UserController';


const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('welcome');
});

app.post('/mail', MailController.createMail);
app.post('/user', UserController.createUser);
app.post('/user/signin', UserController.signInUser);
app.get('/mail', MailController.getAll);
app.get('/sentmails', MailController.getSentMails);
app.get('/sentmails/:id', MailController.getASentMail);
app.get('/drafts', MailController.getDrafts);
app.get('/drafts/:id', MailController.getADraftMail);

const port = 7000 || process.env.PORT;

app.listen(port);
