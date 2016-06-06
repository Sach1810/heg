heg.controller('gamesCtrl', function($scope, hegStorage, $state, $stateParams) {
console.log($stateParams.id);
var socket = io.connect();
var id = socket.id;
console.log(id);
$scope.playerOne;
$scope.playerTwo;

$scope.startGame = function (msg) {
  var message = msg;
  var id = socket.id;


  socket.emit('new message', {
    
      id: id,
      message: message
    
  });
};

socket.on('chat message', function (message) {
  console.log(message);
});

});