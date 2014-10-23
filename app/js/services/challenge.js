'use strict';

var servicesModule = require('./_index.js');

/**
 * @factory
 */
function Challenges($http) {
	return {

		/**
		 * get all data about a breadstick
		 * 
		 * @param  {string} username
		 * @param  {function} success
		 * @param  {function} error
		 */
		getById: function(username, success, error){
			$http({
				method: 'GET',
				url: '/users/' + username,
			})
			.success(success).error(error);
		},

		/**
		 * get list of breadsticks
		 * 
		 * @param  {Hash} params
		 * @param  {function} success
		 * @param  {function} error
		 */
		query: function(params, success, error){
			$http({
				method: 'GET',
				url: '/breadsticks',
				params: params
			})
			.success(success).error(error);
		},

		/**
		 * submit a new breadstick
		 * 
		 * @param  {Hash} data
		 * @param  {function} success
		 * @param  {function} error
		 */
		submit: function(data, success, error){
			$http({
				method: 'POST',
				url: '/breadsticks',
				data: data
			})
			.success(success).error(error);
		}
	};
};

servicesModule.service('Challenges', Challenges);