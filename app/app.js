angular.module('olivegardenApp', ['ngCookies', 'ui-router', 'ui.codemirror'])
  .config(function($routeProvider) {
    $routeProvider
    .when('/', {
      controller: 'ChallengeController',
      templateUrl: '../app/views/dashboard.html'
    });
});