'use strict';

var BM = BM || {};

// Declare app level module which depends on views, and components
var pdbApp = angular.module('bm', [
  'ui.bootstrap',
  'ui.router',
  'uiGmapgoogle-maps',
  'bm.login',
  'bm.catalogue',
  'bm.version'
]);

//StateProvider config
pdbApp.config(['$stateProvider','$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
	//redirect unmatched urls to /home
	$urlRouterProvider.otherwise('/home');
    $stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'home/home.html',
			controller: 'HomeCtrl',
			data:{
				requireLogin: false
			}
		})
		.state('catalogue',{
			url: '/catalogue',
			templateUrl: 'catalogue/catalogue-main.html',
			controller: 'CatalogueCtrl',
			data:{
				requireLogin: false
			}
		})
  }
])

//Google Maps provider config
.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyAN4QyzV_IGqeQFD2yfLeWC8jeV4JmW4Vs',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
})


.run(['$rootScope', '$state', 'userAPI',
	function($rootScope, $state, userAPI){
	
		//subscribe to ui-router's 'stateChangeStart' event
		// and call loginPrompt when unauth'd users
		// change to states that require login		
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams){
			var requireLogin = toState.data.requireLogin;
			console.log('[app.js] requested state: ' + toState.url + ' requires login: ' + requireLogin + ' current userID: ' + userAPI.getUserID());
			
			//if(requireLogin){
				//console.log('[app.js] requested state: ' + toState.url + ' requires login. current userID: ' + userAPI.getUserID());
			//}
			// if state requires login and currentUser is undefined, show login prompt
			if(requireLogin && (userAPI.getUserID() == null || userAPI.getUserID() === '')){
				event.preventDefault();
				console.log("[app.js] current userID not found, calling loginPrompt");
				userAPI.loginPrompt().then(function(loginResult){
					console.log('[app.js] loginPrompt result: ' + BM.utils.stringifySafe(loginResult));
					//if login is successful, redirect to desired state
					if(loginResult
					&& loginResult.data
					&& loginResult.data['responseCode'] === 'success'){			
						return $state.go(toState.name, toParams);
					}
				}).catch(function(reason){//catch loginPrompt errors
					console.log('[app.js] loginPrompt error callback reason: ' + BM.utils.stringifySafe(reason));
					return $state.go('home');
				});
			}
		});
	}
]);

//TODO: should this go in a separate file? a service?
BM.utils = function(){
	function isInt(value) {
	  var x;
	  if (isNaN(value)) {
		return false;
	  }
	  x = parseFloat(value);
	  return (x | 0) === x;
	};
	
	//TODO: not clear what kind of input is expected.
	function isNumber(value) {
	  if(isNaN(value)
	  || value === null
	  || value === ''){
		return false;
	  }
	  return value === Number(value);
	};
	
	//JSON stringify-safe from https://github.com/isaacs/json-stringify-safe
	// like JSON.stringify, but doesn't throw exception on circular references
	function stringifySafe(obj, replacer, spaces, cycleReplacer) {
		return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
	};
	//serializer used by stringify-safe
	function serializer(replacer, cycleReplacer) {
	  var stack = [], keys = []

	  if (cycleReplacer == null) cycleReplacer = function(key, value) {
		if (stack[0] === value) return "[Circular ~]"
		return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
	  }

	  return function(key, value) {
		if (stack.length > 0) {
		  var thisPos = stack.indexOf(this)
		  ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
		  ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
		  if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
		}
		else stack.push(value)

		return replacer == null ? value : replacer.call(this, key, value)
	  }
	};
	return {
		isInt: isInt,
		isNumber: isNumber,
		stringifySafe: stringifySafe
	};	
}();