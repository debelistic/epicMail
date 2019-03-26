import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import userRoutes from './routes/userRoutes';
import messagesRoutes from './routes/messagesRoutes';
import groupsRoutes from './routes/groupsRoutes';

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', userRoutes);
app.use('/api/v1', messagesRoutes);
app.use('/api/v1', groupsRoutes);


app.get('/', (req, res) => {
  res.status(200).send('WELCOME TO EPICMAIL SERVICE');
});


const port = process.env.PORT;
app.listen(port);

console.log('Babel is watching');
export default app;
