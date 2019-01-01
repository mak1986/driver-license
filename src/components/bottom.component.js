/**
 * Created by mak.punyachokchai on 12/24/2018 AD.
 */
angular.module("App")
  .component("bottom", {
    controller: BottomController,
    controllerAs: 'Ctrl',
    template: `
<footer class="footer">
	<div class="content has-text-centered">
		<p>
			<strong>ฝึกสอบใบขับขี่.com</strong>
			&nbsp;
			 Copyright all rights reserved © 2019
		</p>
	</div>
</footer>
    `
  });

BottomController.$inject = [];

function BottomController(){

}