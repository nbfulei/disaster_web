/**
 * Created by Administrator on 2017/2/17 0017.
 * 告警信息查询
 */
;(function (angular) {
  'use strict';
  angular.module('services.alarmQuerySer',[]).factory('alarmQuerySer', alarmQuerySer);

  function alarmQuerySer($timeout,httpServe,$interval,promisesServe) {

    return {

    };

  }
  alarmQuerySer.$inject = ['$timeout','httpServe','$interval','promisesServe'];
})(angular);
