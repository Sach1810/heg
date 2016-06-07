heg.controller('gamesCtrl', function($scope, hegStorage, $state, $stateParams, socket, $timeout, $interval) {

$scope.verified = hegStorage.verify;
console.log($scope.verified);

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

hegStorage.subscribe($scope, function(){
 console.log('subscribe')
 $scope.test();
})


$scope.startGame = function(){
  $scope.verified = hegStorage.verify;
  console.log($scope.verified);
}







$scope.syncGame = function (qty) {
  $scope.playerQty = qty;
  $state.go('gameOneControll', {id: $scope.currentGame.id, phoneid:$scope.currentGame.id, qty: $scope.playerQty});

};

});