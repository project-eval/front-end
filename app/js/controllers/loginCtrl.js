'use strict';

var controllersModule = require('./_index');

/**
 * @controller
 * 
 * login & register form handling
 */
function LoginCtrl($scope, $state, Auth) {

    $scope.error = '';

    $scope.login = function(user) {
        Auth.login(user).then(redirectUser, showError);
    };

    $scope.register = function(user) {
        Auth.register(user).then(redirectUser, showError);
    };

    function redirectUser(res) {
        if(res.error) $scope.error = res.error;
        else $state.go('user.dashboard');
    }

    function showError(err) {
        $scope.error = 'Failed to login: ' + err;
    }
}

controllersModule.controller('LoginCtrl', LoginCtrl);