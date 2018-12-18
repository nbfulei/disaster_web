/**
 * Created by Administrator on 2017/2/23 0023.
 * 主机配置
 */

;(function (angular) {
  'use strict';
  angular.module('controllers.hostQueryCtrl',[]).controller('hostQueryCtrl', hostQueryCtrl);

  function hostQueryCtrl($scope,hostQuerySer) {

    //查询
    $scope.hostData=hostQuerySer.hostData;//查询集合
    $scope.delHostDetails=hostQuerySer.delHostDetails;//删除
    $scope.jquerys=hostQuerySer.jquerys;//检索

    $scope.hostInfo=hostQuerySer.info;
    $scope.hostDetailsID=hostQuerySer.hostDetailsID;//跳转主机页面信息
    $scope.hostInstancQuery=hostQuerySer.hostInstancQuery;//跳转实例页面信息

    $scope.queryCriteria='';//搜索框初始化
    $scope.order='ip';//排序
    $scope.desc=0;//排序
    $scope.checkNum=hostQuerySer.checkNum;
    $scope.checkBosOrder=hostQuerySer.checkBosOrder;
    $scope.startModel=hostQuerySer.startModel;//启动实例模态框
    $scope.stopModel=hostQuerySer.stopModel;//关闭实例模态框
    $scope.getCheckbox=hostQuerySer.getCheckbox;//全选，反选


    //排序
    $scope.vm={
      hostName:{},ip:{},'instances':{},cpuUsage:{},status:{},
      cpuCores:{},memUsage:{},'memSize':{},diskUsage:{},diskSize:{},cpuHZ:{}
    };
    $scope.vm.init=function(){
      $scope.vm.hostName={z1:true,z2:false,z3:true,z4:false};
      $scope.vm.ip={z1:true,z2:false,z3:true,z4:false};
      $scope.vm.instances={z1:true,z2:false,z3:true,z4:false};
      $scope.vm.cpuUsage={z1:true,z2:false,z3:true,z4:false};
      $scope.vm.cpuCores={z1:true,z2:false,z3:true,z4:false};
      $scope.vm.memUsage={z1:true,z2:false,z3:true,z4:false};
      $scope.vm.memSize={z1:true,z2:false,z3:true,z4:false};
      $scope.vm.diskUsage={z1:true,z2:false,z3:true,z4:false};
      $scope.vm.diskSize={z1:true,z2:false,z3:true,z4:false};
      $scope.vm.cpuHZ={z1:true,z2:false,z3:true,z4:false};
      $scope.vm.status={z1:true,z2:false,z3:true,z4:false};
    };
    $scope.vm.ceshi2=function (value){
      var ss=getattr(value);
      if ($scope.vm[ss].z2===false) {

        $scope.vm[ss].z1=false;$scope.vm[ss].z2=true;
        $scope.vm[ss].z3=true;$scope.vm[ss].z4=false;
      }else if ($scope.vm[ss].z2===true) {
        $scope.vm[ss].z1=true;$scope.vm[ss].z2=false;
        $scope.vm[ss].z3=false;$scope.vm[ss].z4=true;
      }
      var remainings=getRemaining(value);
      angular.forEach(remainings,function(item){
        var ss2=getattr(item);
        $scope.vm[ss2].z1=true;$scope.vm[ss2].z2=false;
        $scope.vm[ss2].z3=true;$scope.vm[ss2].z4=false;
      });
    };
    function getattr(value){
      var correspond={
        '名称':'hostName','主机IP':'ip','cpu使用率':'cpuUsage','实例':'instances','每核HZ大小':'cpuHZ',
        'cpu核数':'cpuCores','mem使用率':'memUsage','mem总大小':'memSize','磁盘使用率':'diskUsage','磁盘总大小':'diskSize','状态':'status'
      };
      return correspond[value];
    }
    function getRemaining(value){
      var amarr=['名称','主机IP','cpu使用率','实例','cpu核数','mem使用率','mem总大小','磁盘使用率','磁盘总大小','每核HZ大小','状态'];
      var  temparrs=[];
      angular.forEach(amarr,function(item){
        if (item!=value) {temparrs.push(item);}
      });
      return temparrs;
    }
  }
  hostQueryCtrl.$inject = ['$scope','hostQuerySer'];
})(angular);
