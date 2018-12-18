'use strict'
;(function (angular){
 	angular.module('controllers.monitorThresholdCtrl',[]).controller('monitorThresholdCtrl',monitorThresholdCtrl);
 	function monitorThresholdCtrl($scope,monitorThresholdSer){
    	$scope.query=monitorThresholdSer.query;
    	$scope.monitorThresholdMe=monitorThresholdSer.monitorThresholdMe;
    	$scope.initQueryParam=monitorThresholdSer.initQueryParam();
        $scope.getLastTime=monitorThresholdSer.getLastTime();
    	$scope.setThread=monitorThresholdSer.setThread;
        $scope.setThread1=monitorThresholdSer.setThread1;
    	$scope.addMessage=monitorThresholdSer.addMessage;
    	$scope.clearMessage=monitorThresholdSer.clearMessage;
    	$scope.catalog=monitorThresholdSer.catalog;
    	$scope.termQuery=monitorThresholdSer.termQuery;
    	$scope.getDatas=monitorThresholdSer.getDatas;
    	$scope.deleteBox=monitorThresholdSer.deleteBox;
    	$scope.deleteDatas=monitorThresholdSer.deleteDatas;
    	$scope.updateBox=monitorThresholdSer.updateBox;
    	$scope.getInstance=monitorThresholdSer.getInstance;
    	$scope.getGuardVal=monitorThresholdSer.getGuardVal;
        $scope.getAnomalyVal=monitorThresholdSer.getAnomalyVal;
    	$scope.getUnit=monitorThresholdSer.getUnit;
    	$scope.updateNewData=monitorThresholdSer.updateNewData;
        $scope.turnToPage=monitorThresholdSer.turnToPage;
        $scope.getRemark=monitorThresholdSer.getRemark;
        $scope.getComponentsId=monitorThresholdSer.getComponentsId;
        $scope.operationNoteMessage=monitorThresholdSer.operationNoteMessage;
        $scope.getType=monitorThresholdSer.getType;
        $scope.item_=monitorThresholdSer.item_;
      
 	}
 	monitorThresholdCtrl.$inject = ['$scope','monitorThresholdSer'];
})(angular);