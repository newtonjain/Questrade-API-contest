(function() {
	'use strict';

	function AppCtrl(webAPIUser) {
		webAPIUser.oauthToken = '8bqWWhgBURodkQNldX0k1LgAV-W8lDEb0';
	}

	AppCtrl.$inject = ['webAPIUser'];

	angular.module('app')
		.controller('AppCtrl', AppCtrl);
})();