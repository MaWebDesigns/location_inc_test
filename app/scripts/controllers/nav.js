'use strict';

/********************************************************
// Nav Controller 
// This controller covers the main navigation, it checks
// the current path to set the "Active" navigation CSS.
// 
//
********************************************************/ 
angular.module('locationApp')
  .controller('NavCtrl', function ($scope) 
  {

    // GetClass - Sets the "Active" tab in the navigation
    // based on the current path.
    //
    $scope.getClass = function(path) 
    {
      // console.log("In getClass - location.hash = " + window.location.hash);
      // console.log("Path = " + path);
      if (window.location.hash == path) 
      {
        return "active"
      } 
      else 
      {
        return ""
      }
    }; 
 });
