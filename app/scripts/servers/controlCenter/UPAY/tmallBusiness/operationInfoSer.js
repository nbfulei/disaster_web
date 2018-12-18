;(function () {
  'use strict';
	angular.module('services.operationInfo', []).factory('operationInfo', operationInfo);
	function operationInfo($timeout,httpServe,$state,promisesServe,mainServe) {

		var falgHostComputer={};
		var majorCoreState={};
		var falgSpareCoreHostComputer={};
		var falgApp = {};
		var falgInter = {};
		var falgGaojing = {};
		var spareCoreState = {};
		var disasterState = {};
		var falgSpareCoreInter = {};
		var falgSpareCoreApp = {};
		var falgSpareCoreGaojing = {};
		var catalog = {};
		var hostComputerMessage_new = {};
		var applianceMessage_new = {};
		var interStateMessage_new = {};
		var giveAnlarmState = {};
		var spareHostComputerMessage_new = {};
		var spareApplianceMessage_new = {};
		var spareInterStateMessage_new = {};
		var spareGiveAnlarmState = {};
		var dataBaseCopyStateMessage = {};
		var disasterInterStateMessage = {};
		var disasterGiveAnlarmState = {};
		var majorCoreHostStyle = {data:'style'};
		var majorCoreAppStyle = {};
		var majorCoreInterStyle = {};
		var majorCoreGaoJingStyle = {};
		var switchNumber = "";
		var datas = {};
		var nowDate = {};
		var falg = {data:true};
		var falg_stop = {data:false};
		var fileDataCopyStateMessage = {};
		var instance = {};
		return {
			falgHostComputer:falgHostComputer,
			majorCoreState:majorCoreState,
			falgSpareCoreHostComputer:falgSpareCoreHostComputer,
			clickHostComputer:clickHostComputer,
			clickInterState:clickInterState,
			clickMajorCore:clickMajorCore,
			clickSpareCore:clickSpareCore,
			clickDisasterState:clickDisasterState,
			clickDataBaseCopyState:clickDataBaseCopyState,
			clickFileDataCopyState:clickFileDataCopyState,
			clickDisasterInterState:clickDisasterInterState,
			clickDisasterGaojing:clickDisasterGaojing,
			clickSpareCoreHostComputer:clickSpareCoreHostComputer,
			clickSpareCoreInterState:clickSpareCoreInterState,
			falgSpareCoreGaojing:falgSpareCoreGaojing,
			falgSpareCoreApp:falgSpareCoreApp,
			falgSpareCoreInter:falgSpareCoreInter,
			disasterState:disasterState,
			spareCoreState:spareCoreState,
			falgGaojing:falgGaojing,
			falgInter:falgInter,
			falgApp:falgApp,
			load:load,
			catalog:catalog,
			hostComputerMessage_new:hostComputerMessage_new,
			majorCoreHostQuery:majorCoreHostQuery,
			applianceMessage_new:applianceMessage_new,
			interStateMessage_new:interStateMessage_new,
			giveAnlarmState:giveAnlarmState,
			spareHostComputerMessage_new:spareHostComputerMessage_new,
			spareApplianceMessage_new:spareApplianceMessage_new,
			spareInterStateMessage_new:spareInterStateMessage_new,
			spareGiveAnlarmState:spareGiveAnlarmState,
			dataBaseCopyStateMessage:dataBaseCopyStateMessage,
			disasterInterStateMessage:disasterInterStateMessage,
			disasterGiveAnlarmState:disasterGiveAnlarmState,
			majorCoreHostStyle:majorCoreHostStyle,
			majorCoreAppStyle:majorCoreAppStyle,
			majorCoreInterStyle:majorCoreInterStyle,
			majorCoreGaoJingStyle:majorCoreGaoJingStyle,
			initDate:initDate,
			judgeNumber:judgeNumber,
			switchNumber:switchNumber,
			datas:datas,
			getEndTime:getEndTime,
			stopSwitch:stopSwitch,
			nowDate:nowDate,
			clickPass:clickPass,
			falg:falg,
			falg_stop:falg_stop,
			sendSerialNumber:sendSerialNumber,
			initQueryParam:initQueryParam,
			setCurrentPageHost:setCurrentPageHost,
			setCurrentPageNet:setCurrentPageNet,
			setCurrentPageHost_dg:setCurrentPageHost_dg,
			setCurrentPageNet_dg:setCurrentPageNet_dg,
			setCurrentPageDataBaseCopyState:setCurrentPageDataBaseCopyState,
			setCurrentPageDisasterInterState:setCurrentPageDisasterInterState,
			setCurrentPageFileDataCopyState:setCurrentPageFileDataCopyState,
			setCurrentPageDisasterGaojing:setCurrentPageDisasterGaojing,
			fileDataCopyStateMessage:fileDataCopyStateMessage,
			instance:instance,
			setInstance:setInstance,
			clickAppRunState:clickAppRunState
		};
		//封装分页查询条件
		function initQueryParam(){
      		catalog.currentPage = 1;
      		catalog.pageCount = 5;
      		return catalog;
    	}

		//点击通过按钮 
		function clickPass(){
			falg.data = false;
		}
		//页面加载 样式初始化
		function load(){
			$("#majorCoreState").css("backgroundColor","white");
			$("#majorCoreHost").css("color","blue");
			majorCoreHostStyle.data = "style";
			majorCoreInterStyle.data = "";
		}
		//主中心主机信息查询
		function majorCoreHostQuery(){
			catalog.currentPage = 1;
      		catalog.pageCount = 5;
      		var loa=document.getElementById("loading");
			loa.style.display="block";
			httpServe.getHostComputerMessage_new(JSON.stringify(catalog)).then(function(res){
				var loa=document.getElementById("loading");
			      loa.style.display="none";
        		if(res.state === 'success'){
                  angular.copy(res,hostComputerMessage_new);
	            }else{
	            	promisesServe.msgBar('warning',res.desc);
	            }
        	})
		}

		//点击应用运行状态
	function clickAppRunState(){
		catalog.currentPage = 1;
		catalog.pageCount = 5;
		var loa=document.getElementById("loading");
			loa.style.display="block";
		httpServe.getInstanceRunState(JSON.stringify(catalog)).then(function(res){
			var loa=document.getElementById("loading");
				loa.style.display="none";
        		if(res.state === 'success'){
                	angular.copy(res,instance);
	              }else{
	              	promisesServe.msgBar('warning',res.desc);
	              }
        })

		$("#disasterState_daoHang").css("backgroundColor","rgb(32,147,183)");
		$("#spareCoreState").css("backgroundColor","rgb(32,147,183)");
		$("#majorCoreState").css("backgroundColor","rgb(32,147,183)");
		$("#appRunState").css("backgroundColor","white");

		$("#ul_1").css("display","none");
		$("#ul_3").css("display","none");
		$("#ul_2").css("display","none");
		$("#data_table").css("display","none");
		$("#daohang_2_4").css("display","block");

	}


		function setCurrentPageHost(currentPage){
	      	$timeout(function(){
	        catalog.currentPage=currentPage;
	        var loa=document.getElementById("loading");
			loa.style.display="block";
	        httpServe.getHostComputerMessage_new(JSON.stringify(catalog)).then(function(res){
	        	var loa=document.getElementById("loading");
			      loa.style.display="none";
	        if(res.state === 'success'){
	                angular.copy(res,hostComputerMessage_new);
	        }else{
	            promisesServe.msgBar('warning',res.desc);
	        }
	      	})
	      	},0)
    	}

		//获取容灾操作开始时间 并发送给后台switch/switchStageBegin
		function initDate(){
			 nowDate = new Date();
			var nowDate_1 = nowDate.getDate();
			var nowDate_3 = nowDate.getMonth()+1;
			var nowDate_4 = nowDate.getFullYear();
			var nowDate_5 = nowDate.getHours();
			var nowDate_6 = nowDate.getMinutes();
			var nowDate_7 = nowDate.getSeconds();
			var nowDate_8 = nowDate.getMilliseconds();

			nowDate_4=judgeNumber(nowDate_4);
			nowDate_3=judgeNumber(nowDate_3);
			nowDate_1=judgeNumber(nowDate_1);
			nowDate_5=judgeNumber(nowDate_5);
			nowDate_6=judgeNumber(nowDate_6);
			nowDate_7=judgeNumber(nowDate_7);
			nowDate_8=judgeNumber(nowDate_8);

			switchNumber = nowDate_4.toString()+nowDate_3.toString()+nowDate_1.toString()+
								nowDate_5.toString()+nowDate_6.toString()+nowDate_7.toString()+nowDate_8.toString() ;
			datas.switchNumber = switchNumber;
			datas.currentStage = "00";



			httpServe.post("/switch/switchStageBegin", JSON.stringify(datas)).then(function (res) {
				if (res.state === 'success') {
					if (res.data) {
                	if (res.data.revise === '01') {
                		majorCoreHostQuery();
                		datas.switchNumber = res.data.switchNumber;

                	}else
                	if(res.data.revise === '03'){
                		majorCoreHostQuery();
                		datas.switchNumber = res.data.switchNumber;
                	}else
                	if(res.data.revise === '02'||res.data.revise === '04'||res.data.revise === '05'){

                		alert("点击返回上次未完成的切换");
	                		var appUrl=mainServe.getStateGo(res.data.currentStage);
	                		$state.go(appUrl);
	                		datas.switchNumber = res.data.switchNumber;
                	}else{
                		majorCoreHostQuery();
                	}
                }else{
                		majorCoreHostQuery();
                	}
				}else{
					promisesServe.msgBar('warning',res.desc);
				}

            });
		}

		function sendSerialNumber(){
			return datas.switchNumber;
		}

		//判断数字是否小于九
		function judgeNumber(value){
			if(value<10){
				var strVal = value.toString();
				var a = "0";
				var newNumber = a + strVal ;
			}else if(value>=10){
				newNumber = value.toString();
			}
			return newNumber;
		}
		//点击下一步获得序列号
		function getEndTime(){

			falg.data = true;
			datas.currentStage = "00";
			$timeout(function(){

				httpServe.post("/switch/switchStageEnd", JSON.stringify(datas)).then(function (res) {
					if (res.state === 'success') {
						$state.go("disasterRec.operationLate");
					}else{
						promisesServe.msgBar('warning',res.desc);
					}
            });
			},0);
		}
		//点击终止切换 发送序列号给后台
		function stopSwitch(value){

			sendSerialNumber();
			datas.currentStage = "00";
        	//切换成功后进行跳转
        	var isStop=window.confirm("确认结束本次操作？");
		    	if(isStop){
		    		//请求部分----------------------------------------------------------
	                 httpServe.post("/switch/switchStageTermination", JSON.stringify(datas)).then(function (res) {
		               if (res.state === "success") {
		                  $state.go('disasterRec.monitor');
		               }
	                });
		    	}
		    falg_stop.data = false;
		}
		//主中心系统状态
		//点击主中心主机
		function clickHostComputer(){
			catalog.currentPage = 1;
      		catalog.pageCount = 5;
			majorCoreHostQuery();
		$("#hostComputer").css("display","block");
		$("#majorCoreRequest").css("display","block");
		$("#interState").css("display","none");
		$("#app").css("display","none");
		$("#gaojingState").css("display","none");
		$("#majorCoreHost").css("backgroundColor","white");
		$("#majorCoreApp").css("color","black");
		$("#majorCoreHost").css("color","blue");
		$("#majorCoreInter").css("color","black");
		$("#majorCoreGaoJing").css("color","black");

		majorCoreAppStyle.data = "styles";
		majorCoreHostStyle.data = "style";
		majorCoreInterStyle.data = "styles";
		majorCoreGaoJingStyle.data = "styles";
	}

	
	//主中心网络
	function majorCoreInterQuery(){

		httpServe.getInterStateMessage_new(JSON.stringify(catalog)).then(function(res){
        		if(res.state === 'success'){
	                angular.copy(res,interStateMessage_new);
	            }else{
	            	promisesServe.msgBar('warning',res.desc);
	            }
        })
	}
	//点击主中心网络状态
	function clickInterState(){
		catalog.currentPage = 1;
      	catalog.pageCount = 5;
			var loa=document.getElementById("loading");
			loa.style.display="block";
			httpServe.getInterStateMessage_new(JSON.stringify(catalog)).then(function(res){
				var loa=document.getElementById("loading");
				loa.style.display="none";
        		if(res.state === 'success'){
	                angular.copy(res,interStateMessage_new);
	                }else{
	                	promisesServe.msgBar('warning',res.desc);
	                }
        	})

		$("#hostComputer").css("display","none");
		$("#interState").css("display","block");
		$("#app").css("display","none");
		$("#gaojingState").css("display","none");
		$("#majorCoreRequest").css("display","none");
		$("#majorCoreApp").css("color","black");
		$("#majorCoreHost").css("color","black");
		$("#majorCoreInter").css("color","blue");
		$("#majorCoreGaoJing").css("color","black");
		$("#majorCoreInter").css("backgroundColor","white");

		majorCoreAppStyle.data = "styles";
		majorCoreHostStyle.data = "styles";
		majorCoreInterStyle.data = "style";
		majorCoreGaoJingStyle.data = "styles";
	}
		//主中心网络分页
		function setCurrentPageNet(currentPage){
			$timeout(function(){
				catalog.currentPage=currentPage;
				var loa=document.getElementById("loading");
				loa.style.display="block";
				httpServe.getInterStateMessage_new(JSON.stringify(catalog)).then(function(res){
						loa.style.display="none";
		        		if(res.state === 'success'){
		                angular.copy(res,interStateMessage_new);
		              }else{
		              	promisesServe.msgBar('warning',res.desc);
		              }
		        })
		        },0);
		}
		
	//主中心，备中心，容灾状态之间的切换
	//点击主中心系统状态
	function clickMajorCore(){
		catalog.currentPage = 1;
      	catalog.pageCount = 5;
		majorCoreHostQuery();
		$("#majorCore").css("display","block");
		$("#hostComputer").css("display","block");
		$("#majorCoreRequest").css("display","block");
		$("#spareCore").css("display","none");
		$("#disasterState").css("display","none");
		$("#app").css("display","none");
		$("#interState").css("display","none");
		$("#gaojingState").css("display","none");
		$("#disasterGaojingState").css("display","none");
		$("#disasterInterState").css("display","none");
		$("#dataBaseCopyState").css("display","none");
		$("#fileDataCopyState").css("display","none");
		$("#daohang_2_4").css("display","none");
		$("#data_table").css("display","block");
		/*$("#daohang_2_1").css("display","block");*/
		$("#ul_1").css("display","block");
		$("#ul_2").css("display","none");
		$("#ul_3").css("display","none");
		$("#majorCoreState").css("backgroundColor","white");
		$("#majorCoreHost").css("backgroundColor","white");
		$("#spareCoreState").css("backgroundColor","rgb(32,147,183)");
		$("#disasterState_daoHang").css("backgroundColor","rgb(32,147,183)");
		$("#appRunState").css("backgroundColor","rgb(32,147,183)");
		$("#majorCoreHost").css("backgroundColor","white");

		$("#majorCoreApp").css("color","black");
		$("#majorCoreHost").css("color","blue");
		$("#majorCoreInter").css("color","black");
		$("#majorCoreGaoJing").css("color","black");

		$("#spareCoreHost").css("color","black");
		$("#spareCoreApp_").css("color","black");
		$("#spareCoreInter").css("color","black");
		$("#spareCoreGaoJing").css("color","black");

		$("#dataBaseCopy").css("color","black");
		$("#fileDataCopy").css("color","black");
		$("#disasterState_inter").css("color","black");
		$("#disasterState_gaoJing").css("color","black");

		majorCoreAppStyle.data = "styles";
		majorCoreHostStyle.data = "style";
		majorCoreInterStyle.data = "styles";
		majorCoreGaoJingStyle.data = "styles";

	}
	//点击备中心系统状态
	function clickSpareCore(){
		catalog.currentPage = 1;
      	catalog.pageCount = 5;
		$timeout(function(){
			var loa=document.getElementById("loading");
			loa.style.display="block";
			httpServe.getSpareHostComputerMessage_new(JSON.stringify(catalog)).then(function(res){
				var loa=document.getElementById("loading");
				loa.style.display="none";
        		if(res.state === 'success'){
                angular.copy(res,spareHostComputerMessage_new);
              }else{
              	promisesServe.msgBar('warning',res.desc);
              }
        })
		},0);
		$("#majorCore").css("display","none");
		$("#disasterState").css("display","none");
		$("#ul_1").css("display","none");
		$("#ul_3").css("display","none");
		$("#ul_2").css("display","block");
		$("#spareCore").css("display","block");
		$("#spareCoreHostComputer").css("display","block");
		$("#disasterGaojingState").css("display","none");
		$("#disasterInterState").css("display","none");
		$("#dataBaseCopyState").css("display","none");
		$("#fileDataCopyState").css("display","none");
		$("#spareCoreGaojingState").css("display","none");
		$("#app").css("display","none");
		$("#gaojingState").css("display","none");
		$("#interState").css("display","none");
		$("#spareCoreInterState").css("display","none");
		$("#spareCoreApp").css("display","none");
		$("#spareCoreState").css("backgroundColor","white");
		$("#majorCoreState").css("backgroundColor","rgb(32,147,183)");
		$("#disasterState_daoHang").css("backgroundColor","rgb(32,147,183)");
		$("#appRunState").css("backgroundColor","rgb(32,147,183)");
		$("#spareCoreHost").css("color","blue");
		$("#spareCoreApp_").css("color","black");
		$("#spareCoreInter").css("color","black");
		$("#spareCoreGaojingState").css("color","black");

		$("#majorCoreApp").css("color","black");
		$("#majorCoreHost").css("color","black");
		$("#majorCoreInter").css("color","black");
		$("#majorCoreGaoJing").css("color","black");
		$("#spareCoreApp_").css("color","black");
		$("#spareCoreInterState").css("color","black");
		$("#spareCoreGaoJing").css("color","black");

		$("#dataBaseCopy").css("color","black");
		$("#fileDataCopy").css("color","black");
		$("#disasterState_inter").css("color","black");
		$("#disasterState_gaoJing").css("color","black");

		$("#daohang_2_4").css("display","none");
		$("#data_table").css("display","block");

		majorCoreAppStyle.data = "styles";
		majorCoreHostStyle.data = "style";
		majorCoreInterStyle.data = "styles";
		majorCoreGaoJingStyle.data = "styles";

	}
	//点击 容灾状态
	function clickDisasterState(){
		catalog.currentPage = 1;
      	catalog.pageCount = 5;
		$timeout(function(){
			var loa=document.getElementById("loading");
			loa.style.display="block";
			httpServe.getDataBaseCopyState(JSON.stringify(catalog)).then(function(res){
				var loa=document.getElementById("loading");
				loa.style.display="none";
        		if(res.state === 'success'){
                angular.copy(res,dataBaseCopyStateMessage);
              }else{
              	promisesServe.msgBar('warning',res.desc);
              }
        })
		},0);
		$("#majorCore").css("display","none");
		$("#interState").css("display","none");
		$("#disasterState").css("display","block");
		$("#dataBaseCopyState").css("display","block");
		$("#ul_3").css("display","block");
		$("#spareCore").css("display","none");
		$("#ul_2").css("display","none");
		$("#ul_1").css("display","none");
		$("#fileDataCopyState").css("display","none");
		$("#disasterInterState").css("display","none");
		$("#disasterGaojingState").css("display","none");
		$("#disasterState_daoHang").css("backgroundColor","white");
		$("#spareCoreState").css("backgroundColor","rgb(32,147,183)");
		$("#majorCoreState").css("backgroundColor","rgb(32,147,183)");
		$("#appRunState").css("backgroundColor","rgb(32,147,183)");
		$("#dataBaseCopy").css("backgroundColor","white");
		$("#dataBaseCopy").css("color","blue");
		$("#fileDataCopy").css("color","black");
		$("#disasterState_inter").css("color","black");
		$("#disasterState_gaoJing").css("color","black");

		$("#majorCoreApp").css("color","black");
		$("#majorCoreHost").css("color","black");
		$("#majorCoreInter").css("color","black");
		$("#majorCoreGaoJing").css("color","black");

		$("#spareCoreHost").css("color","black");
		$("#spareCoreApp_").css("color","black");
		$("#spareCoreInterState").css("color","black");
		$("#spareCoreGaojingState").css("color","black");

		$("#fileDataCopy").css("color","black");
		$("#disasterState_inter").css("color","black");
		$("#disasterState_gaoJing").css("color","black");

		$("#daohang_2_4").css("display","none");
		$("#data_table").css("display","block");

		majorCoreAppStyle.data = "styles";
		majorCoreHostStyle.data = "style";
		majorCoreInterStyle.data = "styles";
		majorCoreGaoJingStyle.data = "styles";

	}

	//点击应用运行状态
	

	//应用运行状态分页
	function setInstance(currentPage){
		catalog.currentPage=currentPage;
		httpServe.getInstanceRunState(JSON.stringify(catalog)).then(function(res){
			var loa=document.getElementById("loading");
				loa.style.display="none";
        		if(res.state === 'success'){
                	angular.copy(res,instance);
	              }else{
	              	promisesServe.msgBar('warning',res.desc);
	              }
        })
	}
	//容灾状态 内部表格的切换
	//点击数据库复制状态
	function clickDataBaseCopyState(){
		catalog.currentPage = 1;
      	catalog.pageCount = 5;
      		var loa=document.getElementById("loading");
			loa.style.display="block";
			httpServe.getDataBaseCopyState(JSON.stringify(catalog)).then(function(res){
				var loa=document.getElementById("loading");
				loa.style.display="none";
        		if(res.state === 'success'){
                	angular.copy(res,dataBaseCopyStateMessage);
	              }else{
	              	promisesServe.msgBar('warning',res.desc);
	              }
        	})
		$("#dataBaseCopyState").css("display","block");
		$("#fileDataCopyState").css("display","none");
		$("#disasterInterState").css("display","none");
		$("#disasterGaojingState").css("display","none");
		$("#dataBaseCopy").css("backgroundColor","white");

		$("#dataBaseCopy").css("color","blue");
		$("#fileDataCopy").css("color","black");
		$("#disasterState_inter").css("color","black");
		$("#disasterState_gaoJing").css("color","black");
		majorCoreAppStyle.data = "styles";
		majorCoreHostStyle.data = "style";
		majorCoreInterStyle.data = "styles";
		majorCoreGaoJingStyle.data = "styles";
	}
	//数据库复制状态 分页
	function setCurrentPageDataBaseCopyState(currentPage){
		catalog.currentPage=currentPage;
		httpServe.getDataBaseCopyState(JSON.stringify(catalog)).then(function(res){
        	if(res.state === 'success'){
            	angular.copy(res,dataBaseCopyStateMessage);
         	}else{
         		promisesServe.msgBar('warning',res.desc);
         	}
		})
	}
	//点击文件数据复制状态
	function clickFileDataCopyState(){

		catalog.currentPage = 1;
      	catalog.pageCount = 5;
      	var loa=document.getElementById("loading");
			loa.style.display="block";
      	httpServe.getFileDataCopyState(JSON.stringify(catalog)).then(function(res){
      			var loa=document.getElementById("loading");
				loa.style.display="none";
        		if(res.state === 'success'){
                angular.copy(res,fileDataCopyStateMessage);
                angular.forEach(fileDataCopyStateMessage.data.datas,function(itme){
                	if(itme.status === 'RUNNING'){
                	   itme.status = '运行'
                	}
                	if(itme.status === 'STOPPER'){
                	   itme.status = '停止'
                	}
                })
              }else{
              	promisesServe.msgBar('warning',res.desc);
              }
        	})
		$("#dataBaseCopyState").css("display","none");
		$("#fileDataCopyState").css("display","block");
		$("#disasterInterState").css("display","none");
		$("#disasterGaojingState").css("display","none");
		$("#fileDataCopy").css("backgroundColor","white");

		$("#dataBaseCopy").css("color","black");
		$("#fileDataCopy").css("color","blue");
		$("#disasterState_inter").css("color","black");
		$("#disasterState_gaoJing").css("color","black");
		majorCoreAppStyle.data = "style";
		majorCoreHostStyle.data = "styles";
		majorCoreInterStyle.data = "styles";
		majorCoreGaoJingStyle.data = "styles";
	}
	function setCurrentPageFileDataCopyState(currentPage){
		catalog.currentPage=currentPage;
		httpServe.getFileDataCopyState(JSON.stringify(catalog)).then(function(res){
        	if(res.state === 'success'){
            	angular.copy(res,fileDataCopyStateMessage);
         	}else{
         		promisesServe.msgBar('warning',res.desc);
         	}
		})
	}
	//点击容灾状态 中的网络状态
	function clickDisasterInterState(){
		catalog.currentPage = 1;
      	catalog.pageCount = 5;
		$timeout(function(){
			var loa=document.getElementById("loading");
			loa.style.display="block";
			httpServe.getDisasterInterStateMessage(JSON.stringify(catalog)).then(function(res){
				var loa=document.getElementById("loading");
				loa.style.display="none";
        		if(res.state === 'success'){
                	angular.copy(res,disasterInterStateMessage);
              	}else{
              		promisesServe.msgBar('warning',res.desc);
              	}
        })
		},0);
		$("#dataBaseCopyState").css("display","none");
		$("#fileDataCopyState").css("display","none");
		$("#disasterInterState").css("display","block");
		$("#disasterGaojingState").css("display","none");

		$("#dataBaseCopy").css("color","black");
		$("#fileDataCopy").css("color","black");
		$("#disasterState_inter").css("color","blue");
		$("#disasterState_gaoJing").css("color","black");
		$("#disasterState_inter").css("backgroundColor","white");

		majorCoreAppStyle.data = "styles";
		majorCoreHostStyle.data = "styles";
		majorCoreInterStyle.data = "style";
		majorCoreGaoJingStyle.data = "styles";

	}
	// 分页
	function setCurrentPageDisasterInterState(currentPage){
		catalog.currentPage=currentPage;
		httpServe.getDisasterInterStateMessage(JSON.stringify(catalog)).then(function(res){
        	if(res.state === 'success'){
            	angular.copy(res,disasterInterStateMessage);
         	}else{
         		promisesServe.msgBar('warning',res.desc);
         	}
		})
	}
	//点击容灾状态中的 告警状态
	function clickDisasterGaojing(){
		catalog.currentPage = 1;
      	catalog.pageCount = 5;
		$timeout(function(){
			var loa=document.getElementById("loading");
			loa.style.display="block";
			httpServe.getDisasterGiveAnlarmState(JSON.stringify(catalog)).then(function(res){
				var loa=document.getElementById("loading");
				loa.style.display="none";
        		if(res.state === 'success'){
                angular.copy(res,disasterGiveAnlarmState);
              }
        })
		},0);
		$("#dataBaseCopyState").css("display","none");
		$("#fileDataCopyState").css("display","none");
		$("#disasterInterState").css("display","none");
		$("#disasterGaojingState").css("display","block");
		$("#disasterState_gaoJing").css("backgroundColor","white");

		$("#dataBaseCopy").css("color","black");
		$("#fileDataCopy").css("color","black");
		$("#disasterState_inter").css("color","black");
		$("#disasterState_gaoJing").css("color","blue");

		majorCoreAppStyle.data = "styles";
		majorCoreHostStyle.data = "styles";
		majorCoreInterStyle.data = "styles";
		majorCoreGaoJingStyle.data = "style";
	}
	// 分页
	function setCurrentPageDisasterGaojing(currentPage){
		catalog.currentPage=currentPage;
		httpServe.getDisasterGiveAnlarmState(JSON.stringify(catalog)).then(function(res){
        	if(res.state === 'success'){
            angular.copy(res,disasterGiveAnlarmState);
         	}
		})
	}
	//备中心 主机，网络之间切换
	//点击备中心主机
	function clickSpareCoreHostComputer(){

		$("#spareCoreHostComputer").css("display","block");
		$("#spareCoreInterState").css("display","none");
		$("#spareCoreApp").css("display","none");
		$("#spareCoreGaojingState").css("display","none");
		$("#spareCoreHost").css("backgroundColor","white");
		$("#spareCoreHost").css("color","blue");
		$("#spareCoreApp_").css("color","black");
		$("#spareCoreInter").css("color","black");
		$("#spareCoreGaoJing").css("color","black");

		majorCoreAppStyle.data = "styles";
		majorCoreHostStyle.data = "style";
		majorCoreInterStyle.data = "styles";
		majorCoreGaoJingStyle.data = "styles";
		catalog.currentPage = 1;
      	catalog.pageCount = 5;
      		var loa=document.getElementById("loading");
				loa.style.display="block";
			httpServe.getSpareHostComputerMessage_new(JSON.stringify(catalog)).then(function(res){
        		if(res.state === 'success'){
        			var loa=document.getElementById("loading");
					loa.style.display="none";
	                angular.copy(res,spareHostComputerMessage_new);
	              }else{
	              	promisesServe.msgBar('warning',res.desc);
	              	loa.style.display="none";
	              }
        })
	}
	//备中心主机信息分页
	function setCurrentPageHost_dg(currentPage){
		$timeout(function(){
			catalog.currentPage=currentPage;
			httpServe.getSpareHostComputerMessage_new(JSON.stringify(catalog)).then(function(res){
        		if(res.state === 'success'){
                angular.copy(res,spareHostComputerMessage_new);
              }else{
              	promisesServe.msgBar('warning',res.desc);
              }
        })
		},0);
	}
	
	//点击备中心 网络状态
	function clickSpareCoreInterState(){

		$("#spareCoreHostComputer").css("display","none");
		$("#spareCoreInterState").css("display","block");
		$("#spareCoreApp").css("display","none");
		$("#spareCoreGaojingState").css("display","none");
		$("#spareCoreInter").css("backgroundColor","white");
		$("#spareCoreHost").css("color","black");
		$("#spareCoreApp_").css("color","black");
		$("#spareCoreInter").css("color","blue");
		$("#spareCoreGaoJing").css("color","black");

		majorCoreAppStyle.data = "styles";
		majorCoreHostStyle.data = "styles";
		majorCoreInterStyle.data = "style";
		majorCoreGaoJingStyle.data = "styles";

		catalog.currentPage = 1;
      	catalog.pageCount = 5;
      	var loa=document.getElementById("loading");
				loa.style.display="block";
			httpServe.getSpareInterStateMessage_new(JSON.stringify(catalog)).then(function(res){
				var loa=document.getElementById("loading");
				loa.style.display="none";
        		if(res.state === 'success'){
                angular.copy(res,spareInterStateMessage_new);
              	}else{
              		promisesServe.msgBar('warning',res.desc);
              	}
        })
	}
	//备中心网络状态分页
	function setCurrentPageNet_dg(currentPage){
		$timeout(function(){
			catalog.currentPage=currentPage;
			httpServe.getSpareInterStateMessage_new(JSON.stringify(catalog)).then(function(res){
        		if(res.state === 'success'){
                angular.copy(res,spareInterStateMessage_new);
              	}else{
              		promisesServe.msgBar('warning',res.desc);
              	}
        })
		},0);
	}
	
}
	operationInfo.$inject = ['$timeout','httpServe','$state','promisesServe','mainServe'];

})();
