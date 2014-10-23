'use strict';

var servicesModule = require('./_index.js');

var apiUrl = require('../constants').apiUrl;

/**
 * @factory
 */
function Users($http) {
	return {
		/**
		 * get user by username
		 * @param  {string} username
		 * @param  {function} success
		 * @param  {function} error
		 */
		getUser: function(username) {
			return $http.get(apiUrl + '/user/' + username);
		}

	};
}

servicesModule.service('Users', Users);