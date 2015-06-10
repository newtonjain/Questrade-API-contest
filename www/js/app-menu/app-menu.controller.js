(function(){
	'use strict';

	function AppMenuController($scope, iqAccountService) {
		var _self = this;

		$scope.aa;
		$scope.bb;
		$scope.cc;

		iqAccountService.getAccounts().then(function(accounts) {
			$scope.accounts = accounts;
		});
	}

	AppMenuController.$inject = ['$scope', 'iqAccountService'];

	angular.module('app.menu')
		.controller('MenuCtrl', AppMenuController);
})()