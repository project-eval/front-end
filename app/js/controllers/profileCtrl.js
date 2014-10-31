'use strict';

var controllersModule = require('./_index');

/**
 * @controller
 */
function ProfileCtrl($scope, $stateParams, Users) {

	$scope.userInfo = {};

	function fetchUser(){
		Users.getUser($stateParams.username).then(onSuccess, onError);
		function onSuccess(userInfo) {
			$scope.userInfo = userInfo;
		}
		function onError(err) {
			console.log(err);
		}
	}

	fetchUser();

};

controllersModule.controller('ProfileCtrl', ProfileCtrl);