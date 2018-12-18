'use strict';

;(function (angular) {
  'use strict';
  angular.module('controllers.view',[]).controller('viewCtrl', viewCtrl);

  function viewCtrl($scope,viewSer,httpServe,Restangular) {
    $scope.a = function(){
      
      Restangular.all('ss').one('a',2).get().then()
      //Restangular.one('tm').one('a',1).one('b',2).one('c',3).all('api').post({m:6}).then(function(){})
      //httpServe.get('a/b',{f:2}).then();
    }
  };

  viewCtrl.$inject = ['$scope','viewSer','httpServe','Restangular'];
})(angular);