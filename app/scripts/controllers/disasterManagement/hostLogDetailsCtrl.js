/**
 * Created by Administrator on 2017/3/6 0006.
 */
;(function(angular){
  'use strict';
  angular.module('controllers.hostLogDetailsCtrl',[]).controller('hostLogDetailsCtrl', hostLogDetailsCtrl);

  function hostLogDetailsCtrl($scope,httpServe,hostLogDetailsSer) {
      $scope.logDetails=hostLogDetailsSer.logDetails();
      $scope.journalData=hostLogDetailsSer.journalData;

  }
  hostLogDetailsCtrl.$inject = ['$scope','httpServe','hostLogDetailsSer'];
})(angular);
