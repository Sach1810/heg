var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// mongoose.connect(process.env.MONGOLAB_RED_URI || 'mongodb://localhost/heg');
// var Players = require("./models/playersModel");

//*****************
// var playerOne = new Players.PlayerOne();
// var playerTwo = new Players.PlayerTwo();
// console.log(playerTwo);


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.io = require('socket.io')();


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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
  playerQty: 0,
  playerOne: false,
  playerTwo: false,
  start: false
}

app.io.on('connection', function(socket){  
  console.log('a user connected');

  socket.on('qtyPlayers', function(playerQty){
    console.log("qtyPlayers");
    gameOne.playerQty = playerQty;
    console.log(gameOne);
    app.io.emit('totalQty',playerQty);
    });


  socket.on('validation', function(id){
    console.log("validation");
    console.log(gameOne);
    if (gameOne.playerQty == 1 && !gameOne.playerOne) {
      gameOne.playerOne = id;
      gameOne.start = true;
      console.log('1: true');
    } else if (gameOne.playerQty == 2) {
      if (!gameOne.playerOne) {
        gameOne.playerOne = id;
        console.log('false');
      } else if (gameOne.playerOne !== id && !gameOne.playerTwo) {
        gameOne.playerTwo = id;
        gameOne.start = true;
        console.log('2: true');
      } else {
        console.log("got to end");
      }
    };
    console.log(gameOne);
    console.log('result');
    app.io.emit('result',gameOne);
  });

    socket.on('phoneReadings', function(coordinates){
      app.io.emit('phoneData',coordinates);
  });

    socket.on('newMove', function(id){
      console.log('new move');
      var socketId = socket.id;
      var playerId = socketId.slice(2,50);
      console.log(playerId)

      playerMove = {
        moveId: id,
        playerId: playerId
      }

      console.log(playerMove);
      app.io.emit('move', playerMove);
  });

    socket.on('reset', function(gameOneReset){
      var gameOne = gameOneReset;
    });

});

module.exports = app;
