'use strict';

angular.module('bm')

.controller('HomeCtrl', ['$scope', function($scope) {
	
	$scope.devStats = {
		deviceReady: false,
		userAgent: 'unknown',
		screenDimensions: 'unknown',
		windowDimensions: 'unknown',
		deviceOrientation: 'unknown',//portrait or landscape
		averageHabitScore: 0,
	};
	
	$scope.markers = [
		{
			id: 1,
			name: 'marker 1',
			lng: 12.00,
			lat: 10.00,
			description: 'this is the first hard-coded marker'
		},
		{
			id: 2,
			name: 'marker 2',
			lng: 15.00,
			lat: 10.00,
			description: 'this is marker 2, not much to see here'
		},
		{
			id: 3,
			name: 'marker 3',
			lng: 12.00,
			lat: 8.00,
			description: 'One time I ate cheetos and orange soda and threw up and made an orange stain on the carpet that stayed there for 10 years.'
		}
	];
	

	
	$scope.getDeviceInfo = function(){

	};

}]);