'use strict'
;(function (angular){
 	angular.module('controllers.machinesInfoCtrl',[]).controller('machinesInfoCtrl',machinesInfoCtrl);
 	function machinesInfoCtrl($scope,machinesInfoSer){
 		$scope.machinesMessage = machinesInfoSer.machinesMessage;
 		$scope.catalog = machinesInfoSer.catalog;
 		$scope.initQueryParam = machinesInfoSer.initQueryParam;
 		$scope.queryMachinesInfo = machinesInfoSer.queryMachinesInfo;
 		$scope.setCurrentPageMachines = machinesInfoSer.setCurrentPageMachines;
 		$scope.addBatch = machinesInfoSer.addBatch;
 		$scope.addConfig = machinesInfoSer.addConfig;
 		$scope.clickUpdate = machinesInfoSer.clickUpdate;
 		$scope.batchProcessing = machinesInfoSer.batchProcessing;
 		$scope.oldData = machinesInfoSer.oldData;
 		$scope.clickDel = machinesInfoSer.clickDel;
 		$scope.delConfig = machinesInfoSer.delConfig;
 		$scope.gainMName = machinesInfoSer.gainMName;
 		$scope.gainIp = machinesInfoSer.gainIp;
 		$scope.gainArea = machinesInfoSer.gainArea;
 		$scope.gainRack = machinesInfoSer.gainRack;
 		$scope.gainRemark = machinesInfoSer.gainRemark;
 		$scope.sendNewData = machinesInfoSer.sendNewData;
 		$scope.operationNoteMessage = machinesInfoSer.operationNoteMessage;
 		$scope.getOpTime = machinesInfoSer.getOpTime;
 		$scope.getName = machinesInfoSer.getName;
 		$scope.termQuery = machinesInfoSer.termQuery;
 		$scope.clearBatch = machinesInfoSer.clearBatch;
 		$scope.regionList = machinesInfoSer.regionList;
 		$scope.rackList = machinesInfoSer.rackList;

 	}
 	machinesInfoCtrl.$inject = ['$scope','machinesInfoSer']; 
})(angular);