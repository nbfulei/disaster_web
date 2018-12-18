'use strict';
/**
 * @ngdoc overview
 * @name security
 * @description
 * # security
 *
 * Main module of the application.
 * RestangularProvider
 */
var app=angular
  .module('disasterRec', [
   /* 'ngAnimate',*/
    'ngCookies',
    'ngMessages',
    'ui.router',
    'restangular',
    'disasterRec.controllers',
    'disasterRec.servers',
    'treeGrid',
    'treeGrid1',
    'services.systemIP'
  ]);
app.config(['$urlRouterProvider','$stateProvider','RestangularProvider','$httpProvider',function($urlRouterProvider, $stateProvider,RestangularProvider,$httpProvider) {
  var hostName='';
  	if(!$httpProvider.defaults.headers.get){
         $httpProvider.defaults.headers.get = {};
        }
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
     $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $httpProvider.defaults.transformRequest = [function(data) {
        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function(obj) {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '='
                        + encodeURIComponent(value) + '&';
                }
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        return angular.isObject(data) && String(data) !== '[object File]'
            ? param(data)
            : data;
    }];
	  //Restangular拦截失败的请求，如果返回状态为 302 时，则表示session超时，跳至登陆界面。
  RestangularProvider.setErrorInterceptor(function(response, deferred, responseHandler){
      if(response.status === 500 || response.status === 404 ||response.status === 400){
          var loa=document.getElementById("loading");
            loa.style.display="none";
        return false;
      }
      if (response.status === 302) {
        window.location=hostName;
      }
        return true;
    });

     //请求获取url地址
  RestangularProvider.setRequestInterceptor(function(element, operation, route, url) {
    hostName='http://'+window.location.hostname+':'+window.location.port+'/#/disaster/index.html';
    return element;
  });
	  //登录
    //$urlRouterProvider.otherwise('/disasterRec/tmallBusRunningStatus');
	  $urlRouterProvider.otherwise('/disasterRec');
    //登录
    $stateProvider.state('login',{
        url: '/login',
      views: {
        'view': {
          templateUrl: 'views/userManage/login.html',
          controller: 'userLoginController',
          
        }
      }
      });
    //主页
 $stateProvider.state('disasterRec', {
			url: '/disasterRec',
			views: {
				'view': {
					templateUrl: 'views/main.html',
					controller:'mainController',
          resolve:{
            socketConfig:function(systemIP){
               systemIP.getSystemModules();
               /*systemIP.getDepartment();
               systemIP.getWorkGroup();*/
               systemIP.getAuthority('disaster',function(res){
                return res.data;
              });
            }
          }
				}
			}
		});
     //注册
    $stateProvider.state('registered',{
        url: '/registered',
      views: {
        'view': {
          templateUrl: 'views/userManage/registered.html',
          controller: 'userLoginController',
          
        }
      }
      });
     //修改密码  
    $stateProvider.state('disasterRec.changePassword',{
          url:'/changePassword',
          views:{
              'view':{
                  templateUrl:'views/userManage/changePassword.html',
                  controller:'userLoginController'
              }
          }
      });
    //用户管理
    $stateProvider.state('disasterRec.userManage',{
        url: '/userManage',
      views: {
        'view': {
          templateUrl: 'views/userManage/userManage.html',
          controller: 'userLoginController',
          
        }
      }
      });
    //主机修改和添加页面  
    $stateProvider.state('disasterRec.modifyHost',{
          url:'/modifyHost?host',
          views:{
              'view':{
                  templateUrl:'views/disasterManagement/modifyHost.html',
                  controller:'modifyHostCtrl'
              }
          }
      });

     /******************************************* 天猫 start ******************************/
        $stateProvider.state('disasterRec.tmallPre',{
          url:'/commonProblems',
          views:{
            'view':{
              templateUrl:'views/UPAY/tmall/preposition.html',
              controller:'tmallPreCtrl'
            }
          }
        });
    /******************************************* 天猫主 start ******************************/
        $stateProvider.state('disasterRec.tmallMainbusiLoadBal',{
          url:'/tmallMainbusiLoadBal',
          views:{
            'view':{
              templateUrl:'views/ConfigServer/UPAY/tmallMain/tmallMainbusiLoadBal.html',
              controller:'TMbusiLoadBalCtrl'
            }
          }
        });

    $stateProvider.state('disasterRec.tmallMainOverview',{
        url:'/tmallMainOverview/:id',
        views:{
            'view':{
                templateUrl:'views/ConfigServer/UPAY/tmallMain/tmallMainOverview.html',
                controller:'TMOverviewCtrl'
            }
        }
    });


    $stateProvider.state('disasterRec.tmallMainMesQueue',{
          url:'/tmallMainMesQueue/:id/:name',
          views:{
            'view':{
              templateUrl:'views/ConfigServer/UPAY/tmallMain/tmallMainMesQueue.html',
              controller:'TMmesQueueCtrl'
            }
          }
        });


        $stateProvider.state('disasterRec.tmallMainTrade',{
          url:'/tmallMainTrade/:id/:name',
          views:{
            'view':{
              templateUrl:'views/ConfigServer/UPAY/tmallMain/tmallMainTrade.html',
              controller:'TMtradeCtrl'
            }
          }
        });





     /******************************************* 天猫备 end ******************************/
     /******************************************* 天猫 end ******************************/

     //$stateProvider.state('disasterRec.tmallMenuConfig',{
     //    url:'/tmallMenuConfig',
     //    views:{
     //        'view':{
     //            templateUrl:'views/AppConfig/tmallMenuConfig.html',
     //            controller:'TMenuConfigCtrl'
     //        }
     //    }
     //});

      //主机资源配置
      //$stateProvider.state('disasterRec.tmallHostConfig',{
      //    url:'/tmallHostConfig',
      //    views:{
      //        'view':{
      //            templateUrl:'views/AppConfig/tmallHostConfig.html',
      //            controller:'hostConfigCtr'
      //        }
      //    }
      //});

      //监控阈值配置表
      $stateProvider.state('disasterRec.monitorThreshold',{
          url:'/monitorThreshold',
          views:{
              'view':{
                  templateUrl:'views/AppConfig/monitorThreshold.html',
                  controller:'monitorThresholdCtrl'
              }
          }
      });

      //ogg进程配置表
      $stateProvider.state('disasterRec.tmallOggConfig',{
          url:'/tmallOggConfig',
          views:{
              'view':{
                  templateUrl:'views/AppConfig/tmallOggConfig.html',
                  controller:'tmallOggConfigCtrl'
              }
          }
      });
      //省大区配置
      $stateProvider.state('disasterRec.tmallRegionConfig',{
          url:'/tmallRegionConfig',
          views:{
              'view':{
                  templateUrl:'views/AppConfig/tmallRegionConfig.html',
                  controller:'tmallRegionConfigCtrl'
              }
          }
      });

    /***************************** 容灾业务监控 start  **********************************/
    //告警信息查询
    $stateProvider.state('disasterRec.alarmQuery',{
      url:'/alarmQuery',
      views:{
        'view':{
          templateUrl:'views/ConfigServer/disasterServiceMonitoring/alarmQuery.html',
          controller:'alarmQueryCtrl'
        }
      }
    });
    //文件比对
    $stateProvider.state('disasterRec.fileComparison',{
      url:'/fileComparison',
      views:{
        'view':{
          templateUrl:'views/ConfigServer/disasterServiceMonitoring/fileComparison.html',
          controller:'fileComparisonCtrl'
        }
      }
    });
    //数据比对
    $stateProvider.state('disasterRec.dataComparison',{
      url:'/dataComparison',
      views:{
        'view':{
          templateUrl:'views/ConfigServer/disasterServiceMonitoring/dataComparison.html',
          controller:'dataComparisonCtrl'
        }
      }
    });
    /***************************** 容灾业务监控 end  **********************************/


    /******************************************* 控制中心 start ******************************/
    $stateProvider.state('disasterRec.tmallBusRunningStatus',{
      url:'/tmallBusRunningStatus',
      views:{
        'view':{
          templateUrl:'views/controlCenter/UPAY/tmallBusiness/runningStatus.html',
          controller:'runningStatusCtrl'
        }
      }
    });
    // 容灾切换
    $stateProvider.state('disasterRec.tmallBusDisasterSwitch',{
      url:'/tmallBusDisasterSwitch',
      views:{
        'view':{
          templateUrl:'views/controlCenter/UPAY/tmallBusiness/disasterSwitch.html',
          controller:'disasterSwitchCtrl'
        }
      }
    });
        $stateProvider.state('disasterRec.tmallBusSwitchView',{
          url:'/tmallBusSwitchView',
          views:{
            'view':{
              templateUrl:'views/controlCenter/UPAY/tmallBusiness/switchView.html',
              controller:'switchViewCtrl'
            }
          }
        });
        $stateProvider.state('disasterRec.tmallBusSwitch',{
          url:'/tmallBusSwitch',
          views:{
            'view':{
              templateUrl:'views/controlCenter/UPAY/tmallBusiness/view.html',
              controller:'viewCtrl'
            }
          }
        });
        //容灾操作（旧）
        $stateProvider.state('disasterRec.tmalldisasterOperation',{
          url:'/disasterOperation',
          views:{
            'view':{
              templateUrl:'views/controlCenter/UPAY/tmallBusiness/disasterOperation.html',
              controller:'disasterOperationCtr'
            }
          }
        });
        //容灾操作（新）主页
        $stateProvider.state('disasterRec.operation',{
          url:'/operation',
          views:{
            'view':{
              templateUrl:'views/controlCenter/UPAY/tmallBusiness/operation.html',
              controller:'operationCtrl'
            }
          }
        });
        //容灾操作（新）一
        $stateProvider.state('disasterRec.operationInfo',{
          url:'/operationInfo',
          views:{
            'view':{
              templateUrl:'views/controlCenter/UPAY/tmallBusiness/operationInfo.html',
              controller:'operationInfoCtrl'
            }
          }
        });
        //容灾操作（新）二
        $stateProvider.state('disasterRec.operationLate',{
          url:'/operationLate',
          views:{
            'view':{
              templateUrl:'views/controlCenter/UPAY/tmallBusiness/operationLate.html',
              controller:'operationLateCtrl'
            }
          }
        });
        //容灾操作（新）三
        $stateProvider.state('disasterRec.operationLast',{
          url:'/operationLast',
          views:{
            'view':{
              templateUrl:'views/controlCenter/UPAY/tmallBusiness/operationLast.html',
              controller:'operationLateCtrl'
            }
          }
        });

        //容灾操作（新）四  确认切换
        $stateProvider.state('disasterRec.operationConfirmSwitch',{
          url:'/operationConfirmSwitch',
          views:{
            'view':{
              templateUrl:'views/controlCenter/UPAY/tmallBusiness/operationConfirmSwitch.html',
              controller:'operationLateCtrl'
            }
          }
        });
        //容灾评估
        $stateProvider.state('disasterRec.assess',{
          url:'/assess?begin&end',
          views:{
            'view':{
              templateUrl:'views/controlCenter/UPAY/tmallBusiness/disasterAssess.html',
              controller:'disasterAssessCtrl'
            }
          }
        });
        //容灾评估2
        $stateProvider.state('disasterRec.outside',{
          url:'/outside',
          views:{
            'view':{
              templateUrl:'views/controlCenter/UPAY/tmallBusiness/disasterOutside.html',
              controller:'disasterOutsideCtrl'
            }
          }
        });
        //容灾监控
        $stateProvider.state('disasterRec.monitor',{
          url:'/monitor',
          views:{
            'view':{
              templateUrl:'views/controlCenter/UPAY/tmallBusiness/monitor.html',
              controller:'monitorCtr'
            }
          }
        });
        //批量处理
        $stateProvider.state('disasterRec.BatchProcessing',{
          url:'/BatchProcessing',
          views:{
            'view':{
              templateUrl:'views/controlCenter/UPAY/tmallBusiness/TmallBatchProcessing.html',
              controller:'TmallBatchProcessingCtrl'
            }
          }
        });
        //批处理管理
        $stateProvider.state('disasterRec.TreatmentProgram',{
          url:'/TreatmentProgram',
          views:{
            'view':{
              templateUrl:'views/controlCenter/UPAY/tmallBusiness/TmallTreatmentProgram.html',
              controller:'TmallTreatmentProgramCtrl'
            }
          }
        });
        //告警详情
        $stateProvider.state('disasterRec.alarmDetails',{
          url:'/alarmDetails',
          views:{
            'view':{
              templateUrl:'views/controlCenter/UPAY/tmallBusiness/alarmDetails.html',
              controller:'alarmDetailsCtr'
            }
          }
        });
     /******************************************* 控制中心 end ******************************/

    /***************************容灾运维管理  start  *******************************/
      //切换历史查询
    $stateProvider.state('disasterRec.switchHistoryQuery',{
      url:'/switchHistoryQuery',
      views:{
        'view':{
          templateUrl:'views/disasterManagement/switchHistoryQuery.html',
          controller:'switchHistoryQueryCtrl'
        }
      }
    });
    //负载均衡维护
    $stateProvider.state('disasterRec.loadEqualMaintain',{
      url:'/loadEqualMaintain',
      views:{
        'view':{
          templateUrl:'views/disasterManagement/loadEqualMaintain.html',
          controller:'loadEqualMaintainCtrl'
        }
      }
    });
    //数据同步维护
    $stateProvider.state('disasterRec.dataSynchroMaintain',{
      url:'/dataSynchroMaintain',
      views:{
        'view':{
          templateUrl:'views/disasterManagement/dataSynchroMaintain.html',
          controller:'dataSynchroMaintainCtrl'
        }
      }
    });
  //主机配置
  $stateProvider.state('disasterRec.hostQuery',{
    url:'/hostQuery',
    views:{
      'view':{
        templateUrl:'views/disasterManagement/hostQuery.html',
        controller:'hostQueryCtrl'
      }
    }
  });
  //主机单个详情
  $stateProvider.state('disasterRec.hostDetails',{
    url:'/hostDetails?hostId',
    views:{
      'view':{
        templateUrl:'views/disasterManagement/hostDetails.html',
        controller:'hostDetailsCtrl'
      }
    }
  });
  //实例单个详情
  $stateProvider.state('disasterRec.hostInstance',{
    url:'/hostInstance?host&instance',
    views:{
      'view':{
        templateUrl:'views/disasterManagement/hostInstanc.html',
        controller:'hostInstancCtrl'
      }
    }
  });
  //实例操作（新增修改）
  $stateProvider.state('disasterRec.detailsOperation',{
    url:'/detailsOperation?host&hostId&instance&operateType',
    views:{
      'view':{
        templateUrl:'views/disasterManagement/detailsOperation.html',
        controller:'detailsOperationCtrl'
      }
    }
  });
  //实例日志详情
  $stateProvider.state('disasterRec.hostLogDetails',{
    url:'/hostLogDetails?insId&journalId',
    views:{
      'view':{
        templateUrl:'views/disasterManagement/hostLogDetails.html',
        controller:'hostLogDetailsCtrl'
      }
    }
  });
    //机器信息管理
  $stateProvider.state('disasterRec.machinesInfo',{
    url:'/machinesInfo',
    views:{
      'view':{
        templateUrl:'views/AppConfig/machinesInfo.html',
        controller:'machinesInfoCtrl'
      }
    }
  });
    //实例信息管理
  //$stateProvider.state('disasterRec.instancesInfo',{
  //  url:'/instancesInfo',
  //  views:{
  //    'view':{
  //      templateUrl:'views/AppConfig/instancesInfo.html',
  //      controller:'instancesInfoCtrl'
  //    }
  //  }
  //});
    /***************************容灾运维管理  end  *******************************/
  }]);

app.run(['$rootScope', '$window', '$location', '$log','$cookieStore', function ($rootScope, $window, $location, $log,$cookieStore) {
    var locationChangeSuccessOff = $rootScope.$on('$locationChangeSuccess', locationChangeSuccess);
    function locationChangeSuccess(event,newUrl) {
        $log.log('locationChangeSuccess');
        $log.log(newUrl);
        if(newUrl.indexOf("disasterRec/")===-1 && $cookieStore.get('id')){
                $cookieStore.remove('id');
        }
    }
}]);
