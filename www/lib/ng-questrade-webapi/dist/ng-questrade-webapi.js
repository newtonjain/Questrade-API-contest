(function() {
	'use strict';

	angular.module('ngQuestradeWebAPI', []);
})();

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

(function() {
	'use strict';

	var LOGIN_OAUTH_URL = 'https://login.questrade.com/oauth2/token';
	var GET_REQUEST = 'GET';
	var POST_REQUEST = 'POST';
	var GRANT_TYPE = 'refresh_token';

	function IQWebAPIService($http, oauthToken) {
		var _self = this;
		var _tokenPromise;

		function _setAuthorizationToken(token_type, access_token) {
			$http.defaults.headers.common.Authorization = token_type + ' ' + access_token;
		}

		function _getAccessToken() {
			var requestParameters = {
				grant_type: GRANT_TYPE,
				refresh_token: oauthToken
			};

			if (!_tokenPromise) {
				_tokenPromise = $http.post(LOGIN_OAUTH_URL, requestParameters).then(function(accessPermision) {
					accessPermision = accessPermision.data;
					_setAuthorizationToken(accessPermision.token_type, accessPermision.access_token);
					return accessPermision;
				});
			}

			return _tokenPromise;
		}

		function _doRequest(type, method, parameters) {
			type = type || GET_REQUEST;

			return _getAccessToken().then(function(accessPermision) {
				var request = {
					type: type,
					url: accessPermision.api_server + '/' + method,
					data: parameters
				};

				return $http(request);
			});
		}

		/**
		 * Interface to get in the WebAPI;
		 *
		 * @param  {[type]} method     [description]
		 * @param  {[type]} parameters [description]
		 */
		_self.get = _doRequest.bind(_self, GET_REQUEST);

		/**
		 * Interface to post in the WebAPI
		 * @param  {[type]} method     [description]
		 * @param  {[type]} parameters [description]
		 */
		_self.post = _doRequest.bind(_self, POST_REQUEST);
	}

	IQWebAPIService.$inject = ['$http', 'oauthToken'];

	angular.module('ngQuestradeWebAPI')
		.service('iqWebAPIService', IQWebAPIService);
})();
