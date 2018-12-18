;(function (angular) {
    'use strict';
    angular.module('disasterRec').directive('onFinishRender', function($scope, $timeout){
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        if (scope.$last) {
          $timeout(function () {
            var fun = $scope.$eval(attr.onFinishRender);
            if (fun && typeof(fun) === 'function') {
              fun();  //回调函数
            }
          });

        }
      }
    };
  })
      //表单验证第4版本，bootstap版
      .directive('opSave', ['$parse', '$timeout', function($parse, $timeout) {
        return {
          link: function(scope, element, attrs) {
            var toDoGetter = $parse(attrs.opSave);
            var formName = attrs.formName || 'form';
            var errorName = formName + '.$error';

            //用于处理重复提交,使用定时器，1秒之后才能再次提交
            var submitTimer;

            //初始化提示控件,可以自定义提示，如果没有就使用浏览器默认提示
            $('form input, select, textarea').each(function() {
              //如果没有required则不做提示
              if (!$(this).attr('required')){
                return;
              }
              var _this = $(this);
              $(this).popover({
                trigger: 'click',
                placement: _this.attr('op-placement')||'bottom',
                content: function() {
                  var opUsed = $parse(_this.attr('op-used'))(scope);
                  if(opUsed===false||opUsed==='false'||((_this.val()===''||_this.val()===undefined)&&opUsed===null)){//如果存在opUsed为false则不做验证
                    return '';
                  }
                  if(_this.attr('show-msg')){
                    return _this.attr('show-msg');
                  }else{
                    if (_this.val() === ''){
                      return '该字段不得为空！';
                    }
                    return '';
                  }
                }
              }).on('shown.bs.popover', function() {
                if (_this.data('toId')) {
                  clearTimeout(_this.data('toId'));
                }
                var toId = setTimeout(function() {
                  _this.popover('hide');
                }, 3000);
                _this.data('toId', toId);
              });
            });

            //用于输入时验证信息提示
            scope.$watch(errorName, function(errorArray, oldErrorArray) {
              for (var i in errorArray) {
                if (i !== 'required') {
                  continue;
                }
                for (var j in errorArray[i]) {
                  var newErrorObj = errorArray[i][j];
                  var newElement = $('[name=' + newErrorObj.$name + ']');
                  if (newErrorObj.$dirty) {
                    newElement.popover('show');
                  }
                }
              }
              //将前面的错误提示关闭
              for (var type in oldErrorArray) {
                if (type !== 'required') {
                  continue;
                }
                for (var index in oldErrorArray[type]) {
                  var oldErrorObj = oldErrorArray[type][index];
                  var oldElement = $('[name=' + oldErrorObj.$name + ']');
                  if(oldErrorObj.$dirty){
                    oldElement.popover('hide');
                  }
                }
              }
            }, true);

            //绑定提交按钮,当提交时验证表单,只有全部通过之后才能执行相应的后续函数
            element.bind('click', function() {
              //解决页面闪动问题
              element.focus();
              //判断是否在限制时间内
              if (submitTimer){
                return;
              }

              //将所有未验证通过的字段显示提示
              var invalidFields = [];
              $('form input, select, textarea').each(function() {
                var _this = $(this);
                var thisVal = _this.val();//当前值
                var className = this.className;
                if(className.indexOf('ng-invalid')!==-1){
                  var opUsed = $parse(_this.attr('op-used'))(scope);
                  if(opUsed!==false&&opUsed!=='false'){
                    if(opUsed===null&&(thisVal===''||thisVal===undefined)){
                      //如果当前值为空则不做操作。
                    }else{
                      invalidFields.push($(this));
                      $(this).popover('show');
                    }
                  }
                }
              });

              //聚焦到第一个错误的输入框
              if (invalidFields.length > 0) {
                invalidFields[0].focus();
                return;
              }

              //验证成功，继续下一步动作
              toDoGetter(scope);
              //设置限定时间1s
              submitTimer = $timeout(function() {
                submitTimer = undefined;
              }, 1000);
            });
          }
        };
      }])

})(angular);
