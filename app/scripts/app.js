'use strict';

/********************************************************
// Location App (MAIN)
//
//  Application for the Map Test application.   Pulls in
//  Google Maps for drawing of the app.  Each route has
//  its own controller. 
//
//  Notes:  Pulled in a few resources I didn't use, such
//  as Aria for Accessability issue.  Could be placeholders
//  for future development.   
********************************************************/ 
angular
  .module('locationApp', [
    'ngAria',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'uiGmapgoogle-maps' 
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
