/**
 * @ngdoc function
 * @name omsApp.controller:mainController
 * @description
 * # mainController
 * Controller of the security
 */
;
(function () {
  'use strict';

  var app = angular.module('disasterRec.controllers', [
    'controllers.tmail',
    //天猫部分
    'controllers.monitorThresholdCtrl',
    'controllers.tmallOggConfigCtrl',
    'controllers.switchView',
    'controllers.view',
    'controllers.operation',
    'controllers.runningStatus',
    'controllers.disasterSwitch',
    'controllers.disasterOperation',
    'controllers.disasterAssess',
    'controllers.disasterOutside',
    'controllers.monitor',
    'controllers.BatchProcessing',
    'controllers.TreatmentProgram',
    'controllers.alarmDetails',
    'controllers.operationLate',
    'controllers.operationInfo',
    'controllers.alarmQueryCtrl',
    'controllers.fileComparisonCtrl',
    'controllers.dataComparisonCtrl',
    'controllers.dataSynchroMaintainCtrl',
    'controllers.loadEqualMaintainCtrl',
    'controllers.switchHistoryQueryCtrl',
    'controllers.hostQueryCtrl',
    'controllers.hostInstancCtrl',
    'controllers.hostDetailsCtrl',
    'controllers.tmallRegionConfigCtrl',
    'controllers.machinesInfoCtrl',
    'controllers.hostLogDetailsCtrl',
    'controllers.detailsOperationCtrl',
    'controllers.modifyHostCtrl',
    'controllers.userLogin'

  ]);
  app.controller('mainController', ['$scope', '$state', '$cookieStore', 'mainServe', 'httpServe', '$timeout', '$rootScope', 'systemIP', function ($scope, $state, $cookieStore, mainServe, httpServe, $timeout, $rootScope, systemIP) {
    //$scope.userRights = userRightMessage;
    $timeout(function () {
      $rootScope.userInfo = $cookieStore.get('userInfo');
      if (!$cookieStore.get('userInfo')) {
        $state.go('login');
      } else {
        //若有授权
        //if ($cookieStore.get('userInfo').expireDate&&$cookieStore.get('userInfo').flag) {
        if ($cookieStore.get('userInfo').flag) {
          var day = new Date();
          var days = day.getTime();
          $rootScope.confirm = {};
          //密码过期判断
          /*if ($rootScope.userInfo.expireDate<days) {
              $scope.confirm.flag=true;
              $scope.confirm.msg="您的密码已过期!";
              //console.log("您的密码已过期");
              return;
          }*/

          if ($rootScope.userInfo.safeMode === '1') { //1高权限，0低权限
            $rootScope.userRights = userRightMessage;
          } else if ($rootScope.userInfo.safeMode === '0') {
            $rootScope.userRights = userRightMessage2;
          }
          setUisref();
        } else if (!$cookieStore.get('uiSerf')) {
          $state.go('login');
          $rootScope.confirm.flag = true;
          $rootScope.confirm.msg = "系统错误！";
        }
        /*if ($rootScope.userInfo.safeMode==='1') {
            $scope.userRights = userRightMessage;
        }else if($rootScope.userInfo.safeMode==='0'){
            $scope.userRights = userRightMessage2;
        }*/
        //setUisref();

      }

    }, 1000);

    $rootScope.isScroll = true;
    //登出
    $scope.logOut = function () {
      httpServe.post("/disaster/userSignOut").then(function (res) {
        if (res.state === "success") {
          if ($rootScope.userInfo.flag === '1') {
            $state.go('login');
            $scope.user = {};
            $cookieStore.remove('userInfo');
            $cookieStore.remove('uiSerf');
          } else {
            $cookieStore.remove('userInfo');
            $cookieStore.remove('uiSerf');
            //window.location("loginOut.html","_self");
            //window.location.href="loginOut.html";
            /*var temp=res.data;*/
            window.open("http://172.16.8.121:8080/TicketloginAction.do?method=appExit", "_self");
            /*var userAgent = navigator.userAgent;
             if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") !=-1) {
               window.opener=null;
                var opened=window.open('about:blank','_self');
               window.close();

             } else {
                window.close();
             };*/
          }

        }
      })
    }
    //首次跳转至首页
    function setUisref() {
      if (($cookieStore.get('uiSerf')) == undefined) {
        if ($rootScope.userInfo.flag === '1') { //暂定0-4A,1-本地
          $state.go('login');
          $rootScope.confirm.flag = true;
          $rootScope.confirm.msg = "4A接口已关闭，请通过本地登入系统!";
          return;
        } else {
          $state.go('disasterRec.tmallBusRunningStatus');
          if ($rootScope.userInfo) {
            $cookieStore.put('uiSerf', "disasterRec.tmallBusRunningStatus");
          }
        }
      }
    }
    $scope.setId = function (id) {
      $cookieStore.put('id', id);
    };
    //监听ip
    $scope.watchIp = function (model, ipName) {
      model.error = false;
      if (is.string(model[ipName])) {
        var arr = model[ipName].split('.');
        var a = 0;
        model[ipName] = model[ipName].replace(/[^0-9.]/g, '');
        if ((model[ipName].length > 3 && model[ipName].indexOf('.') < 0) || parseInt(model[ipName]) > 255 || model[ipName].indexOf('..') >= 0) {
          model.error = true;
        } else {
          model.error = false;
          if (arr.length > 4) {
            model.error = true;
          }
          if (arr.length = 4 && parseInt(arr[3]) > 255) {
            model.error = true;
          }
        }
        if (model[ipName].indexOf(".") > 0) {
          for (var i = 0; i < arr.length; i++) {
            var inti = parseInt(arr[i]);
            if (arr[i].length > 3 || arr.length > 4 || inti > 255) {
              model.error = true;
            }
            if (inti > 0) {
              a += 1;
            }
          }
        }

        var exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        if (!exp.test(model[ipName]) && arr.length > 3 && !(model[ipName][model[ipName].length - 1] === '.') && a > 3) {
          model.error = true;
        }
      }
      model[ipName] = model[ipName].slice(0, 16);
    };

    $scope.changeState = function () {

      var labels = $("label[class^='aa']");
      labels.next('ul').animate({
        height: 'toggle',
        opacity: 'toggle'
      }, 500);

    };
    $scope.childLabelClick = function (mthis) {
      $('#rolinul label').each(function () {
        if ($(this).is($(mthis.currentTarget))) {
          $(this).css('color', '#FFF').css('background-color', '#5D6B80');
        } else {
          $(this).css('color', '').css('background-color', '');
        }
      });
    };

    $scope.labelClick = function (mthis, id) {
      var currentClass = $(mthis.currentTarget).attr("name");
      var labels = $("label[name^='aa']");
      if (currentClass.indexOf("ee") === 0 || $(mthis.currentTarget).next('ul').length > 0 && $(mthis.currentTarget).next("ul").css("display") === 'none') {
        var aa = $("label[name='" + currentClass + "']");
        aa.each(function () {
          if (!$(this).is($(mthis.currentTarget)) && $(this).next('ul').css("display") !== 'none') {
            $(this).next('ul').animate({
              height: 'toggle',
              opacity: 'toggle'
            }, 500);
          }
        });
        labels.each(function () {
          var labelClass = $(this).attr("name");
          if (currentClass.substring(2, currentClass.length) !== labelClass.substring(2, labelClass.length) && $(this).next('ul').css("display") !== 'none') {
            $(this).next('ul').animate({
              height: 'toggle',
              opacity: 'toggle'
            }, 500);
          }
        });
      }
      if (currentClass.indexOf('dd') >= 0) {
        $(mthis.currentTarget).parent().next('ul').animate({
          height: 'toggle',
          opacity: 'toggle'
        }, 500);
        return;
      }
      $(mthis.currentTarget).next('ul').animate({
        height: 'toggle',
        opacity: 'toggle'
      }, 500);
      //发送系统日志
      if (id) {
        var ids = "0" + id;
        var url = "/sendSysLog";
        //httpServe.post(url,ids).then(function (res) {
        /*if (res.state === "SUCCSE") {
        }else{
         promisesServe.msgBar('warning',res.desc);
        }*/
        //});
      }
    };

    $(window).scroll(function () {
      var winHeight = 0;
      if (window.innerHeight) {
        winHeight = window.innerHeight;
      } else if ((document.body) && (document.body.clientHeight)) {
        winHeight = document.body.clientHeight;
      }
      $('.main-menu').css('min-height', $(document).scrollTop() + winHeight - 60);
      if ($(document).scrollTop() >= 1 && $rootScope.isScroll === true) {
        $rootScope.isScroll = false;
      }
    });
    $(window).resize(function () {
      if ($('.main-menu').height() < $('.content').height()) {
        $('.main-menu').css('min-height', '100%');
        $('.main-menu').css('overflow', 'hidden');
      }
    });
    $scope.$on('$stateChangeSuccess', function () {
      $(window).scrollTop(0); //滚动条的垂直位置
      $rootScope.isScroll = true;
    });

    $(function () {
      $("[data-toggle='tooltip']").tooltip();
    });

    $scope.finishRender = function () {
      if ($cookieStore.get('id')) {
        var labels = $("a[menu-id]");
        labels.each(function () {
          var menuId = $(this).attr('menu-id');
          var level = $(this).attr('level');
          if (menuId === $cookieStore.get('id')) {
            $(this).find('label').css('color', '#FFF').css('background-color', '#5D6B80');
            var tmp = $(this).closest("ul");
            tmp.animate({
              height: 'toggle',
              opacity: 'toggle'
            }, 1);
            var topLevel = level.substring(0, 1);
            var tmpLevel = level.substring(0, level.length - 1);
            while (tmpLevel !== topLevel) {
              tmp = tmp.prev().closest("ul");
              tmp.animate({
                height: 'toggle',
                opacity: 'toggle'
              }, 1);
              tmpLevel = tmpLevel.substring(0, tmpLevel.length - 1);
            }
          }
        });
      } else {

        $("label[name^='aa']").each(function (i) {
          if (i === 0) {
            $(this).next('ul').animate({
              height: 'toggle',
              opacity: 'toggle'
            }, 1);
          }
        });

        $("ul[name^='cc']").each(function (i) {
          if (i === 0) {
            $(this).animate({
              height: 'toggle',
              opacity: 'toggle'
            }, 1);
          }
        });

        $("label[name^='dd']").each(function (i) {
          if (i === 0) {
            $(this).next('ul').animate({
              height: 'toggle',
              opacity: 'toggle'
            }, 1);
            $($(this).next('ul').find('li>span>a>label')[0]).css('color', '#FFF').css('background-color', '#5D6B80');
          }
        });
      }
    };
    //慢动作动画效果
    $scope.spanClick = function (mthis) {
      $(mthis.currentTarget).next('ul').animate({
        height: 'toggle',
        opacity: 'toggle'
      }, 500);
    };



    $scope.signalLight = [{
        manageName: '配置中心',
        systemList: [{
          systemName: '统一支付',
          isHealthy: false,
          moduleList: [{
              moduleName: '天猫-主',
              isHealthy: false,
              pageList: [{
                  pageName: '负载均衡',
                  isHealthy: false
                },
                {
                  pageName: '咪咕前置',
                  isHealthy: true
                },
                {
                  pageName: 'http前置',
                  isHealthy: true
                },
                {
                  pageName: 'dcc前置',
                  isHealthy: true
                },
                {
                  pageName: '消息队列',
                  isHealthy: true
                },
                {
                  pageName: '交易核心',
                  isHealthy: true
                }
              ]
            },
            {
              moduleName: '天猫-备',
              isHealthy: false,
              pageList: [{
                  pageName: '负载均衡',
                  isHealthy: false
                },
                {
                  pageName: '咪咕前置',
                  isHealthy: true
                },
                {
                  pageName: 'http前置',
                  isHealthy: true
                },
                {
                  pageName: 'dcc前置',
                  isHealthy: true
                },
                {
                  pageName: '消息队列',
                  isHealthy: true
                },
                {
                  pageName: '交易核心',
                  isHealthy: true
                }
              ]
            }
          ]
        }]
      },
      {
        manageName: '容灾控制中心',
        systemList: [{
          systemName: '统一支付',
          moduleList: [{
            moduleName: '天猫业务',
            pageList: [{
              pageName: '前置'
            }]
          }]
        }]
      }
    ];

  }]);
  app.directive('onFinishRenderFilters', function ($timeout) {
    return {

      restrict: 'A',
      link: function (scope) {
        if (scope.$last) {
          $timeout(function () {
            scope.$emit('ngRepeatFinished');
          });
        }
      }
    };
  });
  app.directive('diHref', diDirective);
  diDirective.$inject = ['$state', '$timeout', '$rootScope'];

  function diDirective() {
    return {
      restrict: 'A',
      require: ['?^uiSrefActive', '?^uiSrefActiveEq'],
      link: function (scope, element, attrs, uiSrefActive) {}
    };
  }
})();
