/**
 * Created by mak.punyachokchai on 01/14/2019 AD.
 */
angular.module('App')
  .component('driverLicenses', {
    controller: DriverLicensesController,
    controllerAs: 'Ctrl',
    template: `
      <div>
      </div>
    `
  });

DriverLicenseController.$inject = ['_'];

function DriverLicenseController(_) {

  // Private fields
  var vm = this;

  vm.$onInit = function () {

  };
  // Public method mappings

  // Public methods

}