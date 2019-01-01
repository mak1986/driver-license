/**
 * Created by mak.punyachokchai on 12/24/2018 AD.
 */
angular.module("App")
  .component("navbar", {
    controller: NavbarController,
    controllerAs: 'Ctrl',
    template: `
      <nav class="navbar is-light" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <strong><a class="navbar-item" href="http://ฝึกสอบใบขับขี่.com">
      ฝึกสอบใบขับขี่.com
      <!--<img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: Free, open source, & modern CSS framework based on Flexbox" width="112" height="28">-->
    </a></strong>

    <!--<a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">-->
      <!--<span aria-hidden="true"></span>-->
      <!--<span aria-hidden="true"></span>-->
      <!--<span aria-hidden="true"></span>-->
    <!--</a>-->
  </div>
</nav>
    `
  });

NavbarController.$inject = [];

function NavbarController(){

}