import dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});

import express from 'express';
import api from './api';
import 'colors';
import db from './utils/db';

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  return res.sendStatus(200);
});

db();

app.use('/api', api);

app.listen(PORT, () => console.info(`App running on port ${PORT}`.blue.bold));
