
heg.controller('mainCtrl', function($scope, hegStorage) {

$scope.games = hegStorage.games;
console.log($scope.games);
console.log($scope.games[1].name);

});
