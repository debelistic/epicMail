import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './jsobjectsdb/routes/userRoutes';

const app = express();

dotenv.config();

app.use(express.json());
app.use('/api/v1/users', userRoutes);

const port = process.env.PORT;
app.listen(port);

export default app;
