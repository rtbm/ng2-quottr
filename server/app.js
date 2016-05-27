'use strict';
const express = require('express');
const winston = require('winston');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const logger = require('./utils/logger');
const cors = require('cors');

const distPath = path.join(__dirname, '../public');

const app = express();

app.use(require('morgan')('dev', { stream: logger.stream }));

mongoose.connect('mongodb://localhost:27017/ng2app-db');

//app.use(helmet());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(distPath));

const articles = require('./routes/articles');
const auth = require('./routes/auth');

app.use('/api/articles', articles);
app.use('/api/auth', auth);
app.use('*', (req, res) => res.sendFile(path.join(distPath, 'index.html')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});


module.exports = app;
