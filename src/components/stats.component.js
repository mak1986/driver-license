/**
 * Created by mak.punyachokchai on 12/24/2018 AD.
 */


angular.module('App')
  .component('stats', {
    controller: StatsController,
    controllerAs: 'Ctrl',
    template: `
<section id="stats-wrapper" class="section">
  <h1 class="title">สถิติ</h1>
  <hr>
  
  <div>
   <div class="buttons are-medium">
    <a class="button" ng-click="Ctrl.clearStatistics()">
      <span class="icon is-small mr-2">
        <i class="fas fa-trash"></i>
      </span>
      เคลียร์สถิติ
    </a>
  </div>
  
    <p style="margin-bottom:10px;color:#777">ข้อสอบล่าสุด</p>
    <nav class="level is-mobile" ng-if="!Ctrl.loading">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">หมวดหมู่</p>
          <p ng-if="!Ctrl.statistics[Ctrl.statistics.length-1]" class="title">-</p>
          <p ng-if="Ctrl.statistics[Ctrl.statistics.length-1]" class="title">{{Ctrl.statistics[Ctrl.statistics.length-1].categoryNumber}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">จำนวนคำถาม</p>
          <p ng-if="!Ctrl.statistics[Ctrl.statistics.length-1]" class="title">-</p>
          <p ng-if="Ctrl.statistics[Ctrl.statistics.length-1]" class="title">{{Ctrl.statistics[Ctrl.statistics.length-1].totalQuestions}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">ตอบถูก</p>
          <p ng-if="!Ctrl.statistics[Ctrl.statistics.length-1]" class="title">-</p>
          <p ng-if="Ctrl.statistics[Ctrl.statistics.length-1]" class="title has-text-success">{{Ctrl.statistics[Ctrl.statistics.length-1].correctAnswers}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">ตอบผิด</p>
          <p ng-if="!Ctrl.statistics[Ctrl.statistics.length-1]" class="title">-</p>
          <p ng-if="Ctrl.statistics[Ctrl.statistics.length-1]" class="title has-text-danger">{{Ctrl.statistics[Ctrl.statistics.length-1].wrongAnswers}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">ความถูกต้อง</p>
          <p ng-if="!Ctrl.statistics[Ctrl.statistics.length-1]" class="title">-</p>
          <p ng-if="Ctrl.statistics[Ctrl.statistics.length-1]" class="title">{{Ctrl.statistics[Ctrl.statistics.length-1].percentage | number: 2}}%</p>
        </div>
      </div>
    </nav>
  <!--<table class="table is-fullwidth">-->
    <!--<thead>-->
      <!--<tr>-->
        <!--<th>หมวดที่</th>-->
        <!--<th>จำนวนข้อ</th>-->
        <!--<th>ตอบถูก</th>-->
        <!--<th>ตอบผิด</th>-->
        <!--<th>ความถูกต้อง</th>-->
      <!--</tr>-->
    <!--</thead>-->
    <!--<tbody>-->
      <!--<tr ng-repeat="stat in Ctrl.statistics">-->
        <!--<td>{{stat.categoryNumber}}</td>-->
        <!--<td>{{stat.totalQuestions}}</td>-->
        <!--<td class="has-text-success">{{stat.correctAnswers}}</td>-->
        <!--<td class="has-text-danger">{{stat.wrongAnswers}}</td>-->
        <!--<td>{{stat.percentage | number: 2}}%</td>-->
      <!--</tr>-->
      <!--<tr ng-if="Ctrl.statistics.length === 0">-->
        <!--<td colspan="5">ไม่พบรายการ</td>-->
      <!--</tr>-->
    <!--</tbody>-->
  <!--</table>-->
    <div id="chart_div"></div>

  <div id="donutchart"></div>
  
  <div id="sticky-sidebar-right">
    <div id="advertisement">
      <p>สนใจติดต่อโฆษณา</p>
      <p>088-650-0936</p>
    </div>
  </div>

</section>
    `
  });

google.charts.load('current', {packages: ['corechart', 'bar']});
// google.charts.setOnLoadCallback(drawRightY);

StatsController.$inject = ['$rootScope', '$state', '$timeout', 'StatisticsService'];

function StatsController($rootScope, $state, $timeout, StatisticsService) {

  var vm = this;

  vm.clearStatistics = clearStatistics;

  vm.$onInit = function () {
    vm.statistics = StatisticsService.getStatistics();
    $timeout(function () {
      drawBestChart();
      drawWrongAnswersChart();
    }, 2000);
  };

  function clearStatistics() {
    vm.loading = true;
    StatisticsService.clearStatistics();
    vm.statistics = StatisticsService.getStatistics();
    drawBestChart();
    drawWrongAnswersChart();
    $timeout(function () {
      vm.loading = false;
    }, 200);
  }

  function drawBestChart() {
    var bestStatistics = StatisticsService.getBestStatistics();
    var data = google.visualization.arrayToDataTable(bestStatistics);

    var materialOptions = {
      chart: {
        title: 'สถิติจากการทำข้อสอบของแต่ละหมวดหมู่',
        subtitle: 'อ้างอิงจากข้อสอบที่เคยตอบถูกมากที่สุด'
      },
      hAxis: {
        title: 'Total Population',
        minValue: 0
      },
      vAxis: {
        title: 'City'
      },
      bars: 'horizontal',
      colors: ['#23d160', '#ff3860'],
      axes: {
        y: {
          0: {side: 'left'}
        }
      }
    };
    var materialChart = new google.charts.Bar(document.getElementById('chart_div'));
    materialChart.draw(data, materialOptions);
  }

  function drawWrongAnswersChart() {
    var wrongAnswersStatistics = StatisticsService.getWrongAnswersStatistics($state.params.categoryNumber);
    var dataTable = new google.visualization.DataTable();

    dataTable.addColumn('string', 'คำถามที่ตอบผิด');
    dataTable.addColumn('number', 'จำนวนครั้ง');
    dataTable.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});

    dataTable.addRows(wrongAnswersStatistics);

    // var data = google.visualization.arrayToDataTable(wrongAnswersStatistics);

    var options = {
      title: 'ข้อที่ตอบผิดบ่อย (หมวดหมู่ที่ ' + $state.params.categoryNumber + ')',
      titleTextStyle: {
        color: '#777',
        fontSize: '16',
        bold: false
      },
      tooltip: {isHtml: true},
      legend: 'none',
      pieHole: 0.4,
      chartArea: {
        left: 0,
        top: '20px',
        width: '100%',
        height: '75%'
      }
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(dataTable, options);
  }

  $rootScope.$on('redraw-chart', function (event, args) {
    StatisticsService.addStatistics(args.category);
    drawBestChart();
    drawWrongAnswersChart();
  });

  $rootScope.$on('$viewContentLoaded',
    function (event) {
      // drawBestChart();
      drawWrongAnswersChart();
    });
}
//

