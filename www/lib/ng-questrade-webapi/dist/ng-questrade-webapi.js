(function() {
	'use strict';

	angular.module('ngQuestradeWebAPI', [])
		.value('webAPIUser', { oauthToken: null });
})();

(function() {
	'use strict';

	var DEFAULT_METHOD = 'accounts';
	var POSITIONS_METHOD = 'positions';
	var BALANCES_METHOD = 'balances';
	var ORDERS_METHOD = 'orders';
	var EXECUTIONS_METHOD = 'executions';

	function IQAccountService(iqWebAPIService) {
		var _self = this;
		var _getAccountPromise;

		function _doRequest(method, accountNumber, params) {
			method = method || '';
			accountNumber = accountNumber || '';
			params = params || {};

			if (method) {
				method = '/' + method;
			}

			if (accountNumber) {
				accountNumber = '/' + accountNumber;
			}

			return iqWebAPIService.get(DEFAULT_METHOD + accountNumber + method, params);
		}

		/**
		 * Method to retrieve all accounts of the current user
		 */
		_self.getAccounts = function getAccounts() {
			if (!_getAccountPromise) {
				_getAccountPromise = _doRequest().then(function(response) {
					var i;
					var accounts = response.accounts;

					for (i = 0; i < accounts.length; i++) {
						accounts[i].$getPositions = _doRequest.bind(_self, POSITIONS_METHOD, accounts[i].number);
						accounts[i].$getBalances = _doRequest.bind(_self, BALANCES_METHOD, accounts[i].number);
						accounts[i].$getOrders = _doRequest.bind(_self, ORDERS_METHOD, accounts[i].number);
						accounts[i].$getExecutions = _doRequest.bind(_self, EXECUTIONS_METHOD, accounts[i].number);
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

		/**
		 * Method to request all account orders
		 * @type {[type]}
		 */
		_self.getAccountOrders = _doRequest.bind(_self, ORDERS_METHOD);

		/**
		 * Method to request all account executions
		 * @type {[type]}
		 */
		_self.getAccountExecutions = _doRequest.bind(_self, EXECUTIONS_METHOD);
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

	function IQWebAPIService($http, webAPIUser) {
		var _self = this;
		var _tokenPromise;

		/**
		 * Sets the default authentication method and token in the headers
		 * 
		 * @param {String} token_type   
		 * @param {String} access_token 
		 */
		function _setAuthorizationToken(token_type, access_token) {
			$http.defaults.headers.common.Authorization = token_type + ' ' + access_token;
		}

		/**
		 * Requests the access method
		 */
		function _getAccessToken() {
			var requestParameters = {
				grant_type: GRANT_TYPE,
				refresh_token: webAPIUser.oauthToken
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

		/**
		 * Do the request to the server
		 * 
		 * @param  {String} requestType     GET | POST
		 * @param  {String} method     
		 * @param  {Object} parameters 
		 */
		function _doRequest(requestType, method, parameters) {
			requestType = requestType || GET_REQUEST;

			return _getAccessToken().then(function(accessPermision) {
				var request = {
					method: requestType,
					url: accessPermision.api_server + '/' + method,
					params: requestType == GET_REQUEST ? parameters : null,
					data: requestType == POST_REQUEST ? parameters : null
				};

				return $http(request).then(function(response) {
					return response.data;
				});
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

	IQWebAPIService.$inject = ['$http', 'webAPIUser'];

	angular.module('ngQuestradeWebAPI')
		.service('iqWebAPIService', IQWebAPIService);
})();
