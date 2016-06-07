heg.controller('gamesCtrl', function($scope, hegStorage, $state, $stateParams, socket, $timeout, $interval) {
var socket = io.connect();


$scope.currentGame;
$scope.gameInfo;
$scope.playerQty;
$scope.currentPlayers;

$scope.playerOne;
$scope.playerTwo;
$scope.phoneLink = "";


for (var i = 0; i < hegStorage.games.length; i++) {
  if (hegStorage.games[i].id == $stateParams.id ){
    $scope.currentGame = hegStorage.games[i];
  }
}

console.log($scope.currentGame);

$scope.startGame = function (qty) {
  
  $state.go('gameOneControll', {id: $scope.currentGame.id, phoneid:$scope.currentGame.id});

  $scope.id = socket.id;
  $scope.playerQty = qty;
  $scope.sendGameInfo = {
    playerQty: $scope.playerQty,
    id: $scope.id,
    start: false
  }

  $scope.emitTest = socket.emit('validation', $scope.sendGameInfo);

  socket.on('result', function (gameInfo) {
   $scope.gameInfo = gameInfo;
   if (gameInfo.start){
    $scope.continue();
   }
  });
}

$scope.continue = function(){

  console.log("Game Started");
}

//   socket.emit('new message', {
    
//       id: id,
//       message: message
    
//   }  console.log($scope.playerOne)   );
// };

// socket.on('chat message', function (message) {
//   console.log(message);
// });

});