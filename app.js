// setting prerequisites
require('dotenv').config();

const express = require('express'),
  morgan = require('morgan'),
  mongoose = require('mongoose'),
  cors = require('cors');

// routes import
const vendorRoutes = require('./routes/vendor'),
  hrAccountRoutes = require('./routes/hrAccount'),
  loginRoutes = require('./routes/login');

// middlewares
const app = express();
app
  .use(morgan('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cors())
  .use(express.static('public'));

// access routes
app
  .get('/', (req, res) => {
    res.send('Welcome to MHC API!');
  })
  .use('/api/v1/vendor', vendorRoutes)
  .use('/api/v1/hraccount', hrAccountRoutes)
  .use('/api/v1/login', loginRoutes);

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
    .connect(DB_URI, { useNewUrlParser: true })
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
