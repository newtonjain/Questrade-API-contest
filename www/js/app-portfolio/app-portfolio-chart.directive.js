(function() {
	'use strict';

	function portfolioChartDirective($q) {
		var defered = $q.defer(),
			googleLibPromise = defered.promise;

		function _link(scope, element, attrs) {
			var chart = new google.visualization.BubbleChart(element[0]);

			scope.$watch('data', function _drawChart(data) {
				var pdata = google.visualization.arrayToDataTable(data);
				
				chart.draw(pdata, {
					hAxis: {title: data[0][1]},
					vAxis: {title: data[0][2]},
					bubble: {textStyle: {fontSize: 11}}
				});
			});
		}

		return {
			link: _link,
			scope: {
				data: '=*'
			}
		}
	}

	portfolioChartDirective.$inject = ['$q']

	angular.module('app.portfolio')
		.directive('portfolioChart', portfolioChartDirective);
})();