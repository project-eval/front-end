angular.module('olivegardenApp')

/**
 * @controller
 */
.controller('ProfileCtrl', function($scope, $stateParams, Users) {

	$scope.userInfo = {}

	Users.getUser($stateParams.username, function(userInfo) {
		$scope.userInfo = userInfo
	}, function (err) {
		console.log(err)
	})

});