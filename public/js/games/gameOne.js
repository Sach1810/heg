var socket = io.connect();

var countInterval = 1;
var startTime = 1;
var countdownTime = startTime;

var squareChangeSpeed = 1000;
var totalPlayingTime = 10;

var computerId;
var phoneId;

var inPlay;

var score = 0;
var right = 0;
var wrong = 0;

var phoneLink = "https://4e20de04.ngrok.io/gameonecontroller";

$('#qrcode').qrcode({
  "size": 100,
  "color": "#3a3",
  "text": phoneLink});

$("#webAddress").html(phoneLink);

var register = function(qty) {
  $('#buttonContainer').addClass('hide');
  $('#qrContainer').removeClass('hide');
  
  var playerQty = qty;
  socket.emit('qtyPlayers', playerQty);
};

socket.on('result', function(gameOne){
  if (gameOne.playerOne) {
      $('#playerConnected').html('Player 1 connected');
  };
  
  if (gameOne.playerTwo) {
      $('#playerConnected').html('Both players connected starting game');
  };

  if (gameOne.start) {
    $('#qrContainer').addClass('hide');
    $('#countdown').removeClass('hide');
    countdown();
  };

});

var countdown = function(){
  var timeTillStart = setInterval(function(){
    countdownTime -= countInterval;
    $("#countdown").html(countdownTime);
  
    if (countdownTime === 0) {
      $("#countdown").addClass('hide');
      $("#cube").removeClass('hide');
      
      clearInterval(timeTillStart);
      
      startGame();
    };

  },1000); 
};

var startGame = function(){
  socket.on('move', function(id){
    phoneId = id;
    console.log(phoneId);
    var maxPoints = 0;
  
    if (inPlay) {
      if (computerId === phoneId && maxPoints === 0) {
        maxPoints ++;
        score ++;
        right ++;

        $("#right").html(right);
      } else {
        score -= 0.5;
        wrong ++;
        $("#wrong").html(wrong);
     };
      $("#score").html(score);
    };

  });

  socket.on('phoneData', function(coordinates){

    document.getElementById('cubeOne').style.webkitTransform = 
      document.getElementById('cubeOne').style.transform =
        'rotateX(' + coordinates.az + 'deg) ' +
        'rotateY(' + coordinates.gy + 'deg) ' +
        'rotateZ(' + coordinates.bx + 'deg)';


    document.getElementById('cubeTwo').style.webkitTransform = 
      document.getElementById('cubeTwo').style.transform =
        'rotateX(' + coordinates.az + 'deg) ' +
        'rotateY(' + coordinates.gy + 'deg) ' +
        'rotateZ(' + coordinates.bx + 'deg)';

    document.getElementById('cubeThree').style.webkitTransform = 
      document.getElementById('cubeThree').style.transform =
        'rotateX(' + coordinates.az + 'deg) ' +
        'rotateY(' + coordinates.gy + 'deg) ' +
        'rotateZ(' + coordinates.bx + 'deg)';

    document.getElementById('cubeFour').style.webkitTransform = 
      document.getElementById('cubeFour').style.transform =
        'rotateX(' + coordinates.az + 'deg) ' +
        'rotateY(' + coordinates.gy + 'deg) ' +
        'rotateZ(' + coordinates.bx + 'deg)';

    document.getElementById('cubeFive').style.webkitTransform = 
      document.getElementById('cubeFive').style.transform =
        'rotateX(' + coordinates.az + 'deg) ' +
        'rotateY(' + coordinates.gy + 'deg) ' +
        'rotateZ(' + coordinates.bx + 'deg)';

    document.getElementById('cubeSix').style.webkitTransform = 
      document.getElementById('cubeSix').style.transform =
        'rotateX(' + coordinates.az + 'deg) ' +
        'rotateY(' + coordinates.gy + 'deg) ' +
        'rotateZ(' + coordinates.bx + 'deg)';
  });

  inPlay = true;
  $('.liveScore').removeClass('hide');
  gameTime();

  var changeSquares = setInterval(function(){
    var randomNumber = Math.floor(Math.random() * 6) + 1;

    if (randomNumber == 1) {
      id = "cubeOne";
    } else if (randomNumber == 2) {
      id = "cubeTwo";
    } else if (randomNumber == 3) {
      id = "cubeThree";
    } else if (randomNumber == 4) {
      id = "cubeFour";
    } else if (randomNumber == 5) {
      id = "cubeFive";
    } else if (randomNumber == 6) {
      id = "cubeSix";
    };

    computerId = id;
    console.log(computerId);

    $("#" + id).css('background-color', 'green');

    setTimeout(function(){
      $("#" + id).css('background-color', 'black');
    }, squareChangeSpeed -100);

  }, squareChangeSpeed);

setTimeout(function(){
    clearInterval(changeSquares);
    // $("#allCubes").addClass('hide');
    // $('.liveScore').addClass('hide');
  // var r = right;
  // var w = wrong;
  // var s = score; 
  // $("#fRight").html(r);
  // $("#fWrong").html(w);
  // $("#fScore").html(s);

    // reset();

  }, totalPlayingTime * 1000);
};


var gameTime = function(){
  
  var countdownGameTime = setInterval(function(){
    totalPlayingTime -= countInterval;
    
    $("#gameTime").html(totalPlayingTime);

    if (totalPlayingTime === 0) {
      clearInterval(countdownGameTime);
      inPlay = false;
    };
  }, 1000);
};


// ********************************

// var socket = io.connect();

// var countInterval = 1;
// var startTime = 3;
// var countdownTime = startTime;

// var phoneLink = "https://4e20de04.ngrok.io/gameonecontroller";

// $('#qrcode').qrcode({
//   "size": 100,
//   "color": "#3a3",
//   "text": phoneLink});

// $("#webAddress").html(phoneLink);

// var register = function(qty) {
//   $('#buttonContainer').addClass('hide');
//   $('#qrContainer').removeClass('hide');
//   var playerQty = qty;
//   socket.emit('qtyPlayers', playerQty);
//   console.log(playerQty);
// };

// socket.on('result', function(gameOne){
//   console.log('result');
//   if (gameOne.playerOne) {
//       $('#playerConnected').html('Player 1 connected');
//   }
  
//   if (gameOne.playerTwo) {
//       $('#playerConnected').html('Both players connected starting game');
//   }

//   if (gameOne.start) {
//     $('#qrContainer').addClass('hide');
//     $('#countdown').removeClass('hide');
//     countdown();
//   }

//   });

// var countdown = function(){
//   console.log("Start Game");

//   var timeTillStart = setInterval(function(){
//   countdownTime -= countInterval;
//   $("#countdown").html(countdownTime);
  
//   if (countdownTime === 0) {
//     $("#countdown").addClass('hide');
//     $("#cube").removeClass('hide');
      
//       clearInterval(timeTillStart);
      
//       startGame();
//     };

//   },1000); 
// }

// var startGame = function(){
//   socket.on('phoneData', function(coordinates){

//   document.getElementById('cube').style.webkitTransform = 
//     document.getElementById('cube').style.transform =
//       'rotateX(' + coordinates.az + 'deg) ' +
//       'rotateY(' + coordinates.gy + 'deg) ' +
//       'rotateZ(' + coordinates.bx + 'deg)';
// });

// }


// if player one turn player 1 green and append 2 players to waiting for second player.