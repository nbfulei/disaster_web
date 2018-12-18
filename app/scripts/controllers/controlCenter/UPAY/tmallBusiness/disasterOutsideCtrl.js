'use strict'
;(function (angular){
 	angular.module('controllers.disasterOutside',[]).controller('disasterOutsideCtrl',outsideCtr);
 	function outsideCtr($scope,outsideSer,mainServe){
    	$scope.closePage = mainServe.closePage;
    	$scope.initImgSite = mainServe.initImgSite();
    	$scope.openPage = mainServe.openPage;
 		$scope.querySwitchInfo = outsideSer.querySwitchInfo;
 		$scope.styleObj = outsideSer.styleObj;
 		$scope.time = outsideSer.time;
 		$scope.showTime = outsideSer.showTime;
 		$scope.hideTime = outsideSer.hideTime;
 		$scope.switchInfo = outsideSer.switchInfo;
 		$(window).scroll(function(){
      if($(document).scrollTop()>=1){
        //$('#container').css('height','1110px');
      }
    });
 	}
 	outsideCtr.$inject = ['$scope','outsideSer','mainServe'];
})(angular);