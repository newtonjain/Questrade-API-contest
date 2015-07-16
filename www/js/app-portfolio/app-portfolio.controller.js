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
        $scope.dd = {};
        $scope.ee = {};
        $scope.ff = {};
        $scope.cIndustries = {};
        $scope.keys = [];
        //console.log('port', $scope.portfolio1);

        function _prepareBubbleChart(positions) {
            var chartData = [
                ['ID', 'Mkt Value', 'PnL', 'industry', 'Number of Positions']
            ];
            var i, position;

            var industries = {},
                item;
            $scope.keys = Object.keys($scope.cIndustries);

            for (i = 0; i < positions.length; i++) {
                position = positions[i];
                item = industries[position.Sector] || {
                    openPnl: 0,
                    currentMarketValue: 0,
                    openQuantity: 0,
                    positions: []
                };

                item.name = position.Sector;
                item.openPnl += position.openPnl;
                item.currentMarketValue += position.currentMarketValue;
                item.openQuantity += position.openQuantity;
                item.positions.push(position);

                industries[position.Sector] = item;
            }

            console.log('this is industries', industries);
            
                industries[$scope.keys[0]].currentMarketValue = $scope.in1;
                industries[$scope.keys[1]].currentMarketValue = $scope.in2;
                industries[$scope.keys[2]].currentMarketValue = $scope.in3;
                industries[$scope.keys[3]].currentMarketValue = $scope.in4;

                industries[$scope.keys[0]].openPnl = 0.3;
                industries[$scope.keys[1]].openPnl = 0.3;
                industries[$scope.keys[2]].openPnl = 0.3;
                industries[$scope.keys[3]].openPnl = 0.3;


                industries[$scope.keys[0]].openQuantity = 10;
                industries[$scope.keys[1]].openQuantity = 10;
                industries[$scope.keys[2]].openQuantity = 10;
                industries[$scope.keys[3]].openQuantity = 10;
            

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
//////////////////////////////////////////////////
            $scope.chartData = chartData;

            var chart1 = {};
            chart1.type = "PieChart";
//////////////////////////
            chart1.data = [
                ['Component', 'cost']
            ];
           
/////////////////////////////
            for(var key in $scope.cIndustries){
               // console.log('the len', $scope.cIndustries.length);
                chart1.data.push([key, 20]);
            }
           

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
            $scope.dd.data = 1 * $scope.chart.data[4][1];
          //  $scope.ee.data = 1 * $scope.chart.data[5][1];

            $scope.$watch(function() {
                return $scope.aa;
            }, function(a) {
             //   console.log('the value of changing a is', a);
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
            $scope.$watch(function() {
                return $scope.dd;
            }, function(d) {
                $scope.d = d;
            });

            //ADLER: Why is this not working, I thought the two way binding will display dd in its right place
            // $scope.a = $scope.aa.data; 
            // $scope.b = $scope.bb.data;
            // $scope.c = $scope.cc.data; 

            $scope.distribute = function(number) {
                console.log('here is the number', number);
                var sum = parseInt($scope.a.data, 10) + parseInt($scope.b.data, 10) + parseInt($scope.c.data, 10) + parseInt($scope.d.data, 10);
                console.log('here is the sum', sum, $scope.a.data, $scope.b.data, $scope.c.data, $scope.d.data);
                $scope.in1 = $scope.a.data * number / sum;
                $scope.in2 = $scope.b.data * number / sum;
                $scope.in3 = $scope.c.data * number / sum;
                $scope.in4 = $scope.d.data * number / sum;

                console.log('This is imp1', $scope.portfolio1.length, $scope.cIndustries.length);
                _prepareBubbleChart($scope.portfolio1);

            }
        }
 
////////////////////////////////////////////////

        $scope.getStock = function(stock) {
            var stockSearch;
           // console.log('the stock is', stock)
            stockSearch = positions.get(stock);
            $scope.portfolio1.push(stockSearch);
          //  console.log('the portfolio is', $scope.portfolio1);
            $scope.categorize();
        };

        $scope.newPage = function() {
            $state.go('app.portfolio.browseStocks');
        }

        $scope.categorize = function() {
            for(var i=0; i < $scope.portfolio1.length; i++){
                var Sector = $scope.portfolio1[i].Sector;
                if($scope.cIndustries[Sector] == undefined){
                    $scope.cIndustries[Sector] = $scope.portfolio1[i];
                 } 
            }
           // console.log('the industry is' + JSON.stringify($scope.cIndustries));
               _prepareBubbleChart($scope.portfolio1);
        }

        $scope.categorize();

/////////////////////////////////////////////////////
        _prepareBubbleChart($scope.portfolio1);    
    }

    PortfolioCtrl.$inject = ['$scope', 'positions'];

    angular.module('app.portfolio')
        .controller('PortfolioCtrl', PortfolioCtrl);
})()