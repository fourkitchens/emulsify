(function() {

  'use strict';

  var stats = document.getElementById('chart-hidden').getElementsByTagName('div');
  var charts = document.getElementById('charts');
  var i = 0;

  for (i=0; i< stats.length; i++) {
    var chart = stats[i];
    var baseline = chart.getElementsByClassName("baseline")[i].innerHTML;
    var element = chart.getElementsByClassName("element")[i].innerHTML;
    var label = chart.getElementsByClassName("chart-label")[i].innerHTML;
    var chartDiv = document.createElement('ct-chart-' + [i]);
    charts.appendChild(chartDiv);
    console.log(charts);

    var data = {
      labels: label,
      series: [
        [baseline],
        [element]
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

    // var responsiveOptions = [
    //   ['screen and (max-width: 640px)', {
    //     seriesBarDistance: 10,
    //     axisX: {
    //       labelInterpolationFnc: function (value) {
    //         return value[0];
    //       }
    //     }
    //   }]
    // ];

    new Chartist.Bar(chartDiv, data, options);
  }

})();
