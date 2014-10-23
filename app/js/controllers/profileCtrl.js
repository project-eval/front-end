'use strict';

var controllersModule = require('./_index');

function ProfileCtrl($scope, $stateParams, Users) {

	$scope.userInfo = {}

	Users.getUser($stateParams.username)
		.success(function(userInfo) {
			$scope.userInfo = userInfo
		})
		.error(function(err) {
			console.log(err)
		})

};

controllersModule.controller('ProfileCtrl', ProfileCtrl);