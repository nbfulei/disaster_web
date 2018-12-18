;(function (angular) {
  'use strict';
  angular.module('controllers.operationLate',[]).controller('operationLateCtrl', operationLateCtrl);
  function operationLateCtrl($scope,operationLateSer) {
    $scope.initpage=operationLateSer.initpage;
  	$scope.flowMessage=operationLateSer.flowMessage;//当前流量状态数据
  	$scope.flowMessages=operationLateSer.flowMessages;//预案定制流量状态数据
  	$scope.areaData=operationLateSer.areaData;      //悬浮显示的对应大区里面的省份的数据
  	$scope.switchData=operationLateSer.switchData;  //准备切换的数据
    $scope.synMessage=operationLateSer.synMessage;  //同步的表格数据
    $scope.flowSwitchMessage=operationLateSer.flowSwitchMessage; //切换实施 流量切换的表格数据
  	$scope.reportMessage=operationLateSer.reportMessage;  //确认切换报告数据
  	$scope.currentTrafficState=operationLateSer.currentTrafficState;//当前流量状态查询
  	$scope.adjustment=operationLateSer.adjustment; //预案定制 调整大区 左右切换 
  	$scope.goReverseSyn=operationLateSer.goReverseSyn;//到反向同步步骤 
  	$scope.getSynData= operationLateSer.getSynData;//获得切换实施 正反向同步的表格数据
    $scope.getFlowSwitch=operationLateSer.getFlowSwitch;// 切换实施 流量切换的表格数据
    $scope.getConfirmSwitch= operationLateSer.getConfirmSwitch;//获得确认切换报告数据getConfirmSwitch 
    $scope.stopeSwitch=operationLateSer.stopeSwitch;//停止切换
    $scope.syn1=operationLateSer.syn1;//控制显示表格
  };

  operationLateCtrl.$inject = ['$scope','operationLateSer'];
})(angular);
