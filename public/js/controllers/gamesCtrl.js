heg.controller('gamesCtrl', function($scope, hegStorage, $state, $stateParams, socket) {
console.log($stateParams.id);
var socket = io.connect();

$scope.gameInfo;
$scope.playerQty;
$scope.currentPlayers;

$scope.playerOne;
$scope.playerTwo;

$scope.startGame = function (qty) {
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

$scope.continue = function(){
  console.log($scope.gameInfo);
  console.log("Game Started");
}

  console.log($scope.gameInfo);



  $scope.playerQty = qty;  

  if (!$scope.playerOne && $scope.playerQty === 1) {
    $scope.playerOne = $scope.id;
    $scope.currentPlayers++;
    $scope.continue();
  } else if ($scope.currentPlayers !== $scope.playerQty) {
    console.log()
  }

  $scope.player = {

  }

  

  
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