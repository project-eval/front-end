'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ChallengeCtrl($scope) {

	$scope.title = 'Challenge Page';

	$scope.sourceCode = '//This is where starter code will go';

	$scope.submitSolution = function() {
		console.log($scope.testModel);
	};

};

controllersModule.controller('ChallengeCtrl', ChallengeCtrl);