describe('Service: IQWebAPI', function() {
	'use strict';

	var service;
	var $httpBackend;
	var mockedToken = 'myToken';
	var LOGIN_URL = 'https://login.questrade.com/oauth2/token';
	var mockedAcessResponse = {
		access_token: 'myToken',
		token_type: 'Bearer',
		expires_in: 1800,
		refresh_token: 'refreshToken',
		api_server: 'https://api01.iq.questrade.com/v1'
	};

	beforeEach(module('ngQuestradeWebAPI', 'ngMock', function($provide) {
		$provide.value('oauthToken', mockedToken);
	}));

	beforeEach(inject(function(_$httpBackend_, iqWebAPIService) {
		$httpBackend = _$httpBackend_;
		$httpBackend.when('POST', LOGIN_URL).respond(mockedAcessResponse);
		$httpBackend.when('GET', mockedAcessResponse.api_server + '/accounts').respond({});

		service = iqWebAPIService;
	}));

	it('should works', function() {
		expect(true).toEqual(true);
	});

	describe('#Authentication', function() {
		var $http;

		beforeEach(inject(function(_$http_) {
			$http = _$http_;
			spyOn($http, 'post').and.callThrough();
			spyOn($http, 'get').and.callThrough();
		}));

		it('should request the access token before do any request', inject(function($http) {
			service.get('accounts');
			expect($http.post).toHaveBeenCalledWith( LOGIN_URL,
													{ grant_type: 'refresh_token', refresh_token: mockedToken });
		}));

		it('should request the access_token only once', function() {
			service.get('accounts');
			service.get('balance');
			expect($http.post.calls.count()).toBe(1);
		});

		it('should set the default autorization type and token', function() {
			service.get('accounts');
			$httpBackend.flush();

			expect($http.defaults.headers.common.Authorization)
				.toEqual(mockedAcessResponse.token_type + ' ' + mockedAcessResponse.access_token);
		});

		it('should request to the received api server', function() {
			service.get('accounts');
			$httpBackend.flush();

			$httpBackend.expectGET(mockedAcessResponse.api_server + '/account');
		});
	});
});
