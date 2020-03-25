import dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});

import express from 'express';
import api from './api';
import db from './utils/db';
import 'colors';
// security
import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import compression from 'compression';

const app = express();

const PORT = process.env.PORT || 5000;

db();

app.use(express.json());
app.use(
  express.urlencoded({
    limit: '16mb',
    extended: true,
    parameterLimit: 50000
  })
);

app.use(helmet());
app.use(compression());
app.use(xss());
app.use(hpp());
app.use(cors());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 1500
});
app.use(limiter);

app.use('/api/v1', api);

app.get('/', (req, res) => {
  return res.sendStatus(200);
});

app.listen(PORT, () => console.info(`App running on port ${PORT}`.blue.bold));
