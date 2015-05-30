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
