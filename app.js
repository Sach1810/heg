var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_RED_URI || 'mongodb://localhost/heg');
var Players = require("./models/playersModel");

//*****************
// var playerOne = new Players.PlayerOne();
// var playerTwo = new Players.PlayerTwo();
// console.log(playerTwo);


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.io = require('socket.io')();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});




// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.post('/register', function(req, res, next){
console.log("hi");
  });

var gameOne ={
  playerCount: 0,
  playerOne: false,
  playerTwo: false
}



// start listen with socket.io
app.io.on('connection', function(socket){  
  console.log('a user connected');
  console.log(socket.id);

  socket.on('new message', function(player){

    if (!gameOne.playerOne && gameOne.playerOne !== socket.id) {
      gameOne.playerOne = socket.id;
      gameOne.playerCount++;
    } else if(!gameOne.playerTwo && gameOne.playerOne !==socket.id){
      gameOne.playerTwo = socket.id;
      gameOne.playerCount++;
    }
    console.log("p1 "+gameOne.playerOne);
    console.log("p2"+gameOne.playerTwo);
    console.log(gameOne.playerCount);
  
    app.io.emit('chat message',gameOne);
  });

});


module.exports = app;
