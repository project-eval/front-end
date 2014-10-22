var fs = require('fs');
module.exports = function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: require('./controllers/challenge.js'),
      template: fs.readFileSync(__dirname + '/views/challenge.html')
    });
};