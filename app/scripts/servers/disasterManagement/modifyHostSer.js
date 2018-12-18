/**
 * Created by Administrator on 2017/2/23 0023.
 * 主机增加修改
 */
;(function (angular) {
  'use strict';
  angular.module('services.modifyHostSer',[]).factory('modifyHostSer', modifyHostSer);

  function modifyHostSer(httpServe,$timeout,promisesServe,$stateParams,$state,hostInstancSer) {
    var oldData = {};
    var addModify = {};
    var insId ='';
    var changeNewData = {};
    var tmallhostMessages ={};
    var newData={};
    var hostWLId=[];
    var modifyData={};
    var validate={};//验证
    var hostComponents=[];//组件
    var hostosType=[{id:'Linux',name:'Linux'},{id:'aix',name:'aix'}];//组件

    return {
      oldData:oldData,
      newData:newData,
      perationSub:perationSub,
      addModify:addModify,
      Initialization:Initialization,
      changeNewData:changeNewData,
      callBack:callBack,
      tmallhostMessages:tmallhostMessages,
      hostWLId:hostWLId,
      validate:validate,
      verification:verification,
      hostComponents:hostComponents,
      hostosType:hostosType
    };
    function aa(){
    	if($stateParams.host === undefined){
    		  return true;
      }else {
    		  return false;
    	}
    }
   //初始化
    function Initialization(){
      validate.ip=4;
      validate.hostName=4;
      var bb = aa();
      newData.memCompany='GB';
      newData.diskCompany='GB';
      newData.CoresCompany='核';
      newData.HZCompany='MHz';
    	if (bb === true) {
    		addModify.add="主机增加配置";
        angular.copy([],oldData)
    	} else {
    		insId = $stateParams.host;
    		addModify.add="主机修改配置";
    		//发送单个信息请求
        var param={id:insId};
    		httpServe.getSearch(JSON.stringify(param)).then(function(res){
          		if(res.state === 'success'){
                if(res.state.id===null){
                  promisesServe.msgBar('warning','查无数据，请核对信息');
                  $timeout(function(){
                    $state.go('disasterRec.hostQuery');
                  },2000);
                }else{

                  angular.copy(res.data,modifyData);
                  if ( !modifyData.machine|| modifyData.machine===null|| modifyData.machine===undefined) {
                    modifyData.machine={};
                  }
                  angular.forEach(hostWLId,function(key){
                    if(modifyData.machine.id===key.id){
                      modifyData.machine.id=key.id;
                      modifyData.machineId=modifyData.machine.id;
                    }
                  });
                  angular.copy(modifyData,oldData);
                }

              	}else{
                  promisesServe.msgBar('warning',res.desc);
                }
          	})
    	}
      httpServe.post('/manage/machine/queryAll').then(function(res){
        if(res.state==='success'){
            angular.copy(res.data,hostWLId);
            if(addModify.add==="主机增加配置"){
              oldData.machineId=hostWLId[0].id
            }
        }
      });
      httpServe.post('/manage/common/getComponents').then(function(res){
        if(res.state==='success'){
          angular.copy(res.data,hostComponents);
          if(addModify.add==="主机增加配置"){
            oldData.componentsId=hostComponents[0].id
          }
        }
      });
    }

    //点击确定按钮
    function perationSub(item,company){
    	insId = $stateParams.host;
      if(company.diskCompany==='TB'){
        item.diskSize=item.diskSize*1024
      }
      if(company.HZCompany==='GHz'){
        item.cpuHZ=item.cpuHZ*1000
      }
    	if (insId === undefined) {
    		//增加信息发送到后台
          if(validate.ip===3 && validate.hostName===3){
            httpServe.post("/manage/host/add", JSON.stringify(item)).then(function (res) {
              if (res.state === "success") {
                $state.go('disasterRec.hostQuery');
                promisesServe.msgBar('success','添加成功!');
                angular.copy([],oldData)
              }else{
                promisesServe.msgBar('warning',res.desc);
              }
            })
          }else{
            promisesServe.msgBar('warning','添加失败!');
          }

    	}else{
    		//修改信息发送到后台
    		$timeout(function() {
	            if (item.hostName===modifyData.hostName&&item.ip===modifyData.ip&&item.memSize===modifyData.memSize&&item.diskSize===modifyData.diskSize
                &&item.cpuCores===modifyData.cpuCores&&item.cpuHZ===modifyData.cpuHZ&&item.machineId===modifyData.machineId&&item.remark===modifyData.remark
                &&item.osType===modifyData.osType && item.componentsId===modifyData.componentsId) {
                promisesServe.msgBar('warning','未做任何修改，请修改！');
              }else{
                  httpServe.post("/manage/host/update", JSON.stringify(item)).then(function (res) {
                    if (res.state === "success") {
                      $state.go('disasterRec.hostDetails',{'hostId':item.id});
                      promisesServe.msgBar('success','修改成功');
                      angular.copy([],oldData)
                    }else{
                      promisesServe.msgBar('warning',res.desc);
                    }
                  })

	            }
	        }, 0);
    	}
    }
    function callBack(){
      if(addModify.add==="主机增加配置"){
        $state.go('disasterRec.hostQuery');
        angular.copy([],oldData)
      }else{
        $state.go('disasterRec.hostDetails',{'hostId':oldData.id});
        angular.copy([],oldData)
      }
    }
    //验证ip
    function verification(item,num,name){
      if(num===1){
        if(item===undefined || item===''){
          validate.ip=1;//配置失败
        }else{
          var params={ip:item};
          httpServe.post("/manage/host/checkIp", JSON.stringify(params)).then(function (res) {
            if (res.state === "success") {
              if(res.data==='00'){
                validate.ip=3;
              }else{
                validate.ip=2;
              }
            }else{
              promisesServe.msgBar('error',res.desc);
            }
          })
        }
      }else if(num===2){
        if(item===undefined || item===''){
          validate.hostName=1;//配置失败
        }else{
          var para={hostName:item};
          httpServe.post("/manage/host/checkName", JSON.stringify(para)).then(function (res) {
            if (res.state === "success") {
              if(res.data==='00'){
                validate.hostName=3;
              }else{
                validate.hostName=2;
              }
            }else{
              promisesServe.msgBar('error',res.desc);
            }
          })
        }
      }else if(num===3&&name==='修改'){
        var pram=hostInstancSer.instancData.name;
        if(item.name===undefined || item.name===''){
          validate.name=1;//配置失败
        }else if(item.name===pram){
          validate.name=4;
        } else{
          var param={
            hostName:item.hostName,
            name:item.name
          };
          httpServe.post("/manage/instance/checkName", JSON.stringify(param)).then(function (res) {
            if (res.state === "success") {
              if(res.data==='00'){
                validate.name=3;
              }else{
                validate.name=2;
              }
            }else{
              promisesServe.msgBar('error',res.desc);
            }
          })
        }
      }else if(num===3&&name==='新增'){
        if(item.name===undefined || item.name===''){
          validate.name=1;//配置失败
        } else{
          var param={
            hostName:item.hostName,
            name:item.name
          };
          httpServe.post("/manage/instance/checkName", JSON.stringify(param)).then(function (res) {
            if (res.state === "success") {
              if(res.data==='00'){
                validate.name=3;
              }else{
                validate.name=2;
              }
            }else{
              promisesServe.msgBar('error',res.desc);
            }
          })
        }
      }
    }
  }
  modifyHostSer.$inject = ['httpServe','$timeout','promisesServe','$stateParams','$state','hostInstancSer'];
})(angular);
