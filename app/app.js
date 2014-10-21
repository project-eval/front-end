angular.module('myapp', ['ngRoute', 'ui.codemirror'])
  .config(function($routeProvider) {
    $routeProvider
    .when('/', {
      controller: 'ChallengeController',
      templateUrl: '../app/views/challenge.html'
    });
});
//   .controller('ChallengeController', function($scope) {
//   $scope.title = 'Challenge Page';
// });