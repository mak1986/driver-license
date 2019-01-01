/**
 * Created by mak.punyachokchai on 12/24/2018 AD.
 */
angular.module('App')
  .component('content', {
    controller: ContentController,
    controllerAs: 'Ctrl',
    template: `
      <section class="section">
          <h1 class="title">ข้อสอบ</h1>
          <hr>
          

          <div>
             <div class="buttons are-medium">
              <a class="button" ng-click="Ctrl.toggleAnswers()">
                <span ng-if="!Ctrl.showAnswersLoading" class="icon is-small mr-2">
                  <i class="fas fa-{{Ctrl.showAnswers? 'check-square': 'square'}}"></i>
                </span>
                ดูเฉลย
              </a>
              <a class="button" ng-click="Ctrl.toggleQuestionNumbers()">
                <span ng-if="!Ctrl.showQuestionNumbersLoading" class="icon is-small mr-2">
                  <i class="fas fa-{{Ctrl.showQuestionNumbers? 'check-square': 'square'}}"></i>
                </span>
                แสดงหมายเลขข้อ
              </a>
              <a class="button" ng-click="Ctrl.shuffleQuestions()">
                <span class="icon is-small mr-2">
                  <i class="fas fa-random"></i>
                </span>
                สลับโจทย์
              </a>
              <a class="button" ng-click="Ctrl.shuffleOptions()">
                <span class="icon is-small mr-2">
                  <i class="fas fa-random"></i>
                </span>
                สลับคำตอบ
              </a>
              <a class="button" ng-click="Ctrl.reset()">
                <span class="icon is-small mr-2">
                  <i class="fas fa-redo"></i>
                </span>
                เริ่มใหม่
              </a>
            </div>
            <div class="buttons are-medium">
              <a ng-disabled="Ctrl.minFontSize === Ctrl.currentFontSize" class="button" ng-click="Ctrl.decreaseFontSize()">
                <span class="icon is-small mr-2">
                  <i class="fas fa-search-minus"></i>
                </span>
                <span style="font-size: 13px;">ก</span>
              </a>
               <a ng-disabled="Ctrl.maxFontSize === Ctrl.currentFontSize" class="button" ng-click="Ctrl.increaseFontSize()">
                <span class="icon is-small mr-2">
                  <i class="fas fa-search-plus"></i>
                </span> 
                <span style="font-size: 16px;font-weight:bold;">ก</span>
              </a>
            </div>
            
          
           <div class="has-text-centered" ng-if="Ctrl.loading">
           <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            <span class="sr-only">กำลังโหลด...</span>
          </div>
           
            <div ng-if="!Ctrl.loading">
              <div class="content">
               <h2> {{Ctrl.currentCategory.number}}. {{Ctrl.currentCategory.name}} </h2>
              <p style="font-size:{{Ctrl.currentFontSize}}px;"> {{Ctrl.currentCategory.description}} </p>
            </div>
            <div class="field" ng-repeat="item in Ctrl.currentCategory.questions">
              <label class="label" style="font-size: {{Ctrl.currentFontSize}}px;">
                <span ng-if="Ctrl.showQuestionNumbers">{{Ctrl.currentCategory.number}}.{{item.number}}. </span>
                {{item.question}}
              </label>
              <div ng-if="item.hasQuestionImage">
                <img width="300" ng-src="./src/images/{{item.questionImage}}">
              </div>
              <div class="control">
                 <label class="radio" 
                 style="font-size: {{Ctrl.currentFontSize}}px; display:block"
                 ng-class="{
                 'has-text-weight-bold': (Ctrl.submitted || Ctrl.showAnswers) && option.correct,
                 'line-through': (Ctrl.showAnswers || Ctrl.submitted) && !option.correct,
                 'has-text-danger': Ctrl.submitted && !option.correct && item.selectedOption === option.number,
                 'has-text-success': Ctrl.submitted && option.correct && item.selectedOption === option.number,
                 'has-text-grey-light': (Ctrl.showAnswers || Ctrl.submitted) && item.selectedOption !== option.number && !option.correct
                 }" ng-repeat="option in item.options">
                  <input ng-disabled="Ctrl.showAnswers || Ctrl.submitted" type="radio" ng-model="item.selectedOption" name="answer-{{$parent.$index}}" ng-value="option.number">
                  <span ng-if="option.type === 'text'">{{option.content}}</span>
                  <span ng-if="option.type === 'image'">
                      ตอบข้อนี้ <br>
                      <img width="300" ng-src="./src/images/{{option.content}}" />
                  </span>
                </label>
              </div>
            </div>
            <button class="button is-primary" ng-click="Ctrl.submit()">ตรวจคำตอบ</button>
            </div>
            
            
          </div>
          
          
          <div style="margin-top:20px;" class="fb-comments" data-href="https://&#xe1d;&#xe36;&#xe01;&#xe2a;&#xe2d;&#xe1a;&#xe43;&#xe1a;&#xe02;&#xe31;&#xe1a;&#xe02;&#xe35;&#xe48;.com" data-numposts="10"></div>
         
      </section>
    `
  });

ContentController.$inject = ['_', '$http', '$rootScope', '$state', '$timeout', 'StatisticsService'];

function ContentController(_, $http, $rootScope, $state, $timeout, StatisticsService) {

  // Private fields
  var vm = this;
  var localStorage = window.localStorage;

  // public properties

  vm.currentCategory = {};
  vm.currentCategoryIndex = 0;
  vm.showAnswers = false;
  vm.showQuestionNumbers = true;
  vm.submitted = false;
  vm.minFontSize = 16;
  vm.maxFontSize = 22;

  // Life cycle hooks

  // Public method mappings
  vm.shuffleQuestions = shuffleQuestions;
  vm.shuffleOptions = shuffleOptions;
  vm.toggleAnswers = toggleAnswers;
  vm.toggleQuestionNumbers = toggleQuestionNumbers;
  vm.reset = reset;
  vm.increaseFontSize = function () {
    if (vm.currentFontSize < vm.maxFontSize) {
      vm.currentFontSize += 2;
      localStorage.setItem('fontSize', vm.currentFontSize);
    }
  };
  vm.decreaseFontSize = function () {
    if (vm.currentFontSize > vm.minFontSize) {
      vm.currentFontSize -= 2;
      localStorage.setItem('fontSize', vm.currentFontSize);
    }
  };
  vm.submit = submit;

  // Life cycle hooks

  vm.$onInit = function () {
    if (!localStorage.getItem('fontSize')) {
      localStorage.setItem('fontSize', 16);
    }
    vm.currentFontSize = parseInt(localStorage.getItem('fontSize'));

    reset();
  };

  // Public methods

  function shuffleQuestions() {
    vm.currentCategory.questions = _.shuffle(vm.currentCategory.questions);
  }

  function shuffleOptions() {
    _.each(vm.currentCategory.questions, function (question) {
      question.options = _.shuffle(question.options);
    });
  }

  function toggleAnswers() {
    vm.showAnswersLoading = true;
    vm.showAnswers = !vm.showAnswers;
    $timeout(function () {
      vm.showAnswersLoading = false;
    }, 50);
  }

  function toggleQuestionNumbers() {
    vm.showQuestionNumbersLoading = true;
    vm.showQuestionNumbers = !vm.showQuestionNumbers;
    $timeout(function () {
      vm.showQuestionNumbersLoading = false;
    }, 50);
  }

  function reset() {
    var path = './src/questions/' + $state.params.year + '/category-' + $state.params.categoryNumber + '.json';

    vm.loading = true;
    $http.get(path)
      .then(function (res) {
        vm.currentCategory = res.data;
      })
      .finally(function () {
        vm.loading = false;
      });
    vm.submitted = false;
  }

  function submit() {
    vm.submitted = true;
    $rootScope.$broadcast('redraw-chart', {
      category: vm.currentCategory
    });

    document.getElementById('stats-wrapper').scrollIntoView();
  }

}