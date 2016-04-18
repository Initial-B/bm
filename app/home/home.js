'use strict';

angular.module('bm')

.controller('HomeCtrl', ['$scope', 'uiGmapGoogleMapApi', 'barsAPI',
	function($scope, uiGmapGoogleMapApi, barsAPI) {
		
		$scope.devStats = {
			deviceReady: false,
			userAgent: 'unknown',
			screenDimensions: 'unknown',
			windowDimensions: 'unknown',
			deviceOrientation: 'unknown',//portrait or landscape
			averageHabitScore: 0,
		};
		
		$scope.getBarOutput = '';
		$scope.infoWindows = [];
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
					description: 'this is the first hard-coded marker',
					events: {
						mouseover: function(marker){
							console.log('moused over marker 1');
							//TODO: try to show infoWindow
						},
						click: function(marker){
							console.log('clicked marker 1');
							//TODO: try calling $scope stuff
						}
					}
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

		$scope.testGetBar = function(){
			barsAPI.getBar(1).then(function(response){
				if(response
				&& response.data){
					console.log('getBar() response.data: '
					+ BM.utils.stringifySafe(response.data));
					//+ JSON.stringify(response));
					/*
					console.log('getBar() id: 1 responseCode: '
					+ response.data['responseCode']
					+ ' responseMessage: '
					+ response.data['responseMessage']);
					*/
					if(response.data['responseCode'] == 'success'){
						$scope.getBarOutput = response.data['bar'];
					}
				}
			});
		};
		
		// uiGmapGoogleMapApi is a promise.
		// The "then" callback function provides the google.maps object.
		uiGmapGoogleMapApi.then(function(maps){
			//do stuff with the maps object here I guess
		});
		
	
}]);