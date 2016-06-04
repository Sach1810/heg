var heg = angular.module('heg', ['ui.router']);

heg.config(function($stateProvider, $urlRouterProvider) {
  
  // $urlRouterProvider.otherwise('/home');

  $stateProvider

  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html'
  })
});