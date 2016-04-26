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
		$scope.lastInfoWindow = null;
		
		//contents of bar info area below the map
		$scope.barInfo = {
			show: false,
			name: '',
			description: '',
			coordinates: {}
		}
		
		$scope.getBarOutput = '';
		
		$scope.map = {
			center: barsAPI.coords(39.00, -77.2),
			zoom: 10,
			events: {
				tilesloaded: function (map) {
					$scope.$apply(function () {
						$scope.gmapsObject = map;
					});
				}
			},
			markers: [
				{
					id: '1',
					name: 'marker 1',
					'showWindow': true,
					'coordinates': barsAPI.coords(38.85, -77.20),
					description: 'this is the first hard-coded marker',
					events: {
						mouseover: function(marker){
							console.log('moused over marker 1');
							//TODO: try to show infoWindow
						},
						click: function(marker){
							console.log('clicked marker 1');
							//$scope.showInfo('1');				
							$scope.showInfo(marker, '1');	
							//TODO: try calling $scope stuff
						}
					}
				},{
					id: '2',
					name: 'marker 2',
					'showWindow': true,
					'coordinates': barsAPI.coords(38.90, -77.00),
					description: 'this is marker 2, not much to see here',
					events: {
						mouseover: function(marker){
							console.log('moused over marker 2');
						},
						click: function(marker){
							console.log('clicked marker 2');
							$scope.showInfo(marker, '2');	
						}
					}
				},{
					id: '3',
					name: 'marker 3',
					'showWindow': true,
					'coordinates': barsAPI.coords(38.875, -77.15),
					description: 'I like turtles',
					events: {
						mouseover: function(marker){
							console.log('moused over marker 3');
						},
						click: function(marker){
							console.log('clicked marker 3');
							$scope.showInfo(marker, '3');	
						}
					}
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

		$scope.showInfo = function(marker, markerID){		
			console.log('showInfo() entry point');
				
			//retrieve the scope's representation of the marker	
			var scopeMarker = $scope.getMarker(markerID);
			//if marker found, show info
			if(scopeMarker){
				$scope.barInfo = {
					show: true,
					name: scopeMarker.name,
					coordinates: scopeMarker.coordinates,
					description: scopeMarker.description
				}
			}
			//show infoWindow on map
			if(marker){
				var infoWindow = new google.maps.InfoWindow({
					content: '<div>' + scopeMarker.name + '<div>'
				});
				if($scope.gmapsObject){
					//close last infoWindow, if any
					if($scope.lastInfoWindow){
						$scope.lastInfoWindow.close();
					}
					//set infoWindow as lastInfoWindow, and open it
					$scope.lastInfoWindow = infoWindow;
					infoWindow.open($scope.gmapsObject, marker)
				}
			}
		};
		
		$scope.closeBarInfo = function(){
			console.log('closing barInfo');
			$scope.$apply(function(){
				$scope.barInfo.show = false;
			});
			
		};
		
		
		// uiGmapGoogleMapApi is a promise.
		// The "then" callback function provides the google.maps object.
		uiGmapGoogleMapApi.then(function(maps){
			//do stuff with the maps object here I guess

		});
		
	
}]);