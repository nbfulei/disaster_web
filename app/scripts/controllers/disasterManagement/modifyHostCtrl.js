'use strict'
;(function (angular){
 	angular.module('controllers.modifyHostCtrl',[]).controller('modifyHostCtrl',modifyHostCtrl);
 	function modifyHostCtrl($scope,modifyHostSer){
    	$scope.oldData= modifyHostSer.oldData;
    	$scope.newData= modifyHostSer.newData;

    	$scope.perationSub= modifyHostSer.perationSub;//确认按钮
    	$scope.addModify= modifyHostSer.addModify;//修改数据
    	$scope.callBack= modifyHostSer.callBack; //返回

    	$scope.Initialization= modifyHostSer.Initialization;
    	$scope.hostWLId= modifyHostSer.hostWLId;
    	$scope.hostComponents= modifyHostSer.hostComponents;
    	$scope.hostosType= modifyHostSer.hostosType;
    	$scope.validate= modifyHostSer.validate;//验证
    //console.log($scope.validate)
    	$scope.verification= modifyHostSer.verification;//验证
    }
 	modifyHostCtrl.$inject = ['$scope','modifyHostSer'];
})(angular);
