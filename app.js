// setting prerequisites
require('dotenv').config();

import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';

// middlewares
const app = express();
app
  .use(morgan('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cors());

// routes
app.get('/', (req, res) => {
  res.send('Welcome to MHC API!');
});

// error handler
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = err;
  res.status(err.status || 500);
  res.json({ status: 'Error', err });
});

// mongoDB connection

const { DB_URI } = process.env,
  { DB_LOCAL } = process.env,
  { DB_TEST } = process.env;

if (process.env.NODE_ENV === 'test') {
  mongoose.connect(DB_TEST, { useNewUrlParser: true });
} else {
  mongoose
    .connect(DB_LOCAL, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
}

// start the server

const { PORT } = process.env || 8000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// deprecation settings

mongoose
  .set('useNewUrlParser', true)
  .set('useFindAndModify', false)
  .set('useCreateIndex', true);

// exports app

module.exports = app;
