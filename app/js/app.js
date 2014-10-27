'use strict';

var angular = require('angular');

// expose
window.marked = require('marked');
window.chai = require('chai');

// angular modules
require('angular-cookies');
require('angular-ui-router');
require('./templates');
require('./controllers/_index');
require('./services/_index');
require('./directives/_index');

// create and bootstrap application
angular.element(document).ready(function() {

  var requires = [
    'angular-loading-bar',
    'hc.marked',
    'ngCookies',
    'ui.router',
    'ui.bootstrap',
    'ui.ace',
    'templates',
    'app.controllers',
    'app.services',
    'app.directives'
  ];

  // mount on window for testing
  window.app = angular.module('app', requires);

  angular.module('app').constant('AppSettings', require('./constants'));

  angular.module('app').config(require('./routes'));

  angular.module('app').run(require('./onRun'));

  angular.bootstrap(document, ['app']);

});