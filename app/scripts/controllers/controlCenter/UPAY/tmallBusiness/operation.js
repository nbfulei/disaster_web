'use strict';

;(function (angular) {
  'use strict';
  angular.module('controllers.operation',[]).controller('operationCtrl', operationCtrl);

  function operationCtrl($scope,operationSer) {
  	$scope.planOut = operationSer.planOut;
  	$scope.colseModal = operationSer.colseModal;
  	$scope.scheme = operationSer.scheme;
  	$scope.getScheme = operationSer.getScheme;
  	$scope.addBatch = operationSer.addBatch;
  	$scope.watchConfigName = operationSer.watchConfigName;
    $scope.submit = operationSer.submit;
  	$scope.a = operationSer.a;
  };

  operationCtrl.$inject = ['$scope','operationSer'];
})(angular);