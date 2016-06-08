var socket = io.connect();

var sendGameInfo;

var validatePlayer = function(qty){
  console.log('validate');
  $('#syncScreen').addClass('hide');
  id = socket.id;
  socket.emit('validation', id);
};

window.ondeviceorientation = function(event) {
  alpha = Math.round(event.alpha);
  beta = Math.round(event.beta);
  gamma = Math.round(event.gamma);
       
  var coordinates = {'bx':beta, 'gy':gamma, 'az':alpha}

  socket.emit('phoneReadings',coordinates); 
};

var move = function(id){
  console.log(id);
  socket.emit('newMove',id);
};





