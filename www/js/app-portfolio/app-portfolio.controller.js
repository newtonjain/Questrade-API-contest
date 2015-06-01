(function() {
	'use strict';

	var mockedPositions = [
		{
			symbol: {
				symbolName: 'AAPL',
				$industry: 'IT'
			},
			openQuantity: 30,
			currentMarketValue: 6017,
			openPnl: -6,
		},
		{
			symbol: {
				symbolName: 'GOOG',
				$industry: 'IT'
			},
			openQuantity: 10,
			currentMarketValue: 5017,
			openPnl: 0.3,
		},
		{
			symbol: {
				symbolName: 'ENY',
				$industry: 'Heath Care'
			},
			openQuantity: 100,
			currentMarketValue: 1017,
			openPnl: 0.84,
		},
		{
			symbol: {
				symbolName: 'PCZ',
				$industry: 'Oil & Energy'
			},
			openQuantity: 10,
			currentMarketValue: 2017,
			openPnl: 1.84,
		}
	]

	function PortfolioCtrl($scope, positions) {
		var _self = this;
		var accountsPromise;

		$scope.portfolio1 = positions.portfolio1();

	
		//console.log('port', positions.portfolio1());
		function _prepareBubbleChart(positions) {
			var chartData = [['ID', 'Mkt Value', 'PnL', 'industry',  'Number of Positions']];
			var i, position;

			var industries = {}, item;

			for (i = 0; i < positions.length; i++) { 
				position = positions[i];
				item = industries[position.symbol.$industry] || { openPnl: 0, currentMarketValue: 0, openQuantity: 0, positions: []};

				item.name = position.symbol.$industry;
				item.openPnl += position.openPnl;
				item.currentMarketValue += position.currentMarketValue;
				item.openQuantity += position.openQuantity;
				item.positions.push(position);

				industries[position.symbol.$industry] = item;
			}			

			for (i in industries) {
				item = industries[i]
				chartData.push([ 
					item.name,
					item.currentMarketValue / item.positions.length,
					item.openPnl / item.positions.length,
					i,
					item.openQuantity
				]);
			}

			$scope.chartData = chartData;
		}

		_prepareBubbleChart(mockedPositions);
	}

	PortfolioCtrl.$inject = ['$scope', 'positions'];

	angular.module('app.portfolio')
		.controller('PortfolioCtrl', PortfolioCtrl); 
})()