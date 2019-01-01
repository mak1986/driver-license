/**
 * Created by mak.punyachokchai on 12/27/2018 AD.
 */

angular.module('App')
  .service('StatisticsService', StatisticsService);

StatisticsService.$inject = ['_'];

function StatisticsService(_) {
  var service = this;
  var localStorage = window.localStorage;
  var statistics = JSON.parse(localStorage.getItem('statistics')) || [];

  service.getStatistics = getStatistics;
  service.addStatistics = addStatistics;
  service.getBestStatistics = getBestStatistics;
  service.getWrongAnswersStatistics = getWrongAnswersStatistics;
  service.clearStatistics = clearStatistics;

  function getStatistics() {
    return statistics;
  }

  function addStatistics(category) {

    var currentStatistics = {
      categoryNumber: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      percentage: 0,
      logs: []
    };

    var questions = category.questions;

    // categoryNumber
    currentStatistics.categoryNumber = category.number;

    // totalQuestions
    currentStatistics.totalQuestions = questions.length;

    // correctAnswers
    _.each(questions, function (question) {
      var selectedOption = _.findWhere(question.options, {number: question.selectedOption});
      if (selectedOption && selectedOption.correct) {
        currentStatistics.correctAnswers++;
      } else {
        // Save wrong question
        var correctAnswer = _.findWhere(question.options, {correct: true});
        currentStatistics.logs.push({
          question: question,
          answer: correctAnswer
        });
      }
    });

    // wrongAnswers
    currentStatistics.wrongAnswers = currentStatistics.totalQuestions - currentStatistics.correctAnswers;

    // percentage
    currentStatistics.percentage = (currentStatistics.correctAnswers / currentStatistics.totalQuestions) * 100;

    statistics.push(currentStatistics);
    localStorage.setItem('statistics', JSON.stringify(statistics));
  }

  function getBestStatistics() {
    var array = [
      ['หมวดหมู่', 'ตอบถูก', 'ตอบผิด']
    ];

    var statisticsByCategories = _.groupBy(statistics, 'categoryNumber');
    _.each(statisticsByCategories, function (records, categoryNumber) {
      var bestRecord = _.max(records, function (record) {
        return record.percentage;
      });
      array.push(['หมวดหมู่ที่ ' + categoryNumber, bestRecord.correctAnswers, bestRecord.wrongAnswers]);
    });

    return array;
  }

  function getWrongAnswersStatistics(categoryNumber) {
    var records = _.where(statistics, {categoryNumber: parseInt(categoryNumber)});
    var array = [
      // ['คำถามที่ตอบผิด', 'จำนวนครั้ง']
    ];

    var temp = {};
    var flattenLogs = _.flatten(_.pluck(records, 'logs'));
    _.each(flattenLogs, function (log) {
      if (!temp[log.question.number]) {
        temp[log.question.number] = {
          label: '',
          count: 0
        };
      }

      temp[log.question.number].label = 'ข้อ ' + log.question.number;
      temp[log.question.number].tooltip = createCustomHTMLContent(log);
      temp[log.question.number].count++;
    });

    _.each(temp, function (val, key) {
      array.push([
        val.label,
        val.count,
        val.tooltip
      ]);
    });
    return array;
  }

  function clearStatistics() {
    statistics = [];
    localStorage.setItem('statistics', JSON.stringify(statistics));
  }

  function createCustomHTMLContent(log) {
    return '<div style="padding:5px;">' +
      '<p>ข้อ ' + log.question.number + '. ' + log.question.question + '</p>' +
      (log.question.hasQuestionImage? '<img width="150"  src="./src/images/' +log.question.questionImage+ '"/>': '')+
      '<p><span style="text-decoration: underline;margin-right:5px;">ตอบ</span>' +
      (log.answer.type === 'text'? log.answer.content : '<img width="150" src="./src/images/' +log.answer.content+'"/>')+
      '</p>'+
      '</div>';
  }
}
