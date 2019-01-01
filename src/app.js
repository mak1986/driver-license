/**
 * Created by mak.punyachokchai on 12/24/2018 AD.
 */
angular.module('App', ['ui.router'])
  .value('_', _)
  .config(['$stateProvider', function ($stateProvider) {
    var defaultState = {
      name: 'default',
      url: '',
      redirectTo: {state: 'driver-license.category', params: {year: 61, categoryNumber: 1}}
    };
    var driverLicenseState = {
      abstract: true,
      name: 'driver-license',
      url: '/driver-license/:year',
      template: '<driver-license></driver-license>'
    };
    var categoryState = {
      name: 'driver-license.category',
      url: '/categories/:categoryNumber',
      template: '<content></content>'
    };
    var otherwiseState = {
      name: 'otherwise',
      url: '*path',
      redirectTo: {state: 'driver-license.category', params: {year: 61, categoryNumber: 1}}
    };

    $stateProvider.state(defaultState);
    $stateProvider.state(driverLicenseState);
    $stateProvider.state(categoryState);
    $stateProvider.state(otherwiseState);

  }]);