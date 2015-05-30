describe('Service: iqAccountService', function() {
	'use strict';

	var $rootScope;
	var iqWebAPIService, iqAccountService;
	var mockedAccounts = {
		type: 'Margin',	
		number: '26598145',
		status: 'Active',
		isPrimary: true,
		isBilling: true,
		clientAccountType: 'Individual'
	};

	beforeEach(module('ngQuestradeWebAPI', 'ngMock'));

	beforeEach(inject(function(_$rootScope_, _iqWebAPIService_, _iqAccountService_) {
		$rootScope = _$rootScope_;
		iqWebAPIService = _iqWebAPIService_;
		iqAccountService = _iqAccountService_;

		spyOn(iqWebAPIService,  'get').and.callThrough();
		spyOn(iqWebAPIService,  'post').and.callThrough();
	}));

	function _checkWebAPICall(accountNumber, method, params) {
		params = (params)  ? jasmine.objectContaining(params) : jasmine.any(Object);

		expect(iqWebAPIService.get).toHaveBeenCalledWith('accounts/' + accountNumber + '/' + method, params);
	}

	describe('#getAccounts', function() {
		beforeEach(inject(function($q) {
			iqWebAPIService.get.and.returnValue($q.when({ accounts: [mockedAccounts] }));
		}));

		it('should request the correct method to retrieve accounts', function() {
			iqAccountService.getAccounts();

			expect(iqWebAPIService.get).toHaveBeenCalledWith('accounts', jasmine.any(Object));
		});

		it('should create methods to request positions, order, executions and balances of the accouns', function() {
			var _accounts;

			function _checkMethod(obj, method) {
				expect(obj[method]).toBeDefined();
				expect(typeof(obj[method])).toEqual('function');
			}

			iqAccountService.getAccounts().then(function(accounts) {
				_accounts = accounts;
			});

			$rootScope.$apply();

			_checkMethod(_accounts[0], '$getBalances');
			_checkMethod(_accounts[0], '$getOrders');
			_checkMethod(_accounts[0], '$getPositions');
			_checkMethod(_accounts[0], '$getExecutions');
		});
	});

	describe('#getAccountBalances', function() {
		var account;

		beforeEach(inject(function($q) {
			iqWebAPIService.get.and.returnValue($q.when({ accounts: [mockedAccounts] }));
			iqAccountService.getAccounts().then(function(accounts) {
				account = accounts[0];
			});

			$rootScope.$apply();
			iqWebAPIService.get.calls.reset();
		}));

		it('should request account balances from the account object', function() {
			account.$getBalances();

			_checkWebAPICall(mockedAccounts.number, 'balances');
		});

		it('should request account balances passing the account number', function() {
			iqAccountService.getAccountBalances(mockedAccounts.number);
			_checkWebAPICall(mockedAccounts.number, 'balances');
		});
	});

	describe('#getAccountPositions', function() {
		var account;

		beforeEach(inject(function($q) {
			iqWebAPIService.get.and.returnValue($q.when({ accounts: [mockedAccounts] }));
			iqAccountService.getAccounts().then(function(accounts) {
				account = accounts[0];
			});

			$rootScope.$apply();
			iqWebAPIService.get.calls.reset();
		}));

		it('should request account positions from the account object', function() {
			account.$getPositions();

			_checkWebAPICall(mockedAccounts.number, 'positions');
		});

		it('should request account balances passing the account number', function() {
			iqAccountService.getAccountPositions(mockedAccounts.number);
			
			_checkWebAPICall(mockedAccounts.number, 'positions');
		});
	});

	describe('#getAccountOrders', function() {
		var account;

		beforeEach(inject(function($q) {
			iqWebAPIService.get.and.returnValue($q.when({ accounts: [mockedAccounts] }));
			iqAccountService.getAccounts().then(function(accounts) {
				account = accounts[0];
			});

			$rootScope.$apply();
			iqWebAPIService.get.calls.reset();
		}));

		it('should request account positions from the account object', function() {
			account.$getOrders();

			_checkWebAPICall(mockedAccounts.number, 'orders');
		});

		it('should request account balances passing the account number', function() {
			iqAccountService.getAccountOrders(mockedAccounts.number);

			_checkWebAPICall(mockedAccounts.number, 'orders');
		});
	});
});