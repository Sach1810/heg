var socket = io.connect();

var countInterval = 1;
var startTime = 3;
var countdownTime = startTime;

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
  console.log(playerQty);
};

socket.on('result', function(gameOne){
  console.log('result');
  if (gameOne.playerOne) {
      $('#playerConnected').html('Player 1 connected');
  }
  
  if (gameOne.playerTwo) {
      $('#playerConnected').html('Both players connected starting game');
  }

  if (gameOne.start) {
    $('#qrContainer').addClass('hide');
    $('#countdown').removeClass('hide');
    countdown();
  }

  });

var countdown = function(){
  console.log("Start Game");

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
}

var startGame = function(){
  socket.on('phoneData', function(coordinates){

  document.getElementById('cube').style.webkitTransform = 
    document.getElementById('cube').style.transform =
      'rotateX(' + coordinates.az + 'deg) ' +
      'rotateY(' + coordinates.gy + 'deg) ' +
      'rotateZ(' + coordinates.bx + 'deg)';
});

}



// if player one turn player 1 green and append 2 players to waiting for second player.