/**
 * @Description input框和div组合替换select框兼容ie9
 * @author zhangwei
 * @CreateDate 2017/02/24 10:22
 **/

;(function(){
  'use strict';
  angular.module('disasterRec').directive('inselect',['$parse',inSelectDirct]);

  function inSelectDirct($parse){
    return {
      restrict: 'E', //E元素, A属性, C = Class, M注释
      //require:'ngModel',
      scope: {
        //ngModel:'=',
        listData:'=',
        ngClass:'=',
        ngChange:'&',
        datatoggle:'=',
        goSwith:'&'
      },
      templateUrl:'views/common/inSelect.html',
      link: function(scope,element,attrs) {
        //如果有添加新的样式，则添加进页面
        if(attrs.ngClass){
          scope.inSelectClass = attrs.ngClass;
        }
        //选项赋值
        scope.setSelectName = function(rules){
          //如果使用rule.code||rule.type,则当rule.code等于''时，赋值undefined.
          var type = rules.code;
          if(type===undefined){
            type = rules.type;
          }
          scope.inName = rules.name;
          scope.goSwith({name:rules.name});
          //如果存在change事件，则执行
          if(attrs.ngChange){
            $parse(attrs.ngChange)(scope);
          }
        };
      }
    };
  }

})();

