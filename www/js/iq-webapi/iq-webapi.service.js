(function() {
	'use strict';

	var LOGIN_OAUTH_URL = 'https://login.questrade.com/oauth2/token';
	var OAUTH_TOKEN = ''; // we should hardcode our token here
	var GET_REQUEST = 'GET';
	var POST_REQUEST = 'POST';
	var GRANT_TYPE = 'refresh_token';

	function IQWebAPIService($http) {
		var _self = this;
		var _tokenPromise;

		function _setAuthorizationToken(token_type, token) {
			$http.defaults.headers.common.Authorization = token_type + ' ' + access_token;
		}

		function _getAccessToken() {
			var requestParameters = {
				grant_type: GRANT_TYPE,
				refresh_token: OAUTH_TOKEN
			};

			if (!_tokenPromise) {
				_tokenPromise = $http.get(LOGIN_OAUTH_URL, requestParameters).then(function(accessPermision) {
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
				}

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
		_send.post = _doRequest.bind(_self, POST_REQUEST);
	}

	IQWebAPI.$inject = ['$http'];

	angular.module('iq.webapi')
		.service('iqWebAPIService', IQWebAPIService);
})();