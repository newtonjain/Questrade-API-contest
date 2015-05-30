(function() {
	'use strict';

	function _run($ionicPlatform) {
		$ionicPlatform.ready(function() {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar) {
				// org.apache.cordova.statusbar required
				StatusBar.styleDefault();
			}
		});
	};

	function _config($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('app', {
				url: "/app",
				abstract: true,
				templateUrl: "templates/menu.html",
				controller: 'MenuCtrl'
			})

		//  .state('app.charts', {
		// 	url: "/charts",
		// 	views: {
		// 		'menuContent': {
		// 			templateUrl: "templates/charts.html",
		// 			controller: "ChartsCtrl"
		// 		}
		// 	}
		// })

	// This state is breaking the application. Need to check it again.
		.state('app.portfolio', {
		  url: "/portfolio",
		  views: {
		    'menuContent': {
		      templateUrl: "templates/portfolio.html",
		      controller: "PortfolioCtrl" 
		    }
		  }
		})

		// .state('app.browseStocks', {
		// 	url: "/browseStocks",
		// 	views: {
		// 		'menuContent': {
		// 			templateUrl: "templates/browseStocks.html",
		// 			controller: "browseStocksCtrl"
		// 		}
		// 	}
		// })

		// .state('app.playlists', {
		// 	url: "/playlists",
		// 	views: {
		// 		'menuContent': {
		// 			templateUrl: "templates/playlists.html",
		// 			controller: 'PlaylistsCtrl'
		// 		}
		// 	}
		// })

		// .state('app.single', {
		// 	url: "/playlists/:playlistId",
		// 	views: {
		// 		'menuContent': {
		// 			templateUrl: "templates/playlist.html",
		// 			controller: 'PlaylistCtrl'
		// 		}
		// 	}
		// });
		// if none of the above states are matched, use this as the fallback
		
		$urlRouterProvider.otherwise('/app/portfolio');
	}

	var app = angular.module('app', ['ionic', 'app.menu', 'app.portfolio'])
		.run(_run)
		.config(_config);
})();
