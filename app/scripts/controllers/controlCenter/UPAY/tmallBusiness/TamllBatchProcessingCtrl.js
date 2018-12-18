/**
 * Created by Administrator on 2016/10/14.
 */
(function (angular) {
  'use strict';
  angular.module('controllers.BatchProcessing',[]).controller('TmallBatchProcessingCtrl', TmallBatchProcessingCtrl);
  function TmallBatchProcessingCtrl($scope,TmallBatchProcessingSer,$timeout){
    $scope.batchSet=TmallBatchProcessingSer.batchSet;//条件集合
    $scope.batchQuery=TmallBatchProcessingSer.batchQuery;//查询按钮
    $scope.pageParam=TmallBatchProcessingSer.initPageParam();//初始化分页
    $scope.initParam=TmallBatchProcessingSer.initParam;//初始化数据
    $scope.batchMessage=TmallBatchProcessingSer.batchMessage;//table数据集合
    $scope.turnToPage=TmallBatchProcessingSer.turnToPage; //分页查询
    
    $scope.detail=TmallBatchProcessingSer.detail; 
    //$scope.arr=TmallBatchProcessingSer.arr;
    $scope.arr={};
    $scope.getDetail=function (index){
       $('#detailData').modal('show');
       var data=$scope.batchMessage.datas[index].result;
       $scope.arr.a=[];
        if (data.length>500) {
          var loa=document.getElementById("information");
          loa.style.display="block";
          $timeout(function(){
          $scope.arr.a= data.split("\n");
          loa.style.display="none";
        },2000);
        }else{
          $timeout(function(){
          $scope.arr.a= data.split("\n");
        },500);
        }
        
        
    };  
    $scope.cleararr=function(){
      $scope.arr.a=[];
    }
    $scope.changeBackground=function(){
      $("#4_1_2").css("background-color","rgb(93,107,128)");
      $("#4_1_1").css("background-color","rgb(72,76,73)");

    };
  }
  TmallBatchProcessingCtrl.$inject = ['$scope','TmallBatchProcessingSer','$timeout'];
})(angular);
