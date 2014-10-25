'use strict';

var controllersModule = require('./_index');

/**
 * create a new 'breadstick'
 * @controller
 */
function CreateCtrl(Challenges, AppSettings) {

	this.devMode = AppSettings.devMode;

	this.data = {
		source: 'aa',
		language: 'javascript',
		difficulty: '42',
		title: 'my breadstick'
	};

	this.submit = function (data) {

		Challenges.submit(data).then(onSuccess, onError);

		function onSuccess (res) {
			console.log(res.data);
		}

		function onError (err) {
			throw err;
		}

	};
};

controllersModule.controller('CreateCtrl', CreateCtrl);