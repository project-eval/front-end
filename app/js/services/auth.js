'use strict';

var servicesModule = require('./_index.js');

/**
 * @factory
 */
function Auth($http, $q, AppSettings) {

	var apiUrl = AppSettings.apiUrl;

	var userRoles = {
		'public': ['public'],
		'user': ['public', 'user'],
		'admin': ['public', 'user', 'admin']
	}

	var currentUser = {
		username: '',
		role: 'public'
	};

	// fetch current users role
	$http.get(apiUrl + '/me').then(function(res) {
		currentUser.username = res.data.username || '';
		currentUser.role = res.data.role || 'public';
	});

	function changeUser(user) {
		angular.extend(currentUser, user);
	}

	return {

		/**
		 * query currentUser's clearence
		 * 
		 * @return {Boolen}
		 */
		authorize: function(accessLevel, role) {
			if (role === undefined) {
				role = currentUser.role;
			}
			return userRoles[role].indexOf(accessLevel) !== -1;
		},

		/**
		 * is currentUser logged in?
		 * 
		 * @return {Boolean}
		 */
		isLoggedIn: function() {
			return currentUser.role !== 'public'
		},

		/**
		 * register new account
		 * 
		 * @return {Hash}
		 */
		register: function(user) {
			return $http.post(apiUrl + '/register', user).then(function(res) {
				changeUser(res.data.success);
				return res.data;
			}, function(err) {
				return err;
			});
		},

		/**
		 * login
		 * 
		 * @return {Hash}
		 */
		login: function(user) {
			return $http.post(apiUrl + '/login', user).then(function(res) {
				changeUser(res.data.success);
				return res.data;
			}, function(err) {
				return err;
			});
		},

		/**
		 * logout
		 * 
		 * @return {Object}
		 */
		logout: function() {
			var self = this;
			var defered = $q.defer();
			return $http.post(apiUrl + '/logout').then(function() {
				changeUser({
					username: '',
					role: 'public'
				});
				defered.resolve(self.user);
				return defered.promise;
			}, function(err) {
				defered.reject(err);
				return defered.promise;
			});
		},

		/**
		 * user roles constant
		 * 
		 * @type {Hash}
		 */
		userRoles: userRoles,

		/**
		 * currentUser
		 * 
		 * @param {Hash} data
		 */
		user: currentUser

	};
};

servicesModule.service('Auth', Auth);
