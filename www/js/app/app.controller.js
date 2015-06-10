(function() {
	'use strict';

	function AppCtrl(webAPIUser) {
		webAPIUser.oauthToken = '8bqWWhgBURodkQNldX0k1LgAV-W8lDEb0';
	}
//ADLER: How is this webAPIuser being injected into the controller 
//of the main app without adding the webAPIUser module to the app.
	AppCtrl.$inject = ['webAPIUser'];

	angular.module('app')
		.controller('AppCtrl', AppCtrl);
})();