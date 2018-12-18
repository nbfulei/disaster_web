'use strict';

;(function (angular) {
  'use strict';
  angular.module('controllers.switchView',[]).controller('switchViewCtrl', switchViewCtrl);

  function switchViewCtrl($scope,switchViewSer) {
  	$scope.datas = switchViewSer.datas;
  	$scope.query = switchViewSer.query();
  	$scope.switchFlag = switchViewSer.initswitchFlag();
  	$scope.nextStep = switchViewSer.nextStep;
  	$scope.switchPage = switchViewSer.switchPage;
  	$scope.executeScript = switchViewSer.executeScript;
  	$scope.isShow = switchViewSer.isShow;
  };

  switchViewCtrl.$inject = ['$scope','switchViewSer'];
})(angular);