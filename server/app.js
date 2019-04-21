import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import Sanitize from './middleware/Sanitize';
import userRoutes from './routes/userRoutes';
import messagesRoutes from './routes/messagesRoutes';
import groupsRoutes from './routes/groupsRoutes';

const app = express();

config();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(Sanitize.trimInput);

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', userRoutes);
app.use('/api/v1', messagesRoutes);
app.use('/api/v1', groupsRoutes);


app.use((req, res, next) => {
  const error = new Error('Your request could not be found');
  error.status = 404;
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  const { message } = error;
  res.status(error.status || 500).send({
    message,
  });
});


const port = process.env.PORT;
app.listen(port);

export default app;
