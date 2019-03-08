import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './jsobjectsdb/routes/userRoutes';
import { port } from './config';

const app = express();

dotenv.config();

app.use('/api/v1/users', userRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send('welcome');
});

console.log(port);

app.listen(port);

export default app;
