(function () {
  'use strict';
  angular.module('services.disasterOperation', [])
    .factory('disasterOperationSer', disasterOperationSer);
  function disasterOperationSer(httpServe,$timeout,promisesServe,$state) {
      var pageParam; //分页参数集合
      var params;
      var totalCount;//总条数
      var hostComputerMessages=[];
      var catalog = {};
      var applianceMessages = {};
      var interStateMessages = {};
      var falg = {k:''};
      var param = {};
      var myResult = [];
      var response = [];
      var con = [];
      var datas = [];
      var addParam = {};
      var mqMessages = {};
      var flowMessage=[];
      var moduleFlagToShow = {};
      var batToShow={};
      var determine={data:true};
      var spareHostComputerMessages = {};
      var spareInterStateMessages = {};
      var spareApplianceMessages = {};
      var myForm = {data:false};
      var  southData = {south:''};
      var dgData = {dg:''};
      var myFlag={};
      var flagMouse = {};
      var flowMessages=[];
      var flowM = [];
      var flowDatas = {southCenter:['华南','华东','华北'],DGCenter:['中部','西部']};
      var areaData = {};
    return {
          hostComputerMessages:hostComputerMessages,
          turnToPage:turnToPage,//分页查询
          initQueryParam:initQueryParam,
          catalog:catalog,
          applianceMessages:applianceMessages,
          clickAppliance:clickAppliance,
          clickSpareAppliance:clickSpareAppliance,
          clickHostComputerMessage:clickHostComputerMessage,
          clickSpareHostComputerMessage:clickSpareHostComputerMessage,
          clickInterState:clickInterState,
          clickSpareInterState:clickSpareInterState,
          interStateMessages:interStateMessages,
          falg:falg,
          hideDiv:hideDiv,
          param: param,
          myResult: myResult,
          response: response,
          /*getinformaotin: getinformation,*/
          submit: submit,
          datas :datas,
          switchCause:switchCause,
          mqMessages:mqMessages,
          flowMessage:flowMessage,
          flowMessages:flowMessages,
          moduleFlagToShow:moduleFlagToShow,
          batToShow:batToShow,
          clickSpareCore:clickSpareCore,
          determine:determine,
          hideModal:hideModal,
          clickMajorCore:clickMajorCore,
          clickDataCompare:clickDataCompare,
          clickMq:clickMq,
          inPlan:inPlan,
          nowFlow:nowFlow,
          clickChangeHistory:clickChangeHistory,
          returnIndex:returnIndex,
          outPlan:outPlan,
          toDataFlowChange:toDataFlowChange,
          toDataCompare:toDataCompare,
          toInPlanSpareCoreState:toInPlanSpareCoreState,
          spareHostTurnToPage:spareHostTurnToPage,
          applianceTurnToPage:applianceTurnToPage,
          spareApplianceTurnToPage:spareApplianceTurnToPage,
          spareInterTurnToPage:spareInterTurnToPage,
          spareHostComputerMessages:spareHostComputerMessages,
          spareInterStateMessages:spareInterStateMessages,
          spareApplianceMessages:spareApplianceMessages,
          colseModal:colseModal,
          myForm:myForm,
          southData:southData,
          dgData:dgData,
          myFlag:myFlag,
          flagMouse:flagMouse,
          getNowFlow:getNowFlow,
          flowM:flowM,
          clickPro:clickPro,
          areaData:areaData,
          changeHistoryTurnToPage:changeHistoryTurnToPage,
          interTurnToPage:interTurnToPage,
          clickRadio:clickRadio
    }
        /*封装分页查询条件*/
    function initQueryParam(){
      catalog.currentPage = 1;
      catalog.pageCount = 10;
      catalog.name = '';
      return catalog;
    }

    /*主中心切换导航栏样式  stat*/
    //点击主中心应用
    function clickAppliance(){
      $("#hostComputer").hide();
      $("#appliance").show();
      $("#interState").hide();

      $("#spareCoreAppliance").show();
      $("#spareCoreInterState").hide();
      $("#spareCoreHostComputer").hide();

      $("#inPlanSpareCoreAppliance").show();
      $("#inPlanSpareCoreInterState").hide();
      $("#inPlanSpareCoreHostComputer").hide();

      $("#interState_1").css("color","blue");
      $("#appliance_1").css("color","red");
      $("#hostComputer_1").css("color","blue");

      $("#interState_2").css("color","blue");
      $("#appliance_2").css("color","red");
      $("#hostComputer_2").css("color","blue");

      $("#interState_3").css("color","blue");
      $("#appliance_3").css("color","red");
      $("#hostComputer_3").css("color","blue");
      httpServe.getApplianceInfo(JSON.stringify(catalog)).then(function(res){
        if(res.state === 'success'){
                angular.copy(res,applianceMessages);
              }
      })
    }
    function applianceTurnToPage(currentPage){

      $timeout(function(){
        catalog.currentPage=currentPage;
        httpServe.getApplianceInfo(JSON.stringify(catalog)).then(function(res){
        if(res.state === 'success'){
                angular.copy(res,applianceMessages);
              }
      })
      },0)
    }
    //点击主中心主机
    function clickHostComputerMessage(){
      $("#hostComputer").show();
      $("#appliance").hide();
      $("#interState").hide();

      $("#spareCoreAppliance").hide();
      $("#spareCoreInterState").hide();
      $("#spareCoreHostComputer").show();

      $("#inPlanSpareCoreAppliance").hide();
      $("#inPlanSpareCoreInterState").hide();
      $("#inPlanSpareCoreHostComputer").show();

      $("#interState_1").css("color","blue");
      $("#appliance_1").css("color","blue");
      $("#hostComputer_1").css("color","red");

      $("#interState_2").css("color","blue");
      $("#appliance_2").css("color","blue");
      $("#hostComputer_2").css("color","red");

      $("#interState_3").css("color","blue");
      $("#appliance_3").css("color","blue");
      $("#hostComputer_3").css("color","red");
/*      console.log(catalog);
      console.log(JSON.stringify(catalog));*/
       httpServe.getHostComputerInfo(JSON.stringify(catalog)).then(function(res){
         if(res.state === 'success'){
                 angular.copy(res,hostComputerMessages);
               }
       })
    }
    //点击主中心网络状态
    function clickInterState(){
      $("#interState").show();
      $("#appliance").hide();
      $("#hostComputer").hide();

      $("#spareCoreAppliance").hide();
      $("#spareCoreInterState").show();
      $("#spareCoreHostComputer").hide();

      $("#inPlanSpareCoreAppliance").hide();
      $("#inPlanSpareCoreInterState").show();
      $("#inPlanSpareCoreHostComputer").hide();

      $("#interState_1").css("color","red");
      $("#appliance_1").css("color","blue");
      $("#hostComputer_1").css("color","blue");

      $("#interState_2").css("color","red");
      $("#appliance_2").css("color","blue");
      $("#hostComputer_2").css("color","blue");

      $("#interState_3").css("color","red");
      $("#appliance_3").css("color","blue");
      $("#hostComputer_3").css("color","blue");
      httpServe.getInterStateMessage(JSON.stringify(catalog)).then(function(res){
        if(res.state === 'success'){
                angular.copy(res,interStateMessages);
              }
      })
    }
    function interTurnToPage(currentPage){
      $timeout(function(){
        catalog.currentPage=currentPage;
        httpServe.getInterStateMessage(JSON.stringify(catalog)).then(function(res){
        if(res.state === 'success'){
                angular.copy(res,interStateMessages);
              }
      })
      },0)
    }
    /*主中心切换导航栏样式  end*/


    /*备中心切换导航栏样式  stat*/
    //点击备中心应用触发函数  =====================================
    function clickSpareAppliance(){
      $("#hostComputer").hide();
      $("#appliance").show();
      $("#interState").hide();

      $("#spareCoreAppliance").show();
      $("#spareCoreInterState").hide();
      $("#spareCoreHostComputer").hide();

      $("#inPlanSpareCoreAppliance").show();
      $("#inPlanSpareCoreInterState").hide();
      $("#inPlanSpareCoreHostComputer").hide();

      $("#interState_1").css("color","blue");
      $("#appliance_1").css("color","red");
      $("#hostComputer_1").css("color","blue");

      $("#interState_2").css("color","blue");
      $("#appliance_2").css("color","red");
      $("#hostComputer_2").css("color","blue");

      $("#interState_3").css("color","blue");
      $("#appliance_3").css("color","red");
      $("#hostComputer_3").css("color","blue");
      httpServe.getSpareApplianceMessages(JSON.stringify(catalog)).then(function(res){
        if(res.state === 'success'){
                angular.copy(res,spareApplianceMessages);
              }
      })
    }
    function spareApplianceTurnToPage(currentPage){
      $timeout(function(){
        catalog.currentPage=currentPage;
        httpServe.getSpareApplianceMessages(JSON.stringify(catalog)).then(function(res){
        if(res.state === 'success'){
                angular.copy(res,spareApplianceMessages);
              }
      })
      },0)
    }
    //点击备中心主机触发函数
    function clickSpareHostComputerMessage(){
      $("#hostComputer").show();
      $("#appliance").hide();
      $("#interState").hide();

      $("#spareCoreAppliance").hide();
      $("#spareCoreInterState").hide();
      $("#spareCoreHostComputer").show();

      $("#inPlanSpareCoreAppliance").hide();
      $("#inPlanSpareCoreInterState").hide();
      $("#inPlanSpareCoreHostComputer").show();

      $("#interState_1").css("color","blue");
      $("#appliance_1").css("color","blue");
      $("#hostComputer_1").css("color","red");

      $("#interState_2").css("color","blue");
      $("#appliance_2").css("color","blue");
      $("#hostComputer_2").css("color","red");

      $("#interState_3").css("color","blue");
      $("#appliance_3").css("color","blue");
      $("#hostComputer_3").css("color","red");
      httpServe.getSpareHostComputerMessages(JSON.stringify(catalog)).then(function(res){
        if(res.state === 'success'){
                angular.copy(res,spareHostComputerMessages);
              }
      })
    }
    //点击备中心网络状态触发函数
    function clickSpareInterState(){
      $("#interState").show();
      $("#appliance").hide();
      $("#hostComputer").hide();

      $("#spareCoreAppliance").hide();
      $("#spareCoreInterState").show();
      $("#spareCoreHostComputer").hide();

      $("#inPlanSpareCoreAppliance").hide();
      $("#inPlanSpareCoreInterState").show();
      $("#inPlanSpareCoreHostComputer").hide();

      $("#interState_1").css("color","red");
      $("#appliance_1").css("color","blue");
      $("#hostComputer_1").css("color","blue");

      $("#interState_2").css("color","red");
      $("#appliance_2").css("color","blue");
      $("#hostComputer_2").css("color","blue");

      $("#interState_3").css("color","red");
      $("#appliance_3").css("color","blue");
      $("#hostComputer_3").css("color","blue");
      httpServe.getSpareInterStateMessages(JSON.stringify(catalog)).then(function(res){
        if(res.state === 'success'){
                angular.copy(res,spareInterStateMessages);
              }
      })

    }
    function spareInterTurnToPage(currentPage){
      $timeout(function(){
        catalog.currentPage=currentPage;
        httpServe.getSpareInterStateMessages(JSON.stringify(catalog)).then(function(res){
        if(res.state === 'success'){
                angular.copy(res,spareInterStateMessages);
              }
      })
      },0)
    }
    /*备中心切换导航栏样式  end*/
    function hideDiv(){
      $("#appliance").hide();
      $("#interState").hide();

      $("#spareCoreAppliance").hide();
      $("#spareCoreInterState").hide();
    }

    //查询并展示后台数据
    /*function getinformation(){
      var url = "/areas/tmall/download/dataflowCon";
      $timeout(function () {
              httpServe.post(url, param).then(function (res) {
                  console.log(res)    //返回响应对象
                  if (res.result === "success") {
                      angular.copy(res, response);
                  }
              })
      }, 0)
    }*/
    //确认切换
    function submit(data){

      var nf = [];
      var dg = [];
      var obj = {};

     /* $("input[center='NF']").each(function(){
          var ches=$(this).attr('checked');
          var area=$(this).attr('area');

          if('checked'===ches){
            nf.push(area);
         }else{
            dg.push(area);
         }
      });
      console.log(nf);
      console.log(dg);
      obj.southCenter = nf;
      obj.dgCenter = dg ;
      obj.reason = data ;
      //
      console.log(flowMessages);*/
      angular.forEach(flowMessages,function(value){
        if(value.test==="南方基地"){
          nf.push(value.ascription);
        }else{
          dg.push(value.ascription);
        }
      })
      obj.southCenter = nf;
      obj.dgCenter = dg ;
      obj.reason = data ;
      //console.log(obj);
      httpServe.post("/disaster/operating/flowSwitch", JSON.stringify(obj)).then(function (res) {
                if (res.state === "success") {
                    promisesServe.msgBar('success', res.data);
                    getNowFlow();
                } else {
                    promisesServe.msgBar('warning', res.data);
                }
            });
      //关闭模态框
      $('#example').modal('hide');
      setTimeout(function(){
        //切换成功后进行跳转
        $state.go('disasterRec.assess');
      },1000)
    }

    function clickRadio(value,num){
      var che;
      var test;
      //angular.copy(flowMessages,newData);
      //console.log(newData);
      if (value===1) {
          che=true;
          test="南方基地"
      }else{
          che=false;
          test="东莞机房"
      }
      flowMessages[num].che=che;
      flowMessages[num].test=test;
      //console.log(flowMessages);
    }

    //切换原因
    function switchCause(){
      return addParam;
    }

    /*设置初始页面*/
    function hideModal(){
      /*alert("默认值 function");*/
      $("#spareCoreState").hide();
      $("#dataCompare").hide();
      $("#dataFlowChange").hide();
      $("#mqMessage").hide();
      $("#flowInfo").hide();
      $("#changeHistory").hide();
      $("#plan").show();
      $("#majorCoreState").hide();
      $("#inPlanSpareCoreState").hide();
      $("#dataFlowChange_in").hide();
    }

    function clickSpareCore(){

      $("#spareCoreState").show();
      $("#spareCoreHostComputer").show();
      $("#spareCoreAppliance").hide();
      $("#spareCoreInterState").hide();
      $("#dataCompare").hide();
      $("#dataFlowChange").hide();
      $("#mqMessage").hide();
      $("#flowInfo").hide();
      $("#changeHistory").hide();
      $("#plan").hide();
      $("#majorCoreState").hide();
      $("#dataFlowChange_in").hide();
      $("#btn_1").hide();
      $("#inPlanSpareCoreState").hide();
      $("#majorCore").css("color","blue");
      $("#spareCore").css("color","red");
      $("#hostComputer_2").css("color","red");
      $("#dataCompare_2").css("color","blue");
      $("#appliance_2").css("color","blue");
      $("#interState_2").css("color","blue");
      $("#change_history").css("color","blue");
      $("#now_flow").css("color","blue");

      httpServe.getSpareHostComputerMessages(JSON.stringify(catalog)).then(function(res){
        if(res.state === 'success'){
                angular.copy(res,spareHostComputerMessages);
              }
      })
    }
    function spareHostTurnToPage(currentPage){
      $timeout(function(){
        catalog.currentPage=currentPage;
        httpServe.getSpareHostComputerMessages(JSON.stringify(catalog)).then(function(res){
        if(res.state === 'success'){
                angular.copy(res,spareHostComputerMessages);
              }
      })
      },0)
    }

    function clickMajorCore(){
      $("#spareCoreState").hide();
      $("#dataCompare").hide();
      $("#dataFlowChange").hide();
      $("#mqMessage").hide();
      $("#flowInfo").hide();
      $("#changeHistory").hide();
      $("#plan").hide();
      $("#majorCoreState").show();
      $("#hostComputer").show();
      $("#appliance").hide();
      $("#interState").hide();
      $("#dataFlowChange_in").hide();
      $("#btn_2").hide();
      $("#inPlanSpareCoreState").hide();
      $("#majorCore").css("color","red");
      $("#hostComputer_3").css("color","red");
      $("#mq").css("color","blue");
      $("#spareCore").css("color","blue");
      $("#dataCompare_2").css("color","blue");
      $("#appliance_3").css("color","blue");
      $("#interState_3").css("color","blue");
      $("#change_history").css("color","blue");
      $("#now_flow").css("color","blue");
       httpServe.getHostComputerInfo(JSON.stringify(catalog)).then(function(res){
        if(res.state === 'success'){
                angular.copy(res,hostComputerMessages);
              }
      })
    }
    function turnToPage(currentPage){
      $timeout(function(){
        catalog.currentPage=currentPage;
        httpServe.getHostComputerInfo(JSON.stringify(catalog)).then(function(res){
        if(res.state === 'success'){
                angular.copy(res,hostComputerMessages);
              }
      })
      },0)
    }
    //数据比对查询
    function clickDataCompare(){
      $("#spareCoreState").hide();
      $("#dataCompare").show();
      $("#dataFlowChange").hide();
      $("#mqMessage").hide();
      $("#flowInfo").hide();
      $("#changeHistory").hide();
      $("#plan").hide();
      $("#majorCoreState").hide();
      $("#dataFlowChange_in").hide();
      $("#btn_3").hide();
      $("#dataSynchro").hide();
      $("#inPlanSpareCoreState").hide();
      $("#majorCore").css("color","blue");
      $("#dataCompare_2").css("color","red");
      $("#spareCore").css("color","blue");
      $("#flow").css("color","blue");
      $("#mq").css("color","blue");
      $("#change_history").css("color","blue");
      $("#now_flow").css("color","blue");
      $("#dataSynchroReturn").css("margin-top","53px");
      var url = "/areas/tmall/download/mycompare";
                    httpServe.post(url, param).then(function (res) {
                        if (res.state === "success") {
                            angular.copy(res, myResult);
                        }
                    })
    }
    //MQ消息队列信息
    function clickMq(){
      $("#spareCoreState").hide();
      $("#dataCompare").hide();
      $("#dataFlowChange").hide();
      $("#mqMessage").show();
      $("#flowInfo").hide();
      $("#changeHistory").hide();
      $("#plan").hide();
      $("#majorCoreState").hide();
      $("#inPlanSpareCoreState").hide();
      $("#dataFlowChange_in").hide();
      $("#mq").css("color","red");
      $("#flow").css("color","blue");
      $("#majorCore").css("color","blue");
      $("#dataCompare_2").css("color","blue");
      $("#spareCore").css("color","blue");
      $("#change_history").css("color","blue");
      $("#now_flow").css("color","blue");
      httpServe.getMqMessages(JSON.stringify(catalog)).then(function(res){
        if(res.state === 'success'){
                angular.copy(res,mqMessages);
              }
      })
    }
    //点击计划内按钮
    function inPlan(){
      $("#spareCoreState").hide();
      $("#dataCompare").hide();
      $("#dataFlowChange").hide();
      $("#mqMessage").hide();
      $("#flowInfo").hide();
      $("#changeHistory").hide();
      $("#plan").hide();
      $("#majorCoreState").show();
      $("#btn_2").show();
      $("#inPlanSpareCoreState").hide();
      $("#dataFlowChange_in").hide();
      $("#majorCore").css("color","red");
      $("#mq").css("color","blue");
      $("#spareCore").css("color","blue");
      $("#dataCompare_2").css("color","blue");
      $("#hostComputer_3").css("color","red");

      httpServe.getHostComputerInfo(JSON.stringify(catalog)).then(function(res){
        if(res.state === 'success'){
                angular.copy(res,hostComputerMessages);
              }
      })
    }
    //点击计划外按钮
    function outPlan(){
      $("#spareCoreState").show();
      $("#btn_1").show();
      $("#dataCompare").hide();
      $("#dataFlowChange").hide();
      $("#mqMessage").hide();
      $("#flowInfo").hide();
      $("#changeHistory").hide();
      $("#plan").hide();
      $("#majorCoreState").hide();
      $("#inPlanSpareCoreState").hide();
      $("#dataFlowChange_in").hide();
      $("#majorCore").css("color","blue");
      $("#mq").css("color","blue");
      $("#spareCore").css("color","red");
      $("#hostComputer_2").css("color","red");
      $("#dataCompare_2").css("color","blue");

      httpServe.getSpareHostComputerMessages(JSON.stringify(catalog)).then(function(res){
        if(res.state === 'success'){
                angular.copy(res,spareHostComputerMessages);
              }
      })
    }

    //当前流量查询
    function getNowFlow(){
      httpServe.getTimallflowDisplay(JSON.stringify(catalog)).then(function(res){
        if(res.state === 'success'){
                //angular.copy(res,flowMessage);
                flowMessage.data = flowDatas ;
                var NF=flowMessage.data.southCenter;
                var DG=flowMessage.data.DGCenter;
                flowM=[
                 {ascription:'华南'},{ascription:'华东'},{ascription:'华北'},
                 {ascription:'西部'},{ascription:'中部'}];
                  angular.forEach(flowM,function(item){
                    for(var i=0;i<NF.length;i++){
                      if(item.ascription===NF[i]){
                        item.test='南方基地';
                        item.che=true;
                      }
                    }
                    for(var i=0;i<DG.length;i++){
                      if(item.ascription===DG[i]){
                        item.test='东莞机房';
                        item.che=false;
                      }
                    }
                  })
              angular.copy(flowM,flowMessages);
        }
      });
    }
    function nowFlow(){
      $("[data-toggle='popover']").popover();
      $("#spareCoreState").hide();
      $("#dataCompare").hide();
      $("#dataFlowChange").hide();
      $("#mqMessage").hide();
      $("#flowInfo").show();
      $("#changeHistory").hide();
      $("#plan").hide();
      $("#majorCoreState").hide();
      $("#inPlanSpareCoreState").hide();
      $("#dataFlowChange_in").hide();
      $("#now_flow").css("color","red");
      $("#change_history").css("color","blue");
      $("#mq").css("color","blue");
      $("#flow").css("color","blue");
      $("#majorCore").css("color","blue");
      $("#dataCompare_2").css("color","blue");
      $("#spareCore").css("color","blue");
      getNowFlow();
    }

    //点击切换历史展现按钮，查询历史信息
    function clickChangeHistory(){
      $("#spareCoreState").hide();
      $("#dataCompare").hide();
      $("#dataFlowChange").hide();
      $("#mqMessage").hide();
      $("#flowInfo").hide();
      $("#changeHistory").show();
      $("#plan").hide();
      $("#majorCoreState").hide();
      $("#inPlanSpareCoreState").hide();
      $("#dataFlowChange_in").hide();
      $("#change_history").css("color","red");
      $("#now_flow").css("color","blue");
      $("#mq").css("color","blue");
      $("#flow").css("color","blue");
      $("#majorCore").css("color","blue");
      $("#dataCompare_2").css("color","blue");
      httpServe.getChangeHistoryMessage(JSON.stringify(catalog)).then(function(res){
        if(res.state=== 'success') {
          angular.copy(res,batToShow);
        }
      });
    }

    function changeHistoryTurnToPage(currentPage){
      $timeout(function(){
        //console.log(currentPage)
        catalog.currentPage=currentPage;
        httpServe.getChangeHistoryMessage(JSON.stringify(catalog)).then(function(res){
        if(res.state=== 'success') {
          angular.copy(res,batToShow);
        }
      });
      },0)
    }

    //返回按钮
    function returnIndex(){
      window.location.reload();
      initQueryParam();
      $("#spareCoreState").hide();
      $("#dataCompare").hide();
      $("#dataFlowChange").hide();
      $("#mqMessage").hide();
      $("#flowInfo").hide();
      $("#changeHistory").hide();
      $("#plan").show();
      $("#majorCoreState").hide();
      $("#inPlanSpareCoreState").hide();
      $("#dataFlowChange_in").hide();
      $("#majorCore").css("color","blue");
      $("#mq").css("color","blue");
      $("#spareCore").css("color","blue");
      $("#dataCompare_2").css("color","blue");
      $("#change_history").css("color","blue");
      $("#now_flow").css("color","blue");
    }

    //计划外备中心  下一步按钮
    function toDataFlowChange(){
      $("#spareCoreState").hide();
      $("#dataCompare").hide();
      $("#dataFlowChange").hide();
      $("#mqMessage").hide();
      $("#flowInfo").hide();
      $("#changeHistory").hide();
      $("#plan").hide();
      $("#majorCoreState").hide();
      $("#inPlanSpareCoreState").hide();
      $("#dataFlowChange").show();
      $("#flow").css("color","red");
      $("#majorCore").css("color","blue");
      $("#dataCompare_2").css("color","blue");
      $("#spareCore").css("color","blue");
      $("#mq").css("color","blue");
      getNowFlow();
    }
    //关闭模态框
    function colseModal(){
      $('#example').modal('hide');
      $('#example1').modal('hide');
    }

    //点击数据比对按钮  查询信息
    function toDataCompare(){
      $("#spareCoreState").hide();
      $("#dataCompare").show();
      $("#btn_3").show();
      $("#dataFlowChange").hide();
      $("#mqMessage").hide();
      $("#flowInfo").hide();
      $("#changeHistory").hide();
      $("#plan").hide();
      $("#majorCoreState").hide();
      $("#inPlanSpareCoreState").hide();
      $("#dataFlowChange_in").hide();
      $("#majorCore").css("color","blue");
      $("#dataCompare_2").css("color","red");
      $("#spareCore").css("color","blue");
      $("#flow").css("color","blue");
      $("#mq").css("color","blue");
      var url = "/areas/tmall/download/mycompare";
                    httpServe.post(url, param).then(function (res) {
                        //console.log(res)    //返回结果对象
                        if (res.state === "success") {
                            angular.copy(res, myResult);
                            //Woring(massage);
                        }
                    })
    }
    //主中心下一步按钮 --》计划内备中心
    function toInPlanSpareCoreState(){
      $("#spareCoreState").hide();
      $("#dataCompare").hide();
      $("#dataFlowChange").hide();
      $("#mqMessage").hide();
      $("#flowInfo").hide();
      $("#changeHistory").hide();
      $("#plan").hide();
      $("#majorCoreState").hide();
      $("#dataFlowChange_in").hide();
      $("#inPlanSpareCoreAppliance").hide();
      $("#inPlanSpareCoreInterState").hide();
      $("#inPlanSpareCoreState").show();
      $("#majorCore").css("color","blue");
      $("#spareCore").css("color","red");
      $("#dataCompare_2").css("color","blue");
      $("#hostComputer_1").css("color","red");

      httpServe.getSpareHostComputerMessages(JSON.stringify(catalog)).then(function(res){
        if(res.state === 'success'){
                angular.copy(res,spareHostComputerMessages);
              }
      })
    }
     function clickPro(item){
      //console.log(item);
      if(item==="华北"){
        areaData.data = '北京，天津，河北，辽宁，黑龙江，吉林，山东';
      }else
      if(item==="华南"){
        areaData.data = '广东，海南，广西，福建';
      }else
      if(item==="华东"){
        areaData.data = '上海，浙江，江苏，安徽';
      }else
      if(item==="中部"){
        areaData.data = '湖北，湖南，江西，河南，山西，内蒙古';
      }else
      if(item==="西部"){
        areaData.data = '四川，重庆，云南，贵州，陕西，甘肃，新疆，宁夏，西藏，青海';
      }
     }
  }
  disasterOperationSer.$inject = ['httpServe','$timeout','promisesServe','$state'];
})();
