(function() {

  'use strict';

  var charts = document.getElementById('chart-hidden').getElementsByTagName('div');
  var i = 0;

  for (i=0; i< charts.length; i++) {
    var chart = charts[i];
    var baseline = chart.getElementsByClassName("baseline");
    var baselineNum = baseline[i].innerHTML;
    var element = chart.getElementsByClassName("element");
    var elementNum = element[i].innerHTML;
    var label = chart.getElementsByClassName("chart-label");
    var specificLabel = label[i].innerHTML;
    var chartDiv = document.createElement('ct-chart-' + [i]);

    var data = {
      labels: specificLabel,
      series: [
        [baselineNum],
        [elementNum]
      ]
    };

    var options = {
      seriesBarDistance: 10,
      reverseData: true,
      horizontalBars: true,
      axisY: {
        offset: 200
      },
      width: "75%"
    };

    var responsiveOptions = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 10,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];

    new Chartist.Bar(chartDiv, data, options, responsiveOptions);
  }

})();
