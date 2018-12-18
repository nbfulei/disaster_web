;(function () {
  'use strict';
	angular.module('services.operationLate', []).factory('operationLateSer', operationLateSer);
	function operationLateSer($timeout,httpServe,promisesServe,$state,operationInfo,mainServe,$filter) {
		var flowMessage={};//当前流量状态数据
		var flowMessages={};//预案定制流量状态数据
		var switchData={};//要进行切换的数据
		var areaData={};   //悬浮显示的对应大区里面的省份的数据
		var synMessage={};//正反向同步数据
		var flowSwitchMessage={};//确认切换表格数据
		var reportMessage={};//获得确认切换的报告数据
		var param={};
		var syn1={syn1:true,syn2:false,syn3:false};//syn1反向复制，syn2切换，syn3正向同步  显示隐藏
		var load=document.getElementById("loading");
		return {
			    flowMessage:flowMessage,
			    flowMessages:flowMessages,
			    areaData:areaData,
			    switchData:switchData,
			    reportMessage:reportMessage,
			    synMessage:synMessage,
			    flowSwitchMessage:flowSwitchMessage,
				currentTrafficState:currentTrafficState,
				adjustment:adjustment,
				goReverseSyn:goReverseSyn,
				getSynData:getSynData,
				getConfirmSwitch:getConfirmSwitch,
				getFlowSwitch:getFlowSwitch,
				stopeSwitch:stopeSwitch,
				getParam:getParam,
				initpage:initpage,
				syn1:syn1
		};
		//步骤开启结束传后端的数据 当前步骤、序列号
		function getParam(value){
			if(!param.switchNumber){
				param.switchNumber=operationInfo.sendSerialNumber();
			}
            param.currentStage=value;
            return param;
		}
		//初始化页面  并开启步骤
		function initpage(){
			syn1.syn1=true;
			syn1.syn2=false;
			syn1.syn3=false;
		    //请求部分-开启OGG反向复制 步骤开始----------------------------------------
         	var tempParam=getParam('10');
         	var tempUrl="/switch/switchStageBegin";
         	var loa=document.getElementById("loading");
			loa.style.display="block";
            httpServe.post(tempUrl, JSON.stringify(tempParam)).then(function (res) {
            	var loa1=document.getElementById("loading");
              	loa1.style.display="none";
              if (res.state === "success") {

				if (res.data) {
					param.switchNumber = res.data.switchNumber;
            	if (res.data.revise === '01') {
            		//中文注释console.log('跳到状态检查页面');
            		var appUrl=mainServe.getStateGo(res.data.currentStage);
					$state.go(appUrl);
            	}else
            	if(res.data.revise === '03'){
            		gatNewData(res.data.currentStage);
            	}else
            	if(res.data.revise === '02'||res.data.revise === '04'||res.data.revise === '05'){
            		    gatNewData(res.data.currentStage);
            		if (res.data.currentStage==="25") {
            			//请求部分-更新大区状态表 步骤开始----------------------------------------
		             	var tempParam=getParam('25');
		             	var tempUrls="/switch/switchStageBegin";
		             	//console.log("正向步骤已结束");
		             	var loa2=document.getElementById("loading");
		             	loa2.style.display="block";
			            httpServe.post(tempUrls, JSON.stringify(tempParam)).then(function (res) {
			            	var loa3=document.getElementById("loading");
			              	loa3.style.display="none";
			              if (res.state === "success") {
			              	param.switchNumber = res.data.switchNumber;

							        $state.go('disasterRec.operationConfirmSwitch');
			              	    //console.log("跳转结束页面");
			              }else{
			              	promisesServe.msgBar('warning',res.desc);
			              }
			            });
            		}
            	}
        }
				//console.log("反向步骤已开始");
				    //清空switchData
	                $timeout(function() {
	                	if (switchData.data&&switchData.data.length>0) {
	                		switchData.data.length=0;
	                	}
	                }, 500);
              }else{
              	promisesServe.msgBar('warning',res.desc);
              }
            });
            //处理数据  根据不同的res.data.currentStage，显示对应页面
            function gatNewData(curStage){
            	param=	getParam(curStage);
            	var tempUrl="";
            	if(curStage==="10"){
            		syn1.syn1=true;
                	syn1.syn2=syn1.syn3=false;
                	tempUrl="/switch/switchOggStartStatus";
            	}
            	if(curStage==="15"){
            		syn1.syn2=true;
                	syn1.syn1=syn1.syn3=false;
                	tempUrl="/switch/flowStatus";
            	}
            	if(curStage==="20"){
            		syn1.syn3=true;
                	syn1.syn2=syn1.syn1=false;
                	tempUrl="/switch/switchOggStopStatus";
            	}
            	//请求部分-查询同步三个步骤数据----------------------------------------
            	var loa4=document.getElementById("loading");
            	loa4.style.display="block";
	            httpServe.post(tempUrl, JSON.stringify(param)).then(function (res) {
	            	var loa5=document.getElementById("loading");
	              	loa5.style.display="none";
	              if (res.state === "success") {

	              	    synMessage.data=[];
	              	    angular.copy(res.data,synMessage.data);
	              	    synMessage.nextBtn1=false;
	              	    synMessage.nextBtn=false;
	              	    synMessage.nextBtn3=false;
	              	    angular.forEach(synMessage.data,function(item,value){
	              	     if(item.center==="DG"){//流向基地
	              	     	 synMessage.data[value].direction="东莞";
	              	     	 synMessage.data[value].directions="DG";
	              	     	 synMessage.data[value].theirBase="南基";
	              	     	 synMessage.data[value].theirBases="NJ";
	              	     }
	              	     if(item.center==="NJ"){//流向基地
	              	     	 synMessage.data[value].direction="南基";
	              	     	 synMessage.data[value].directions="NJ";
	              	     	 synMessage.data[value].theirBase="东莞";
	              	     	 synMessage.data[value].theirBases="DG";
	              	     }
	              	     if(item.status==="RUNNING"){
	              	     	item.state="运行";
	              	     	item.reverseState="已开启";
		              	    item.positiveState="关闭";//单条数据   正向复制
		              	    synMessage.nextBtn3=true;
	              	     }else{
	              	     	    item.reverseState="开启";  //单条数据   反向复制
	              	     	    synMessage.nextBtn1=true;
		              	     	if (item.status==="ABENDED") {
		              	     		item.state="异常";
		              	     	}
		              	     	if(item.status==="STOPPED"){
		              	     		item.state="停止";
		              	     	}
		              	     	if (curStage==="20") {
		              	     		item.positiveState="已关闭";//单条数据   正向复制
		              	     	}
	              	     }
	              	     if (curStage==="10") {
		              	     		item.switchResult="切换";//单条数据   切换状态
		              	     		item.positiveState="关闭";
		              	 }
		              	 if (curStage==="15") {
		              	     		item.positiveState="关闭";
		              	 }
	              	     if(item.status==="00"){
	              	     	item.switchResult="切换";//单条数据   切换状态 
	              	     	synMessage.nextBtn=true;
	              	     }
	              	     if(item.status==="01"){
	              	     	item.switchResult="切换完成";//单条数据   切换状态
	              	     }
	              	    });
	              	    angular.copy(synMessage,flowSwitchMessage);
	              }else{
	              	promisesServe.msgBar('warning',res.desc);
	              }
	        });
            }
		}
		  //当前流量状态请求/status/flowStatus
		function currentTrafficState(){
			param=	getParam('05');
	    	var url="/switch/switchStageBegin";
	    	var loa6=document.getElementById("loading");
	    	loa6.style.display="block";
	    	//请求部分-预案步骤开启---------------------------------------------------------
            httpServe.post(url, JSON.stringify(param)).then(function (res) {
		              if (res.state === "success") {
		              	var loa7=document.getElementById("loading");
		              	loa7.style.display="none";
				        if (res.data) {
				        	param.switchNumber = res.data.switchNumber;
		                	if (res.data.revise === '01') {
		                		//console.log('跳到状态检查页面');
		                		var appUrl=mainServe.getStateGo(res.data.currentStage);
						        $state.go(appUrl);
		                	}else
		                	if(res.data.revise === '03'){
		                		param.switchNumber = res.data.switchNumber;
		                	}else
		                	if(res.data.revise === '02'||res.data.revise === '04'||res.data.revise === '05'){
		                		var appUrl2=mainServe.getStateGo(res.data.currentStage);
						                		$state.go(appUrl2);
						                		//console.log('跳转对应页面');
		                		param.switchNumber = res.data.switchNumber;
		                	}
		                }
	              	    //console.log("预案定制步骤已开启");
	              	    var loa8=document.getElementById("loading");
				    	loa8.style.display="block";
				    	var url="/status/flowStatus";
				    	//请求部分-查询当前流量---------------------------------------------------------
			            httpServe.post(url).then(function (res) {
			              if (res.state === "success") {
			              	var loa9=document.getElementById("loading");
			              	loa9.style.display="none";
			              	flowMessage.southCenter=[];
			              	flowMessage.dgCenter=[];
			              	var sou=res.data.southCenter;
			              	var dg=res.data.dgCenter;
			              	 if(sou&&sou.length>0){
			              	 	for(var i=0;i<sou.length;i++){
			              	 		sou[i].className="south";
			              	 		sou[i].provName=getprovNames(sou[i].provNames);
			              	 		flowMessage.southCenter.push(sou[i]);
			              	   }
			              	 }
			              	 if(dg&&dg.length>0){
			              	 	for(var c=0;c<dg.length;c++){
			              	 		dg[c].className="DG";
			              	 		dg[c].provName=getprovNames(dg[c].provNames);
			              	 		flowMessage.dgCenter.push(dg[c]);
			              	   }
			              	 }
			              	   angular.copy(flowMessage,flowMessages);
			              	   //大区状态警告 status 00 正常 01 有误
					              	   	if(flowMessage.southCenter&&flowMessage.southCenter.length>0){
						              	 	for(var d=0;d<flowMessage.southCenter.length;d++){
						              	 		if (flowMessage.southCenter[d].status==='01') {
						              	 			flowMessage.southCenter[d].classNames="redcaveat";
						              	 		}

						              	   }
					              	    }
					              	    if(flowMessage.dgCenter&&flowMessage.dgCenter.length>0){
						              	 	for(var e=0;e<flowMessage.dgCenter.length;e++){
						              	 		if (flowMessage.dgCenter[e].status==='01') {
						              	 			flowMessage.dgCenter[e].classNames="redcaveat";
						              	 		}
						              	    }
					              	    }

			              }else{
			              	var loa10=document.getElementById("loading");
			              	loa10.style.display="none";
			              	promisesServe.msgBar('warning',res.desc);
			              }
			            });
              }else{
              	var loa11=document.getElementById("loading");
              	loa11.style.display="none";
              	promisesServe.msgBar('warning',res.desc);
              }
            });
            //处理数据  获得大区下的省份
            function getprovNames(data){
            	var  provNameStr="";
            	for (var x = 0;x<data.length - 1;  x++) {
            		provNameStr+=data[x]+',';
            	}
            	provNameStr+=data[data.length-1];
            	return provNameStr;
            }
	    }
	    //预案定制 调整大区 左右切换
	    function adjustment(name,value,index){
	    	$("#cover").addClass('cover');
	    	if (value===1) {
	    		var position={
	    			'0':'dgone',
	    			'1':'dgtwo',
	    			'2':'dgthree',
	    			'3':'dgfour',
	    			'4':'dgfive'
	    	    }
	    	    var id=$filter('getid')(name.regionCHName);
	    	    $("#"+id).addClass(position[flowMessages.dgCenter.length]);
	    	    $timeout(function(){
	    	    	flowMessages.southCenter.splice(index,1);
	    	    	var arr=[];
	    	    	arr=angular.copy(flowMessages.southCenter);
	    	    	flowMessages.southCenter=[];
	    	    	$timeout(function(){
	    	    		for(var i=0;i<arr.length;i++){
	    	    		  flowMessages.southCenter.push(arr[i]);
	    	    	    }
	    	        },10);
	    	        flowMessages.dgCenter.push(name);
	    	    },600);
	    	}else if(value===2){
	    		var position2={
	    			'0':'njone',
	    			'1':'njtwo',
	    			'2':'njthree',
	    			'3':'njfour',
	    			'4':'njfive'
	    	    }
	    	    var id1=$filter('getid')(name.regionCHName);
	    	    $("#"+id1).addClass(position2[flowMessages.southCenter.length]);
	    	    $timeout(function(){
	    	    	flowMessages.dgCenter.splice(index,1);
	    	    	var arr=[];
	    	    	arr=angular.copy(flowMessages.dgCenter);
	    	    	flowMessages.dgCenter=[];
	    	    	$timeout(function(){
	    	    		for(var n=0;n<arr.length;n++){
	    	    		  flowMessages.dgCenter.push(arr[n]);
	    	    	    }
	    	        },10);
	    	        flowMessages.southCenter.push(name);
	    	    },600);
	    	}
	    	$timeout(function(){
	    		goReverseSyn();
	    		$("#cover").removeClass('cover');
	    	},700);

	    }
	    //到反向同步 获得切换  数据
	    function goReverseSyn(){
	    	switchData.data=[];
	    	angular.forEach(flowMessages.southCenter,function(item){
	    			if (!compared(flowMessage.southCenter,item.regionName)) {
	    				var areaTemp={};   //单条数据
		    			areaTemp.regionCHName=item.regionCHName; //单条数据  大区名称
		    			areaTemp.theirBases="DG";//单条数据  当前大区 所属基地代码
		    			areaTemp.theirBase="东莞";//单条数据  当前大区 所属基地
		    			areaTemp.directions="NJ";//单条数据   流向基地代码
		    			areaTemp.direction="南基";//单条数据   流向基地
		    			areaTemp.reverseState="开启";//单条数据    反向复制
		    			areaTemp.positiveState="关闭";//单条数据   正向复制
		    			areaTemp.switchResult="切换";//单条数据   切换状态
		    			areaTemp.regionName=item.regionName;//单条数据  大区编号
		    			switchData.data.push(areaTemp);
	    			}
	    		});
	    	angular.forEach(flowMessages.dgCenter,function(item){
	    		if (!compared(flowMessage.dgCenter,item.regionName)) {
	    				var areaTemp={};   //单条数据
		    			areaTemp.regionCHName=item.regionCHName; //单条数据  大区名称
		    			areaTemp.theirBases="NJ";//单条数据  当前大区 所属基地代码
		    			areaTemp.theirBase="南基";//单条数据  当前大区 所属基地
		    			areaTemp.directions="DG";//单条数据   流向基地代码
		    			areaTemp.direction="东莞";//单条数据   流向基地
		    			areaTemp.reverseState="开启";//单条数据    反向复制
		    			areaTemp.positiveState="关闭";//单条数据   正向复制
		    			areaTemp.switchResult="切换";//单条数据   切换状态
		    			areaTemp.regionName=item.regionName;//单条数据   大区编号
		    			switchData.data.push(areaTemp);
	    			}
	    	});
	    	synMessage.data=[];
	    	angular.copy(switchData.data,synMessage.data);
	    	//查找对象是否存在
	    	function compared(data,item){
	    		for(var i=0;i<data.length;i++){
	    			if (data[i].regionName===item) {
	    				return true;
	    			}
	    		}
	    		return false;
	    	}
	    }
	    //获得同步表格数据   清除切换数据
	    function getSynData(str,value,index){
            if(synMessage.data&&synMessage.data.length>0){
            		//记录步骤-----结束预案定制   开始反向同步
            	    if(synMessage.data.length>0 &&str==='05'&&switchData.data.length>0){
		             	param=	getParam('05');//NJ-01,DG-02
		             	param.switchRegion="";//要切换的大区
		             	//拼接切换的大区，NJ-03的形式
		             	for(var i=0;i<synMessage.data.length-1;i++){
		             		param.switchRegion+=synMessage.data[i].directions+"-"+synMessage.data[i].regionName+",";
		             	}
		             	param.switchRegion+=synMessage.data[synMessage.data.length-1].directions+"-"+synMessage.data[synMessage.data.length-1].regionName;
				    	var url="/switch/switchStageEnd";
				    	var loa12=document.getElementById("loading");
				    	loa12.style.display="block";
		             	//请求部分-预案定制 步骤关闭---------------------------------------------------------
			            httpServe.post(url, JSON.stringify(param)).then(function (res) {
				                if (res.state === "success") {
				                	var loa13=document.getElementById("loading");
				                	loa13.style.display="none";
				                	$state.go('disasterRec.operationLast');
				                	switchData.data=[];
					             	//console.log("预案定制步骤已结束");
				                }else{
				                	var loa14=document.getElementById("loading");
				                	loa14.style.display="none";
				              	    promisesServe.msgBar('warning',res.desc);
				                }
			            });
	                }

	                //记录步骤-----结束均衡策略   开始正向同步
            	    if(str==='15'){
		             	param=	getParam('15');
				    	var url3="/switch/switchStageEnd";
				    	var loa15=document.getElementById("loading");
				    	loa15.style.display="block";
		             	//请求部分-均衡策略 步骤关闭---------------------------------------------------------
			            httpServe.post(url3, JSON.stringify(param)).then(function (res) {
				                if (res.state === "success") {
				                	var loa16=document.getElementById("loading");
				    	            loa16.style.display="none";
					             	//请求部分-正向 步骤开始----------------------------------------
					             	var tempParam=getParam('20');
					             	var tempUrl="/switch/switchStageBegin";
					             	//console.log("均衡策略步骤已结束");
						            httpServe.post(tempUrl, JSON.stringify(tempParam)).then(function (res) {
						              if (res.state === "success") {
						              	var loa17=document.getElementById("loading");
						              	loa17.style.display="none";
									   if (res.data) {
									   	    param.switchNumber = res.data.switchNumber;
						                	if (res.data.revise === '01') {
						                		var appUrl3=mainServe.getStateGo(res.data.currentStage);
						                		$state.go(appUrl3);
						                	}else
						                	if(res.data.revise === '03'){
						                		param.switchNumber = res.data.switchNumber;
						                	}else
						                	if(res.data.revise === '02'||res.data.revise === '04'||res.data.revise === '05'){
						                		var appUrl4=mainServe.getStateGo(res.data.currentStage);
						                		$state.go(appUrl4);
						                		param.switchNumber = res.data.switchNumber;
						                	}
						                }
										// console.log("正向步骤已开始");
						              }else{
						              	var loa18=document.getElementById("loading");
						              	loa18.style.display="none";
						              	promisesServe.msgBar('warning',res.desc);
						              }
						            });
				                }else{
				                	var loa19=document.getElementById("loading");
				                	loa19.style.display="none";
				              	    promisesServe.msgBar('warning',res.desc);
				                }
			            });
	                }
	                //记录步骤-----结束正向   开始更新大区状态表
            	    if(str==='20'){
		             	param=	getParam('20');
				    	var url1="/switch/switchStageEnd";
				    	var loa20=document.getElementById("loading");
				    	loa20.style.display="block";
		             	//请求部分-正向 步骤关闭---------------------------------------------------------
			            httpServe.post(url1, JSON.stringify(param)).then(function (res) {
				                if (res.state === "success") {
				                	var loa21=document.getElementById("loading");
				                	loa21.style.display="none";
					             	//请求部分-更新大区状态表 步骤开始----------------------------------------
					             	var tempParam=getParam('25');
					             	var tempUrl="/switch/switchStageBegin";
					             	//console.log("正向步骤已结束");
						            httpServe.post(tempUrl, JSON.stringify(tempParam)).then(function (res) {
						            	var loa22=document.getElementById("loading");
						              	loa22.style.display="none";
						              if (res.state === "success") {
						              	    param.switchNumber = res.data.switchNumber;
										    $state.go('disasterRec.operationConfirmSwitch');
						              	    //console.log("更新大区状态表步骤已开始");
						              }else{
						              	promisesServe.msgBar('warning',res.desc);
						              }
						            });
				                }else{
				                	var loa23=document.getElementById("loading");
				                	loa23.style.display="none";
				              	    promisesServe.msgBar('warning',res.desc);
				                }
			            });
	                }
            		var syncStartParam=	{};		 //开启反向和关闭正时传的参数
	                syncStartParam.regionName=str.regionName;
	              	synMessage.nextBtn1=true;
	              	synMessage.nextBtn3=true;


	                //开启反向同步---- 南基->东莞=2，东莞->南基=1
	                if (value===1&&str.reverseState==="开启") {
	                	str.loading=true;

	                	if(str.direction==='东莞'){
	                		syncStartParam.direction=2;
	                	}else{
	                		syncStartParam.direction=1;
	                	}
				    	var url2="/switch/syncStart";
				    	//请求部分-开启反向---------------------------------------------------------
				    	synMessage.data[index].reverseState="开启中";
				    	load.style.display="block";
			            httpServe.post(url2, JSON.stringify(syncStartParam)).then(function (res) {
			            	load.style.display="none";
			              if (res.state === "success") {
			              	if (res.data === "RUNNING") {
			              		synMessage.data[index].reverseState="已开启";
			              	    synMessage.data[index].state="运行";
			              	    synMessage.data[index].loading=false;
			              	    promisesServe.msgBar('success','开启成功！');

			              	}
			              	if (res.data !== "RUNNING") {
			              		synMessage.data[index].state="关闭";
			              		synMessage.data[index].reverseState="开启";
			              	    promisesServe.msgBar('warning',res.desc);
			              	}
			              	  //检查是否存在未开启
			              	    $timeout(function() {
				              	    //将数据复制到流量切换
				              	    flowSwitchMessage.data=[];
							        angular.copy(synMessage.data,flowSwitchMessage.data);
							        synMessage.tempReverseState=[];
				                	angular.forEach(synMessage.data,function(item){
				                	synMessage.tempReverseState.push(item.reverseState);
					                });
					                if(synMessage.tempReverseState.indexOf("开启")>=0||synMessage.tempReverseState.indexOf("开启中")>=0){
					                	synMessage.nextBtn1=true;
					                }else{
					                	synMessage.nextBtn1=false;
					                }
			                    }, 0);
			              }else{
			              	synMessage.data[index].reverseState="开启";
			              	promisesServe.msgBar('warning',res.desc);
			              }
			            });
	                }
	                //开启正向同步  ---- 南基->东莞=1，东莞->南基=2
	                if (value===2&&str.positiveState==="关闭") {
	                	str.loading3=true;

	                	if(str.direction==='东莞'){
	                		syncStartParam.direction=1;
	                	}else{
	                		syncStartParam.direction=2;
	                	}
				    	var url4="/switch/syncStop";
				    	//请求部分 开启正向---------------------------------------------------------
				    	synMessage.data[index].positiveState="关闭中";
				    	load.style.display="block";
			            httpServe.post(url4, JSON.stringify(syncStartParam)).then(function (res) {
			            	load.style.display="none";
			              if (res.state === "success") {
			              	if (res.data === "RUNNING") {
			              		synMessage.data[index].state="运行";
			              		synMessage.data[index].positiveState="关闭";
			              	    promisesServe.msgBar('warning',res.desc);
			              	}
			              	if (res.data !== "RUNNING") {
			              		synMessage.data[index].positiveState="已关闭";
			              	    synMessage.data[index].state="停止";
			              	    synMessage.data[index].loading3=false;
			              	    promisesServe.msgBar('success','关闭成功！');

			              	}
			              	 //检查是否存在未关闭
			              	    $timeout(function() {
			              	    	synMessage.tempPositiveState=[];
					                angular.forEach(synMessage.data,function(item){
					                	synMessage.tempPositiveState.push(item.positiveState);
					                });
					                if(synMessage.tempPositiveState.indexOf("关闭")>=0||synMessage.tempPositiveState.indexOf("关闭中")>=0){
					                	synMessage.nextBtn3=true;
					                }else{
					                	synMessage.nextBtn3=false;
					                }
			                    }, 0);
			              }else{
			              	synMessage.data[index].positiveState="关闭";
			              	promisesServe.msgBar('warning',res.desc);
			              }
			            });
	                }
	        }
            if((!switchData.data&&str==='05')||(switchData.data&&switchData.data.length===0 && str==='05')){
        		  promisesServe.msgBar('warning',"请选择要切换的大区！");
            }
	    }
	    //切换实施 流量切换的表格数据
	    function getFlowSwitch(str,index){
	    	    //反向步骤结束
	    	    if(str==="10"){
	    	    	param=	getParam('10');
				    	var url="/switch/switchStageEnd";
				    	var loa24=document.getElementById("loading");
				    	loa24.style.display="block";
		             	//请求部分-反向 步骤关闭---------------------------------------------------------
			            httpServe.post(url, JSON.stringify(param)).then(function (res) {
				                if (res.state === "success") {
				                	var loa25=document.getElementById("loading");
				                	loa25.style.display="none";
					             	//请求部分-开启OGG反向复制 步骤开始----------------------------------------
					             	var tempParam=getParam('15');
					             	var tempUrl="/switch/switchStageBegin";
					             	//console.log("反向步骤已结束");
					             	loa25.style.display="block";
						            httpServe.post(tempUrl, JSON.stringify(tempParam)).then(function (res) {
						              if (res.state === "success") {
						              	param.switchNumber = res.data.switchNumber;
						              	var loa26=document.getElementById("loading");
						              	loa26.style.display="none";
										if (res.data) {
					                	if (res.data.revise === '01') {
					                		var appUrl5=mainServe.getStateGo(res.data.currentStage);
						                		$state.go(appUrl5);
					                	}else
					                	if(res.data.revise === '03'){
					                		param.switchNumber = res.data.switchNumber;
					                		//console.log(param.switchNumber);
					                	}else
					                	if(res.data.revise === '02'||res.data.revise === '04'||res.data.revise === '05'){
					                		var appUrl=mainServe.getStateGo(res.data.currentStage);
						                		$state.go(appUrl);
						                		//console.log('跳转对应页面');
					                		param.switchNumber = res.data.switchNumber;
					                	}
					                }
						              	   // console.log("配置均衡策略步骤已开始");
						              	    //console.log(flowSwitchMessage);
						              	    flowSwitchMessage.nextBtn=true;
						              }else{
						              	var loa27=document.getElementById("loading");
						              	loa27.style.display="none";
						              	promisesServe.msgBar('warning',res.desc);
						              }
						            });
				                }else{
				                	var loa28=document.getElementById("loading");
				                	loa28.style.display="none";
				              	    promisesServe.msgBar('warning',res.desc);
				                }
			            });
	    	    }
	    	     if(str.switchResult){
	    	     	str.loading2=true;

			    	var switchParam={};
			    	switchParam.regionName=str.regionName;
	                switchParam.center=str.directions;
			    	var url5="/switch/flowSwitch";
			    	flowSwitchMessage.data[index].switchResult="正在切换";
			    	load.style.display="block";
				    	//请求部分 切换   配置均衡策略---------------------------------------------------------
			            httpServe.post(url5, JSON.stringify(switchParam)).then(function (res) {
			            	load.style.display="none";
			              if (res.state === "success") {
			              	     if (res.data==='00') {//'00'切换成功 state:正常，'01'切换失败 state:失败
				              	     	 flowSwitchMessage.data[index].switchResult="切换完成";
				              	     	 flowSwitchMessage.data[index].flowState="正常";
					              	     flowSwitchMessage.data[index].loading2=false;
					              	     promisesServe.msgBar('success','切换成功！');
					              	    //检查是否全部切换完成
						                $timeout(function() {
						                    flowSwitchMessage.tempSwitchResult=[];//.flowDirection
							                angular.forEach(flowSwitchMessage.data,function(item){
							                	flowSwitchMessage.tempSwitchResult.push(item.switchResult);
							                });
							                if(flowSwitchMessage.tempSwitchResult.indexOf("切换")>=0||flowSwitchMessage.tempSwitchResult.indexOf("正在切换")>=0){
							                	flowSwitchMessage.nextBtn=true;
							                }else{
							                	flowSwitchMessage.nextBtn=false;
							                }
						                }, 0);
			              	     }else{
			              	     	flowSwitchMessage.data[index].switchResult="切换";
			              	     	flowSwitchMessage.data[index].flowState="失败";
			              	     	promisesServe.msgBar('warning','切换失败！');
			              	     }

			              }else{
			              	flowSwitchMessage.data[index].switchResult="切换";
			              	promisesServe.msgBar('warning',res.desc);
			              }
			            });

	    	    }
	    }
	    //获得确认切换报告数据
	    function getConfirmSwitch(){
	    	    param=getParam('25');
		    	var url="/switch/switchReport";
		    	var loa29=document.getElementById("loading");
			    	loa29.style.display="block";
			    	reportMessage.switchNumber="";
		    	//请求部分----------------------------------------------------------
	            httpServe.post(url,JSON.stringify(param)).then(function (res) {
	              if (res.state === "success") {
	              	var loa30=document.getElementById("loading");
	              	loa30.style.display="none";
	              	reportMessage.data=[];
	                angular.copy(res.data,reportMessage);
	                reportMessage.exist="y";
	                if (param.switchNumber) {
	                	reportMessage.switchNumber=param.switchNumber;
	                }
	                reportMessage.startTime1=getDate(reportMessage.operationBeginTime);
	                reportMessage.stateCheckTime2=getDate(reportMessage.checkStatusBeginTime)+"到"+
	                getDate(reportMessage.checkStatusEndTime)+"耗时 ";
	                reportMessage.timeConsuming2=getDifference(reportMessage.checkStatusBeginTime,reportMessage.checkStatusEndTime);

	                reportMessage.customMadeTime3=getDate(reportMessage.planSetBeginTime)+"到"+
	                getDate(reportMessage.planSetEndTime)+"耗时";
	                reportMessage.timeConsuming3=getDifference(reportMessage.planSetBeginTime,reportMessage.planSetEndTime);

	                reportMessage.switchTime4=getDate(reportMessage.switchBeginTime)+"到"+
	                getDate(reportMessage.switchEndTime)+"耗时";
	                reportMessage.timeConsuming4=getDifference(reportMessage.switchBeginTime,reportMessage.switchEndTime);

	                reportMessage.carryoutTime5=getDate(reportMessage.operationEndTime);
	                reportMessage.totalTime6=getDate(reportMessage.operationBeginTime)+"到"+
	                getDate(reportMessage.switchEndTime)+"耗时";
	                reportMessage.timeConsuming6=getDifference(reportMessage.operationBeginTime,reportMessage.operationEndTime);
	              }else{
	              	var loa31=document.getElementById("loading");
	              	loa31.style.display="none";
	              	promisesServe.msgBar('warning',res.desc);
	              	reportMessage.exist="n";
	              }
	            });
	            //获得字符串格式的日期
	            function getDate(value){
	            	var stringData='';
	            	var date=new Date(value);
	            	stringData=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '
	            	+getFullNum(date.getHours())+':'+getFullNum(date.getMinutes())+':'+getFullNum(date.getSeconds());
	            	return stringData;
	            }
	            //获得相差时间，耗时-分-秒
	            function getDifference(value1,value2){
	            	var str="";
	            	var difference=value2-value1;
	            	var ss=Math.floor(difference/1000);//相差的总秒数
	            	var mm=Math.floor(difference/(1000*60));//相差总分钟数
	            	var h=Math.floor(difference/(1000*60*60));//相差的小时数
	            	var m=Math.floor(mm-(h*60));
	            	var s=Math.floor(ss-(m*60+(h*60*60)));
	            	if (h>0) {
	            		str=h+'小时'+m+"分钟"+s+"秒";
	            		return str;
	            	}else if(m>0){
	            		str=m+"分钟"+s+"秒";
	            		return str;
	            	}else{
	            		str=s+"秒";
	            	}
	            	return str;
	            }
	            //数字小于10补零
	            function getFullNum(value){
	            	  if(value<10){
	            	  	value='0'+value;
	            	  }
	            	 return value;
	            }
	    }
	    //停止切换
	    function stopeSwitch(value){
	    	    if (value==='25') {//结束
	    	    	//跳转到初始页面
	    	    	$state.go('disasterRec.outside');
	    	    	//记录步骤-----结束更新大区状态表
	                return;
	    	    }
	    	    //终止切换
	    	    param=	getParam(value);
		    	var url="/switch/switchStageTermination";
		    	var isStop=window.confirm("确认结束本次操作？");
		    	if(isStop){
		    		var loa32=document.getElementById("loading");
			    	loa32.style.display="block";
		    		//请求部分----------------------------------------------------------
	                 httpServe.post(url,JSON.stringify(param)).then(function (res) {
	                 	var loa33=document.getElementById("loading");
		               	loa33.style.display="none";
		               if (res.state === "success") {
		                  $state.go('disasterRec.monitor');
		               }else{
		               	promisesServe.msgBar('warning',res.desc);
		               }
	                });
		    	}
	    }
	};
	operationLateSer.$inject = ['$timeout','httpServe','promisesServe','$state','operationInfo','mainServe','$filter'];
})();
