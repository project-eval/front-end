angular.module('myapp')
.controller('ChallengeController', function($scope) {
  $scope.title = 'Challenge Page';

  $scope.sourceCode = '//This is where starter code will go';
  $scope.submitSolution = function() {
    console.log($scope.testModel);
  };
});