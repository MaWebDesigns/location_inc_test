'use strict';

/********************************************************
// Main Controller 
// This controller covers the "home" page and serves up
// the Map for this example.  
//
// Notes: 
// It should be cleaned up for memory destruction/cleanup
// and I could probably refactor in the scope.map to make 
// it a little cleaner. 
//
********************************************************/ 
angular.module('locationApp')
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

    // Variable setup - set default values for the map. 
    // The Map will start in Worcester, MA and then will be controlled
    // via the City drop-down.
    //
    $scope.states = [];
    $scope.cities = [];
    $scope.myState = this;
    $scope.myCity =  this;
    $scope.myCity.name = "Worcester"
    $scope.myState.code = "";  // keep this blank for now.
    $scope.myCity.lat = "42.2667";
    $scope.myCity.lng = "-71.80";
    $scope.myCity.latitude  = "42.2667";
    $scope.myCity.longitude = "-71.80";
    $scope.showCircle = false;

    // Set up an object that will serve as our initial center-point for our map
    // Since the JSON file has "lat"  and "lng" as in the data, we need to convert that
    // to latitude and longitude to make the maps API happy.
    //
    $scope.map = {
      center: {
        "latitude": $scope.myCity.lat,
        "longitude": $scope.myCity.lng
      },
      marker:
      {
         "latitude": $scope.myCity.latitude,
          "longitude": $scope.myCity.longitude 
      },
      circle: {
          radius: 50000,
          stroke: {
            color: '#08B21F',
            weight: 2,
            opacity: 1
          },
          fill: {
            color: '#08B21F',
            opacity: 0.5
          },
          geodesic: true, // optional: defaults to false
          draggable: true, // optional: defaults to false
          clickable: true, // optional: defaults to true
          editable: true, // optional: defaults to false
          visible: $scope.showCircle, // optional: defaults to true
        },
      "name":$scope.myCity.name,
      "zoom": 7

    };

    // Function for the States callback on the JSON files provided
    window.states = function (data)
    {
      $scope.states = data;
    };

    // function for the cities callback on the JSON files proviced
    window.cities = function (data)
    {
      $scope.cities = data;
    };

     // Get the State JSON file.   
    $http.jsonp('http://locationinc-mapping-demo.herokuapp.com/states.json');

    // Check City -  This function will fire whenever the
    // State dropdown is changed,  This function uses HTTP JSONP function
    // to grab the data - the proper callbacks are then fired when the file is
    // returned.    In the future, the URL processing should be done in an factory.
    $scope.checkCity = function()
    {
      if ($scope.myState.code != '')
      {
        console.log("In Check City");
        var url = 'http://locationinc-mapping-demo.herokuapp.com/' + $scope.myState.code  + '/cities.json?callback=cities'
        $http.jsonp(url);
      }
      return true;
     
    };

    // Update Map Center -  This function will fire whenever the
    // City dropdown is changed,  its purpose is to update the map 
    // data object so that the map will move to its new center point. 
    //
    $scope.updateMapCenter = function()
    {
      // console.log("In Update Map center");
       $scope.map = {
        center: {
          "latitude": $scope.myCity.lat,
          "longitude": $scope.myCity.lng
        },
        marker: {
         "latitude": $scope.myCity.lat,
         "longitude": $scope.myCity.lng,
        },
        circle: {
          radius: 50000,
          stroke: {
            color: '#08B21F',
            weight: 2,
            opacity: 1
          },
          fill: {
            color: '#08B21F',
            opacity: 0.5
          },
          geodesic: true, // optional: defaults to false
          draggable: false, // optional: defaults to false
          clickable: false, // optional: defaults to true
          editable: true, // optional: defaults to false
          visible: $scope.showCircle, // optional: defaults to true
        },
        "name":$scope.myCity.name,
        "zoom": 7

      };
    }  // end updateMapCenter

   

   
    

      

}]) // end of MainCtrl

// Directive for the State Option Menu
.directive('stateMenu', function()
{
		return {
			restrict: 'E',
			templateUrl: '../views/state_menu.htm'
		};
})
// Directive for the City Menu
.directive('cityMenu', function()
{
    return {
      restrict: 'E',
      templateUrl: '../views/cities_menu.htm'
    };
})
// Directive to display instructions to the user
.directive ('userInstructions', function() 
{
    return {
        restrict: 'E',
        templateUrl: '../views/user_instructions.htm'
    };
})
// Directive to draw the map
.directive ('myMap', function(){
  return {
    restrict: 'E',
    templateUrl: '../views/my_map.htm'
  };
})

;
