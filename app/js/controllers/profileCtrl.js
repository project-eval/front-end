'use strict';

var controllersModule = require('./_index');

function ProfileCtrl($scope, $stateParams, Users) {

	$scope.userInfo = {}

	Users.getUser($stateParams.username, function(userInfo) {
		$scope.userInfo = userInfo
	}, function (err) {
		console.log(err)
	})

};

controllersModule.controller('ProfileCtrl', ProfileCtrl);