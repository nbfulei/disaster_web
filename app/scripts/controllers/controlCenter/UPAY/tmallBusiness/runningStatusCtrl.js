'use strict';

;(function (angular) {
  'use strict';
  angular.module('controllers.runningStatus',[]).controller('runningStatusCtrl', runningStatusCtrl);

  function runningStatusCtrl($scope,httpServe,Restangular,runningStatusSer,mainServe) {
    $scope.initImgSite = mainServe.initImgSite();
    //中文注释$scope.initLines = runningStatusSer.initLines();
    $scope.queryState = runningStatusSer.queryState();
    $scope.notice = runningStatusSer.notice;
    $scope.closePage = mainServe.closePage;
    $scope.openPage = mainServe.openPage;
    $scope.warnIcon = runningStatusSer.warnIcon;
    $scope.showMachineInfo = runningStatusSer.showMachineInfo;
    $scope.showMachine = runningStatusSer.showMachine;//弹出框
    $scope.machineInfo = runningStatusSer.machineInfo;
    $scope.showLineInfo = runningStatusSer.showLineInfo;
    $scope.lineInfo = runningStatusSer.lineInfo;
    $scope.OGGInfo = runningStatusSer.OGGInfo;
    $scope.dataSyncState = runningStatusSer.dataSyncState;
    $scope.hideMachineInfo = function(){
      $('#machineInfo').css('display','none');
      $('#lineInfo').css('display','none');
      $('#OGGInfo').css('display','none');
    }
    $scope.hideLineInfo = function(){
      $('#lineInfo').css('display','none');
    }
    $scope.$on('$stateChangeStart',function(){
      runningStatusSer.disconnectSocket();
    })
  };

  runningStatusCtrl.$inject = ['$scope','httpServe','Restangular','runningStatusSer','mainServe'];
})(angular);
