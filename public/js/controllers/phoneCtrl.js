heg.controller('phoneCtrl', function($scope, hegStorage, $state, $stateParams, socket, $timeout, $interval) {
var socket = io.connect();

$scope.playerQty = $stateParams.qty;



$scope.validatePlayer = function () {
  
  $scope.id = socket.id;
  $scope.sendGameInfo = {
    playerQty: $scope.playerQty,
    id: $scope.id,
    start: false
  }

  $scope.emitTest = socket.emit('validation', $scope.sendGameInfo);

};

  socket.on('result', function (gameInfo) {
   $scope.gameInfo = gameInfo;
   if (gameInfo.start){
    
    hegStorage.continued();
   }
  });


});