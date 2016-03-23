'use strict';

angular.module('bm')

.controller('HomeCtrl', ['$scope', 'userAPI', function($scope, userAPI) {
	//test
	$scope.userID = userAPI.getUserID();
	$scope.lastUserID = userAPI.getLastUserID();
	$scope.sessionID = userAPI.getSessionID();

	$scope.isLoggedIn = userAPI.isLoggedIn();
	$scope.userLogin = {
		username: userAPI.getLastUserID(),
		password: ''
	};
	
	$scope.devStats = {
		deviceReady: false,
		userAgent: 'unknown',
		screenDimensions: 'unknown',
		windowDimensions: 'unknown',
		deviceOrientation: 'unknown',//portrait or landscape
		userEmail: '',
		averageHabitScore: 0,
	};
	
	//called by loginForm
	$scope.login = function(userLogin){
		userAPI.login(userLogin.username,userLogin.password).then(
			function(response){
				if(response.data['responseCode'] == 'success'){
					location.reload();
				}//else display some login error message
			}
		);
	};
	$scope.logout = function(){
		userAPI.logout(userAPI.getUserID(), userAPI.getSessionID()).then(
			function(){
				location.reload();
			}
		);
	};
	
	$scope.getUserInfo = function(){
		userAPI.getUserInfo($scope.userID, $scope.sessionID).then(
			function(response){
				console.log('getUserInfo response: ' + BM.utils.stringifySafe(response));
			//TODO: do something with results involving $scope.devStats				
				if(response
				&& response.data
				&& response.data['responseCode'] == 'success'){

				}
			}
		);	
	};

}]);