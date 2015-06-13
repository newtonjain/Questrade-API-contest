(function() {
	'use strict';

	function AppCtrl($scope, webAPIUser) {
		webAPIUser.oauthToken = '8bqWWhgBURodkQNldX0k1LgAV-W8lDEb0';

	  $scope.$watch('$scope.aa', function(a) {
   	console.log('changing', a);
	//$scope.a = a;
});

	}
//ADLER: How is this webAPIuser being injected into the controller 
//of the main app without adding the webAPIUser module to the app.
	AppCtrl.$inject = ['$scope','webAPIUser'];

	angular.module('app')
		.controller('AppCtrl', AppCtrl);
})();