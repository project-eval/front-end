'use strict';

var servicesModule = require('./_index.js');

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
		getUser: function(username, success, error) {
			$http.get('http://0.0.0.0:9000/api/user/' + username).success(success).error(error);
		}

	};
}

servicesModule.service('Users', Users);