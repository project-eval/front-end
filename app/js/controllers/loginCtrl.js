'use strict';

var controllersModule = require('./_index');

function LoginCtrl($location, $rootScope, $scope, $stateParams, Auth) {

    $scope.login = function(user) {
        Auth.login(user).then(redirectUser, showError);

    };

    $scope.register = function(user) {
        Auth.register(user).then(redirectUser, showError);
    };

    function redirectUser() {
        $location.path('/');
    }

    function showError(err) {
        $rootScope.error = 'Failed to login: ' + err;
    }
}

controllersModule.controller('LoginCtrl', LoginCtrl);