'use strict';

var controllersModule = require('./_index');

/**
 * create a new 'breadstick'
 * @controller
 */
function CreateCtrl(Challenges, AppSettings) {
	var self = this;

	this.devMode = AppSettings.devMode;

	// challenge index we are currently showing
	this.radioModel = 0;

	this.data = {
		language: 'javascript',
		difficulty: '42',
		title: 'my breadstick',
		challenges: [new Challenge(1), new Challenge(2)]
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

	this.addChallenge = function () {
		self.data.challenges.push(new Challenge(self.data.challenges.length+1));
	}

	function Challenge(index, description, test) {
		this.description = description || '#write your description for challenge #' + index + ' here! \n take advantage of the markdown!';
		this.test = test || 'write your tests for challenge #' + index + ' here!';	
	}
};

controllersModule.controller('CreateCtrl', CreateCtrl);