'use strict';

var controllersModule = require('./_index');

/**
 * 'breadstick' list
 * @controller
 * @todo query filters
 */
function BreadsticksCtrl(Challenges) {
	var self = this;

	this.data = [];

	this.onClick = function (breadstick) {
		console.log(breadstick);
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