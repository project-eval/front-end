angular.module('olivegardenApp', ['ngCookies', 'ui-router', 'ui.codemirror'])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $stateProvider
        .state('public', {
            abstract: true,
            template: "<ui-view/>",
            data: {
                access: access.public
            }
        })
        .state('public.404', {
            url: '/404/',
            templateUrl: '404'
        });
}]);