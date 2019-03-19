import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import userRoutes from './jsobjectsdb/routes/userRoutes';
import MessageController from './postgresdb/controllers/MessageController';

const app = express();

dotenv.config();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', userRoutes);

app.get('/', (req, res) => {
  res.status(200).send('WELCOME TO EPICMAIL SERVICE');
});

app.get('/messages', MessageController.getInbox);
app.post('/messages', MessageController.create);


const port = process.env.PORT;
app.listen(port);

export default app;
