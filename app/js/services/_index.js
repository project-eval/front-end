'use strict';

var angular = require('angular');

module.exports = angular.module('app.services', []);

// Define the list of services here
require('./challenge.js');
require('./auth.js');
require('./users.js');