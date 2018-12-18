
(function (angular) {
  'use strict';
  angular.module('controllers.tmail',[]).controller('tmailPreCtrl', tmailPreCtrl);

  function tmailPreCtrl($scope,tmailSer) {
    $scope.tmailPre = tmailSer.initTmailPre();
    $scope.changeBtn = tmailSer.changeBtn;
    $scope.showDetail = tmailSer.showDetail;
    $scope.configDetail = tmailSer.configDetail;
  }
  tmailPreCtrl.$inject = ['$scope','tmailSer'];
})(angular);
