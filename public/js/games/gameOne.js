var socket = io.connect();

var countInterval = 1;
var startTime = 1;
var countdownTime = startTime;

var squareChangeSpeed = 3000;
var totalPlayingTime = 30;

var computerId;
var phoneId;

var inPlay;

var playerQty;
var playerOne;
var playerTwo;

var playerOneScore = {
  score: 0,
  right: 0,
  wrong: 0
}

var playerTwoScore = {
  score: 0,
  right: 0,
  wrong: 0
}

var phoneLink = "https://4e20de04.ngrok.io/gameonecontroller";

$('#qrcode').qrcode({
  "size": 100,
  "color": "#3a3",
  "text": phoneLink});

$("#webAddress").html(phoneLink);

var register = function(qty) {
  $('#buttonContainer').addClass('hide');
  $('#qrContainer').removeClass('hide');
  
  playerQty = qty;
  socket.emit('qtyPlayers', playerQty);
};

socket.on('result', function(gameOne){
  console.log(gameOne);
  if (gameOne.playerQty === 1 ) {
  console.log(" 1 player");
  playerOne = gameOne.playerOne;

    if (gameOne.start) {
      $('#qrContainer').addClass('hide');
      $('#countdown').removeClass('hide'); 
      countdown();   
      };
  } else {
      console.log("multiplayer");
      if (gameOne.playerOne) {
        playerOne = gameOne.playerOne;
          $('#playerConnected').html('Player 1 connected');
      };
      
      if (gameOne.playerTwo) {
          playerTwo = gameOne.playerTwo;
        $('#playerConnected').html('Both players connected starting game');
        $('#qrContainer').addClass('hide');
        $('#countdown').removeClass('hide');
        $('.twoPlayer').removeClass('hide');
          countdown();
      };

      if (gameOne.start) {

        
      };

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
  socket.on('move', function(playerMove){
    var answer;
    var maxPoints;
    var moveMade;

    phoneId = playerMove.moveId;
    
    if (phoneId === computerId){
      answer = true;
    };
    
    if(playerMove.playerId === playerOne && !maxPoints) {
      if (answer) {
        maxPoints ++;
        playerOneScore.score ++;
        playerOneScore.right ++;
        $('#rightOne').html(playerOneScore.right);
        console.log('p1 right');
        };

      if (playerMove.playerId === playerOne){
        playerOneScore.score -= 0.5;
        playerOneScore.wrong ++;
        $('#wrongOne').html(playerOneScore.wrong);
        console.log('p1 wrong');
      };
        $('#scoreOne').html(playerOneScore.score);
    };

    if(playerMove.playerId !== playerOne && !maxPoints) {
      if (answer) {
        maxPoints ++;
        playerTwoScore.score ++;
        playerTwoScore.right ++;
        $('#rightTwo').html(playerTwoScore.right);
        console.log('p2 right');
        };

      if (playerMove.playerId !== playerOne){
        playerTwoScore.score -= 0.5;
        playerTwoScore.wrong ++;
        $('#wrongTwo').html(playerTwoScore.wrong);
        console.log('p2 wrong');
      };
        $('#scoreTwo').html(playerTwoScore.score);
    };

        
        // console.log(inPlay);
        // console.log(maxPoints);
        // console.log(playerMove.playerId);
        // console.log(playerOne);
        // console.log(phoneId);
        // console.log(computerId);
    // if(playerMove.playerId === playerOne) {
    //   if (inPlay && !maxPoints) {
    //     if (computerId === phoneId) {
    //     maxPoints ++;
    //     playerOneScore.score ++;
    //     playerOneScore.right ++;
    //     console.log('right');
    //     $('#rightOne').html(playerOneScore.right);
    //     } else {
    //     playerOneScore.score -= 0.5;
    //     playerOneScore.wrong ++;
    //     console.log('wrong');
    //     $('#wrongOne').html(playerOneScore.wrong);
    //   };
    //     $('#scoreOne').html(playerOneScore.score);
    // };

    // } else {
    //   if (inPlay && !maxPoints) {
    //     if (computerId === phoneId && maxPoints === 0) {
    //     maxPoints ++;
    //     playerTwoScore.score ++;
    //     playerTwoScore.right ++;

    //     $('#rightTwo').html(playerTwoScore.right);
    //   } else {
    //     playerTwoScore.score -= 0.5;
    //     playerTwoScore.wrong ++;
    //     $('#wrongTwo').html(playerTwoScore.wrong);
    //  };
    //   $('#scoreTwo').html(playerTwoScore.score);
    // };

    // };
      
    // if (inPlay && !maxPoints) {

    //   if (computerId === phoneId && maxPoints === 0) {
    //     maxPoints ++;
    //     score ++;
    //     right ++;

    //     $('#'+ score).html(right);
    //   } else {
    //     score -= 0.5;
    //     wrong ++;
    //     $('#' + wrong).html(wrong);
    //  };
    //   $('#'+ right).html(score);
    // };

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