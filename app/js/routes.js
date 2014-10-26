'use strict';

var routingConfig = require('./routingConfig.js');

/**
 * @ngInject
 */
function Routes($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, AppSettings) {

	// http://stackoverflow.com/questions/17064791/http-doesnt-send-cookie-in-requests
	$httpProvider.defaults.withCredentials = true;

	$locationProvider.html5Mode(true);

	var access = routingConfig.accessLevels;

	// Public routes
	$stateProvider
		.state('public', {
			abstract: true,
			template: "<ui-view/>",
			data: {
				access: access.public
			}
		})
		.state('public.user', {
			url: '/user/:username',
			templateUrl: 'profile.tpl.html',
			controller: 'ProfileCtrl'
		})
		.state('public.breadsticks', {
			url: '/breadsticks/',
			templateUrl: 'breadsticks.tpl.html',
			controller: 'BreadsticksCtrl as breadsticks'
		})
		.state('public.404', {
			url: '/404/',
			templateUrl: '404.tpl.html'
		})
		.state('public.login', {
			url: '/login/',
			templateUrl: 'login.tpl.html',
			controller: 'LoginCtrl'
		});

	// Regular user routes
	$stateProvider
		.state('user', {
			abstract: true,
			template: "<ui-view/>",
			data: {
				access: access.user
			}
		})
		.state('user.dashboard', {
			url: '/',
			templateUrl: 'dashboard.tpl.html'
		})
		.state('user.create', {
			url: '/create/',
			templateUrl: 'create.tpl.html',
			controller: 'CreateCtrl as create'
		})
		.state('user.challenge', {
			url: '/challenge/',
			templateUrl: 'challenge.tpl.html',
			controller: 'ChallengeCtrl'
		})
		.state('user.breadstick', {
			url: '/breadsticks/:id',
			templateUrl: 'breadstick.tpl.html',
			controller: 'BreadstickCtrl as breadstick'
		})

	// Admin routes
	$stateProvider
		.state('admin', {
			abstract: true,
			template: "<ui-view/>",
			data: {
				access: access.admin
			}
		})
		.state('admin.admin', {
			url: '/admin/',
			templateUrl: 'admin.tpl.html',
			// controller: 'AdminCtrl'
		});

	$urlRouterProvider.otherwise('/');

	/*
	 * FIX for trailing slashes. Gracefully "borrowed" from https://github.com/angular-ui/ui-router/issues/50
	 */
	$urlRouterProvider.rule(function($injector, $location) {
		if ($location.protocol() === 'file') return;
		var path = $location.path(), search = $location.search(), params;
		if (path[path.length - 1] === '/') return;
		if (Object.keys(search).length === 0) return path + '/';
		params = [];
		angular.forEach(search, function(v, k) {params.push(k + '=' + v);});
		return path + '/?' + params.join('&');
	});

	$locationProvider.html5Mode(true);

	/*
	 * intercepts all http requests and redirects to '/login'
	 * if status code is 401 or 403 (standard 'unathorized' http response)
	 */
	if(AppSettings.devMode === false) {
		$httpProvider.interceptors.push(function($q, $location) {
			return {
				'responseError': function(response) {
					if (response.status === 401 || response.status === 403) {
						$location.path('/login');
					}
					return $q.reject(response);
				}
			};
		});
	}
};

module.exports = Routes;