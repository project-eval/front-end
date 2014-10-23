'use strict';

var routingConfig = require('./routingConfig.js')

/**
 * @ngInject
 */
function Routes($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {

  $locationProvider.html5Mode(true);

  var access = routingConfig.accessLevels

  // Public routes
  $stateProvider
    .state('public', {
      abstract: true,
      template: "<ui-view/>",
      data: {
        access: access.public
      }
    })
    .state('public.user', {
      url: '/user/:username',
      template: '<h1>username: {{userInfo.username}}</h1><h1>points: {{userInfo.points}}</h1>',
      controller: 'ProfileCtrl'
    })
    .state('public.404', {
      url: '/404/',
      templateUrl: '404.tpl.html'
    });

  // Anonymous routes
  $stateProvider
    .state('anon', {
      abstract: true,
      template: "<ui-view/>",
    })
    .state('anon.login', {
      url: '/login/',
      templateUrl: 'login.tpl.html',
      controller: 'LoginCtrl'
    });

  // Regular user routes
  $stateProvider
    .state('user', {
      abstract: true,
      template: "<ui-view/>"
    })
    .state('user.dashboard', {
      url: '/',
      templateUrl: 'dashboard.tpl.html'
    })
    .state('user.challenge', {
      url: '/challenge/',
      templateUrl: 'challenge.tpl.html',
      controller: 'ChallengeCtrl'
    });

  // Admin routes
  $stateProvider
    .state('admin', {
      abstract: true,
      template: "<ui-view/>",
      data: {
        access: access.admin
      }
    })
    .state('admin.admin', {
      url: '/admin/',
      templateUrl: 'admin.tpl.html',
      // controller: 'AdminCtrl'
    });

  $urlRouterProvider.otherwise('/');


  // FIX for trailing slashes. Gracefully "borrowed" from https://github.com/angular-ui/ui-router/issues/50
  $urlRouterProvider.rule(function($injector, $location) {
    if ($location.protocol() === 'file')
      return;

    var path = $location.path(),
      // Note: misnomer. This returns a query object, not a search string
      search = $location.search(),
      params;

    // check to see if the path already ends in '/'
    if (path[path.length - 1] === '/') {
      return;
    }

    // If there was no search string / query params, return with a `/`
    if (Object.keys(search).length === 0) {
      return path + '/';
    }

    // Otherwise build the search string and return a `/?` prefix
    params = [];
    angular.forEach(search, function(v, k) {
      params.push(k + '=' + v);
    });
    return path + '/?' + params.join('&');
  });

  $locationProvider.html5Mode(true);

  $httpProvider.interceptors.push(function($q, $location) {
            return {
                'responseError': function(response) {
                    if (response.status === 401 || response.status === 403) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
        });
};
// .run(['$rootScope', '$state', 'Auth', function($rootScope, $state, Auth) {

//         $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {

//             if (!('data' in toState) || !('access' in toState.data)) {
//                 $rootScope.error = "Access undefined for this state";
//                 event.preventDefault();
//             } else if (!Auth.authorize(toState.data.access)) {
//                 $rootScope.error = "Seems like you tried accessing a route you don't have access to...";
//                 event.preventDefault();

//                 if (fromState.url === '^') {
//                     if (Auth.isLoggedIn()) {
//                         $state.go('user.home');
//                     } else {
//                         $rootScope.error = null;
//                         $state.go('anon.login');
//                     }
//                 }
//             }
//         });
//     }]);

module.exports = Routes;