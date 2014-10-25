'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function NavCtrl($scope, $state, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.logout = function(){
        Auth.logout()
        .then(function(){
            $state.go('user.dashboard');
        })
        .then(null, function(err){
            console.log("Something went wrong when logging out")
        })
    }
};

controllersModule.controller('NavCtrl', NavCtrl);