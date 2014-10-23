angular.module('olivegardenApp')

/**
 * @factory
 */
.factory('Users', function($http) {
	return {

		/**
		 * get user by username
		 * @param  {string} username
		 * @param  {function} success
		 * @param  {function} error
		 */
		getUser: function(username, success, error) {
			$http.get('/users/' + username).success(success).error(error);
		}

	};
});