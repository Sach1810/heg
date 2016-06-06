var socket = io();

var player = "Sacha";

var id = socket.id



var move = function(){
  console.log("hi");
  socket.emit('newMove', socket.id);
}


