'use strict'
;(function (angular){
 	angular.module('services.tmallOggConfigSer',[]).factory('tmallOggConfigSer',tmallOggConfigSer);
 	function tmallOggConfigSer(httpServe,$timeout,promisesServe,$http){
 		var oggConfigMessage = {};
 		var catalog = {};
        var addBatch = {};
 		var oldData = {};//修改原数据
        var delData = {str:[]};
        var changeNewData = {};
        var addip = {};
        var id = {ids:[]};
 		var operationNoteMessage = {};
    	return {
    		oggConfigMessage:oggConfigMessage,
    		queryOggConfigInfo:queryOggConfigInfo,
    		initQueryParam:initQueryParam,
    		setCurrentPageOgg:setCurrentPageOgg,
    		catalog:catalog,
    		termQuery:termQuery,
    		addBatch:addBatch,
    		addConfig:addConfig,
    		clearBatch:clearBatch,
    		batchProcessing:batchProcessing,
    		delConfig:delConfig,
    		delData:delData,
            clickDel:clickDel,
            clickUpdate:clickUpdate,
            oldData:oldData,
            gainThreadname:gainThreadname,
            changeNewData:changeNewData,
            gainRegionName:gainRegionName,
            gainCopydirec:gainCopydirec,
            gainParameter:gainParameter,
            gainDeployside:gainDeployside,
            gainHostIp:gainHostIp,
            gainRemark:gainRemark,
            gainFunction:gainFunction,
            sendNewData:sendNewData,
            addip:addip,
            id:id,
            getOpTime:getOpTime,
            operationNoteMessage:operationNoteMessage,
            getExcel:getExcel
    	}
        function getExcel(){
            $http.post("/operation/ogg/queryConfig", {  
                storeId: $scope.$parent.currStore.storeId,  
                date: $scope.$parent.ledgerDate.getTime()  
            }, {responseType: "blob"}).success(function (data) {  
                var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});  
                var fileName = $scope.$parent.currStore.name + "_生产统计_" + $scope.$parent.ledgerDate.Format("yyyy-MM-dd");  
                var a = $("#upload_a"); 
                //document.body.appendChild(a);  
                a.download = fileName;  
                a.href = URL.createObjectURL(blob);  
                a.click();  
            })  
        }

        function getOpTime(){
            httpServe.getOpTimeInfo(JSON.stringify(catalog)).then(function(res){
            if(res.state === 'success'){
                angular.copy(res,operationNoteMessage);
            }
            })
        }
    	//初始化查询条件
    	function initQueryParam(){
      		catalog.currentPage = 1;
      		catalog.pageCount = 5;
      		var params = {
          		threadName: "",
          		function: "",
          		deployside:""
        	};
        	params.currentPage=catalog.currentPage;
        	params.pageCount=catalog.pageCount;
        	angular.copy(params, catalog);
            return catalog;
    	}
        
    	//OGG配置信息查询
    	function queryOggConfigInfo(){
            catalog = initQueryParam();
    		httpServe.getOggConfigInfo(JSON.stringify(catalog)).then(function(res){
        			if(res.state==='success'){
           				angular.copy(res,oggConfigMessage);
                        angular.forEach(oggConfigMessage.data.datas,function(itme){
                            itme.checkbox = false;
                        });
           			}
       		})
    	}
    	//OGG配置信息分页查询
    	function setCurrentPageOgg(current){
	        catalog.currentPage=current;
	        httpServe.getOggConfigInfo(JSON.stringify(catalog)).then(function(res){
    	        if(res.state === 'success'){
    	            angular.copy(res,oggConfigMessage);
    	        }
	      	})
    	}
    	//条件查询 
    	function termQuery(){
            var url = "/operation/ogg/queryConfig";
	          	catalog.currentPage = 1;
	          if (catalog !== undefined) {
	              httpServe.post(url, JSON.stringify(catalog)).then(function (res) {
	              if (res.state === "success") {
	                angular.copy(res, oggConfigMessage);
                    angular.forEach(oggConfigMessage.data.datas,function(itme){
                        itme.checkbox = false;
                    });
	              }else{
	                promisesServe.msgBar('warning',res.desc);
	              }
	            })
	          }
            
    	}
    	//封装 新增配置所有数据
    	function addConfigData(){
    		var configData = {};
    		configData.threadName = addBatch.threadName;
    		configData.regionName = addBatch.regionName;
    		configData.copydirec = addBatch.copydirec;
    		configData.function = addBatch.function;
    		configData.parameter = addBatch.parameter;
    		configData.deployside = addBatch.deployside;
    		configData.hostIp = addBatch.hostIp;
    		configData.remark = addBatch.remark;
    		return configData;
    	}
    	//新增配置
    	function addConfig(){
    		var url = "/operation/ogg/saveConfig";
    		//$timeout(function () {
	          var configDatas = addConfigData();
	          console.log(configDatas)
	          if (configDatas !== undefined) {
	              httpServe.post(url, JSON.stringify(configDatas)).then(function (res) {
	              if (res.state === "success") {
	              	promisesServe.msgBar('success',res.desc);
                    queryOggConfigInfo();
                     clearBatch();
	              }else{
	                promisesServe.msgBar('warning',res.desc);
	              }
	            })
	          }

	        //}, 0)
    	}
    	//取消新增 清空数据
    	function clearBatch(){
    		addBatch.threadName = '';
    		addBatch.regionName = '';
    		addBatch.copydirec = '';
    		addBatch.function = '';
    		addBatch.parameter = '';
    		addBatch.deployside = '';
    		addBatch.hostIp = '';
    		addBatch.remark = '';
            addip.falg===true;
    	}
    	//删除配置
        
       
    	//获取要修改/删除的 数据
    	function batchProcessing(data_id){
            delData.data=[];
            
            //console.log(oggConfigMessage.data.datas);
            angular.forEach(oggConfigMessage.data.datas,function(itme){
                if (itme.checkbox===true) {
                    if (delData.data.indexOf(data_id) === -1) {
                        delData.data.push(itme);
                    }
                    angular.copy(itme,oldData);
                }
                
            });
            delData.str=[];
            angular.forEach(delData.data,function(val){
                delData.str.push(val.id);
                changeNewData.id = val.id;
            });

        }
         //点击删除按钮
        function clickDel(){
            console.log(delData.length);
             if (delData.str.length===0) {
                  promisesServe.msgBar('warning','请选择数据进行此操作！');
            }else
            if(delData.str.length!==0){
                $("#delData").modal("show");
            }
        }
    	//删除操作
    	function delConfig(){
            id.ids = delData.str;
    		var url = "/operation/ogg/deleteConfig";
                  $timeout(function () {
                  console.log(delData);
                  if (delData !== undefined) {
                      httpServe.post(url, JSON.stringify(id)).then(function (res) {
                      if (res.state === "success") {
                        promisesServe.msgBar('success', res.desc);
                        queryOggConfigInfo();
                        //angular.copy(res, oggConfigMessage);
                      }else{
                        promisesServe.msgBar('warning',res.desc);
                      }
                    })
                  }
                }, 0)
            $timeout(function () {
                delData.str = [];
            }, 0)
    	}
        //点击修改按钮 弹出修改模态框
        function clickUpdate(){
            if(delData.str.length>1){
                  promisesServe.msgBar('warning','请选择一条数据进行此操作！');
            }else
            if(delData.str.length===0){
                  promisesServe.msgBar('warning','请选择数据进行此操作！');
            }else
            if(delData.str.length===1){
                  $("#updateModal").modal("show");
            }
        }
        //获得页面各项修改后的各项数据
        function gainThreadname(data){
            changeNewData.threadName = data;
        }
        function gainRegionName(data){
            changeNewData.regionName = data;
        }
        function gainCopydirec(data){
            changeNewData.copydirec = data;
        }
        function gainFunction(data){
            changeNewData.function = data;
        }
        function gainParameter(data){
            changeNewData.parameter = data;
        }
        function gainDeployside(data){
            changeNewData.deployside = data;
        }
        function gainHostIp(data){
            changeNewData.hostIp = data;
        }
        function gainRemark(data){
            changeNewData.remark = data;
        }
        //提交新数据给后台
        function sendNewData(){
            var url = "/operation/ogg/updateConfig";
                changeNewData.currentPage=1;
                changeNewData.pageCount=5;
            //获得未修改的数据
                angular.forEach(oggConfigMessage.data.datas,function(itme){
                    if (itme.threadName===oldData.threadName) {
                        changeNewData.threadName = itme.threadName;
                    }
                    if(itme.regionName===oldData.regionName){
                        changeNewData.regionName = itme.regionName;
                    }
                    if(itme.copydirec===oldData.copydirec){
                        changeNewData.copydirec = itme.copydirec
                    }
                    if(itme.function===oldData.function){
                        changeNewData.function = itme.function
                    }
                    if(itme.parameter===oldData.parameter){
                        changeNewData.parameter = itme.parameter
                    }
                    if(itme.deployside===oldData.deployside){
                        changeNewData.deployside = itme.deployside
                    }
                    if(itme.hostIp===oldData.hostIp){
                        changeNewData.hostIp = itme.hostIp
                    }
                    if(itme.remark===oldData.remark){
                        changeNewData.remark = itme.remark
                    }
                })
              console.log(changeNewData); 
              if (changeNewData !== undefined) {
                  httpServe.post(url, JSON.stringify(changeNewData)).then(function (res) {
                  if (res.state === "success") {
                    promisesServe.msgBar('success',res.desc);
                    queryOggConfigInfo();
                  }else{
                    promisesServe.msgBar('warning',res.desc);
                    queryOggConfigInfo();
                  }
                })
              }
              $timeout(function () {
                delData.str = [];
            }, 0)
        }

 	}
 	tmallOggConfigSer.$inject = ['httpServe','$timeout','promisesServe','$http'];
})(angular);