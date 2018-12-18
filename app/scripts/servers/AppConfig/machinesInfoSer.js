'use strict'
;(function (angular){
 	angular.module('services.machinesInfoSer',[]).factory('machinesInfoSer',machinesInfoSer);
 	function machinesInfoSer(httpServe,promisesServe,$timeout,hostQuerySer){
 		var machinesMessage = {};
        var catalog = {};
 		var catalogNew = {};
 		var addBatch = {};
 		var oldData = {};
 		var delData = {id:""};
        var changeNewData = {};
 		var host = {};
 		var operationNoteMessage = {};
        var regionList = [{value:"华东",label:"华东"},
                          {value:"华西",label:"华西"},
                          {value:"华北",label:"华北"},
                          {value:"中部",label:"中部"},
                          {value:"西部",label:"西部"}];
        var rackList = [{value:"NJ",label:"南方基地"},
                        {value:"DG",label:"东莞基地"},
                        {value:"other",label:"其他"}];
    	return {
    		machinesMessage:machinesMessage,
    		catalog:catalog,
    		initQueryParam:initQueryParam,
    		queryMachinesInfo:queryMachinesInfo,
    		setCurrentPageMachines:setCurrentPageMachines,
    		addBatch:addBatch,
    		addConfig:addConfig,
    		delData:delData,
    		changeNewData:changeNewData,
    		clickUpdate:clickUpdate,
    		batchProcessing:batchProcessing,
    		oldData:oldData,
    		clickDel:clickDel,
    		delConfig:delConfig,
    		gainMName:gainMName,
    		gainIp:gainIp,
    		gainArea:gainArea,
    		gainRack:gainRack,
    		gainRemark:gainRemark,
    		sendNewData:sendNewData,
    		operationNoteMessage:operationNoteMessage,
    		getOpTime:getOpTime,
            getName:getName,
            termQuery:termQuery,
            clearBatch:clearBatch,
            regionList:regionList,
            rackList:rackList,
            host:host
    	}
    	
    	function initQueryParam(){
      		catalog.currentPage = 1;
      		catalog.pageCount = 5;
      		var params = {
          		name: ""
        	};
        	params.currentPage=catalog.currentPage;
        	params.pageCount=catalog.pageCount;
        	angular.copy(params, catalog);
          return catalog;
    	}
    	//机器信息查询 
    	function queryMachinesInfo(){
            host = hostQuerySer.hostQueryInfo();
            catalog.currentPage = 1;
            catalog.pageCount = 5;
            catalog.name = "";
        		httpServe.getmachinesMessageInfo(JSON.stringify(catalog)).then(function(res){
            		if(res.state==='success'){
               			angular.copy(res,machinesMessage);
                        angular.forEach(machinesMessage.data.datas,function(itme){
                            itme.checkbox = false;
                            
                        });
               		}else{
                        promisesServe.msgBar('warning',res.desc);
                  }
           		})
    	}
    	//分页 
    	function setCurrentPageMachines(currentPage){
            delData.id = "";
    		$timeout(function(){
                catalogNew.currentPage=currentPage;
                catalogNew.pageCount=5;
                catalogNew.name=catalog.name;
    	        httpServe.getmachinesMessageInfo(JSON.stringify(catalogNew)).then(function(res){
        	        if(res.state === 'success'){
        	            angular.copy(res,machinesMessage);
        	        }else{
                        promisesServe.msgBar('warning',res.desc);
                  }
    	      	})
	      	},0)
    	}
        //获取查询条件
        function getName(data){
            catalog.name = data;
        }
        //条件查询
        function termQuery(){
            var url = "/manage/machine/query";
                delData.id = "";
                catalog.currentPage=1;
                catalog.pageCount=5;
                angular.copy(catalog,catalogNew);
              if (catalog !== undefined) {
                  httpServe.post(url, JSON.stringify(catalog)).then(function (res) {
                  if (res.state === "success") {
                    angular.copy(res, machinesMessage);
                   angular.forEach(machinesMessage.data.datas,function(itme){
                        itme.checkbox = false;
                    });
                  }else{
                    promisesServe.msgBar('warning',res.desc);
                  }
                })
              }
        } 
    	//新增
    	function addConfig(){
    		var url = "/manage/machine/add";
    		$timeout(function () {
	          if (addBatch !== undefined) {
	              httpServe.post(url, JSON.stringify(addBatch)).then(function (res) {
	              if (res.state === "success") {
	              	promisesServe.msgBar('success',"新增成功！");
                    clearBatch();
	              	queryMachinesInfo();
	              }else{
                    clearBatch();
	                promisesServe.msgBar('warning',res.desc);
	              }
	            })
	          }
	        }, 0)
    	}
        //点击取消清空数据
        function clearBatch(){
            addBatch.name = "";
            addBatch.ip = "";
            addBatch.area = "";
            addBatch.rack = "";
            addBatch.remark = "";
        }

    	//获取要修改/删除的 数据 
    	function batchProcessing(id,value){
            angular.forEach(machinesMessage.data.datas,function(itme){                
                if(id===itme.id){
                    angular.copy(itme,oldData);
                    if(itme.checkbox === false){
                        delData.id = "";
                    }else{
                        delData.id = itme.id;
                    }
                    console.log(delData.id);
                    delData.hostName = itme.name;
                }else{
                    itme.checkbox = false;
                }

            })
            
        }
        //点击删除按钮
        function clickDel(){
            if(delData.id===''){
                promisesServe.msgBar('warning','请选择一条数据进行此操作！');
            }
            angular.forEach(machinesMessage.data.datas,function(itme){
                if (itme.checkbox===true) {
                    $("#delDataModal").modal("show");
                }
            })

            var hostNameArr = [];
                angular.forEach(host,function(itme){
                    hostNameArr.push(itme.hostName);
                })
            if(hostNameArr.indexOf(delData.hostName) !== -1){
                $("#message").css("display","block");
            }else{
                $("#message").css("display","none");
            }
        }
        //确认删除
        function delConfig(){
        	var url = "/manage/machine/delete";
                  if (delData !== undefined) {
                         httpServe.post(url, JSON.stringify(delData)).then(function (res) {
                          if (res.state === "success") {
                            promisesServe.msgBar('success', "删除成功！");
                            queryMachinesInfo();
                            angular.copy(res, machinesMessage);
                          }else{
                            promisesServe.msgBar('warning',res.desc);
                          }
                        }) 
                  }
            $timeout(function () {
                delData.id = "";
            }, 0)
        }
        //点击修改按钮
        function clickUpdate(){
            if (delData.id==='') {
                promisesServe.msgBar('warning','请选择一条数据进行此操作！');
            }
            angular.forEach(machinesMessage.data.datas,function(itme){
                if (itme.checkbox===true) {
                    $("#changeModal").modal("show");
                }
            })
        }
        //获取修改后的新数据 
        function gainMName(data){
        	changeNewData.name = data;
        }
        function gainIp(data){
        	changeNewData.ip = data;
        }
        function gainArea(data){
        	changeNewData.area = data;
        }
        function gainRack(data){
        	changeNewData.rack = data;
        }
        function gainRemark(data){
            if(data !== undefined){
                changeNewData.remark = data;
            }else{
                changeNewData.remark = "";
            }
        	
        }
        //提交修改
    	function sendNewData(){

            var url = "/manage/machine/update";
                changeNewData.currentPage=1;
                changeNewData.pageCount=5;
                changeNewData.id = delData.id;
                //获得未修改的数据
	    		angular.forEach(machinesMessage.data.datas,function(itme){
	    			if (itme.name===oldData.name) {
	    				changeNewData.name = itme.name;
	    			}
	    			if(itme.ip===oldData.ip){
	    				changeNewData.ip = itme.ip;
	    			}
	    			if(itme.area===oldData.area){
	    				changeNewData.area = itme.area
	    			}
	    			if(itme.rack===oldData.rack){
	    				changeNewData.rack = itme.rack
	    			}
	    			if(itme.remark===oldData.remark){
	    				changeNewData.remark = itme.remark
	    			}
	    		})
                console.log(changeNewData);
              if (changeNewData !== undefined) {
                  httpServe.post(url, JSON.stringify(changeNewData)).then(function (res) {
                  if (res.state === "success") {
                    promisesServe.msgBar('success',"修改成功！");
                    queryMachinesInfo();
                  }else{
                    promisesServe.msgBar('warning',res.desc);
                    queryMachinesInfo();
                  }
                })
              }
              $timeout(function () {
                delData.id = '';
            }, 0)
        }
        function getOpTime(){
        	httpServe.getOpTimeInfo(JSON.stringify(catalog)).then(function(res){
	        if(res.state === 'success'){
	            angular.copy(res,operationNoteMessage);
	        }
	      	})
        }
 	}
 	machinesInfoSer.$inject = ['httpServe','promisesServe','$timeout','hostQuerySer'];
})(angular);