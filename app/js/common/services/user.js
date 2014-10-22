angular.module('olivegardenApp')

/**
 * @factory
 */
.factory('Users', function($http) {
	return {
		getAll: function(success, error) {
			$http.get('/users').success(success).error(error);
		}
	};
});