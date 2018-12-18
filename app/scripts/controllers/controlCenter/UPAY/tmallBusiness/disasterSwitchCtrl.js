'use strict';

;(function (angular) {
  'use strict';
  angular.module('controllers.disasterSwitch',[]).controller('disasterSwitchCtrl', switchCtrl);

  function switchCtrl($scope,httpServe,Restangular,switchSer,mainServe) {
    $scope.initImgSite = mainServe.initImgSite();
    $scope.queryFlow = switchSer.queryFlow();
    $scope.closePage = mainServe.closePage;
    $scope.openPage = mainServe.openPage;
    $scope.flowDistribution = switchSer.flowDistribution;
    $scope.notice = switchSer.notice;
    $scope.countdown=switchSer.countdown;
    $scope.$on('$stateChangeStart',function(){
    	switchSer.disconnectSocket();
    });
  };

  switchCtrl.$inject = ['$scope','httpServe','Restangular','switchSer','mainServe'];
})(angular);