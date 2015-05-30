(function() {
	'use strict';

	function PortfolioCtrl($scope, iqAccountService) {
		var _self = this;
		var accountsPromise

		function _loadAccounts() {
			if (!accountsPromise) {
				accountsPromise = iqAccountService.getAccounts().then(function(accounts) {
					$scope.accounts = accounts;
					_setAccount(accounts[0]);
					return accounts
				});
			}

			return accounts;
		}

		function _setAccount(account) {
			return account.getPositions().then(function(positions) {
				scope.positions = positions;
				_prepareBubbleChart(positions);
			});
		}

		function _prepareBubbleChart(positions) {
			var chartData = [];
			var i;

			for (i = 0; i < positions.length; i++) {
				chartData.push({
					position: position[0],

				})
			}
		}
	}

	PortfolioCtrl.$inject = ['$scope'];

	angular.module('app.portfolio')
		.controller('PortfolioCtrl', PortfolioCtrl); 
})()