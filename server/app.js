import express from 'express';
import MailController from './jsobjectsdb/controllers/MailController';


const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('welcome');
});

app.post('/mail', MailController.createMail);
app.get('/mail', MailController.getAll);
app.get('/sentmails', MailController.getSentMails);
app.get('/sentmails/:id', MailController.getASentMail);
app.get('/drafts', MailController.getDrafts);
app.get('/drafts/:id', MailController.getADraftMail);

const port = 7000 || process.env.PORT;

app.listen(port);
