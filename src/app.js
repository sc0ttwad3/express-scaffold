const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');
const uuid = require('uuid/v4');
const session = require('express-session');

/***
 *  Config new Express app instance.
 */
const app = express();

// setup router
const index = require('./routes/index');
const users = require('./routes/users');

// add/configure middleware
app.use(session({
  genid: (req) => {
    console.log('Inside session middleware...');
    console.log(`req.sessionID: ${req.sessionID}`);
    return uuid() // use for session IDs
  },
  secret: 'bad practise',
  resave: false,
  saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// middleware
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// no longer needed for express-session to work
//app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, '../public'),
  dest: path.join(__dirname, '../public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, '../public')));
//app.use('/', index);

app.get('/', (req, res) => {
  console.log('Inside request for root / callback function...');
  res.send(`Hit home page. Received unique ID: ${req.sessionID}\n`);
  
})

app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
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
  res.render('error');
});

module.exports = app;
