
heg.controller('mainCtrl', function($scope, hegStorage, $state) {

$scope.games = hegStorage.games;
$scope.currentGame;
$scope.toggleCurrent;
$scope.currentIndex;

$scope.goToGame = function(){
  console.log("hi");
  console.log($scope.currentGame.name);
  $state.go('gameName', {id: $scope.currentGame.name})
}

$scope.moreDetails = function(game, index){
 $scope.currentGame = game;
 $scope.toggleCurrent = !$scope.toggleCurrent;
 $scope.currentIndex = index;
}







});