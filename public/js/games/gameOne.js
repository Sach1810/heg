var socket = io.connect();

var countInterval = 1;
var startTime = 3;
var countdownTime = startTime;

var squareChangeSpeed = 1000;
var totalPlayingTime = 60;
var gameDuration = 60;

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

var phoneLink = "https://heg.herokuapp.com/gameonecontroller";

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
      $('.pageTitle').addClass('hide')
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
    // if(playerMove.playerId === playerOne && !maxPoints) {    
    if(playerMove.playerId === playerOne) {
      if (answer && !maxPoints) {
        maxPoints ++;
        playerOneScore.score ++;
        playerOneScore.right ++;
        $('#rightOne').html(playerOneScore.right);
        console.log('p1 right');
        };

      if (playerMove.playerId === playerOne && !answer){
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

      if (playerMove.playerId !== playerOne && !answer){
        playerTwoScore.score -= 0.5;
        playerTwoScore.wrong ++;
        $('#wrongTwo').html(playerTwoScore.wrong);
        console.log('p2 wrong');
      };
        $('#scoreTwo').html(playerTwoScore.score);
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

    $("#" + id).css('background-color', 'green');

    setTimeout(function(){
      $("#" + id).css('background-color', 'black');
    }, squareChangeSpeed -100);

  }, squareChangeSpeed);

setTimeout(function(){
    clearInterval(changeSquares);
    $("#cube").addClass('hide');
    $('.liveScore').addClass('hide');




  }, totalPlayingTime * 1000);
};


var gameTime = function(){
  
  var countdownGameTime = setInterval(function(){
    totalPlayingTime -= countInterval;
    
    $("#gameTime").html(totalPlayingTime);

    if (totalPlayingTime === 0) {
      clearInterval(countdownGameTime);
      inPlay = false;
      reset();
    };
  }, 1000);
};

var reset = function(){
  var gameOne ={
    playerQty: 0,
    playerOne: false,
    playerTwo: false,
    start: false
  }

  socket.emit('reset', gameOne);
    $('.endScreen').removeClass('hide');
  // inPlay = false;
  // countdownTime = startTime;
  // totalPlayingTime = gameDuration;
  // $("#endGame").removeClass('hide');
  // $("#gameTime").html(" ");
  // $("#countdown").html(" ");

};

