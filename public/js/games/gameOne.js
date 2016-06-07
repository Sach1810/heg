var socket = io.connect();


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
  if (gameOne.start) {
    startGame();
  }

  });

var startGame = function(){
  console.log("Start Game");
}





// if player one turn player 1 green and append 2 players to waiting for second player.