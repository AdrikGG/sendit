const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/users');
const roomRoutes = require('./api/routes/rooms');
const dashboardRoute = require('./api/routes/dashboard');
require('dotenv').config();

mongoose.connect(process.env.DATABASE, {
  dbName: 'test',
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose Connection ERROR: ' + err.message);
});

mongoose.connection.once('open', () => {
  console.log('MongoDB Connected');
});

// app.use('/', express.static('./frontend/build'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS error handling
app.use((req, res, next) => {
  console.log('Request origin: ', req.get('Origin'));
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');

  if (req.method === 'OPTIONS') {
    return next();
  }

  next();
});

app.use('/user', userRoutes);
app.use('/room', roomRoutes);
app.use('/', dashboardRoute);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
  console.log(res);
});

module.exports = app;
