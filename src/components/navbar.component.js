/**
 * Created by mak.punyachokchai on 12/24/2018 AD.
 */
angular.module("App")
  .component("navbar", {
    controller: NavbarController,
    controllerAs: 'Ctrl',
    template: `
      <nav class="navbar is-warning" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <!--<a class="navbar-item" href="http://ฝึกสอบใบขับขี่.com"><img src="./src/images/logo.png" height="28"/></a>-->
    <a class="navbar-item" href="http://ฝึกสอบใบขับขี่.com">
    <!--<i class="icon fas fa-lg fa-car ml-10 mr-10"></i>-->
    <span class="title is-4">ฝึกสอบใบขับขี่</span>
    <!--<img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: Free, open source, & modern CSS framework based on Flexbox" width="112" height="28">-->
    </a>

    <!--<a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">-->
      <!--<span aria-hidden="true"></span>-->
      <!--<span aria-hidden="true"></span>-->
      <!--<span aria-hidden="true"></span>-->
    <!--</a>-->
  </div>
  <!--<div class="navbar-menu">-->
    <!--<div class="navbar-start">-->
      <!--<a class="navbar-item" href="http://ฝึกสอบใบขับขี่.com">-->
        <!--หน้าหลัก-->
      <!--</a>-->
      <!--<div class="navbar-item has-dropdown" ng-class="{'is-active': active}" ng-click="active = !active">-->
        <!--<a class="navbar-link">-->
          <!--การดำเนินการเกี่ยวกับใบขับขี่ตามพ.ร.บ.รถยนต์-->
        <!--</a>-->
        <!--<div class="navbar-dropdown">-->
          <!--<a class="navbar-item" href="/การดำเนินการเกี่ยวกับใบขับขี่ตามพ.ร.บ.รถยนต์">-->
            <!--Overview-->
          <!--</a>-->
          <!--<a class="navbar-item">-->
            <!--Elements-->
          <!--</a>-->
          <!--<a class="navbar-item">-->
            <!--Components-->
          <!--</a>-->
          <!--<hr class="navbar-divider">-->
          <!--<div class="navbar-item">-->
            <!--Version 0.7.2-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
  <!---->
    <!--</div>-->
  <!--</div>-->
</nav>
    `
  });

NavbarController.$inject = [];

function NavbarController(){

}