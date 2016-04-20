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
		$scope.gmapsObject = null;
		
		$scope.getBarOutput = '';
		$scope.infoWindows = [];
		$scope.map = {
			center: {
				latitude: 38.85, 
				longitude: -77.2 
			}, 
			zoom: 10,
			events: {
				tilesloaded: function (map) {
					$scope.$apply(function () {
						console.log('tilesloaded event');
						$scope.gmapsObject = map;
						console.log('this is the map instance: ' + BM.utils.stringifySafe($scope.gmapsObject));
					});
				}
			},
			markers: [
				{
					id: '1',
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
							$scope.showInfoWindow('1');				
							//TODO: try calling $scope stuff
						}
					}
				},
				{
					id: '2',
					name: 'marker 1',
					'showWindow': true,
					'coordinates': {
						'latitude': 38.90, 
						'longitude': -77.00
					},
					description: 'this is marker 2, not much to see here'
				},
				{
					id: '3',
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
		
		$scope.getMarker = function(markerID){
			for(var x=0;x < $scope.map.markers.length;x++){
				if($scope.map.markers[x].id === markerID){
					return $scope.map.markers[x];
				}
			}
			return null;
		};
		
		$scope.showInfoWindow = function(markerID){		
			console.log('showInfoWindow() entry point');
			var marker = $scope.getMarker(markerID);
			//console.log('found marker: ' + BM.utils.stringifySafe(marker));
			if(marker){
				//DEBUG
				console.log('creating infoWindow for marker: ' + BM.utils.stringifySafe(marker));
				
				var infoWindow = new google.maps.InfoWindow({
					content: '<h3>' + marker.name + '</h3>'
					+ '<div>' + marker.description + '</div>'
				});
				
				//console.log('opening infoWindow');
				if($scope.gmapsObject){
					infoWindow.open($scope.gmapsObject, marker)
				}
			}
		};
		
		// uiGmapGoogleMapApi is a promise.
		// The "then" callback function provides the google.maps object.
		uiGmapGoogleMapApi.then(function(maps){
			//do stuff with the maps object here I guess

		});
		
	
}]);