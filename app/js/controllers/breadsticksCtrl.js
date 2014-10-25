'use strict';

var controllersModule = require('./_index');

/**
 * 'breadstick' list
 * @controller
 * @todo query filters
 */
function BreadsticksCtrl(Challenges, $state) {
	var self = this;

	this.data = [];

	this.onClick = function (breadstick) {
		$state.go('user.breadstick', {id: breadstick._id});
	}

	Challenges.query().then(onSuccess, onError);

	function onSuccess (res) {
		self.data = res.data;
	}

	function onError (err) {
		throw err;
	}

};

controllersModule.controller('BreadsticksCtrl', BreadsticksCtrl);