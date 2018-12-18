/**
 * Created by Administrator on 2017/2/17 0017.
 * 负载均衡维护
 */
;(function (angular) {
  'use strict';
  angular.module('controllers.loadEqualMaintainCtrl',[]).controller('loadEqualMaintainCtrl', loadEqualMaintainCtrl);
  function loadEqualMaintainCtrl($scope,httpServe,loadEqualMaintainSer) {
        $scope.load=loadEqualMaintainSer.load;//后台传来查询
        $scope.getting=loadEqualMaintainSer.initGetting();//下拉input的模拟数据
        $scope.tabSouthern=loadEqualMaintainSer.tabSouthern;//切换表头
        $scope.tabClass=loadEqualMaintainSer.tabClass;
        $scope.tabNorth=loadEqualMaintainSer.tabNorth;
        $scope.tabMiddle=loadEqualMaintainSer.tabMiddle;
        $scope.tabWest=loadEqualMaintainSer.tabWest;
        $scope.tabOuery=loadEqualMaintainSer.tabOuery;
        $scope.provinceInfo=loadEqualMaintainSer.provinceInfo; //
        $scope.getInfoQuerty=loadEqualMaintainSer.getInfoQuerty(); 
        $scope.deleteInfo=loadEqualMaintainSer.deleteInfo; //判断删除添加的查询
        $scope.level=loadEqualMaintainSer.initeventLevel();//下拉的值
        $scope.selectType=loadEqualMaintainSer.selectType;//下拉ul里面的样式
        $scope.initSelectedType=loadEqualMaintainSer.initSelectedType;//判断input的模拟数据与下拉的值是否相等让其显示在input的框中
		    $scope.selectData=loadEqualMaintainSer.selectData;//点确认显示下拉值
        $scope.allDell=loadEqualMaintainSer.allDell;
        $scope.onClickEastDle=loadEqualMaintainSer.onClickEastDle;
        $scope.notice=loadEqualMaintainSer.initNotice();//公告
        $scope.onClickNJ=loadEqualMaintainSer.onClickNJ;
        $scope.switchinfo=loadEqualMaintainSer.switchinfo;
        $scope.SedOther=loadEqualMaintainSer.SedOther;
        $scope.SedNJ=loadEqualMaintainSer.SedNJ;
        $scope.SedDG=loadEqualMaintainSer.SedDG;
        $scope.getUrlTo=loadEqualMaintainSer.getUrlTo;
        $scope.getOtherUrl=loadEqualMaintainSer.getOtherUrl;
        $scope.initQuery=loadEqualMaintainSer.initQuery;
        $scope.QuerySave=loadEqualMaintainSer.QuerySave;
        $scope.QueryDelete=loadEqualMaintainSer.QueryDelete;
        $scope.SaveInfo=loadEqualMaintainSer.SaveInfo;
        $scope.tabDeal=loadEqualMaintainSer.tabDeal;
        $scope.msg=loadEqualMaintainSer.getEquipmentFirm();
        //监控Url地址
        $scope.watchUrl=function(model,ipName){
          model.error=false;
      if(is.string(model[ipName])){
        model[ipName] = model[ipName].replace(/[^0-9.:]/g,'');
      }
       if(model[ipName].length>25){
         //console.log(model[ipName].length); 
         model[ipName]= model[ipName].substring(0,25);
           model.error=true;
       }
    }
    //改变大区下划线
    $scope.changeUnderline=function(id){
      var ids=['Southern','East','North','Middle','West'];
      angular.forEach(ids,function(item){
        if (item===id) {
          $("#"+id).css("border-bottom","1px solid rgb(32,147,183)");
        }else{
          $("#"+item).css("border-bottom","0px solid rgb(32,147,183)");
        }
        
      });
    }
  }
  loadEqualMaintainCtrl.$inject = ['$scope','httpServe','loadEqualMaintainSer'];
})(angular);
