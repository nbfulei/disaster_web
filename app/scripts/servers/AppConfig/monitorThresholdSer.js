'use strict'
;(function (angular){
 	angular.module('services.monitorThresholdSer',[]).factory('monitorThresholdSer',monitorThresholdSer);
 	function monitorThresholdSer(httpServe,promisesServe){
 		var catalog={};
 		var monitorThresholdMe=[];
 		var addResult={};
 		var setThread={};
 		var setThread1={};
 		var id={ids:[]};
 		var deleteData={ids:[]};
 		var params={};
 		var newData={};
 		var page={};
 		var operationNoteMessage={};
 		
    	return {
    		query:query,
    		monitorThresholdMe:monitorThresholdMe,
    		initQueryParam:initQueryParam,
    		addResult:addResult,
    		addMessage:addMessage,
    		setThread:setThread,
    		setThread1:setThread1,
    		clearMessage:clearMessage,
    		termQuery:termQuery,
    		catalog:catalog,
    		getDatas:getDatas,
    		deleteBox:deleteBox,
    		deleteDatas:deleteDatas,
    		deleteData:deleteData,
    		updateBox:updateBox,
    		newData:newData,
    		getInstance:getInstance,
    		getGuardVal:getGuardVal,
    		getAnomalyVal:getAnomalyVal,
    		getUnit:getUnit,
    		updateNewData:updateNewData,
    		turnToPage:turnToPage,
    		getRemark:getRemark,
    		getComponentsId:getComponentsId,
    		operationNoteMessage:operationNoteMessage,
    		getLastTime:getLastTime,
    		getType:getType,
    		page:page,
    		item_:item_
    		
    	}

    


    		//初始化查询
    	function query(){
    		httpServe.getMonitorMe(JSON.stringify(catalog)).then(function(res){
    			if(res.state==='success'){
    				angular.copy(res,monitorThresholdMe);
    				changeComponentsId();
    				angular.forEach(monitorThresholdMe.data.datas,function(item){
    					item.checkbox=false;
    				})			
    			}
    		})	
    	}


    	function getLastTime(){
    	httpServe.getOpTimeInfo(JSON.stringify(catalog)).then(function(res){
	        if(res.state === 'success'){
	            angular.copy(res,operationNoteMessage);
	        }
	      	})	   
    	}


    	function item_(a){
    		if(a === 'PING'){
    			setThread1.unit ='ms'; 	
    		}else{
    			setThread1.unit = '%'
    		}
    	 
    	}
    	//分页初始化
	    function initQueryParam(){
	      catalog.currentPage = 1;
	      catalog.pageCount = 5;
	      params={item:""};
	      params.currentPage=catalog.currentPage;
	      params.pageCount=catalog.pageCount;
	      	angular.copy(params,catalog);
	      	
	    }
	    	//goPage方法
	    function turnToPage(currentPage){
	  		page.currentPage=currentPage;
	  		page.pageCount=5;
	  		httpServe.getMonitorMe(JSON.stringify(page)).then(function(res){
	    		if(res.state === 'success'){
	    			angular.copy(res,monitorThresholdMe);
	    			changeComponentsId();
	    			deleteData.ids=[];
	    		}
	    	})
	  	
	    }

	    function changeComponentsId(){
	    	angular.forEach(monitorThresholdMe.data.datas,function(item){
	    		if(item.componentsId === '1'){
	    			item.componentsId = '天猫前置';
	    		}else if(item.componentsId === '2'){
	    			item.componentsId = '天猫核心';
	    		}else if(item.componentsId === '3'){
	    			item.componentsId = '天猫省前置';
	    		}else if(item.componentsId === '4'){
	    			item.componentsId = '天猫MQ';
	    		}else if(item.componentsId === '5'){
	    			item.componentsId = '天猫数据库';
	    		}
	    	})
	    }

	    //条件查询
	    function termQuery(){
	      var url="/operation/monitoring/queryConfig";
	      catalog.currentPage = 1;
	      catalog.pageCount = 5;
	      angular.copy(catalog,page);
	      	if(catalog !== undefined){
	      		httpServe.post(url,JSON.stringify(catalog)).then(function(res){
	      			if(res.state === 'success'){
	      				angular.copy(res,monitorThresholdMe);
	      				changeComponentsId();
	      			}else{
	      				promisesServe.msgBar('warning',res.desc);
	      			}
	      		})
	      	}
	      	deleteData.ids=[];
	    }
	      //清除模态框数据
	    function clearMessage(){ 
	      setThread1.item='';
	      setThread1.guardVal='';
	      setThread1.anomalyVal='';
	      setThread1.type='';
	      setThread1.componentsId='';
	      setThread1.unit='';
	      setThread1.remark='';
	    }
	    //模态框数据
	    function initMessage(){
	      params.item=setThread1.item;
	      params.guardVal=setThread1.guardVal;
	      params.anomalyVal=setThread1.anomalyVal;
	      params.type=setThread1.type;
	      params.componentsId=setThread1.componentsId;
	      params.unit=setThread1.unit;
	      params.remark=setThread1.remark;
	      return params;
	    }


	    	//新增信息
	    function addMessage(){
	      var initDatas=initMessage();
	       initDatas.currentPage = 1;
	       initDatas.pageCount = 5;
	      var url='/operation/monitoring/saveConfig';
	      		if(Number(params.anomalyVal) <= Number(params.guardVal)){
	      			promisesServe.msgBar('warning','警戒阈值要小于异常阈值');
	      			query();
	      			}else{
	      				if(initDatas !== undefined){
	      					if(initDatas.remark === undefined){
	      						initDatas.remark = '';
	      					}
	   					httpServe.post(url,JSON.stringify(initDatas)).then(function(res){
	          			if(res.state==='success'){
	          			promisesServe.msgBar('success',res.desc);
	          			clearMessage();
	          			query();
	          			getLastTime();
	          			}else{
	            		promisesServe.msgBar('warning', res.desc);
	            		query();
	            		clearMessage();
	          			}
	     				 })
	   					}     		
	      		}
	    }
	    	//获取要删除的数据
	    function getDatas(data_id){	    	
	    	deleteData.data=[];
	    	newData.id=data_id;
	    	angular.forEach(monitorThresholdMe.data.datas,function(item){
	    		if(item.checkbox === true){
	    			if(deleteData.data.indexOf(data_id) === -1){
	    				deleteData.data.push(item);
	    			}
	    			angular.copy(item,setThread)
	    		}
	    	});
	    	deleteData.ids=[];
	    	angular.forEach(deleteData.data,function(val){
	    			deleteData.ids.push(val.id);
	    	});
	    }


	    //删除模态框的几种情况
	    function deleteBox(){

	    	
	    	if(deleteData.ids.length===0){
	    		promisesServe.msgBar('warning','请选择一条数据');
	    	}else if(deleteData.ids.length !== 0){
	    		$('#myModal3').modal('show');
	    	}
	    }
	    //更新模态框的几种情况
	    function updateBox(){
	    	if(deleteData.ids.length > 1){
	    		promisesServe.msgBar('warning','最多选择一条数据');
	    	}else if(deleteData.ids.length === 0){
	    		promisesServe.msgBar('warning','请选择一条数据');
	    	}else if(deleteData.ids.length === 1){
	    		$('#myModal2').modal('show');
	    	}
	    }
	    //获取输入框中的新值 

	       function getInstance(data){	    	
	    	newData.item=data;
	    }
	       function getGuardVal(data){	    	
	    	newData.guardVal=data;
	    }
	       function getAnomalyVal(data){	    	
	    	newData.anomalyVal=data;
	    }
	        function getType(data){	    	
	    	newData.type=data;
	    }
	        function getComponentsId(data){	    	
	    	newData.componentsId=data;
	    }
	       function getUnit(data){	    	
	    	newData.unit=data;
	    }
	        function getRemark(data){	    	
	    	newData.remark=data;
	    }
	    //将获取到的新值发送给后台
	    function updateNewData(){
	      var url="/operation/monitoring/updateConfig";
	      newData.currentPage = 1;
	      newData.pageCount = 5;
	      angular.forEach(monitorThresholdMe.data.datas,function(item){

	      		if(setThread.componentsId === '天猫前置'){
	    			setThread.componentsId = '1';
	    		}else if(setThread.componentsId === '天猫核心'){
	    			setThread.componentsId = '2';
	    		}else if(setThread.componentsId === '天猫省前置'){
	    			setThread.componentsId = '3';
	    		}else if(setThread.componentsId === '天猫MQ'){
	    			setThread.componentsId = '4';
	    		}else if(setThread.componentsId === '天猫数据库'){
	    			setThread.componentsId = '5';
	    		}
	      		

	    		if(item.item === setThread.item){
	    			newData.item=item.item;
	    		}
	    		if(item.guardVal === setThread.guardVal){
	    			newData.guardVal=item.guardVal;
	    		}
	    		if(item.anomalyVal === setThread.anomalyVal){
	    			newData.anomalyVal=item.anomalyVal;
	    		}
	    		if(item.type === setThread.type){
	    			newData.type=item.type;
	    		}
	    		if(item.unit === setThread.unit){
	    			newData.unit=item.unit;
	    		}
	    			
	    		
	    		newData.componentsId=setThread.componentsId;


	    	})

			if(Number(newData.anomalyVal) <= Number(newData.guardVal)){
				promisesServe.msgBar('warning','警戒阈值要小于异常阈值');
				query();
			}else{
				if(catalog !== undefined){
					if (!setThread.remark||setThread.remark===undefined) {
						newData.remark='';
					}
					
	      		httpServe.post(url,JSON.stringify(newData)).then(function(res){
	      		if(res.state ==='success'){
	      			promisesServe.msgBar('success',res.desc);
	      			getLastTime();
	      			query();
	      		}else{
	      			promisesServe.msgBar('warning',res.desc);
	      			query();
	      		}	
	      	})
	      }
			}	   
	        
	      deleteData.ids=[];
	    }

	    //确认删除操作
	    function deleteDatas(){
	    	id.ids=deleteData.ids;
	    	var url='/operation/monitoring/deleteConfig';
	    	if(deleteData !== undefined){
	    		httpServe.post(url,JSON.stringify(id)).then(function(res){
	    			if(res.state === 'success'){
	    				promisesServe.msgBar('success', res.desc);
	    				getLastTime();
	    				catalog.currentPage = 1;
	    				query();
	    			}else{
	    				promisesServe.msgBar('warning', res.desc);
	    			}
	    		})
	    	}
	    	deleteData.ids=[];
	    }



 	}
 	monitorThresholdSer.$inject = ['httpServe','promisesServe'];
})(angular);