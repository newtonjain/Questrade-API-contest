(function() {
    'use strict';
    // ADLER: how are these charts implemented. There is a directive, a controller and a html 
    // that are sharing the data in a very clean fashion.
    var mockedPositions = [{
        symbol: {
            symbolName: 'AAPL',
            $industry: 'IT'
        },
        openQuantity: 5,
        currentMarketValue: 6017,
        openPnl: -6,
    }, {
        symbol: {
            symbolName: 'GOOG',
            $industry: 'IT'
        },
        openQuantity: 14,
        currentMarketValue: 5017,
        openPnl: 0.3,
    }, {
        symbol: {
            symbolName: 'ENY',
            $industry: 'Heath Care'
        },
        openQuantity: 20,
        currentMarketValue: 1017,
        openPnl: 0.84,
    }, {
        symbol: {
            symbolName: 'PCZ',
            $industry: 'Oil & Energy'
        },
        openQuantity: 10,
        currentMarketValue: 2017,
        openPnl: 1.84,
    }]

    function PortfolioCtrl($scope, positions) {
        var _self = this;
        var accountsPromise;

        $scope.portfolio1 = positions.portfolio1();
        $scope.aa = {};
        $scope.bb = {};
        $scope.cc = {};
        $scope.cIndustries = {};
        console.log('port', $scope.portfolio1);

        function _prepareBubbleChart(positions) {
            var chartData = [
                ['ID', 'Mkt Value', 'PnL', 'industry', 'Number of Positions']
            ];
            var i, position;

            var industries = {},
                item;

            for (i = 0; i < positions.length; i++) {
                position = positions[i];
                item = industries[position.symbol.$industry] || {
                    openPnl: 0,
                    currentMarketValue: 0,
                    openQuantity: 0,
                    positions: []
                };

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

            var chart1 = {};
            chart1.type = "PieChart";
            chart1.data = [
                ['Component', 'cost'],
                ['Software', 50],
                ['Hardware', 8]
            ];
            chart1.data.push(['Services', 20]);
            chart1.options = {
                displayExactValues: true,
                width: 400,
                height: 200,
                is3D: true,
                chartArea: {
                    left: 10,
                    top: 10,
                    bottom: 0,
                    height: "100%"
                }
            };

            chart1.formatters = {
                number: [{
                    columnNum: 1,
                    pattern: "$ #,##0.00"
                }]
            };

            $scope.chart = chart1;

            $scope.aa.data = 1 * $scope.chart.data[1][1];
            $scope.bb.data = 1 * $scope.chart.data[2][1];
            $scope.cc.data = 1 * $scope.chart.data[3][1];

            $scope.$watch(function() {
                return $scope.aa;
            }, function(a) {
                console.log('the value of changing a is', a);
                $scope.a = a;
            });

            $scope.$watch(function() {
                return $scope.bb;
            }, function(b) {
                $scope.b = b;
            });
            $scope.$watch(function() {
                return $scope.cc;
            }, function(c) {
                $scope.c = c;
            });

            //ADLER: Why is this not working, I thought the two way binding will display dd in its right place
            // $scope.a = $scope.aa.data; 
            // $scope.b = $scope.bb.data;
            // $scope.c = $scope.cc.data; 

            $scope.distribute = function(number) {
                console.log('here is the number', number);
                var sum = parseInt($scope.a.data, 10) + parseInt($scope.b.data, 10) + parseInt($scope.c.data, 10);
                console.log('here is the sum', sum, $scope.a.data, $scope.b.data, $scope.c.data);
                $scope.in1 = $scope.a.data * number / sum;
                $scope.in2 = $scope.b.data * number / sum;
                $scope.in3 = $scope.c.data * number / sum;
            }
        }

        _prepareBubbleChart(mockedPositions);
////////////////////////////////////////////////

        $scope.getStock = function(stock) {
            var stockSearch;
            console.log('the stock is', stock)
            stockSearch = positions.get(stock);
            $scope.portfolio1.push(stockSearch);
            console.log('the portfolio is', $scope.portfolio1);
            $scope.categorize();
        };

        $scope.categorize = function() {
            for(var i=0; i < $scope.portfolio1.length; i++){
                var Sector = $scope.portfolio1[i].Sector;
                if($scope.cIndustries[Sector] == undefined){
                    $scope.cIndustries[Sector] = $scope.portfolio1[i];
                }
            }

            console.log('the industry is' + $scope.cIndustries);
        }


        $scope.categorize();

/////////////////////////////////////////////////////
        
    }

    PortfolioCtrl.$inject = ['$scope', 'positions'];

    angular.module('app.portfolio')
        .controller('PortfolioCtrl', PortfolioCtrl);
})()