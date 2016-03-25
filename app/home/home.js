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
	
	$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
	
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
	/*
	//init
    var script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAN4QyzV_IGqeQFD2yfLeWC8jeV4JmW4Vs";
    script.async = "async";
	script.defer = "defer";
	document.getElementsByTagName('head')[0].appendChild(script);
	

	var mapDiv = document.getElementById('gmaptest');
	//var mapDiv = $('.gmap')[0];
	var map = new google.maps.Map(mapDiv, {
	  center: {lat: 44.540, lng: -78.546},
	  zoom: 8
	});

	*/
}]);