'use strict';

var controllersModule = require('./_index');

/**
 * @controller
 *
 * manages an users breadsticks (create/edit/delete)
 */
function CreateCtrl($state, Challenges, AppSettings, Auth) {
	var self = this;

	// holds breadstick
	self.data = [];

	// edit a breadstick
	self.edit = function (breadstick) {
		$state.go('user.edit', {id: breadstick._id});
	}

	// create a new breadstick
	self.new = function () {
		Challenges.submit(self.data).then(onSuccess, onError);
		function onSuccess (res) {
			getMyBreadsticks()
		}
		function onError (err) {
			throw err;
		}
	}

	// get breadsticks made my user
	function getMyBreadsticks () {
		Challenges.query({author: Auth.user.username || 'o'}).then(onSuccess, onError);
		function onSuccess (res) {
			self.data = res.data;
		}
		function onError (err) {
			throw err;		
		}
	}

	getMyBreadsticks()

}

controllersModule.controller('CreateCtrl', CreateCtrl);