'use strict';

var controllersModule = require('./_index');

/**
 * @controller
 *
 * onSubmit: test the code localy while the user works on an aswer
 * onFinalSubmit: test the code remotely to make sure the user isn't cheating!
 */
function BreadstickCtrl($stateParams, Challenges) {
	var self = this;

	// project information
	// includes challenges descriptions and tests
	self.data = {};

	// which challenge within the project is the user training on?
	self.challengeIndex = 0;

	// code written by user
	self.code = '';

	// test report
	self.output = '';

	// local code eval
	self.onSubmit = function () {
		//
	}

	// remote code eval
	self.onFinalSubmit = function () {
		// Challenges.eval({
		// 	id: breadstick_id,
		// 	src: src
		// });
	}

	function loadTest () {

	}

	function fetchChallenge () {
		Challenges.getById($stateParams.id).then(onSuccess, onError);
		function onSuccess (res) {
			self.data = res.data.success;
			console.log(res.data.success);
			loadTest()
		}
		function onError (err) {
			throw err;
		}
	}

	fetchChallenge()

};

controllersModule.controller('BreadstickCtrl', BreadstickCtrl);