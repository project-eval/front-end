'use strict';

module.exports = {

  'serverport': 3001,

  'styles': {
    'src' : 'app/scss/**/*.scss',
    'dest': 'build/css'
  },

  'scripts': {
    'src' : 'app/js/**/*.js',
    'dest': 'build/js'
  },

  'images': {
    'src' : 'app/images/**/*',
    'dest': 'build/images'
  },

  'views': {
    'src': [
      'app/index.html',
      'app/views/**/*.html'
    ],
    'dest': 'app/js'
  },

  'dist': {
    'root'  : 'build'
  },

  'browserify': {
    'entries'   : ['./app/js/app.js'],
    'bundleName': 'main.js'
  }

};