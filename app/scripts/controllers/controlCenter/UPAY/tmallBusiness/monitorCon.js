'use strict';
;(function (angular){
    angular.module('controllers.monitor',[]).controller('monitorCtr',monitorCtr);
    function monitorCtr($scope,monitorSer){
    $scope.initEcharts = monitorSer.initEcharts;
    $scope.changeProject = monitorSer.changeProject;
    $scope.query = monitorSer.query;
    $scope.runLog = monitorSer.runLog;
    $scope.secondEchar = monitorSer.secondEchar;
    $scope.NJ = monitorSer.NJ;
    $scope.DG = monitorSer.DG;
    $scope.Report = monitorSer.Report;
    $scope.findCode = monitorSer.findCode;
    $scope.setThread =monitorSer.setThread;
    $scope.selects =monitorSer.selects;
    $scope.initQueryParam =monitorSer.initQueryParam();
    $scope.turnToPage =monitorSer.turnToPage;
    $scope.clear =monitorSer.clear;
    $scope.catalog =monitorSer.catalog;
    $scope.queryLog =monitorSer.queryLog;
    $scope.planOut = monitorSer.planOut;
    $scope.colseModal = monitorSer.colseModal;
    $scope.scheme = monitorSer.scheme;
    $scope.getScheme = monitorSer.getScheme;
    $scope.addBatch = monitorSer.addBatch;
    $scope.submitaa = monitorSer.submitaa;
    $scope.a = monitorSer.a;
    $scope.clear1 = monitorSer.clear1;
    $scope.start=monitorSer.start;
    $scope.close=monitorSer.close;
    $scope.buttonState=monitorSer.buttonState;
    $scope.queryHistorySwitch=monitorSer.queryHistorySwitch();
    $scope.historyswitch=monitorSer.historyswitch;
    }
    monitorCtr.$inject = ['$scope','monitorSer'];
})(angular);