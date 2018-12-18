'use strict';
var express = require('express');
var path = require('path');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var fixtures = require('./fixtures');
var rzcz = require('./rzcz');
var rzjk = require('./rzjk');
var rzpg = require('./rzpg');
var plcl = require('./plcl');
var rzqh = require('./rzqh');
var fzyw = require('./fzyw');
var pzb = require('./pzb');
var jkyz = require('./jkyz');
var zjcz = require('./zjcz');
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);

var res_lxd = require('./response/res_lxd');
var api_lxd = require('./request/api_lxd');
app.set('port', process.env.PORT || 8888);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
//app.use(cookieParser());
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
//app.use(cookieParser());
//监听端口是否启动
http.listen(app.get('port'), function () {
  console.log('server listening on port' + app.get('port'));
});

io.sockets.on('connection', function (socketIO){
//  //客户端接收数据
//  socketIO.on('fromWebClient',function(){
//
//  });
//  // 客户端断开连接
//  socketIO.on('disconnect',function(){
//    console.log('DISCONNECTED FROM CLIENT');
//  });
  // 向客户端发送数据
  var count=0;
  setInterval(function(){
    if(count === 0){
      socketIO.emit('journalData',zjcz.journalData1);
      socketIO.emit('state',{result:'success',data:{"currentState":"OGG双向切换"}});
      socketIO.emit('bvSystemState',fixtures.systemState1);
      socketIO.emit('hostEcharts',zjcz.echartsData1);
      socketIO.emit('bvRunningTargetFlowState',fixtures.flowState1);
      socketIO.emit('bvRunningInformation',fixtures.notice1);
      socketIO.emit('switchBvInformation',rzqh.notice1);
      socketIO.emit('bvDataSyncState',fixtures.dataSyncState);
      socketIO.emit('switchBvCurrentStep',{state:'success',data:{"status":"00"}});
      socketIO.emit('switchBvCurrentStep',{state:'success',data:{"status":"05"}});
      socketIO.emit('switchBvCurrentStep',{state:'success',data:{"status":"10"}});
      count++;

  }else if(count === 1){
      socketIO.emit('journalData',zjcz.journalData2);
      socketIO.emit('hostEcharts',zjcz.echartsData2);
    socketIO.emit('state',{state:'success',data:{"currentState":"正在进行流量切换","lastState":"OGG双向切换完毕"}});
    socketIO.emit('switchBvCurrentStep',{state:'success',data:{"status":"15"}});
    socketIO.emit('switchBvTargetFlowState',rzqh.flowState4);
    //socketIO.emit('bvSystemState',fixtures.systemState2);
    //socketIO.emit('bvRunningTargetFlowState',fixtures.flowState2);
    socketIO.emit('bvRunningInformation',fixtures.notice2);
    socketIO.emit('bvRunningInformation',fixtures.notice3);
    socketIO.emit('switchBvInformation',rzqh.notice2);
    socketIO.emit('switchBvInformation',rzqh.notice3);
    socketIO.emit('machineWarnState',rzqh.machineWarnState);
    socketIO.emit('bvMachineState',fixtures.machineWarnState);
    count++;
  }else if(count === 2){
      socketIO.emit('journalData',zjcz.journalData3);
      socketIO.emit('hostEcharts',zjcz.echartsData3);
    socketIO.emit('state',{state:'success',data:{"currentState":"正在进行站点切换","lastState":"流量切换完毕"}});
    //socketIO.emit('bvRunningTargetFlowState',fixtures.flowState2);
    socketIO.emit('switchBvCurrentStep',{state:'success',data:{"status":"20"}});
    //socketIO.emit('bvSystemState',fixtures.systemState3);
    socketIO.emit('bvRunningInformation',fixtures.notice4);
    socketIO.emit('bvRunningInformation',fixtures.notice5);
    socketIO.emit('bvRunningInformation',fixtures.notice6);
    socketIO.emit('switchBvInformation',rzqh.notice4);
    socketIO.emit('switchBvInformation',rzqh.notice5);
    socketIO.emit('switchBvInformation',rzqh.notice6);
    count++;
  }else if(count === 3){
    socketIO.emit('journalData',zjcz.journalData4);
    socketIO.emit('hostEcharts',zjcz.echartsData4);
    socketIO.emit('state',{state:'success',data:{"currentState":"站点切换完成"}});
    socketIO.emit('switchBvCurrentStep',{state:'success',data:{"status":"25"}});
    socketIO.emit('bvRunningTargetFlowState',fixtures.flowState2);
    socketIO.emit('bvRunningInformation',fixtures.notice7);
    socketIO.emit('switchBvInformation',rzqh.notice7);
    count++;
  }/*else if(count === 4){
    socketIO.emit('state',{state:'success',data:{"currentState":"站点切换完成"}});
    socketIO.emit('switchBvCurrentStep',{state:'success',data:{"status":"00"}});
    socketIO.emit('bvRunningTargetFlowState',fixtures.flowState2);
    socketIO.emit('bvRunningInformation',fixtures.notice7);
    socketIO.emit('switchBvInformation',rzqh.notice1);
    count++;
  }
  else if(count === 5){
    socketIO.emit('state',{state:'success',data:{"currentState":"切换预案"}});
    socketIO.emit('switchBvCurrentStep',{state:'success',data:{"status":"05"}});
    socketIO.emit('bvRunningTargetFlowState',fixtures.flowState2);
    socketIO.emit('bvRunningInformation',fixtures.notice7);
    socketIO.emit('switchBvInformation',rzqh.notice7);
    count++;
  }*/
},4000);


});
//用户登录/disaster/userAuthority
app.post("/disaster/userLogin", function(req, res) {
  res.send({state:'SUCCSE',data:{staffName:'李小云',loginUser:'1839900236',safeMode:'1',expireDate:1999999999999,flag:'1'},desc:'登录成功！'});
});
//授权登录
app.post("/disaster/userAuthority", function(req, res) {
 res.send({state:'success',data:{staffName:'李小云2',loginUser:'1839900236',safeMode:'1',expireDate:100000,flag:'0'},desc:'登录成功！'});
  //res.send({state:'success',data:''});
});
//用户登出
app.post("/disaster/userSignOut", function(req, res) {
  res.send({state:'success',data:'00',desc:'登出成功！'});
});
//用户注册
app.post("/disaster/addUser", function(req, res) {
  res.send({result:'0',resultDesc:'注册成功！'});
});
//用户修改密码
app.post("/disaster/modifyUserPassword", function(req, res) {
  res.send({result:'0',resultDesc:'修改成功！'});
});
//用户查询
app.post("/disaster/queryUserInfo", function(req, res) {
  res.send(plcl.userMessage);
});
//用户修改
app.post("/disaster/modifyUserInfo", function(req, res) {
  res.send({result:'0',resultDesc:'修改成功！'});
});
//查询所有部门
app.post("/disaster/queryDepartment", function(req, res) {
  res.send(plcl.departmentMsg);
});
//查询所有工作组
app.post("/disaster/queryWorkGroup", function(req, res) {
  res.send(plcl.workGroup);
});
//删除用户
app.post("/disaster/delUserInfo", function(req, res) {
  res.send({result:'0',resultDesc:'删除成功！'});
});
app.post("/manage/config/add", function(req, res) {
  res.send({state:'success',desc:'新增成功'});
});
app.post("/manage/host/getIP", function(req, res) {
  res.send({result:'success',data:'localhost:8888'});
});
app.post("/manage/file/upload", function(req, res) {
  setTimeout(function(){
    res.send({state:'success',desc:'新增成功'});
  },2000)

});
app.post("/manage/instance/stop", function(req, res) {
  res.send({state:'success'});
});
app.post("/manage/instance/start", function(req, res) {
  res.send({state:'success'});
});
app.post("/manage/instance/startAll", function(req, res) {
  res.send({state:'success'});
});
app.post("/manage/instance/stopAll", function(req, res) {
  res.send({state:'success'});
});
app.post("/manage/configItem/update", function(req, res) {
  res.send({state:'success',desc:'修改成功!'});
});
app.post("/manage/file/show", function(req, res) {
  res.send(zjcz.filer);
});
app.post("/manage/config/update", function(req, res) {
  res.send({state:'success',desc:'修改成功！'});
});
app.post("/manage/config/delete", function(req, res) {
  res.send({state:'success',desc:'删除成功！'});
});
app.post("/TBMSP/login/query", function(req, res) {
  res.send(fixtures.user);
});
app.post("/tradingBP/user/login", function(req, res) {
  res.send(fixtures.user);
});
app.post('/tradingBP/commonProblems/problemsQuery',function(req, res){
  res.send(fixtures.problems);
});
app.post('/tradingBP/commonProblems/problemsAdd',function(req,res){
  res.send(fixtures.problemsAdd);
})
app.get('/tradingBP/commonProblems/problemsLogicDel',function(req,res){
  res.send(fixtures.problemsDel);
})
app.post('/areas/tmallMain/instance/ss/commands/start',function(req,res){
  res.send(fixtures.problemsDel);
})
app.post('/areas/menu/getAllmenus',function(req,res){
  res.send(fixtures.menuAll);
})
app.get('/areas/tmallMain/apps/bizLoadBalance/instances',function(req,res){
  res.send(fixtures.balance);
})
app.get('/areas/tmallMain/apps/oc-front/instances',function(req,res){
  res.send(fixtures.front);
})
app.get('/areas/tmallMain/apps/oc-crm-front-http/instances',function(req,res){
  res.send(fixtures.front);
})
app.get('/areas/tmallMain/apps/oc-crm-front-dcc/instances',function(req,res){
  res.send(fixtures.front);
})
app.get('/areas/tmallMain/apps/mq/queues',function(req,res){
  if(req.query.goPage==1){
    res.send(fixtures.queue1)
  }else if(req.query.goPage==2){
    res.send(fixtures.queue2)
  }else if(req.query.goPage==3){
    res.send(fixtures.queue3)
  }
})
app.get('/areas/tmallMain/apps/oc-core/instances',function(req,res){
  res.send(fixtures.trade);
})
app.get('/areas/tmallSpare/apps/bizLoadBalance/instances',function(req,res){
  res.send(fixtures.balance);
})
app.get('/areas/tmallSpare/apps/oc-front/instances',function(req,res){
  res.send(fixtures.front);
})
app.get('/areas/tmallSpare/apps/oc-crm-front-http/instances',function(req,res){
  res.send(fixtures.front);
})
app.get('/areas/tmallSpare/apps/oc-crm-front-dcc/instances',function(req,res){
  res.send(fixtures.front);
})
app.get('/areas/tmallSpare/apps/mq/queues',function(req,res){
  if(req.query.goPage==1){
    res.send(fixtures.queue1)
  }else if(req.query.goPage==2){
    res.send(fixtures.queue2)
  }else if(req.query.goPage==3){
    res.send(fixtures.queue3)
  }
})
app.get('/areas/tmallSpare/apps/core/instances',function(req,res){
  res.send(fixtures.trade);
})
app.get('/areas/tmallBusiness/hostBackup',function(req,res){
  res.send(fixtures.region);
})
app.post('/areas/tmall/runningStatus/machineInfo',function(req,res){
  res.send(fixtures.machineInfo);
})
app.post('/areas/tmall/runningStatus/lineInfo',function(req,res){
  res.send(fixtures.lineInfo);
})
app.post('/flowSwitch/stateQuery',function(req,res){//容灾切换  流量切换qiu------
  res.send(rzqh.flowState1);
})
app.post('/areas/tmall/download/hostComputer',function(req,res){
  res.send(fixtures.hostComputerMessages);
})
app.post('/areas/tmall/download/applianceMessage',function(req,res){
  res.send(fixtures.applianceMessages);
})
app.post('/areas/tmall/download/MQmessgeExhibit',function(req,res){
  res.send(fixtures.mqMessages);
})
app.post('/areas/tmall/download/interState',function(req,res){
  res.send(fixtures.interStateMessages);
})
app.post('/areas/tmall/download/ProvinceColony',function(req,res){
  res.send(fixtures.provinceColonyMessages);
})
app.post('/areas/tmall/download/colonyInfo',function(req,res){
  res.send({result:'success',message:'更改成功'});
})
app.post('/areas/tmall/download/dataflowCon',function(req,res){
  res.send(fixtures.dataflows);
})
app.post('/areas/tmall/download/dataflowCons',function(req,res){
  res.send({result:'success',message:'切换成功'});
})
app.post('/areas/tmall/download/mycompare',function(req,res){
  res.send(fixtures.mystatus);
})
app.post('/areas/tmall/download/batchExe',function(req,res){
  res.send(fixtures.flowMessage);
})
app.post('/areas/tmall/download/battoshow',function(req,res){
  res.send(fixtures.batToShow);
})
app.post('/areas/tmall/download/submit',function(req,res){
  res.send({result:'success'});
})

/*等级规范*/
app.post('/areas/tmall/download/gradeInfomation',function(req,res){
  res.send(fixtures.gradeMessage);
})
/*运行日志*/
app.post('/areas/tmall/download/runInfomation',function(req,res){
  res.send(fixtures.runLog);
})
/*南基*/    //最新
app.post('/monitor/nj/state',function(req,res){
  res.send(rzjk.NJ);
})
/*历史切换记录*/
app.post('/areas/tmall/disasterAssess/querySwitchStatusHistory',function(req,res){
  res.send(rzjk.historySwitch);
})

/*东莞文件*/   //最新
app.post('/monitor/dg/state',function(req,res){
  res.send(rzjk.DG);
})
/*报告预估*/
app.post('/areas/tmall/download/reportInfomation',function(req,res){
  res.send(fixtures.Report);
})
/*MQ信息*/    //最新
app.post('/monitor/mqExhibit',function(req,res){
  res.send(rzjk.MQMessage);
})
//错误详情
app.post('/monitor/alarmDetails',function(req,res){
  res.send(rzjk.errMessage);
})
//日志
app.post('/monitor/searchSystemLog',function(req,res){
  res.send(rzjk.runLog);
})
//地图
app.post('/monitor/searchMap',function(req,res){
  res.send(rzjk.regionalInfo);
})
app.post('/areas/tmall/download/TmallBatchProcessing',function(req,res){
  res.send(fixtures.batchMessage);
})
app.post('/areas/tmall/download/ipAdresses',function(req,res){
  res.send(fixtures.treatMessage);
})
app.post('/areas/tmall/download/batchExecution',function(req,res){
  res.send(fixtures.treatMessage);
})
app.post('/areas/tmall/download/batchExecutions',function(req,res){
  res.send(fixtures.messages);
})
app.post('/areas/tmall/download/saveBatch',function(req,res){
  res.send({result:'success'});
})
app.post('/areas/tmall/download/deleteDate',function(req,res){
  res.send({result:'success',message:'删除成功'});
})
app.post('/areas/tmall/download/amendBatch',function(req,res){
  res.send({result:'success',message:'修改成功'});
})
app.post('/areas/tmall/download/errInfomation',function(req,res){
  res.send(rzjk.errMessage);
})
app.post('/areas/tmall/download/spareInterState',function(req,res){
  res.send(rzcz.spareInterStateMessages);
})
app.post('/areas/tmall/download/spareApplianceMessage',function(req,res){
  res.send(rzcz.spareApplianceMessages);
})
app.post('/areas/tmall/download/spareInterState',function(req,res){
  res.send(rzcz.spareInterStateMessages);
})
app.post('/areas/tmall/download/spareHostComputer',function(req,res){
  res.send(rzcz.spareHostComputerMessages);
})
//批量处理  查询接口
app.post('/om/batchProcessingQuery',function(req,res){
  res.send(plcl.batchMessage);
})
//批量处理管理  查询接口
app.post('/om/batchProcessing/configQuery',function(req,res){
  res.send(plcl.treatMessage);
})
//批量处理管理  执行批处理接口
/*app.post('/om/batchProcessing/execution',function(req,res){
  res.send(plcl.execution);
})*/
//批量处理管理  新增配置
app.post('/om/batchProcessing/saveConfig',function(req,res){
  res.send({state:'success',desc:'新增成功！'});
})
//批量处理管理  修改
app.post('/om/batchProcessing/updateConfig',function(req,res){
  res.send({state:'success',desc:'修改成功！'});
})
//批量处理管理  删除
app.post('/om/batchProcessing/deleteConfig',function(req,res){
  res.send({state:'success',desc:'删除成功！'});
})
//批处理管理 查询
app.post('/om/batchProcessing/configQuery',function(req,res){
  res.send(plcl.batchMessage);
})
//执行批处理
app.post('/om/batchProcessing/execution',function(req,res){
  res.send(plcl.execution);
})
//新增配置
app.post('/om/batchProcessing/saveConfig',function(req,res){
  res.send(plcl.saveConfig);
})
//修改
app.post('/om/batchProcessing/updateConfig',function(req,res){
  res.send(plcl.updateConfig);
})
//删除
app.post('/om/batchProcessing/deleteConfig',function(req,res){
  res.send(plcl.deleteConfig);

})

//容灾评估

//容灾评估时间 计划外切换
app.post('/areas/tmall/disasterAssess/disasterTime',function(req,res){
  res.send(rzpg.disasterTime);
})
//容灾评估时间2 计划内切换
app.post('/areas/tmall/disasterAssess/planTime',function(req,res){
  res.send(rzpg.planTime);
})
//容灾评估详情
app.post('/areas/tmall/disasterAssess/switchInfo',function(req,res){
  res.send(rzpg.switchInfo);
})

//容灾操作

// 当前流量查询
app.get('/flowSwitch/stateQuery',function (req,res){
  res.send(rzcz.flowMessage);
})
//主中心 主机检查
app.post('/disaster/operating/nj/checkHost',function(req,res){
  res.send(rzcz.hostComputerMessages);
})
//主中心 应用检查
app.post('/disaster/operating/nj/checkApp',function(req,res){
  res.send(rzcz.applianceMessages);
})
//MQ消息
app.post('/disaster/operating/mqExhibit',function(req,res){
  res.send(rzcz.mqMessages);
})
//备中心 主机检查
app.post('/disaster/operating/dg/checkHost',function(req,res){
  res.send(rzcz.spareHostComputerMessages);
})
//数据比对
app.post('/areas/tmall/download/mycompare',function(req,res){
  res.send(rzcz.mystatus);
})
//切换历史展现
app.post('/disaster/operating/flowSwitchHistory',function (req,res){
  res.send(rzcz.batToShow);
})
//确认切换
app.post('/disaster/operating/flowSwitch',function(req,res){
  res.send({result:'success',data:'切换成功'});
})
//运行状态现   当前大区查询
app.get('/bigViews/areas/flowStateQuery',function (req,res){
  res.send(fixtures.flowState4);
})
/*app.get('/bigViews/areas/flowStateQuery',function (req,res){
  res.send(fixtures.flowState1);
})*/
app.post('/bigViews/queryMachineInfo',function (req,res){
  res.send(fixtures.machineInfo);
})
app.post('/bigViews/arrow/state',function (req,res){
  res.send(fixtures.lineInfo);
})

/*容灾操作新*/
//主中心 主机检查
app.post('/disaster/operating/nj/hostComputer',function(req,res){
  res.send(rzcz.hostComputerMessage_new);
})
//主中心 应用检查
app.post('/disaster/operating/nj/applianceMessage',function(req,res){
  res.send(rzcz.applianceMessage_new);
})
//主中心网络
app.post('/disaster/operating/nj/checkNet',function(req,res){
  res.send(rzcz.interStateMessage_new);
})
//主中心 告警状态spareHostComputerMessage_new
app.post('/disaster/operating/nj/AnlarmState',function(req,res){
  res.send(rzcz.giveAnlarmState);
})

//备中心 主机信息
app.post('/disaster/operating/dg/hostComputer',function(req,res){
  res.send(rzcz.spareHostComputerMessage_new);
})
//备中心 应用
app.post('/disaster/operating/dg/applianceMessage',function(req,res){
  res.send(rzcz.spareApplianceMessage_new);
})
//备中心 网络状态
app.post('/disaster/operating/dg/checkNet',function(req,res){
  res.send(rzcz.spareInterStateMessage_new);
})
//备中心 告警状态
app.post('/disaster/operating/dg/AnlarmState',function(req,res){
  res.send(rzcz.spareGiveAnlarmState);
})
//容灾状态 数据库复制状态
app.post('/disaster/status/dataStatus',function(req,res){
  res.send(rzcz.dataBaseCopyStateMessage);
})
//容灾状态 文件数据复制状态
app.post('/disaster/status/fileStatus',function(req,res){
  res.send(rzcz.fileDataCopyStateMessage);
})
//容灾状态 网络状态
app.post('/disaster/status/internetStatus',function(req,res){
  res.send(rzcz.disasterInterStateMessage);
})
//容灾状态 告警状态
app.post('/disaster/status/alarmStatus',function(req,res){
  res.send(rzcz.disasterGiveAnlarmState);
})
//主机应用运行状态
app.post('/disaster/status/instanceRunState',function(req,res){
  res.send(rzcz.instance);
})

//容灾操作 切换实施开启反向同步---------------------------容灾操作（新）
app.post('/switch/syncStart',function (req,res){
  res.send(rzqh.synMessage);
})
//容灾操作 当前流量查询
app.post('/status/flowStatus',function (req,res){
  res.send(rzqh.flowState1);
})
//容灾操作 切换实施关闭正向同步---------------------------
app.post('/switch/syncStop',function (req,res){
  res.send(rzqh.synMessage1);
})
//容灾操作 切换实施确认切换
app.post('/flowSwitch/flowSwitch',function (req,res){
  res.send(rzqh.flowSwitchMessage);
})
//容灾操作 确认切换 切换报告
app.post('/switch/switchReport',function (req,res){
  res.send(rzqh.reportMessage);
})
//容灾操作 步骤开启
app.post('/switch/switchStageBegin',function (req,res){
  res.send(rzqh.beginResult);
})
//容灾操作 步骤结束
app.post('/switch/switchStageEnd',function (req,res){
  res.send(rzqh.beginResult);
})
//容灾操作 步骤终止
app.post('/switch/switchStageTermination',function (req,res){
  res.send(rzqh.beginResult);
})
//容灾操作 实施切换
app.post('/switch/flowSwitch',function (req,res){
  res.send(rzqh.switch);
})

//容灾操作 状态检查开始时间
app.post('/switch/switchStageBegin',function(req,res){
  res.send({result:'success',desc:'状态检查开始！'});
})
//容灾操作 状态检查结束时间
app.post('/switch/switchStageEnd',function(req,res){
  res.send({result:'success',desc:'状态检查结束！'});
})
//容灾操作 状态检查结束切换时间
app.post('/switch/switchStageTermination',function(req,res){
  res.send({result:'success',desc:'终止切换成功！'});
})
//负载均衡运维 省份查询
app.post('/status/flowStatusOp',function(req,res){
  res.send(fzyw.optionsinfo);
})
//负载均衡运维 省份添加
app.post('/operation/array/saveConfig',function(req,res){
  res.send({state:'success',desc:'新增成功！'});
})
//负载均衡运维 省份删除
app.post('/operation/array/deleteConfig',function(req,res){
  res.send({state:'success',desc:'删除成功！'});
})
//负载均衡运维 南方基地 东莞中心 其它ip查询
app.post('/array/getUrl',function(req,res){
  res.send(fzyw.switchover);
})
app.post('/array/getUrl2',function(req,res){
  res.send(fzyw.switchover2);
})
//负载均衡运维  下拉按钮查询
app.post('/array/setUrl',function(req,res){
  res.send({state:'success',desc:'请求成功！'});
})
//负载均衡运维  其他ip修改
app.post('/array/setOther',function(req,res){
  res.send({state:'success'});
})
//负载均衡运维 根据后台传东莞查询
app.post('/operation/array/query',function(req,res){
  res.send({state:'success'});
})
//数据同步维护 当前状态查询
app.post('/oggProcess/startOGG',function(req,res){
  res.send({data:"RUNNING",desc:'请求成功！'});
})
//数据同步维护 按钮关闭
app.post('/oggProcess/stopOGG',function(req,res){
  res.send({data:"STOPPED",desc:'请求成功！'});
})
//数据同步维护 按钮启动
app.post('/oggProcess/checkAllProcessStatus',function(req,res){
  res.send(fzyw.friminfo);
})
//数据同步维护 大区查询
app.post('/oggProcess/getRegion',function(req,res){
  res.send(fzyw.friminfo2);
})

//天猫主机初始配置表
app.post('/operation/mainframe/queryMessage',function(req,res){
  res.send(pzb.tmallhostMessages);
})
//天猫主机查询配置表
app.post('/operation/mainframe/queryMessage',function(req,res){
  res.send({result:'success',desc:'查询成功'});
})
//天猫主机新增配置
app.post('/operation/mainframe/saveMessage',function(req,res){
  res.send({state:'success',desc:'新增成功'});
})
//天猫主机新增配置2
app.post('/manage/host/add',function(req,res){
  res.send({state:'success',desc:'新增成功'});
})
//天猫主机修改配置2
app.post('/manage/host/update',function(req,res){
  res.send({state:'success',desc:'修改成功'});
})
//天猫主机修改
app.post('/operation/mainframe/updateMessage',function(req,res){
  res.send({state:'success',desc:'修改成功'});
})
//天猫主机删除操作
app.post('/operation/mainframe/deleteMessage',function(req,res){
  res.send({state:'success',desc:'删除成功'});
})
//ogg配置
app.post('/operation/ogg/queryConfig',function(req,res){
  res.send(rzcz.oggConfigMessage);
})
//ogg配置模糊查询 请求
app.post('/operation/ogg/queryConfig',function(req,res){
  res.send({result:'success',desc:'查询成功'});
})
//ogg新增配置
app.post('/operation/ogg/saveConfig',function(req,res){
  res.send({state:'success',desc:'新增成功'});
})
//删除
app.post('/operation/ogg/deleteConfig',function(req,res){
  res.send({state:'success',desc:'删除成功'});
})
//修改
app.post('/operation/ogg/updateConfig',function(req,res){
  res.send({state:'success',desc:'修改成功'});
})

//监控阈值
app.post('/operation/monitoring/queryConfig',function(req,res){
  res.send(jkyz.monitorThresholdMe);
})
//实例信息
app.post('/operation/Instance/queryMessage',function(req,res){
  res.send(jkyz.instancesInfoMe);
})
//实例信息-新增
app.post('/operation/Instance/saveMessage',function(req,res){
  res.send({state:'success',desc:'增加成功'});
})
//实例信息-删除
app.post('/operation/Instance/deleteMessage',function(req,res){
  res.send({state:'success',desc:'删除成功'});
})
//实例信息-修改
app.post('/operation/Instance/updateMessage',function(req,res){
  res.send({state:'success',desc:'修改成功'});
})
//监控阈值-条件查询
app.post('/operation/monitoring/queryConfig',function(req,res){
  res.send(jkyz.monitorThresholdMe);
})
//监控阈值-新增
app.post('/operation/monitoring/saveConfig',function(req,res){
  res.send({state:'success',desc:'增加成功'});
})
app.post('/operation/monitoring/updateConfig',function(req,res){
  res.send({state:'success',desc:'更新成功'});
})
//监控阈值-删除
app.post('/operation/monitoring/deleteConfig',function(req,res){
  res.send({state:'success',desc:'删除成功'});
})

//主机操作
app.post('/manage/host/queryAll',function(req,res){
  res.send(zjcz.fuletextsearch);
});
//单个主机信息
app.post('/manage/host/query',function(req,res){
  res.send(zjcz.search);
});
//删除单个主机实例信息
app.post('/manage/instance/del',function(req,res){
  res.send({state:'success',desc:'删除成功'});
});
//删除实例
app.post('/manage/instance/delete',function(req,res){
  res.send({state:'success',desc:'删除成功'});
});
//新增单个主机实例信息
app.post('/manage/instance/add',function(req,res){
  res.send({state:'success',desc:'新增成功'});
});
//修改单个主机实例信息
app.post('/manage/instance/update',function(req,res){
  res.send({state:'success',desc:'修改成功'});
});
//单个主机修改配置，查询所处物理机器ID
app.post('/manage/machine/queryAll',function(req,res){
  res.send(zjcz.hostWLId);
});
//单个主机修改配置，确认修改
app.post('/manage/host/update',function(req,res){
  res.send({state:'success',desc:'修改成功'});
});
//查询配置文件信息
app.post('/manage/config/queryAll',function(req,res){
  res.send(zjcz.toConfigureData);
});
//配置文件详细信息
app.post('/manage/configItem/query',function(req,res){
  res.send(zjcz.ItemFile);
});

//实例类型
app.post('/manage/common/getInstanceType',function(req,res){
  res.send(zjcz.InstanceType);
});
//实例类型
app.post('/manage/common/getComponents',function(req,res){
  res.send(zjcz.Components);
});
//单;个主机echarts信息
app.post('/manage/host/echartsData',function(req,res){
  res.send(zjcz.echartsData);
});
//单个实例信息
app.post('/manage/instance/query',function(req,res){
  res.send(zjcz.instancData);
});
//实例echarts
app.post('/manage/instance/echarts',function(req,res){
  res.send(zjcz.instancEchartsData);
});
//日志信息
app.post('/dr/opermon/instance/logfile/logDetails',function(req,res){
  res.send(zjcz.logDetailsData);
});
//单个实例日志信息
app.post('/dr/opermon/instance/logfile/search',function(req,res){
  res.send(zjcz.journalData);
});
//单个实例配置信息
app.post('/dr/opermon/instance/configfile/search',function(req,res){
  res.send(zjcz.toConfigureData);
});
//省份大区配置信息
app.post('/operation/province/queryConfig',function(req,res){
  res.send(rzcz.provRegionMessage);
})
//新增省份大区配置
app.post('/operation/province/saveConfig',function(req,res){
  res.send({state:'success',desc:'增加成功'});
})
//修改省份大区配置
app.post('/operation/province/updateConfig',function(req,res){
  res.send({state:'success',desc:'修改成功'});
})
//删除operation/province/deleteConfig
app.post('/operation/province/deleteConfig',function(req,res){
  res.send({state:'success',desc:'删除成功'});
})
//获取操作记录
app.post('/operation/operationNote/queryConfig',function(req,res){
  res.send(rzcz.operationNoteMessage);
})
//机器信息
app.post('/manage/machine/query',function(req,res){
  res.send(rzcz.machinesMessage);
})
//机器信息增加
app.post('/manage/machine/add',function(req,res){
  res.send({state:'success',desc:'增加成功'});
})
//机器信息删除
app.post('/manage/machine/delete',function(req,res){
  res.send({state:'success',desc:'删除成功'});
})
//机器信息修改
app.post('/manage/machine/update',function(req,res){
  res.send({state:'success',desc:'修改成功'});
})
//计划外切换
app.post('/switch/outsideSwitch',function(req,res){
  res.send({state:'success',desc:'切换成功！'});
})
//上传下载 查询
app.post('/manage/file/show_con',function(req,res){
  res.send(rzcz.filer);
})
//日志 查询
app.post('/manage/host/journal',function(req,res){
  res.send(zjcz.journal);
})
