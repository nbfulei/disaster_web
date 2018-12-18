'use strict'
;(function (angular){
 	angular.module('controllers.tmallRegionConfigCtrl',[]).controller('tmallRegionConfigCtrl',tmallRegionConfigCtrl);
 	function tmallRegionConfigCtrl($scope,tmallRegionConfigSer){
    	$scope.provRegionMessage = tmallRegionConfigSer.provRegionMessage;
    	$scope.queryRegionInfo = tmallRegionConfigSer.queryRegionInfo;
    	$scope.initQueryParam = tmallRegionConfigSer.initQueryParam;
    	$scope.catalog = tmallRegionConfigSer.catalog;
    	$scope.setCurrentPageProvRegion = tmallRegionConfigSer.setCurrentPageProvRegion;//分页
    	$scope.termQuery = tmallRegionConfigSer.termQuery;//模糊查询
    	$scope.addBatch = tmallRegionConfigSer.addBatch;//新增数据
    	$scope.addConfig = tmallRegionConfigSer.addConfig;//新增数据请求
    	$scope.batchProcessing = tmallRegionConfigSer.batchProcessing;//获取要修改/删除的数据
    	$scope.oldData = tmallRegionConfigSer.oldData;//修改前的原数据
    	$scope.clickUpdate = tmallRegionConfigSer.clickUpdate;//点击修改按钮 弹出框
    	$scope.changeNewData = tmallRegionConfigSer.changeNewData;//修改后的 新数据
    	$scope.gainProvCode = tmallRegionConfigSer.gainProvCode;
    	$scope.gainProvName = tmallRegionConfigSer.gainProvName;
    	$scope.gainRegionName = tmallRegionConfigSer.gainRegionName;
    	$scope.sendNewData = tmallRegionConfigSer.sendNewData;//确认修改
    	$scope.clickDel = tmallRegionConfigSer.clickDel;//点击删除按钮
    	$scope.delConfig = tmallRegionConfigSer.delConfig;//确认删除
    	$scope.operationNoteMessage = tmallRegionConfigSer.operationNoteMessage;
        $scope.getOpTime = tmallRegionConfigSer.getOpTime;
        $scope.getProvName = tmallRegionConfigSer.getProvName;
        $scope.getRegionName = tmallRegionConfigSer.getRegionName;
        $scope.clearBatch = tmallRegionConfigSer.clearBatch;
        $scope.numToChineseCharacters = tmallRegionConfigSer.numToChineseCharacters;
        $scope.provinceList = tmallRegionConfigSer.provinceList;
        $scope.regionList = tmallRegionConfigSer.regionList;
    	
    	
        
 	}
 	tmallRegionConfigCtrl.$inject = ['$scope','tmallRegionConfigSer'];
})(angular);
