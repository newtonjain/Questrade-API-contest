(function() {
	'use strict';
	function BalancesController($scope){
		var _self = this;
		$scope.playlists = [
			{
				title: 'Balances',
				id: 1
			},
			{
				title: 'Profit and Losses',
				id: 2
			},
			{
				title: 'Positions',
				id: 3
			}
		];

		//Team:
		//How do we pass variables between modules.

		$scope.variable =1;
	}

	BalancesController.$inject = ['$scope'];

	angular.module('app.balances')
		.controller('BalancesCtrl', BalancesController);
})()