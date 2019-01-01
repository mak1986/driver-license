/**
 * Created by mak.punyachokchai on 12/24/2018 AD.
 */

angular.module("App")
  .component("sidebar", {
    controller: SidebarController,
    controllerAs: 'Ctrl',
    template: `
<div class="section">
  <nav class="panel">
    <p class="panel-heading">
      ข้อสอบ
    </p>
    <a 
    class="panel-block" 
    ng-class="{'is-active': Ctrl.params.categoryNumber === category.number}" 
    ui-sref="driver-license.category({year: Ctrl.params.year, categoryNumber: category.number })" 
    ng-click="Ctrl.view($index)" 
    ng-repeat="category in Ctrl.categories"
    >
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true"></i>
      </span>
      {{category.number}}. {{category.name}}
    </a>
  </nav>
  
  <div id="sticky-sidebar-left">
  
   <nav class="panel" >
    <p class="panel-heading">
      สนับสนุนการพัฒนา
    </p>
    <div class="panel-block">
      <div class="donate-block">
        <figure class="image is-128x128" style="margin-left:auto;margin-right:auto;" >
          <img src="./src/images/qr-code-thai-bank.png" />
        </figure>
        <ul>
          <li><strong>THAI QR PAYMENT</strong></li>
          <li>รับเงินได้จากทุกธนาคาร</li>
          <!--<li class="content is-small">ชื่อ: น.ส. ชวลิตา ฮาดดา</li>-->
          <li">บัญชี: xxx-x-x2476-x</li>
        </ul>
      </div>
    </div>
    <div class="panel-block">
      <div class="donate-block">
        <figure class="image is-128x128" style="margin-left:auto;margin-right:auto;" >
          <img src="./src/images/qr-code-bitcoin.png" />
        </figure>
        <ul>
          <li><strong>Bitcoin</strong></li>
          <li style="font-size:10px">1JXJDhzvLyP3c2ZFxzmQwRppzoYMK3Pn54</li>
          
          <li>
          
           <nav class="level">
              <div class="level-item has-text-centered">
                <span class="mr-10">ซื้อ Bitcoin ได้ที่นี่</span>
                <div style="border-radius: 10px;padding:5px;background: #134596">
                  <a class="level-item has-text-left" target="_blank" href="https://bx.in.th/ref/dbtFv4/">
                    <img width="50" src="./src/images/bx.svg" />
                  </a>
                </div>
              </div>
            </nav>
          </li>
        </ul>
      </div>
    </div>
    <div class="panel-block">
      <div class="donate-block">
        <figure class="image is-128x128" style="margin-left:auto;margin-right:auto;" >
          <img src="./src/images/qr-code-ethereum.png" />
        </figure>
        <ul>
          <li><strong>Ethereum</strong></li>
          <li style="font-size:10px">0x731b94f140b9d854a31d0f0d1b205fa75bbba6cb</li>
          <li>
          
            <nav class="level">
              <div class="level-item has-text-centered">
                <span class="mr-10">ซื้อ Ethereum ได้ที่นี่</span>
                <div style="border-radius: 10px;padding:5px;background: #134596">
                  <a class="level-item has-text-left" target="_blank" href="https://bx.in.th/ref/dbtFv4/">
                    <img width="50" src="./src/images/bx.svg" />
                  </a>
                </div>
              </div>
            </nav>
          </li>
        </ul>
      </div>
    </div>
    <!--<a class="panel-block" ng-class="{'is-active': Ctrl.params.categoryNumber === category.number}" ui-sref="driver-license.category({year: Ctrl.params.year, categoryNumber: category.number })" ng-click="Ctrl.view($index)" ng-repeat="category in Ctrl.categories | filter: Ctrl.search">-->
      <!--<span class="panel-icon">-->
        <!--<i class="fas fa-book" aria-hidden="true"></i>-->
      <!--</span>-->
      <!--{{category.number}}. {{category.name}}-->
    <!--</a>-->
  </nav>
  
  <div style="margin-top:20px" class="fb-page" data-href="https://www.facebook.com/&#xe1d;&#xe36;&#xe01;&#xe2a;&#xe2d;&#xe1a;&#xe43;&#xe1a;&#xe02;&#xe31;&#xe1a;&#xe02;&#xe35;&#xe48;-358648941394160" data-tabs="timeline" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/&#xe1d;&#xe36;&#xe01;&#xe2a;&#xe2d;&#xe1a;&#xe43;&#xe1a;&#xe02;&#xe31;&#xe1a;&#xe02;&#xe35;&#xe48;-358648941394160" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/&#xe1d;&#xe36;&#xe01;&#xe2a;&#xe2d;&#xe1a;&#xe43;&#xe1a;&#xe02;&#xe31;&#xe1a;&#xe02;&#xe35;&#xe48;-358648941394160">ฝึกสอบใบขับขี่</a></blockquote></div>
</div>
 
  
 
</div>

  
   
    `
  });

SidebarController.$inject = ['$http', '$state'];

function SidebarController($http, $state){

  var vm = this;

  vm.params = $state.params;

  vm.$onInit= function(){

    $http.get('./src/questions/' + vm.params.year + '/category-index.json')
      .then(function (res) {
        vm.categories = res.data;
      });
  }
}