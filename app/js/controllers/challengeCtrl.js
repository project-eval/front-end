'use strict';

var controllersModule = require('./_index');

/**
 * @controller
 */
function ChallengeCtrl($scope) {

	$scope.title = 'Challenge Page';

	$scope.sourceCode = '//This is where starter code will go';

	$scope.submitSolution = function() {
		
	};

};

controllersModule.controller('ChallengeCtrl', ChallengeCtrl);