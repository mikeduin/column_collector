var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('dotenv').load();

mongoose.connect('mongodb://localhost/columnCollector')

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we connected to Column Collector!")
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get('/archive', function(req, res, next){
  res.render('archive', {title: "Steve's Column Compiler"})
});

app.post('/formCollector', function(req, res, next){
  var keywords = req.body.keywords;
  var filters = [];
  var filterFind = function (string) {
    var comma = string.indexOf(',');
    if (comma !== -1) {
      var word = string.substring(0, comma).trim();
      console.log('word is ', word);
      filters.push(word);
      var newString = string.slice(comma+1, string.length);
      console.log('newString is ', newString)
      filterFind(newString)
    } else {
      filters.push(string.trim());
    };
  };
  filterFind(keywords);
  console.log('filters after function run is ', filters)


  res.redirect('archive');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
