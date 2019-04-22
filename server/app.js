import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import Sanitize from './middleware/Sanitize';
import userRoutes from './routes/userRoutes';
import messagesRoutes from './routes/messagesRoutes';
import groupsRoutes from './routes/groupsRoutes';

const app = express();

config();

app.use(helmet());
app.use(compression());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(Sanitize.trimInput);

// CORS Headers Access
app.use((req, res, next) => {
  res.header('Access-Controll-Allow-Origin', '*');
  res.header(
    'Access-Controll-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  return next();
});

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', userRoutes);
app.use('/api/v1', messagesRoutes);
app.use('/api/v1', groupsRoutes);


app.get('/', (req, res) => {
  res.status(200).send({
    message: 'WELCOME TO EPICMAIL SERVICE',
  });
});

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
