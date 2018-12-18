'use strict'
;(function (angular){
 	angular.module('controllers.tmallOggConfigCtrl',[]).controller('tmallOggConfigCtrl',tmallOggConfigCtrl);
 	function tmallOggConfigCtrl($scope,tmallOggConfigSer,mainServe){
    	$scope.oggConfigMessage = tmallOggConfigSer.oggConfigMessage;
    	$scope.queryOggConfigInfo = tmallOggConfigSer.queryOggConfigInfo;//查询
    	$scope.catalog = tmallOggConfigSer.catalog;
    	$scope.initQueryParam = tmallOggConfigSer.initQueryParam();//封装查询条件
    	$scope.setCurrentPageOgg = tmallOggConfigSer.setCurrentPageOgg;//分页
    	$scope.termQuery = tmallOggConfigSer.termQuery;//条件查询 发请求给后台
    	$scope.addBatch = tmallOggConfigSer.addBatch;//新增 向后台发送数据
    	$scope.addConfig = tmallOggConfigSer.addConfig;//新增 保存
    	$scope.clearBatch = tmallOggConfigSer.clearBatch;//新增 取消 清空数据
    	$scope.batchProcessing = tmallOggConfigSer.batchProcessing;//
    	$scope.delConfig = tmallOggConfigSer.delConfig;//
        $scope.delData = tmallOggConfigSer.delData;//
        $scope.clickDel = tmallOggConfigSer.clickDel;//点击删除按钮
        $scope.clickUpdate = tmallOggConfigSer.clickUpdate;//点击修改按钮
        $scope.oldData = tmallOggConfigSer.oldData;//修改原数据
        $scope.gainThreadname = tmallOggConfigSer.gainThreadname;//新数据
        $scope.changeNewData = tmallOggConfigSer.changeNewData;//新数据集合
        $scope.gainRegionName = tmallOggConfigSer.gainRegionName;
        $scope.gainCopydirec = tmallOggConfigSer.gainCopydirec;
        $scope.gainFunction = tmallOggConfigSer.gainFunction;
        $scope.gainParameter = tmallOggConfigSer.gainParameter;
        $scope.gainDeployside = tmallOggConfigSer.gainDeployside;
        $scope.gainHostIp = tmallOggConfigSer.gainHostIp;
        $scope.gainRemark = tmallOggConfigSer.gainRemark;
        $scope.sendNewData = tmallOggConfigSer.sendNewData;//执行修改
        $scope.addip = tmallOggConfigSer.addip;
        $scope.id = tmallOggConfigSer.id;
        $scope.getOpTime = tmallOggConfigSer.getOpTime;
        $scope.operationNoteMessage = tmallOggConfigSer.operationNoteMessage;
        $scope.getExcel = tmallOggConfigSer.getExcel;//文本导出
        
 	}
 	tmallOggConfigCtrl.$inject = ['$scope','tmallOggConfigSer','mainServe'];
})(angular);