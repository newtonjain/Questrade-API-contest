(function() {
	'use strict';

	function AppCtrl(webAPIUser) {
		webAPIUser.oauthToken = '';
	}

	AppCtrl.$inject = ['webAPIUser'];

	angular.module('app')
		.controller('AppCtrl', AppCtrl);
})();