'use strict'
;(function (angular){
 	angular.module('services.tmallRegionConfigSer',[]).factory('tmallRegionConfigSer',tmallRegionConfigSer);
 	function tmallRegionConfigSer(httpServe,$timeout,promisesServe){
		var provRegionMessage = {};
    var catalog = {};
		var catalog2 = {};
		var addBatch = {};
		var delData = {str:[]};
		var oldData = {};
		var changeNewData = {};
    var operationNoteMessage = {};
    var downloadFile = {};
    var id = {ids:[]};
    var provinceList =[{value:"湖北",label:"湖北"},
                        {value:"湖南",label:"湖南"},
                        {value:"河北",label:"河北"},
                        {value:"河南",label:"河南"},
                        {value:"广东",label:"广东"},
                        {value:"广西",label:"广西"},
                        {value:"山西",label:"山西"},
                        {value:"陕西",label:"陕西"},
                        {value:"西藏",label:"西藏"},
                        {value:"云南",label:"云南"},
                        {value:"青海",label:"青海"},
                        {value:"新疆",label:"新疆"},
                        {value:"宁夏",label:"宁夏"},
                        {value:"甘肃",label:"甘肃"},
                        {value:"海南",label:"海南"},
                        {value:"贵州",label:"贵州"},
                        {value:"江西",label:"江西"},
                        {value:"福建",label:"福建"},
                        {value:"浙江",label:"浙江"},
                        {value:"安徽",label:"安徽"},
                        {value:"山东",label:"山东"},
                        {value:"内蒙古",label:"内蒙古"},
                        {value:"黑龙江",label:"黑龙江"},
                        {value:"吉林",label:"吉林"},
                        {value:"辽宁",label:"辽宁"},
                        {value:"江苏",label:"江苏"},
                        {value:"重庆",label:"重庆"},
                        {value:"四川",label:"四川"},
                        {value:"天津",label:"天津"},
                        {value:"上海",label:"上海"},
                        {value:"北京",label:"北京"}];

    var regionList = [{value:"华东",label:"华东"},
                      {value:"华南",label:"华南"},
                      {value:"华北",label:"华北"},
                      {value:"中部",label:"中部"},
                      {value:"西部",label:"西部"}];
    var file={};//文件路径
    file.path='/';
    var singleHost = {};
		return{
			provRegionMessage:provRegionMessage,
			queryRegionInfo:queryRegionInfo,
			initQueryParam:initQueryParam,
      catalog:catalog,
			catalog2:catalog2,
			setCurrentPageProvRegion:setCurrentPageProvRegion,
			termQuery:termQuery,
			addBatch:addBatch,
			addConfig:addConfig,
			batchProcessing:batchProcessing,
			oldData:oldData,
			clickUpdate:clickUpdate,
			gainProvCode:gainProvCode,
			gainProvName:gainProvName,
			gainRegionName:gainRegionName,
			changeNewData:changeNewData,
			sendNewData:sendNewData,
			clickDel:clickDel,
			delConfig:delConfig,
			operationNoteMessage:operationNoteMessage,
			getOpTime:getOpTime,
      id:id,
      getProvName:getProvName,
      getRegionName:getRegionName,
      clearBatch:clearBatch,
      numToChineseCharacters:numToChineseCharacters,
      provinceList:provinceList,
      regionList:regionList
		}
  
		//初始化查询条件
    	function initQueryParam(){
      		catalog.currentPage = 1;
      		catalog.pageCount = 5;
      		var params = {
          		provName: "",
          		regionName: ""
        	};
        	params.currentPage=catalog.currentPage;
        	params.pageCount=catalog.pageCount;
        	angular.copy(params, catalog);
          return catalog;
    	}

    	//省份大区配置信息查询
    	function queryRegionInfo(){
        catalog.currentPage = 1;
        catalog.pageCount = 5;
        
    			httpServe.getProvRegionInfo(JSON.stringify(catalog)).then(function(res){
        			if(res.state==='success'){
           				angular.copy(res,provRegionMessage);
                  numToChineseCharacters();
                        angular.forEach(provRegionMessage.data.datas,function(itme){
                            itme.checkbox = false;
                        });
                        
           			}else{
                  promisesServe.msgBar('warning',res.desc);
                }
       		})
    	}
      function numToChineseCharacters(){
        angular.forEach(provRegionMessage.data.datas,function(itme){
          if(itme.regionName==='01'){
            itme.regionName = '华北';
          }else
          if(itme.regionName==='02'){
            itme.regionName = '华东';
          }else
          if(itme.regionName==='03'){
            itme.regionName = '华南';
          }else
          if(itme.regionName==='05'){
            itme.regionName = '中部';
          }else
          if(itme.regionName==='04'){
            itme.regionName = '西部';
          }
        })
      }
    	//分页
    	function setCurrentPageProvRegion(currentPage){
        delData.str = [];
        catalog2.pageCount = 5;
    		$timeout(function(){
	        catalog2.currentPage=currentPage;
	        httpServe.getProvRegionInfo(JSON.stringify(catalog2)).then(function(res){
	        if(res.state === 'success'){
	            angular.copy(res,provRegionMessage);
              numToChineseCharacters();
	        }else{
                promisesServe.msgBar('warning',res.desc);
                }
	      	})
	      	},0)
    	}
      //获取页面输入的查询条件
      function getProvName(data){
        catalog.provName = data;
      }
      function getRegionName(data){
        catalog.regionName = data;
        
      }
    	//条件查询
    	function termQuery(){
    		var url = "/operation/province/queryConfig";
              delData.str = [];
	          	catalog.currentPage=1;
	          	catalog.pageCount=5;
              angular.copy(catalog,catalog2);
             if(catalog.regionName ==='华北'){
              catalog.regionName = '01';
              }else
              if(catalog.regionName === '华东'){
                catalog.regionName = '02';
              }else
              if(catalog.regionName === '华南'){
                catalog.regionName = '03';
              }else
              if(catalog.regionName === '西部'){
                catalog.regionName = '04';
              }else
              if(catalog.regionName === '中部'){
                catalog.regionName = '05';
              }
           
	          if (catalog !== undefined) {
	              httpServe.post(url, JSON.stringify(catalog)).then(function (res) {
	              if (res.state === "success") {
	                angular.copy(res, provRegionMessage);
                  numToChineseCharacters();
                    angular.forEach(provRegionMessage.data.datas,function(itme){
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
    		var url = "/operation/province/saveConfig";
            if(addBatch.regionName ==='华北'){
              addBatch.regionName = '01';
              }else
              if(addBatch.regionName === '华东'){
                addBatch.regionName = '02';
              }else
              if(addBatch.regionName === '华南'){
                addBatch.regionName = '03';
              }else
              if(addBatch.regionName === '西部'){
                addBatch.regionName = '04';
              }else
              if(addBatch.regionName === '中部'){
                addBatch.regionName = '05';
              }
    		$timeout(function () {
	          if (addBatch !== undefined) {
	              httpServe.post(url, JSON.stringify(addBatch)).then(function (res) {
	              if (res.state === "success") {
	              	promisesServe.msgBar('success',res.desc);
                  clearBatch();
	              	queryRegionInfo();
                  getOpTime();
	              }else{
	                promisesServe.msgBar('warning',res.desc);
                  clearBatch();
	              }
	            })
	          }
	        }, 0)
    	}
      //点击取消清空数据
      function clearBatch(){
        addBatch.provCode = "";
        addBatch.provName = "";
        addBatch.regionName = "";
      }
    	//获取要修改/删除的 数据
    	function batchProcessing(data_id){
            delData.data=[];
            
            angular.forEach(provRegionMessage.data.datas,function(itme){
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
        //点击修改按钮
        function clickUpdate(){
          
            if(delData.str.length>1){
                  promisesServe.msgBar('warning','请选择一条数据进行此操作！');
            }else
            if(delData.str.length===0){
                  promisesServe.msgBar('warning','请选择数据进行此操作！');
            }else
            if(delData.str.length===1){
                  $("#changeModal").modal("show");
            }
        }
    	//获取修改后的各项数据
    	function gainProvCode(data){
    		changeNewData.provCode = data;
    	}
    	function gainProvName(data){
    		changeNewData.provName = data;
    	}
    	function gainRegionName(data){
    		changeNewData.regionName = data;
    	}

    	//提交修改
    	function sendNewData(){

            var url = "/operation/province/updateConfig";
                changeNewData.currentPage=1;
                changeNewData.pageCount=5;
                //获得未修改的数据
                

	    		angular.forEach(provRegionMessage.data.datas,function(itme){
	    			if (itme.provCode===oldData.provCode) {
	    				changeNewData.provCode = itme.provCode;
	    			}
	    			if(itme.provName===oldData.provName){
	    				changeNewData.provName = itme.provName;
	    			}
	    			if(itme.regionName===oldData.regionName){
	    				changeNewData.regionName = itme.regionName
	    			}
	    		})

          if(changeNewData.regionName==='华北'){
                        changeNewData.regionName = '01';
                      }else
                      if(changeNewData.regionName==='华东'){
                        changeNewData.regionName = '02';
                      }else
                      if(changeNewData.regionName==='华南'){
                        changeNewData.regionName = '03';
                      }else
                      if(changeNewData.regionName==='中部'){
                        changeNewData.regionName = '05';
                      }else
                      if(changeNewData.regionName==='西部'){
                        changeNewData.regionName = '04';
                      }
            
              if (changeNewData !== undefined) {
                  httpServe.post(url, JSON.stringify(changeNewData)).then(function (res) {
                  if (res.state === "success") {
                    promisesServe.msgBar('success',res.desc);
                    queryRegionInfo();
                    getOpTime();
                  }else{
                    promisesServe.msgBar('warning',res.desc);
                    queryRegionInfo();
                  }
                })
              }
              $timeout(function () {
                delData.str = [];
            }, 0)
        }

        //点击删除按钮
        function clickDel(){
             if (delData.str.length===0) {
                  promisesServe.msgBar('warning','请选择数据进行此操作！');
            }else
            if(delData.str.length!==0){
                $("#delDataModal").modal("show");
            }
        }
        //确认删除
        function delConfig(){
          id.ids = delData.str;
        	var url = "/operation/province/deleteConfig";
                  $timeout(function () {
                  if (delData !== undefined) {
                      httpServe.post(url, JSON.stringify(id)).then(function (res) {
                      if (res.state === "success") {
                        promisesServe.msgBar('success', res.desc);
                        queryRegionInfo();
                        getOpTime();
                        angular.copy(res, provRegionMessage);
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

        function getOpTime(){
        	httpServe.getOpTimeInfo(JSON.stringify(catalog)).then(function(res){
	        if(res.state === 'success'){
	            angular.copy(res,operationNoteMessage);
	        }
	      	})
        }

    //下载弹出框
    function down(){
      $('#export').modal('show');
      downloadFile.state=false;
    }

    //查询
    function exprtInfo(){
      file.hostName=singleHost.hostName;
      httpServe.post('/manage/file/show_con',JSON.stringify(file)).then(function(res){
        if(res.state==='success'){
          if(res.data.msg!==''){
            downloadFile.msg=res.data.msg;
            downloadFile.state=false;
          }else{
            if(res.data){
              angular.copy(res.data,downloadFile);
              downloadFile.state=true;
            }
          }
        }else{
          promisesServe.msgBar('error',res.desc);
        }
      });
    }
 	}
 	tmallRegionConfigSer.$inject = ['httpServe','$timeout','promisesServe'];
})(angular); 