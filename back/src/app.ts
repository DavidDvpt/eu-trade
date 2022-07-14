import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

require('dotenv').config()

const app = express();

app.use(morgan('dev'));
app.use(helmet())

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use(express.json());

export default app;