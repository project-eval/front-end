'use strict';

var servicesModule = require('./_index.js');

var apiUrl = require('../constants.js').apiUrl;

/**
 * @factory
 */
function Auth($http, $cookieStore, $q) {

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
        changeUser(res.data.success);
        return res.data;
      }, function(err) {
        return err;
      });
    },
    login: function(user) {
      return $http.post(apiUrl + '/login', user).then(function(res) {
        changeUser(res.data.success);
        return res.data;
      }, function(err) {
      	return err;
      });
    },
    logout: function() {
      var self = this;
      var defered = $q.defer();
      return $http.post(apiUrl + '/logout').then(function() {
        changeUser({
          username: '',
          role: userRoles.public
        });
        defered.resolve(self.user);
        return defered.promise;
      }, function(err) {
        defered.reject(err);
      	return defered.promise;
      });
    },
    accessLevels: accessLevels,
    userRoles: userRoles,
    user: currentUser
  };
};

servicesModule.service('Auth', Auth);
