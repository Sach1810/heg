var socket = io.connect();

var sendGameInfo;




// socket.on('totalQty', function(qty){
//   console.log('qty');
//   sendGameInfo.playerQty = qty;
// });



var validatePlayer = function(qty){
  console.log('validate');
  id = socket.id;
  socket.emit('validation', id);
  
};

// socket.emit('validation', sendGameInfo);

// socket.on('result', function (gameInfo) {
//   sendGameInfo = gameInfo;
//   if (gameInfo.start){
//     startGame();
//    }
//   });




//******On page load*****
// totalPlayers = qtyPlayers();



