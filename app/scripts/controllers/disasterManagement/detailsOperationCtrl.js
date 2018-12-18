/**
 * Created by Administrator on 2017/3/11 0011.
 * zw
 */
;(function (angular) {
  'use strict';
  angular.module('controllers.detailsOperationCtrl',[]).controller('detailsOperationCtrl', detailsOperationCtrl);

  function detailsOperationCtrl($scope,httpServe,hostDetailsSer,hostInstancSer,$stateParams,modifyHostSer) {
      $scope.operateName=$stateParams.operateType;
      $scope.verification=modifyHostSer.verification;

      $scope.validate=modifyHostSer.validate;
    if($stateParams.operateType==='新增'){
      $scope.operationInfo=hostDetailsSer.operationInfo();//初始化信息
      $scope.operation=hostDetailsSer.operationes;//信息
      $scope.InstanceType=hostDetailsSer.InstanceType;//实例类型信息
      $scope.Components=hostDetailsSer.Components;//信息
      $scope.perationSub=hostDetailsSer.perationSub;//新增实例
      $scope.callBack=hostDetailsSer.callBack;//返回主机页面
      $scope.watchIsExist=hostDetailsSer.watchIsExist;
    }
    if($stateParams.operateType==='修改'){
      $scope.operationUpInfo=hostInstancSer.operationUpInfo();//修改初始化信息
      $scope.operation=hostInstancSer.operation;//信息
      $scope.InstanceType=hostInstancSer.InstanceType;//实例类型信息
      $scope.Components=hostInstancSer.Components;//组件信息
      $scope.perationSub=hostInstancSer.perationSub;//修改实例
      $scope.callBack=hostInstancSer.callBack;//返回实例页面
    }
  }
  detailsOperationCtrl.$inject = ['$scope','httpServe','hostDetailsSer','hostInstancSer','$stateParams','modifyHostSer'];
})(angular);
