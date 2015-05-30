// (function () {
// 	'use strict';
	
// })();
// angular.module('starter.controllers', [])

// api.controller('AppCtrl', function($scope, $ionicModal, $timeout, Mocked, positions, accounts, $http) {
// 	console.log('I am in the menu controller');
// 	// Form data for the login modal
// 	$scope.loginData = {};
// 	console.log('Mocked values', Mocked.get(4));
// 	console.log('value from positions', positions.test(11));

// 	// Create the login modal that we will use later
// 	$ionicModal.fromTemplateUrl('templates/login.html', {
// 		scope: $scope
// 	}).then(function(modal) {
// 		$scope.modal = modal;
// 	});
// 	// NEWTON 
// 	//This where the controllers methods for the maps can be laid out. 
// 	//1) Inject a map api that takes in some Jason data from the extrenal server or simple has a good enogh input stream of data. This can take some research and may even require 2-3 api separatly. But if executed properly, the Main chunk of UI can be wrapped up.

// 	// Triggered in the login modal to close it
// 	$scope.closeLogin = function() {
// 		$scope.modal.hide();
// 	};

// 	// $http.defaults.headers.common.Authorization = 'Bearer ymItBAAULE5Yjte_qmkApTvU8dDwwaaY0';

// 	// var req = {
// 	//  method: 'GET',
// 	//  url: 'https://api05.iq.questrade.com/v1/accounts/51641855/positions'
// 	// }

// 	// $http(req).success(function(data, status, headers, config){

// 	//   alert(data);

// 	// }).error(function(data, status, headers, config){
// 	//   alert('something is worng, you are not calling it correctly');
// 	// });

// $http.get('https://api01.iq.questrade.com/v1/time', {
// 		headers: {'Authorization': 'Bearer AJEAnQiOD5YdKY8jSxTndgDn5xYLhrWy0'}
// }).success(function(data, status, headers, config) {
// 		alert(data);
// 	}).
// 	error(function(data, status, headers, config) {
// 		// called asynchronously if an error occurs
// 		// or server returns response with an error status.
// 		alert('something is worng, you are not calling it correctly');
// 	});

//  $http.defaults.headers.common.Authorization = 'Bearer AJEAnQiOD5YdKY8jSxTndgDn5xYLhrWy0';

// $http.get('https://api01.iq.questrade.com/v1/accounts/51641855/positions').success(function(data) {
// 		alert(JSON.stringify(data));
// }).error(function(data){
// 	alert('errorrr....');
// });
// $scope.test = function(){
// 	alert('I am pressing the button');
// $http.get('https://api03.iq.questrade.com/v1/time', 
// 		{headers: { Authorization: 'Bearer lQM9_yn7S4x34OuoWgAA1AQV4VbMxqtr0'}})
// 		.then(function(response) {
// 						alert(response);
// 		});

// // $http.get('http://gd2.mlb.com/components/game/mlb/year_2014/month_03/day_05/master_scoreboard.json')
// // .then(function(data) {
// //     alert(JSON.stringify(data));
// // });

// 	};

// 	// Open the login modal
// 	$scope.login = function() {
// 		// NEWTON
// 		// we can hardcode some username and password combos so that it can easity demostrate some basic layer of security.
// 		// Or I can even search from authentication protocol by questrade api. 
// 		$scope.modal.show();
// 	};

// 	// Perform the login action when the user submits the login form
// 	$scope.doLogin = function() {
// 		console.log('Doing login', $scope.loginData);

// 		// Simulate a login delay. Remove this and replace with your loginData
// 		// code if using a login system
// 		$timeout(function() {
// 			$scope.closeLogin();
// 		}, 1000);
// 	};
// })
