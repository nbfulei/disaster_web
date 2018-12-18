/**
 * Created by Administrator on 2017/3/1 0001.
 * 实例
 */
;(function (angular) {
  'use strict';
  angular.module('controllers.hostInstancCtrl',[]).controller('hostInstancCtrl', hostInstancCtrl);

  function hostInstancCtrl($scope,hostInstancSer,hostQuerySer) {
    $scope.info=hostInstancSer.info();//初始化
    $scope.instancData=hostInstancSer.instancData;//实例数据
    $scope.journalData=hostInstancSer.journalData;//日志数据
    $scope.toConfigureData=hostInstancSer.toConfigureData;//配置信息数据
    $scope.hostDetailsID=hostQuerySer.hostDetailsID;//跳转至单个主机信息页面
    $scope.logDetails=hostInstancSer.logDetails;//日志详细信息
    $scope.operationUP=hostInstancSer.operationUP;//实例修改
    $scope.addFile=hostInstancSer.addFile;//新增配置弹出框
    $scope.addConfirmFile=hostInstancSer.addConfirmFile;//新增确认
    $scope.updateFile=hostInstancSer.updateFile;//修改配置弹出框
    $scope.files=hostInstancSer.files;//修改配置信息
    $scope.upConfirmFile=hostInstancSer.upConfirmFile;//修改确认
    $scope.delFile=hostInstancSer.delFile;//删除配置弹出框
    //$scope.loadFile=hostInstancSer.loadFile;//载入
    $scope.delConfirmFile=hostInstancSer.delConfirmFile;//删除
    $scope.queryItemFile=hostInstancSer.queryItemFile;//弹出配置文件详细信息
    $scope.ItemFile=hostInstancSer.ItemFile;//配置文件详细信息
    $scope.upconfigItem=hostInstancSer.upconfigItem;//配置文件详细信息修改
    $scope.upconfigCallBack=hostInstancSer.upconfigCallBack;//配置文件详细信息取消
    $scope.addConfigItem=hostInstancSer.addConfigItem;//配置文件详细信息修改-添加空行
    $scope.delConfigItem=hostInstancSer.delConfigItem;//配置文件详细信息修改-删除空行
    $scope.startUpCase=hostInstancSer.startUpCase;//单个启动
    $scope.stopItCase=hostInstancSer.stopItCase;//单个关闭
    $scope.$on('$stateChangeStart',function(){
      hostInstancSer.disconnectSocket();
    })
  }
  hostInstancCtrl.$inject = ['$scope','hostInstancSer','hostQuerySer'];
})(angular);
