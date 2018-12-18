;(function(){
	angular.module('servers.httpServe',[]).factory('httpServe',httpServe);
 	function httpServe(Restangular){
		return{
		  get:get,
			post:post,
			TMbusiLoadBalanceList:TMbusiLoadBalanceList,
			TMinstanceStart:TMinstanceStart,
			TMinstanceStop:TMinstanceStop,
			TMocfrontList:TMocfrontList,
			TMhttpfrontList:TMhttpfrontList,
			TMdccfrontList:TMdccfrontList,
			TMinstanceIndex:TMinstanceIndex,
			TMmessageQueueList:TMmessageQueueList,
			TMmessageQueueIndex:TMmessageQueueIndex,
			TMmessageQueueStart:TMmessageQueueStart,
			TMmessageQueueStop:TMmessageQueueStop,
			TMmessageQueueClear:TMmessageQueueClear,
			TMcoreList:TMcoreList,
			TSbusiLoadBalanceList:TSbusiLoadBalanceList,
			TSinstanceStart:TSinstanceStart,
			TSinstanceStop:TSinstanceStop,
			TSocfrontList:TSocfrontList,
			TShttpfrontList:TShttpfrontList,
			TSdccfrontList:TSdccfrontList,
			TSinstanceIndex:TSinstanceIndex,
			TSmessageQueueList:TSmessageQueueList,
			TSmessageQueueIndex:TSmessageQueueIndex,
			TSmessageQueueStart:TSmessageQueueStart,
			TSmessageQueueStop:TSmessageQueueStop,
			TSmessageQueueClear:TSmessageQueueClear,
			TScoreList:TScoreList,
			TAppList:TAppList,
			TMenuList:TMenuList,
			deleteInstance:deleteInstance,
			put:put,
			deleteMenu:deleteMenu,
			TMenuListForTree:TMenuListForTree,
			currentFlowStateQuery:currentFlowStateQuery,
			bvCurrentFlowStateQuery:bvCurrentFlowStateQuery,
      getMachineInfo:getMachineInfo,
      getLineInfo:getLineInfo,
      getHostComputerInfo:getHostComputerInfo,
      getApplianceInfo:getApplianceInfo,
      getMqMessages:getMqMessages,
      getInterStateMessage:getInterStateMessage,
      getTimallflowDisplay:getTimallflowDisplay,
      getChangeHistoryMessage:getChangeHistoryMessage,
      getRun:getRun,
      getNJ:getNJ,
      getMQMessage:getMQMessage,
      getDG:getDG,
      getReport:getReport,
      b:b,
      getErrMessage:getErrMessage,
      getSpareHostComputerMessages:getSpareHostComputerMessages,
      getSpareApplianceMessages:getSpareApplianceMessages,
     /* getSpareInterStateMessages:getSpareInterStateMessages,*/
      getDisasterTime:getDisasterTime,
      getPlanTime:getPlanTime,
      getSwitchInfo:getSwitchInfo,
      getProcessingQuery:getProcessingQuery,
      getHostComputerMessage_new:getHostComputerMessage_new,
      getApplianceMessage_new:getApplianceMessage_new,
      getInterStateMessage_new:getInterStateMessage_new,
      getAnlarmState:getAnlarmState,
      getSpareHostComputerMessage_new:getSpareHostComputerMessage_new,
      getSpareApplianceMessage_new:getSpareApplianceMessage_new,
      getSpareInterStateMessage_new:getSpareInterStateMessage_new,
      getSpareAnlarmState:getSpareAnlarmState,
      getDataBaseCopyState:getDataBaseCopyState,
      getDisasterInterStateMessage:getDisasterInterStateMessage,
      getDisasterGiveAnlarmState:getDisasterGiveAnlarmState,

      getOperationsQuery:getOperationsQuery,
      getOperationsDelete:getOperationsDelete,
      getOperationsAdd:getOperationsAdd,
      getOperationsTab:getOperationsTab,

      getFriminfoOuery:getFriminfoOuery,
      getOggConfigInfo:getOggConfigInfo,

      getFuletextsearch:getFuletextsearch,
      getSearch:getSearch,
      getEchartsData:getEchartsData,
      getInstance:getInstance,
      getInstancJournal:getInstancJournal,
      getInstancToConfigure:getInstancToConfigure,
      getInstancEcharts:getInstancEcharts,
      getHostInfo:getHostInfo,
      getMonitorMe:getMonitorMe,
      getProvRegionInfo:getProvRegionInfo,
      getOpTimeInfo:getOpTimeInfo,
      getmachinesMessageInfo:getmachinesMessageInfo,
      getInstancesInfoMe:getInstancesInfoMe,
      queryHostInfo:queryHostInfo,
      getLogDetails:getLogDetails,
      getDelInstance:getDelInstance,
      getComponents:getComponents,
      getInstanceType:getInstanceType,
      getAddInstance:getAddInstance,
      getUpInstance:getUpInstance,
      getFileDataCopyState:getFileDataCopyState,
      getMapInfo:getMapInfo,
      getHistorySwitch:getHistorySwitch,
      getInstanceRunState:getInstanceRunState
		};
    //实例删除
    function getDelInstance(params){
      return Restangular.all('manage/instance/delete').post(params);
    }
    //实例新增
    function getAddInstance(params){
      return Restangular.all('/manage/instance/add').post(params);
    }
    //实例新增
    function getUpInstance(params){
      return Restangular.all('/manage/instance/update').post(params);
    }
    //实例组件
    function getComponents(params){
      return Restangular.all('/manage/common/getComponents').post(params);
    }
    //实例类型
    function getInstanceType(params){
      return Restangular.all('/manage/common/getInstanceType').post(params);
    }

		//get请求
		function get(url,parmas){
			return Restangular.one(url).get(parmas)
		}
		//post请求
		function post(url,parmas){
			return Restangular.all(url).post(parmas);
		}
		//天猫主中心负载均衡列表查询
		function TMbusiLoadBalanceList(parmas){
			return Restangular.one('areas/tmallMain/apps/bizLoadBalance/instances').get(parmas);
		}
		//天猫主中心实例启动
		function TMinstanceStart(parmas){
			return Restangular.all('areas/tmallMain').one('instance',parmas.instance).all('commands/start').post();
		}
		//天猫主中心实例停止
		function TMinstanceStop(parmas){
			return Restangular.all('areas/tmallMain').one('instance',parmas.instance).all('commands/stop').post();
		}
		//天猫主中心咪咕前置列表查询
		function TMocfrontList(parmas){
			return Restangular.one('areas/tmallMain/apps/oc-front/instances').get(parmas);
		}
		//天猫主中心省http前置列表查询
		function TMhttpfrontList(parmas){
			return Restangular.one('areas/tmallMain/apps/oc-crm-front-http/instances').get(parmas);
		}
		//天猫主中心省dcc前置列表查询
		function TMdccfrontList(parmas){
			return Restangular.one('areas/tmallMain/apps/oc-crm-front-dcc/instances').get(parmas);
		}
		//天猫主中心实例指标查询
		function TMinstanceIndex(parmas){
			return Restangular.one('areas/tmall').one('app',parmas.appid).one('method',parmas.method).one('kpi').get({timeSize:parmas.timeSize,instance:parmas.instance});
		}

		//天猫主中心消息队列列表查询
		function TMmessageQueueList(parmas){
			return Restangular.one('areas/tmall/apps/mq/queues').get(parmas);
		}
		//天猫主中心消息队列指标查询
		function TMmessageQueueIndex(parmas){
			return Restangular.one('areas/tmall').one('instance',parmas.instance).one('kpi').get({timeSize:parmas.timeSize,queueName:parmas.queueName});
		}
		//天猫主中心消息队列启动
		function TMmessageQueueStart(parmas){
			return Restangular.all('areas/tmallMain').one('queue',parmas.queue).all('commands/start').post();
		}
		//天猫主中心消息队列停止
		function TMmessageQueueStop(parmas){
			return Restangular.all('areas/tmallMain').one('queue',parmas.queue).all('commands/stop').post();
		}
		//天猫主中心消息队列清空
		function TMmessageQueueClear(parmas){
			return Restangular.all('areas/tmallMain').one('queue',parmas.queue).all('commands/clear').post();
		}
		//天猫主中心交易核心列表查询
		function TMcoreList(param){
			return Restangular.one('areas/tmall/apps/'+param.appName+'/instances').get(param);
		}
		//天猫备中心负载均衡列表查询
		function TSbusiLoadBalanceList(parmas){
			return Restangular.one('areas/tmallSpare/apps/bizLoadBalance/instances').get(parmas);
		}
		//天猫备中心实例启动
		function TSinstanceStart(parmas){
			return Restangular.all('areas/tmallSpare').one('instance',parmas.instance).all('commands/start').post();
		}
		//天猫备中心实例停止
		function TSinstanceStop(parmas){
			return Restangular.all('areas/tmallSpare').one('instance',parmas.instance).all('commands/stop').post();
		}
		//天猫备中心咪咕前置列表查询
		function TSocfrontList(parmas){
			return Restangular.one('areas/tmallSpare/apps/oc-front/instances').get(parmas);
		}
		//天猫备中心省http前置列表查询
		function TShttpfrontList(parmas){
			return Restangular.one('areas/tmallSpare/apps/oc-crm-front-http/instances').get(parmas);
		}
		//天猫备中心省dcc前置列表查询
		function TSdccfrontList(parmas){
			return Restangular.one('areas/tmallSpare/apps/oc-crm-front-dcc/instances').get(parmas);
		}
		//天猫备中心实例指标查询
		function TSinstanceIndex(parmas){
			return Restangular.one('areas/tmallSpare').one('app',parmas.appid).one('instance',parmas.instance).one('method',parmas.method).one('kpi').get({timeSize:parmas.timeSize});
		}
		//天猫备中心消息队列列表查询
		function TSmessageQueueList(parmas){
			return Restangular.one('areas/tmallSpare/apps/mq/queues').get(parmas);
		}
		//天猫备中心消息队列指标查询
		function TSmessageQueueIndex(parmas){
			return Restangular.one('areas/tmallSpare').one('app',parmas.appid).one('queue',parmas.queue).one('kpi').post();
		}
		//天猫备中心消息队列启动
		function TSmessageQueueStart(parmas){
			return Restangular.all('areas/tmallSpare').one('queue',parmas.queue).all('commands/start').post();
		}
		//天猫备中心消息队列停止
		function TSmessageQueueStop(parmas){
			return Restangular.all('areas/tmallSpare').one('queue',parmas.queue).all('commands/stop').post();
		}
		//天猫备中心消息队列清空
		function TSmessageQueueClear(parmas){
			return Restangular.all('areas/tmallSpare').one('queue',parmas.queue).all('commands/clear').post();
		}
		//天猫备中心交易核心列表查询
		function TScoreList(parmas){
			return Restangular.one('areas/tmallSpare/apps/oc-core/instances').get(parmas);
		}

		//应用列表查询
		function TAppList() {
			return Restangular.one('areas/findAppList').get();

		}

		function TMenuList() {
			return Restangular.one('areas/findMenuList').get();

		}
		function TMenuListForTree() {
			return Restangular.one('areas/MenuListForTree').get();

		}
		function deleteInstance(instanceId) {
			return Restangular.one('instances/'+instanceId+'/delete').remove();

		}
		function put(url,data){
			return Restangular.one(url).put(data);
		}

		function deleteMenu(id) {
			return Restangular.one('areas/'+id+'/delete').remove();

		}
		// <----------------------------------容灾控制中心-------------------------------------->
    function bvCurrentFlowStateQuery(parmas){
      return Restangular.one('/status/flowStatus').post(parmas);//当前流量查询--------
    }
    //系统运行状态机器数据查询
    function getMachineInfo(parmas){
      return Restangular.all('/bigViews/queryMachineInfo').post(parmas);
    }
    //系统运行状态线数据查询
    function getLineInfo(parmas){
      return Restangular.all('/bigViews/arrow/state').post(parmas);
    }
    //主中心主机信息
    function getHostComputerInfo(parmas){
      return Restangular.all('disaster/operating/nj/checkHost').post(parmas);
    }
    //主中心应用 信息
    function getApplianceInfo(parmas){
      return Restangular.all('disaster/operating/nj/checkApp').post(parmas);
    }
    //MQ消息
    function getMqMessages(parmas){
      return Restangular.all('/operating/mqExhibit').post(parmas);
    }
    //主中心网络状态
    function getInterStateMessage(parmas){
      return Restangular.all('disaster/operating/nj/checkNet').post(parmas);
    }
    //当前流量展现
    function getTimallflowDisplay(parmas){
      return Restangular.all('flowSwitch/stateQuery').post(parmas);
    }
    //切换历史展现
    function getChangeHistoryMessage(parmas){
      return Restangular.all('disaster/operating/flowSwitchHistory').post(parmas);
    }
    /*运行日志*/
    function getRun(parmas){
      return Restangular.all('/inspection/polling/query').post(parmas);
    }
    /*南基信息*/
    function getNJ(parmas){
      return Restangular.all('/monitor/nj/state').post(parmas);
    }
    /*MQ信息*/
    function getMQMessage(parmas){
      return Restangular.all('/monitor/mqExhibit').post(parmas);
    }
    /*东莞信息*/
    function getDG(parmas){
      return Restangular.all('/monitor/dg/state').post(parmas);
    }
    /*预估*/
    function getReport(parmas) {
      return Restangular.all('/areas/tmall/download/reportInfomation').post(parmas);
    }
    function b(parmas){
      return Restangular.all('/areas/tmall/download/dataflowCons').post(parmas);
    }
    /* 错误信息*/
    function getErrMessage(parmas){
      return Restangular.all('/inspection/array/query').post(parmas);
    }
    /*备中心 主机检查*/
    function getSpareHostComputerMessages(parmas){
      return Restangular.all('disaster/operating/dg/checkHost').post(parmas);
    }
    //备中心应用
    function getSpareApplianceMessages(parmas){
      return Restangular.all('disaster/operating/dg/checkApp').post(parmas);
    }
    //容灾评估时间 计划外切换
    function getDisasterTime(){
      return Restangular.all('/areas/tmall/disasterAssess/disasterTime').post();
    }
    //容灾评估时间2 计划内切换
    function getPlanTime(){
      return Restangular.all('/areas/tmall/disasterAssess/planTime').post();
    }
    //容灾评估详情
    function getSwitchInfo(){
      return Restangular.all('/areas/tmall/disasterAssess/switchInfo').post();
    }
    //查询
    function currentFlowStateQuery(parmas){
      return Restangular.one('/flowSwitch/stateQuery').get(parmas);
    }
    //批处理
    function getProcessingQuery(parmas){
      return Restangular.all('/om/batchProcessingQuery').post(parmas);
    }

    /*容灾操作新*/
    //主中心 主机信息查询
    function getHostComputerMessage_new(parmas){
      return Restangular.all('disaster/operating/nj/hostComputer').post(parmas);
    }
    //主中心 应用信息查询
    function getApplianceMessage_new(parmas){
      return Restangular.all('disaster/operating/nj/applianceMessage').post(parmas);
    }
    //主中心 网络
    function getInterStateMessage_new(parmas){
      return Restangular.all('disaster/operating/nj/checkNet').post(parmas);
    }
    //主中心 告警状态
    function getAnlarmState(parmas){
      return Restangular.all('disaster/operating/nj/AnlarmState').post(parmas);
    }
    //备中心 主机
    function getSpareHostComputerMessage_new(parmas){
      return Restangular.all('disaster/operating/dg/hostComputer').post(parmas);
    }
    //备中心 应用
    function getSpareApplianceMessage_new(parmas){
      return Restangular.all('disaster/operating/dg/applianceMessage').post(parmas);
    }
    //备中心 网络状态disaster/operating/dg/checkNetNew
    function getSpareInterStateMessage_new(parmas){
      return Restangular.all('disaster/operating/dg/checkNet').post(parmas);
    }
    //备中心 告警状态disaster/operating/dg/AnlarmState
    function getSpareAnlarmState(parmas){
      return Restangular.all('disaster/operating/dg/AnlarmState').post(parmas);
    }
    //容灾状态 数据库复制状态disaster/status/dataStatus
    function getDataBaseCopyState(parmas){
      return Restangular.all('disaster/status/dataStatus').post(parmas);
    }
    //容灾状态 文件数据复制状态
    function getFileDataCopyState(parmas){
      return Restangular.all('disaster/status/fileStatus').post(parmas);
    }
    //容灾状态 网络状态
    function getDisasterInterStateMessage(parmas){
      return Restangular.all('disaster/status/internetStatus').post(parmas);
    }
    //容灾状态 告警状态
    function getDisasterGiveAnlarmState(parmas){
      return Restangular.all('disaster/status/alarmStatus').post(parmas);
    }
    	// <----------------------------------容灾运维管理-------------------------------------->
   //负载均衡运维查询
   function getOperationsQuery(){
      return Restangular.all('/operation/array/queryConfig').post();
    }
      //负载均衡运维添加
   function getOperationsAdd(){
      return Restangular.all('/operation/array/saveConfig').post();
    }
      //负载均衡运维删除
   function getOperationsDelete(){
      return Restangular.all('/operation/array/deleteConfig').post();
    }
     //负载均衡运维按钮切换传参
   function getOperationsTab(){
      return Restangular.all('/operation/array/switchover').post();
    }
    //数据同步维护
     function getFriminfoOuery(){
      return Restangular.all('/oggProcess/checkAllProcessStatus').post();
    }
    //ogg配置
   function getOggConfigInfo(parmas){
      return Restangular.all('operation/ogg/queryConfig').post(parmas);
   }
    //所有主机
    function getFuletextsearch(parmas){
      return Restangular.all('manage/host/queryAll').post(parmas);
    }
    //单个主机信息
    function getSearch(parmas){
      return Restangular.all('manage/host/query').post(parmas);
    }
    //单个主机Echarts信息
    function getEchartsData(parmas){
      return Restangular.all('manage/host/echartsData').post(parmas);
    }
    //单个实例信息查询
    function getInstance (parmas){
      return Restangular.all('manage/instance/query').post(parmas);
    }
    //单个实例日志信息查询
    function getInstancJournal (parmas){
      return Restangular.all('dr/opermon/instance/logfile/search').post(parmas);
    }
    //志信息查询
    function getLogDetails (parmas){
      return Restangular.all('dr/opermon/instance/logfile/logDetails').post(parmas);
    }
    //单个实例配置信息查询
    function getInstancToConfigure (parmas){
      return Restangular.all('manage/config/queryAll').post(parmas);
    }
    //单个实例echarts
    function getInstancEcharts (parmas){
      return Restangular.all('manage/instance/echarts').post(parmas);
    }
    //主机新增配置
    function getHostInfo(parmas){
      return Restangular.all('/operation/mainframe/queryMessage').post(parmas);
    }
    //主机初始化查询
    function queryHostInfo(parmas){
      return Restangular.all('/operation/mainframe/queryMessage').post(parmas);
    }
   //监控阈值
    function getMonitorMe(parmas){
      return Restangular.all('/operation/monitoring/queryConfig').post(parmas);
    }
    //省大区配置
    function getProvRegionInfo(parmas){
      return Restangular.all('/operation/province/queryConfig').post(parmas);
    }
    //操作记录信息
    function getOpTimeInfo(parmas){
      return Restangular.all('/operation/operationNote/queryConfig').post(parmas);
    }
    //机器信息
     function getmachinesMessageInfo(parmas){
      return Restangular.all('/manage/machine/query').post(parmas);
    }
   //实例信息
    function getInstancesInfoMe(parmas){
      return Restangular.all('/operation/Instance/queryMessage').post(parmas);
    }
       //地图信息
    function getMapInfo(parmas){
      return Restangular.all('/monitor/searchMap').post(parmas);
    }
      //历史切换记录
    function getHistorySwitch(parmas){
      return Restangular.all('/areas/tmall/disasterAssess/querySwitchStatusHistory').post(parmas);
    }
     //主机应用运行状态
    function getInstanceRunState(parmas){
      return Restangular.all('/disaster/status/instanceRunState').post(parmas);
    }

}

	httpServe.$inject=['Restangular']



})();
