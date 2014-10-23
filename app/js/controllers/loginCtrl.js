'use strict';

var controllersModule = require('./_index');

function LoginCtrl($rootScope, $scope, $state, $stateParams, Auth) {

    $scope.login = function(user) {
        Auth.login(user).then(redirectUser, showError);
    };

    $scope.register = function(user) {
        Auth.register(user).then(redirectUser, showError);
    };

    function redirectUser() {
        $state.go('user.dashboard');
    }

    function showError(err) {
        $rootScope.error = 'Failed to login: ' + err;
        $state.go('anon.login');
    }
}

controllersModule.controller('LoginCtrl', LoginCtrl);