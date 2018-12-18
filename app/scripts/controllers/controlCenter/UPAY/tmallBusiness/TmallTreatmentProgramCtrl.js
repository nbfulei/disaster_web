/**
 * Created by Administrator on 2016/10/17.
 */
(function (angular) {
    'use strict';
    angular.module('controllers.TreatmentProgram', []).controller('TmallTreatmentProgramCtrl', TmallTreatmentProgramCtrl);
    function TmallTreatmentProgramCtrl($scope, TmallTreatmentProgramSer,$timeout) {
        $scope.setTreat = TmallTreatmentProgramSer.setTreat;//查询条件集合
        $scope.initParam = TmallTreatmentProgramSer.initParam; //初始化查询条件
        $scope.treatQuery = TmallTreatmentProgramSer.treatQuery;//查询
        $scope.treatMessage = TmallTreatmentProgramSer.treatMessage;//查询结果集合
        $scope.ipArrays = TmallTreatmentProgramSer.ipArrays;//列表点击获取IP传值给模态框
        $scope.checkIp = TmallTreatmentProgramSer.checkIp;//ip选择
        $scope.checkedIp = TmallTreatmentProgramSer.checkedIp;
        $scope.valGet = TmallTreatmentProgramSer.valGet;////选择的ip集合
        $scope.checkOrder = TmallTreatmentProgramSer.checkOrder;//执行命令选择
        $scope.valOrder = TmallTreatmentProgramSer.valOrder;//选择的执行命令集合
        $scope.saveBatch = TmallTreatmentProgramSer.saveBatch;//保存添加批处理数据
        $scope.clearBatch = TmallTreatmentProgramSer.clearBatch;//清空添加弹出框内容点击取消时
        //列表多选
        $scope.batchProcessing=TmallTreatmentProgramSer.batchProcessing;
        /*********我要执行框**********/
        $scope.excuting = TmallTreatmentProgramSer.excuting;
        $scope.excutingOrder = TmallTreatmentProgramSer.excutingOrder;
        $scope.conChange = TmallTreatmentProgramSer.conChange;
        $scope.initDealWith = TmallTreatmentProgramSer.initDealWith;

        /*************修改**************/
        $scope.upDelTreat = TmallTreatmentProgramSer.upDelTreat;
        $scope.batchExecution = TmallTreatmentProgramSer.batchExecution;
      
        /************删除******************/
        $scope.delTreat = TmallTreatmentProgramSer.delTreat;

        /**********添加********/
        $scope.addBatch = TmallTreatmentProgramSer.addBatch();
        /**********执行结果********/
        $scope.result = TmallTreatmentProgramSer.result;
        
        $scope.doConfig = TmallTreatmentProgramSer.doConfig;
        $scope.isDo = TmallTreatmentProgramSer.isDoFn();
        $scope.batchResult = TmallTreatmentProgramSer.batchResult;
        $scope.turnToPage = TmallTreatmentProgramSer.turnToPage;
        $scope.falg = TmallTreatmentProgramSer.falg;
        //监听查询参数的配置名称
        $scope.watchConfig=function(name){
            $scope.error=false;
            if(name===undefined){
                return;
            }
            if (name.length>=16) {
                $scope.error=true;
               $scope.setTreat.configuration = name.slice(0,15);
               $timeout(function() {
                $scope.error=false;
               }, 4000);
               return;
            }
        };
        //监听新增的配置名称
        $scope.watchConfigName = function(name){
            $scope.error1=false;
            $scope.error2=false;
            if(name===undefined){
                return;
            }
            //不能输入and 或or
            if (name.indexOf("and")>=0||name.indexOf("or")>=0) {
                $scope.error2=true;
            }
            if (name.length>=16) {
                $scope.error1=true;
               $scope.addBatch.configuration = name.slice(0,15);
               $timeout(function() {
                $scope.error1=false;
               }, 4000);
               return;
            }
            $scope.addBatch.configuration = name.replace(/[<>/\\|:""*?]/g, '');
        }
        //监听新增的说明
        $scope.watchExplain = function(name){
            $scope.error3=false;
            if(name===undefined){
                return;
            }
            if (name.length>=200) {
                $scope.error3=true;
               $scope.addBatch.explain = $scope.addBatch.explain.slice(0,200);
               $timeout(function() {
                $scope.error3=false;
               }, 3000);
               return;
            }
            $scope.addBatch.explain = name.replace(/[<>/\\|:""*?]/g, '');
        }
        //监听修改的说明输入框
        $scope.watchExplain2 = function(name){
            $scope.error4=false;
            if(name===undefined){
                return;
            }
            if (name.length>=200) {
                $scope.error4=true;
               $scope.valGet.explain = name.slice(0,200);
               $timeout(function() {
                $scope.error4=false;
               }, 3000);
               return;
            }
            $scope.valGet.explain = name.replace(/[<>/\\|:""*?]/g, '');
        }





    }

    TmallTreatmentProgramCtrl.$inject = ['$scope', 'TmallTreatmentProgramSer','$timeout'];
})(angular);
