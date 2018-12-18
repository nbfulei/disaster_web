'use strict'
;(function (angular){
 	angular.module('controllers.disasterAssess',[]).controller('disasterAssessCtrl',assessCtr);
 	function assessCtr($scope,assessSer,mainServe){
    	$scope.closePage = mainServe.closePage;
    	$scope.initImgSite = mainServe.initImgSite();
    	$scope.openPage = mainServe.openPage;
 		$scope.querySwitchInfo = assessSer.querySwitchInfo;
 		$scope.styleObj = assessSer.styleObj;
 		$scope.time = assessSer.time;
 		$scope.showTime = assessSer.showTime;
 		$scope.hideTime = assessSer.hideTime;
 		$scope.switchInfo = assessSer.switchInfo;
 		$(window).scroll(function(){
      if($(document).scrollTop()>=1){
        //$('#container').css('height','1110px');
      }
    });
 	}
 	assessCtr.$inject = ['$scope','assessSer','mainServe'];
})(angular);