angular.module('olivegardenApp', ['ngRoute', 'ui.codemirror'])
  .config(function($routeProvider) {
    $routeProvider
    .when('/', {
      controller: 'ChallengeController',
      templateUrl: '../app/views/dashboard.html'
    });
});