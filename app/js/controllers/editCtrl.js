'use strict';

var controllersModule = require('./_index');

/**
 * create a new 'breadstick'
 * a breadstick is composed of several 'challenges' which may contain tests and a descriptio
 *
 * @controller
 */
function EditCtrl($stateParams, Challenges, AppSettings) {
	var self = this;

	this.devMode = AppSettings.devMode;

	// challenge index we are currently showing
	this.radioModel = 0;

	this.data = {}; 

	function getData () {
		Challenges.getById($stateParams.id).then(onSuccess, onError);
		function onSuccess (res) {
			console.log(res.data)
			self.data = res.data.success;
		}
		function onError (err) {
			throw err;
		}
	}

	getData()

	// save state
	this.save = function () {
		var payload = {
			id : self.data._id,
			update: self.data
		};
		Challenges.update(payload).then(onSuccess, onError);
		function onSuccess (res) {
			console.log(res.data);
		}
		function onError (err) {
			throw err;
		}

	};

	// push a new challenge to data.challenges array
	this.addChallenge = function () {
		self.data.challenges.push(new Challenge(self.data.challenges.length+1));
		self.radioModel = self.data.challenges.length-1;
	}

	function Challenge(index) {
		var index = index || 0;
		this.description = '#write your description for challenge #' + index + ' here! \n take advantage of the markdown!';
		this.test = 'write your tests for challenge #' + index + ' here!';
	}
};

controllersModule.controller('EditCtrl', EditCtrl);