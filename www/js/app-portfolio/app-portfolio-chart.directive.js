(function() {
	'use strict';

	function portfolioChartDirective($q) {
		var defered = $q.defer(),
			googleLibPromise = defered.promise;

		function _link(scope, element, attrs) {
			var chart = new google.visualization.BubbleChart(element[0]);

			scope.$watch('data', function _drawChart(data) {
				var pdata = google.visualization.arrayToDataTable(data),
					minY, minX, maxY, maxX, yRange, xRange;

				minY = minX = Number.POSITIVE_INFINITY;
				maxY = maxX = Number.NEGATIVE_INFINITY;

				for (var i = 1; i < data.length; i++) {
					minY = Math.min(data[i][1], minY);
					minX = Math.min(data[i][2], minX);

					maxY = Math.max(data[i][1], maxY);
					maxX = Math.max(data[i][2], maxX);
				}

				yRange = Math.abs((minY + maxY) / 2)
				xRange = Math.abs((minX + maxX) / 2)


				chart.draw(pdata, {
					hAxis: {title: data[0][1], minValue: 0 , maxValue: maxY + yRange },
					vAxis: {title: data[0][2], minValue: minX - xRange, maxValue: maxX + xRange },
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