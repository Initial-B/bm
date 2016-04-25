(function () {
    'use strict';

    var serviceID = 'barsAPI';
	var ns = 'bm.' + serviceID;
	
	angular.module('bm').factory(serviceID, ['$http','$rootScope', '$state', barsAPI]);
	function barsAPI($http, $rootScope, $state){
		
		
		function getBar(barID){
			return $http({
				//TODO: get lamp-1 URL
				url: 'http://apsis.me/BM/lib/Bars/Bars_cc.php',
				method: 'POST',
				//withCredentials: true,
				data: {
					action: 'getBar',
					id: barID
				}
			});
		};
		
		function coords(latitude, longitude){
			return {
				'latitude': latitude, 
				'longitude': longitude
			};
		};
		
		return{
			getBar: getBar,
			coords: coords
		};
	
	};
})();