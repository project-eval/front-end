'use strict';

var servicesModule = require('./_index.js');

var apiUrl = require('../constants').apiUrl;

/**
 * @factory
 */
function Users($http) {
	return {

		/**
		 * get an users public information
		 * @param {string} username
		 */
		getUser: function(username) {
			return $http.get(apiUrl + '/user/' + username);
		}

	};
}

servicesModule.service('Users', Users);