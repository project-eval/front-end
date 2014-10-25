'use strict';

var controllersModule = require('./_index');

/**
 * @controller
 */
function BreadstickCtrl($stateParams, Challenges) {
	var self = this;

	this.data = {};

	Challenges.getById($stateParams.id).then(onSuccess, onError);

	function onSuccess (res) {
		self.data.info = res.data.success;
	}

	function onError (err) {
		throw err;
	}

	this.onSubmit = function (breadstick_id, src) {
		Challenges.eval({
			id: breadstick_id,
			src: src
		});
	}
};

controllersModule.controller('BreadstickCtrl', BreadstickCtrl);