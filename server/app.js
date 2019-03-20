import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import userRoutes from './routes/userRoutes';
import messagesRoutes from './routes/messagesRoutes';
import MessageController from './controllers/MessageController';

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded(true));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', userRoutes);
app.use('/api/v1', messagesRoutes);

app.get('/', (req, res) => {
  res.status(200).send('WELCOME TO EPICMAIL SERVICE');
});

app.get('/messages', MessageController.getInbox);
app.post('/messages', MessageController.create);


const port = process.env.PORT;
app.listen(port);

export default app;
