const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const querystring = require('querystring')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');
const session = require('express-session');
const uuid = require('uuid/v4');
const moment = require('moment');

const FileStore = require('session-file-store')(session);

/***
 *  Config new Express app instance.
 */
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// middleware
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// no longer needed for express-session to work
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, '../public'),
  dest: path.join(__dirname, '../public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, '../public')));

app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// setup home index router
const index = require('./routes/index');
app.use('/', index);

// setup eventual route for listing users? (Not Used Currently)
const users = require('./routes/users');
app.use('/users', users);

// catch 404 and forward to error handler
app.use((err, req, res, next) => {
  console.log('PAGE NOT FOUND: hit the 404 handler!');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.render('error', {error: err, message: "An error has occured"});
});

module.exports = app;
