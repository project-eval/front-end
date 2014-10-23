'use strict';

var servicesModule = require('./_index.js');

var apiUrl = require('../constants.js').apiUrl;

/**
 * @factory
 */
function Auth($http, $cookieStore) {

  var routingConfig = require('../routingConfig.js'),
    accessLevels = routingConfig.accessLevels,
    userRoles = routingConfig.userRoles,
    currentUser = $cookieStore.get('user') || {
      username: '',
      role: userRoles.public
    };

  $cookieStore.remove('user');

  function changeUser(user) {
    angular.extend(currentUser, user);
  }

  return {
    authorize: function(accessLevel, role) {
      if (role === undefined) {
        role = currentUser.role;
      }
      return accessLevel.bitMask & role.bitMask;
    },
    isLoggedIn: function(user) {
      if (user === undefined) {
        user = currentUser;
      }
      return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
    },
    register: function(user) {
      return $http.post(apiUrl + '/register', user).then(function(res) {
      	console.log(res);
        changeUser(res);
        return res;
      }, function(err) {
      	console.log(err);
        return err;
      });
    },
    login: function(user) {
      return $http.post(apiUrl + '/login', user).then(function(user) {
        changeUser(user);
        return user;
      }, function(err) {
      	return err;
      });
    },
    logout: function() {
      $http.post(apiUrl + '/logout').then(function() {
        changeUser({
          username: '',
          role: userRoles.public
        });
        return;
      }, function(err) {
      	return err;
      });
    },
    accessLevels: accessLevels,
    userRoles: userRoles,
    user: currentUser
  };
};

servicesModule.service('Auth', Auth);
