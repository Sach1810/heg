var heg = angular.module('heg', ['ui.router']);

heg.config(function($stateProvider, $urlRouterProvider) {
  var gameTemplate = 'templates/play-game.html';

  $urlRouterProvider.otherwise('/home');

  $stateProvider
  .state('content', {
    url:'/',
    views: {
      "":{templateUrl: 'content.html'},
      "header@content": {templateUrl: 'templates/header.html'},
      "footer@content": {templateUrl: 'templates/footer.html'}
    },
    controller: 'mainCtrl'
  })
  

    .state('content.home', {
      url: 'home',
      views:{
        "body@content" : {templateUrl: 'templates/home.html'},
        "latest-game-list@content.home": {templateUrl: 'templates/latest-game-list.html'},
      },
    })
    .state('content.home.gameDesc', {
        url: '/description/:id',
        templateUrl: 'templates/gameDesc.html',
      })

    .state('content.games', {
      url: 'games',
      views:{
        "body@content" : {templateUrl: 'templates/games.html'},
        "games-list@content.games": {templateUrl: 'templates/games-list.html'}
      }

    })
    .state('content.games.gameDesc', {
        url: '/description/:id',
        templateUrl: 'templates/gameDesc.html',
      })

  .state('gameName',{
      url: '/games/:id',
      templateUrl: gameTemplate,
      controller: 'gamesCtrl',
      resolve: {
        function($stateParams){
          var gameId = $stateParams;
        }
      }
     })

    .state('gameOneControll',{
      url: '/games/:id/:qty/:phoneid',
      templateUrl: 'templates/game-one-phone.html',
      controller: 'phoneCtrl',
      resolve: {
        function($stateParams){
          console.log($stateParams)
        }
      }
     })




});