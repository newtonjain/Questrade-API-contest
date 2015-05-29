(function() {
	'use strict';

	var DEFAULT_METHOD = 'accounts';
	var POSITIONS_METHOD = 'positions';
	var BALANCES_METHOD = 'balances';

	function IQAccountService(iqWebAPIService) {
		var _self = this;
		var _getAccountPromise;

		function _doRequest(method, accountNumber) {
			if (method) {
				method = '/' + method;
			}

			if (accountNumber) {
				accountNumber = '/' + accountNumber;
			}

			return iqWebAPIService.get(DEFAULT_METHOD + accountNumber + method);
		}

		/**
		 * Method to retrieve all accounts of the current user
		 */
		_self.getAccounts = function getAccounts() {
			if (!_getAccountPromise) {
				_getAccountPromise = _doRequest().then(function(accounts) {
					var i;

					for (i = 0; i < accounts.length; i++) {
						accounts[i].getPositions = _doRequest.bind(_self, POSITIONS_METHOD, accounts[i].number);
						accounts[i].getBalances = _doRequest.bind(_self, BALANCES_METHOD, accounts[i].number);
					}

					return accounts;
				});
			}

			return _getAccountPromise;
		};

		/**
		 * Method to get positions of a given account
		 * @param {string} accountNumber;
		 */
		_self.getAccountPositions = _doRequest.bind(_self, POSITIONS_METHOD);

		/**
		 * Method to get balances of a given account
		 * @param {string} accountNumber
		 */
		_self.getAccountBalances = _doRequest.bind(_self, BALANCES_METHOD);
	}

	IQAccountService.$inject = ['iqWebAPIService'];

	angular.module('ngQuestradeWebAPI')
		.service('iqAccountService', IQAccountService);
})();
