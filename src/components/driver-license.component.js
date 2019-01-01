/**
 * Created by mak.punyachokchai on 12/28/2018 AD.
 */
angular.module('App')
  .component('driverLicense', {
    controller: DriverLicenseController,
    controllerAs: 'Ctrl',
    template: `
      <div class="columns main" id="main-content">
          <sidebar class="column is-3"></sidebar>
          <ui-view class="column"></ui-view>
          <stats class="column is-4"></stats>
      </div>
    `
  });

DriverLicenseController.$inject = ['_'];

function DriverLicenseController(_) {

  // Private fields
  var vm = this;

  vm.$onInit = function () {

    window.onscroll = function() {myFunction()};

    function myFunction() {
      if (document.body.scrollTop > 640 || document.documentElement.scrollTop > 640) {
        document.getElementById("sticky-sidebar-left").className = "sticky-left";
      } else {
        document.getElementById("sticky-sidebar-left").className = "";
      }

      if (document.body.scrollTop > 1040 || document.documentElement.scrollTop > 1040) {
        document.getElementById("sticky-sidebar-right").className = "sticky-right";
      } else {
        document.getElementById("sticky-sidebar-right").className = "";
      }
    }

    //   for(var i = 0; i < results.length; i++){
    //     vm.categories.push(results[i].data);
    //   }
    // console.log(vm.categories);
    // _.each(vm.categories[11].questions, (question, key)=>{
    // question.number = key + 1;
    // console.log(question)
    // _.each(question.options, (option, optionKey)=>{
    //   option.number = optionKey+1;
    // option.correct = false;
    // });
    // question.options[question.correctOptionIndex].correct = true;
    // delete question.correctOptionIndex;
    // });
    // console.log(JSON.stringify(vm.categories[11]));
    // })
  };
  // Public method mappings

  // Public methods

}