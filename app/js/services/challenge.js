'use strict';

var servicesModule = require('./_index.js');

/**
 * @factory
 */
function Challenges($http, AppSettings) {

	var apiUrl = AppSettings.apiUrl

	return {

		/**
		 * get all data about a breadstick
		 * 
		 * @param  {string} id
		 */
		getById: function(id){
			return $http({
				method: 'GET',
				url: apiUrl + '/breadstick/' + id,
			})
		},

		/**
		 * get list of breadsticks
		 * 
		 * @param  {Hash} data
		 */
		query: function(data){
			return $http({
				method: 'GET',
				url: apiUrl + '/breadsticks',
				params: data
			})
		},

		/**
		 * submit a new breadstick
		 * 
		 * @param  {Hash} data
		 */
		submit: function(data){
			return $http({
				method: 'POST',
				url: apiUrl + '/breadsticks',
				data: data
			})
		},

		/**
		 * update a breadstick
		 * 
		 * @param  {Hash} data
		 */
		update: function(data){
			return $http({
				method: 'PUT',
				url: apiUrl + '/breadsticks',
				data: data
			})
		},

		/**
		 * eval code
		 *
		 * @param  {Hash} data
		 */
		eval: function(data){
			return $http({
				method: 'POST',
				url: apiUrl + '/breadstick/' + data.id,
				data: data.src
			})
		}
	};
};

servicesModule.service('Challenges', Challenges);