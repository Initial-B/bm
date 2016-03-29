'use strict';

angular.module('bm')

.controller('HomeCtrl', ['$scope', 'uiGmapGoogleMapApi', 
	function($scope, uiGmapGoogleMapApi) {
		
		$scope.devStats = {
			deviceReady: false,
			userAgent: 'unknown',
			screenDimensions: 'unknown',
			windowDimensions: 'unknown',
			deviceOrientation: 'unknown',//portrait or landscape
			averageHabitScore: 0,
		};
		
		$scope.map = {
		
			center: {
				latitude: 38.85, 
				longitude: -77.2 
			}, 
			zoom: 10,
			markers: [
				{
					'id': '1',
					name: 'marker 1',
					'showWindow': true,
					'coordinates': {
						'latitude': 38.85, 
						'longitude': -77.20
					},
					description: 'this is the first hard-coded marker'
				},
				{
					'id': '2',
					name: 'marker 1',
					'showWindow': true,
					'coordinates': {
						'latitude': 38.90, 
						'longitude': -77.00
					},
					description: 'this is marker 2, not much to see here'
				},
				{
					'id': '3',
					name: 'marker 1',
					'showWindow': true,
					'coordinates': {
						'latitude': 38.875, 
						'longitude': -77.15
					},
					description: 'I like turtles'
				}
			]
		};
		
		//EXAMPLE: getting a list of markers dynamically
		// and storing in searchResults.results
		/*
		$scope.addMarkers = _.once(function (num) {
		  var markers = [];
		  var i = 0;

		  for (i = 0; i < num; i++) {
			var cords = chance.coordinates().split(',');
	//      if(markers.length < 100){
			markers.push({
			  'coords': {
				'latitude': cords[0],
				'longitude': cords[1]
			  },
			  'key': 'someKey-' + lastId
			});
			lastId++;
	//      }
		  }
		  lastId = 1;//reset
		  $scope.searchResults.results = markers;
		});
		*/

		$scope.getDeviceInfo = function(){

		};
		
		
		// uiGmapGoogleMapApi is a promise.
		// The "then" callback function provides the google.maps object.
		uiGmapGoogleMapApi.then(function(maps){
			//do stuff with the maps object here I guess
		});
		
		
		
		
}]);