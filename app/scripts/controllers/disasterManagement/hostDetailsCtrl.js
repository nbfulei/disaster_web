/**
 * Created by Administrator on 2017/3/1 0001.
 * 各个主机信息
 */
;(function (angular) {
  'use strict';
  angular.module('controllers.hostDetailsCtrl',[]).controller('hostDetailsCtrl', hostDetailsCtrl);

  function hostDetailsCtrl($scope,httpServe,hostDetailsSer) {
    $scope.info=hostDetailsSer.info();//初始化查询
    $scope.singleHost=hostDetailsSer.singleHost;//主机信息
    $scope.hostInstancID=hostDetailsSer.hostInstancID;
    $scope.delDetails=hostDetailsSer.delDetails;//删除实例弹出框
    $scope.delCheckbox=hostDetailsSer.delCheckbox;//多选框
    $scope.updateHostGo=hostDetailsSer.updateHostGo;//多选框
    $scope.delInstance=hostDetailsSer.delInstance;//删除实例
    $scope.operation=hostDetailsSer.operation;//跳转修改新增
    $scope.down=hostDetailsSer.down;//下载弹出框
    $scope.exprtInfo=hostDetailsSer.exprtInfo;//下载查询
    $scope.downloadFile=hostDetailsSer.downloadFile;//下载查询数据结果
    $scope.downCheckbox=hostDetailsSer.downCheckbox;//下载选择
    $scope.folder=hostDetailsSer.folder;//选择文件夹
    $scope.file=hostDetailsSer.file;//选择文件夹
    $scope.downLoad=hostDetailsSer.downLoad;//选择文件夹
    $scope.downLoadHide=hostDetailsSer.downLoadHide;//下载关闭
    $scope.upload=hostDetailsSer.upload;//上传
    $scope.uploadMTK=hostDetailsSer.uploadMTK;//上传弹出框
    $scope.startUpCase=hostDetailsSer.startUpCase;//单个启动
    $scope.stopItCase=hostDetailsSer.stopItCase;//单个关闭
    $scope.synConfig=hostDetailsSer.synConfig;//同步配置
    $scope.journal=hostDetailsSer.Journal;//日志内容
    $scope.instanceState=hostDetailsSer.instanceState;//日志状态
    $scope.$on('$stateChangeStart',function(){
      hostDetailsSer.disconnectSocket();
    })
  }
  hostDetailsCtrl.$inject = ['$scope','httpServe','hostDetailsSer'];
})(angular);
