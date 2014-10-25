'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function NavCtrl($scope, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    console.log(Auth.isLoggedIn());
};

controllersModule.controller('NavCtrl', NavCtrl);