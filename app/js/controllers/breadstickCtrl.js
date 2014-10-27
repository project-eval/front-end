'use strict';

var controllersModule = require('./_index');

/**
 * @controller
 */
function BreadstickCtrl($stateParams, Challenges) {
	var self = this;

	self.data = {};

	self.onTest = function () {

	}

	self.onSubmit = function () {
		// Challenges.eval({
		// 	id: breadstick_id,
		// 	src: src
		// });
	}

	function fetchChallenge () {
		Challenges.getById($stateParams.id).then(onSuccess, onError);
		function onSuccess (res) {
			self.data = res.data.success;
			console.log(res.data.success)
		}
		function onError (err) {
			throw err;
		}
	}

	fetchChallenge()
};

controllersModule.controller('BreadstickCtrl', BreadstickCtrl);