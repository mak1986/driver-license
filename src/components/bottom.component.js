/**
 * Created by mak.punyachokchai on 12/24/2018 AD.
 */
angular.module("App")
  .component("bottom", {
    controller: BottomController,
    controllerAs: 'Ctrl',
    template: `
<footer class="footer">
  <div class="container">
  
    <div class="columns">
    
      <div class="column">
        <div class="content">
          <p class="title is-5">เว็บไขต์ที่เกี่ยวข้อง</p>
          <ul>
            <li><a target="_blank" href="http://ebooking.dlt.go.th/ebooking/">จองคิวใบขับขี่ e-Booking</a></li>
            <li><a target="_blank" href="http://www.trafficpolice.go.th">กองบังคับการตำรวจจราจร (บก.02)</a></li>
          </ul>
        </div>
      </div>
      
      <div class="column">
        <p class="title is-5">แชร์ในโซเชียลมีเดีย</p>
        <div class="fb-like" data-href="https://&#xe1d;&#xe36;&#xe01;&#xe2a;&#xe2d;&#xe1a;&#xe43;&#xe1a;&#xe02;&#xe31;&#xe1a;&#xe02;&#xe35;&#xe48;.com" data-layout="standard" data-action="like" data-size="large" data-show-faces="true" data-share="true"></div>
      </div>
      
      <div class="column">
        <div class="content">
          <p>
             สงวนลิขสิทธิ์ © 2562 <strong>ฝึกสอบใบขับขี่.com</strong>
          </p>
        </div>
      </div>
      
    </div>
    
	</div>

</footer>
    `
  });

BottomController.$inject = [];

function BottomController(){

}