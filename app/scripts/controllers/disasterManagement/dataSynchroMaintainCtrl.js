/**
 * Created by Administrator on 2017/2/17 0017.
 * 数据同步维护
 */
;(function (angular) {
  'use strict';
  angular.module('controllers.dataSynchroMaintainCtrl',[]).controller('dataSynchroMaintainCtrl', dataSynchroMaintainCtrl);

  function dataSynchroMaintainCtrl($scope,httpServe,dataSynchroMaintainSer) {
    $scope.onload=dataSynchroMaintainSer.onload;//默认样式
    $scope.msg=dataSynchroMaintainSer.msg;//南基至东莞数据
    $scope.info=dataSynchroMaintainSer.info;//东莞至南基数据
    $scope.onClickNJ=dataSynchroMaintainSer.onClickNJ;//切换南基至东莞样式
    $scope.onClickDG=dataSynchroMaintainSer.onClickDG;//切换东莞至南基样式
    $scope.getRegionOuery=dataSynchroMaintainSer.getRegionOuery;//初始化查询
    $scope.startOGG=dataSynchroMaintainSer.startOGG;
    $scope.stopOGG=dataSynchroMaintainSer.stopOGG;
    $scope.OnClickNJGD=dataSynchroMaintainSer.OnClickNJGD;
    $scope.getting=dataSynchroMaintainSer.initGetting();
    $scope.level=dataSynchroMaintainSer.initeventLevel();//下拉的值
    $scope.selectType=dataSynchroMaintainSer.selectType;//下拉ul里面的样式
    $scope.initSelectedType=dataSynchroMaintainSer.initSelectedType;//判断input的模拟数据与下拉的值是否相等让其显示在input的框中
    $scope.friminfo=dataSynchroMaintainSer.friminfo;
    $scope.notice=dataSynchroMaintainSer.initNotice();
    $scope.Contrast=dataSynchroMaintainSer.Contrast;
  }
  dataSynchroMaintainCtrl.$inject = ['$scope','httpServe','dataSynchroMaintainSer'];
})(angular);
