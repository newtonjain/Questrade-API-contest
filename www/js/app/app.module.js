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
      .state('app.portfolio', {
        url: "/portfolio",
        views: {
          menuContent: {
            templateUrl: "templates/portfolio.html",
            controller: "PortfolioCtrl" 
          }
        }
      });

    
    $urlRouterProvider.otherwise('/app/portfolio');
  }

  var app = angular.module('app', ['ionic', 'app.menu', 'app.portfolio'])
    .run(_run)
    .config(_config);
})();
