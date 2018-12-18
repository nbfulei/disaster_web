/**
 * Created by Administrator on 2017/3/2 0002.
 */
/**
 * @Description input框和div组合替换select框兼容ie9
 * @author zhangwei
 * @CreateDate 2017/02/24 10:22
 **/

;(function(){
  'use strict';
  angular.module('disasterRec')
    .directive("sorting",function(){
      return {
        restrict:'AE',
        scope:{
          sortIcon:'='
        },
        templateUrl:'views/common/liftStyle.html',
        controller:['$scope','$attrs','$parse','$timeout',function($scope, $attrs, $parse,$timeout){

        }]
      }
    })
})();

