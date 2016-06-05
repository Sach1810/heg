
heg.controller('mainCtrl', function($scope, hegStorage) {

$scope.games = hegStorage.games;
$scope.currentGame;
$scope.toggleCurrent;

$scope.moreDetails = function(game){
 $scope.currentGame = game;
 $scope.toggleCurrent = !$scope.toggleCurrent
}



});
