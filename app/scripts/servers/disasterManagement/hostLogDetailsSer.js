/**
 * Created by Administrator on 2017/3/1 0001.
 * 实例
 */
;(function (angular) {
  'use strict';
  angular.module('services.hostLogDetailsSer',[]).factory('hostLogDetailsSer', hostLogDetailsSer);

  function hostLogDetailsSer($state,$timeout,httpServe,$interval,promisesServe,$stateParams) {
    var journalData=[];
    var socket;
    return {
      logDetails:logDetails,
      journalData:journalData
    };
    function params(){
      var param={
        insId:$stateParams.insId,
        journalId:$stateParams.journalId
      };
      return param
    }
    function logDetails(){
      httpServe.getLogDetails(JSON.stringify(params())).then(function(res){
        if(res.state==='success'){
          angular.copy(res.data,journalData);
        }else {
          promisesServe.msgBar('warning',res.desc);
        }
      });

      socket = io.connect(socketConfig,{'force new connection': true});
      socket.on('journalData',function(res){
        if(res.state=== 'success'){
          $timeout(function(){
            journalData.push(res.data);
          },0)
        }
      });
    }
  }
  hostLogDetailsSer.$inject = ['$state','$timeout','httpServe','$interval','promisesServe','$stateParams'];
})(angular);
