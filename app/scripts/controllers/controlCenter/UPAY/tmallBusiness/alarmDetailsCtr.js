'use strict';
;(function (angular){
	angular.module('controllers.alarmDetails',[]).controller('alarmDetailsCtr',alarmDetailsCtr);
	function alarmDetailsCtr($scope,alarmDetailsSer){
        $scope.errMessage=alarmDetailsSer.errMessage;
        $scope.qureyOgg=alarmDetailsSer.qureyOgg;
        $scope.qureyArray=alarmDetailsSer.qureyArray; 
        $scope.qureyFile=alarmDetailsSer.qureyFile;
        $scope.qureyArea=alarmDetailsSer.qureyArea;
        $scope.qureyData=alarmDetailsSer.qureyData;
        $scope.oggBox=alarmDetailsSer.oggBox;
        $scope.arrayBox=alarmDetailsSer.arrayBox;
        $scope.fileBox=alarmDetailsSer.fileBox;
        $scope.areaBox=alarmDetailsSer.areaBox;
        $scope.dataBox=alarmDetailsSer.dataBox;
        
       

    }
	alarmDetailsCtr.$inject = ['$scope','alarmDetailsSer'];
})(angular);