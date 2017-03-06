(function() {

  'use strict';

  var stats = document.getElementById('chart-hidden').getElementsByTagName('div');
  var charts = document.getElementById('charts');
  var i = 0;

  for (i=0; i < stats.length; i++) {
    var chart = stats[i];
    var baseline = chart.getElementsByClassName("baseline")[0].innerHTML;
    var baselineNum = parseInt(baseline, 10);
    var element = chart.getElementsByClassName("element")[0].innerHTML;
    var elementNum = parseInt(element, 10);
    var label = chart.getElementsByClassName("chart-label")[0].innerHTML;
    var chartDiv = document.createElement('div');
    chartDiv.setAttribute('class', 'ct-chart');
    chartDiv.setAttribute('id', 'ct-chart-' + [i]);
    charts.appendChild(chartDiv);
    var chartClass = 'ct-bar';
    if (baselineNum < elementNum) {
      chartClass = 'ct-bar-red';
    }

    var data = {
      labels: [label],
      series: [{
        data: [
          {value: baseline}
        ]
      }, {
        data: [
          {value: element}
        ]
      }]
    };

    var options = {
      seriesBarDistance: 10,
      reverseData: true,
      axisY: {
        offset: 200
      },
      width: "85%",
      stackBars: true,
      plugins: [
        Chartist.plugins.ctAxisTitle({
          axisY: {
            axisTitle: '(Milliseconds)',
            offset: {
              x: 0,
              y: -1
            },
            flipTitle: false
          }
        })
      ]
    };

    new Chartist.Bar('#ct-chart-' + [i], data, options);
  }

})();
