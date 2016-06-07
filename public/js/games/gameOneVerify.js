var socket = io.connect();

var sendGameInfo;

 // socket.on('totalQty', function(playerQty){
 //    console.log(playerQty);
 //    if (playerQty == 1) {
 //      $('#sync').addClass('hide');
 //      validatePlayer();
 //    }
 //  });

 //work out way to make the above work if page isnt loaded when sent it doesnt trigger it.

var validatePlayer = function(qty){
  console.log('validate');
  id = socket.id;
  socket.emit('validation', id);
};

window.ondeviceorientation = function(event) {
  alpha = Math.round(event.alpha);
  beta = Math.round(event.beta);
  gamma = Math.round(event.gamma);
       
  var coordinates = {'bx':beta, 'gy':gamma, 'az':alpha}
console.log(coordinates);
  socket.emit('phoneReadings',coordinates); 
};




