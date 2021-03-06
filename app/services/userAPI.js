(function () {
    'use strict';

    var serviceID = 'userAPI';
	var ns = 'bm.' + serviceID;
	
	angular.module('bm').factory(serviceID, ['$http', '$modal','$rootScope', '$state', userAPI]);
	function userAPI($http, $modal, $rootScope, $state){
		var constants = {
			ERROR_INVALID_SESSION: "invalid session"
		};
	
		//set userID and sessionID from localStorage, using empty string if not set
		var userID = (window.localStorage[ns + '.userID'] ? 
			window.localStorage[ns + '.userID'] : '');
		var sessionID = (window.localStorage[ns + '.sessionID'] ?
			window.localStorage[ns + '.sessionID'] : '');
		//last userID, used to pre-fill login field
		var lastUserID = (window.localStorage[ns + '.lastUserID'] ? 
			window.localStorage[ns + '.lastUserID'] : '');
		
		
		function getUserID(){return userID;};
		function setUserID(uID){
			userID = uID;
			window.localStorage[ns + '.userID'] = uID;
		};
		
		function getSessionID(){return sessionID;};
		function setSessionID(sID){
			sessionID = sID;
			window.localStorage[ns + '.sessionID'] = sID;
		};
		
		function getLastUserID(){return lastUserID;};
		function setLastUserID(uID){
			lastUserID = uID;
			window.localStorage[ns + '.lastUserID'] = uID;
		};
		
		function isLoggedIn(){
			return !(getUserID()==='' || getSessionID()==='');
		};

		function login(uID, password){
			//console.log('entered userAPI with userID: ' + uID + ' password: ' + password);
			return $http({
				url: 'http://apsis.me/BM/lib/SessionUtil/SessionUtil_cc.php',
				method: 'POST',
				//withCredentials: true,
				data: {
					action: 'login',
					userID: uID,
					password: password
				}
			}).then(
				function(response){
					if(response.data['responseCode'] == 'success'){
						setUserID(uID);
						setLastUserID(uID);
						setSessionID(response.data['sessionID']);
					}
					return response;
				}
			).catch(
				function(response) {
					console.log('status: ' + response.status + ' data: ' + JSON.stringify(response.data));
					return response;
				}
			);
		};
		
		//end current user session and set userID to empty string
		function logout(uID, sID){
			return $http({
				url: 'http://apsis.me/BM/lib/SessionUtil/SessionUtil_cc.php',
				method: 'POST',
				//withCredentials: true,
				data: {
					action: 'logout',
					userID: uID,
					sessionID: sID
				}
			}).then(
				function(response) {
					clearCredentials();
					console.log('logout response: ' + response.data);
					return response;
				}
			).catch(
				function(response) {
					clearCredentials();
					console.log('logout response status: ' + response.status + ' data: ' + JSON.stringify(response.data));
					return response;
				}
			);
		};
		
		function getUserInfo(uID, sID){
			return $http({
				url: 'http://apsis.me/BM/lib/SessionUtil/SessionUtil_cc.php',
				method: 'POST',
				//withCredentials: true,
				data: {
					action: 'getUserInfo',
					userID: uID,
					sessionID: sID
				}
			});
		};
		
		//return the deferred loginResponse from loginModal()
		function loginPrompt(){
			var instance = $modal.open({
			  templateUrl: 'login/loginModalTemplate.html',
			  controller: 'LoginModalCtrl',
			  controllerAs: 'LoginModalCtrl'
			});
			//return instance.result.then(assignCurrentUser);
			return instance.result
			
			.then(
				//success callback; returns the deffered result object
				function loginModalCallback(result){
					console.log('[userAPI.js] loginPrompt loginModalCallback reached');
					return result;
				},
				//failure callback: redirect home, clear userID/sessionID, and return failure reason
				function loginModalErrorCallback(reason){
					console.log('[userAPI.js] loginModalErrorCallback reached for reason: '
					+ BM.utils.stringifySafe(reason));
					clearCredentials();
					$state.go('home');
					return reason;
				}
			);
			/**/
		};
		
		//private methods
		
		//clear userID & sessionID
		var clearCredentials = function(){
			setSessionID('');
			setUserID('');
		};

		return{
			constants: constants,
			getUserID: getUserID,
			setUserID: setUserID,
			getLastUserID: getLastUserID,
			setLastUserID: setLastUserID,
			getSessionID: getSessionID,
			setSessionID: setSessionID,
			isLoggedIn: isLoggedIn,
			login: login,
			logout: logout,
			getUserInfo: getUserInfo,
			loginPrompt: loginPrompt
		};
	};
	
})();