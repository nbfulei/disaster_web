/**
 * Created by Administrator on 2017/2/23 0023.
 * 主机配置
 */
;(function (angular) {
  'use strict';
  angular.module('services.hostQuerySer',[]).factory('hostQuerySer', hostQuerySer);

  function hostQuerySer($timeout,httpServe,$interval,promisesServe,$state) {
    var queryCriteria={hostName:''};//查询条件
    var hostData=[];//查询结果
    var checkNum={};//选择集合
    return {
      info:info,
      hostData:hostData,
      checkNum:checkNum,
      checkBosOrder:checkBosOrder,
      hostDetailsID:hostDetailsID,
      hostInstancQuery:hostInstancQuery,
      delHostDetails:delHostDetails,
      startModel:startModel,
      stopModel:stopModel,
      getCheckbox:getCheckbox,
      hostQueryInfo:hostQueryInfo,
      jquerys:jquerys
    };
    //初始化
    function info(){
      hostQueryInfo();

    }
    //查询所有主机信息
    function hostQueryInfo(){
      var loa=document.getElementById("loading");
      loa.style.display="block";
      httpServe.getFuletextsearch(JSON.stringify(queryCriteria)).then(function(res){
        var loa=document.getElementById("loading");
        loa.style.display="none";
        if(res.state==='success'){
          angular.copy(res.data,hostData);
          angular.forEach(hostData,function(key){
            key.cpuCores=Number(key.cpuCores);
            key.cpuHZ=Number(key.cpuHZ);
            key.cpuUsage=Number(key.cpuUsage);
            key.diskSize=Number(key.diskSize);
            key.diskUsage=Number(key.diskUsage);
            key.memSize=Number(key.memSize);
            key.memUsage=Number(key.memUsage);
          });
          checkNum.number='';
          hostData.allChecked=false;
        }else{
          promisesServe.msgBar('warning',res.desc);
        }
      });
      return hostData;
    }

    //删除
    function delHostDetails(item){
      var param={id:item[0].id};
      //if(item[0].instances !==null){
      //  if(item[0].instances.length===0){
      //    httpServe.post("manage/host/delete", JSON.stringify(param)).then(function (res) {
      //      if (res.state === "success") {
      //        promisesServe.msgBar('success','删除成功!');
      //        info()
      //      }else{
      //        promisesServe.msgBar('warning',res.desc);
      //        info()
      //      }
      //    })
      //  }else{
      //    promisesServe.msgBar('warning','该主机有实例存在,不可删除!');
      //  }
      //}else{
        httpServe.post("manage/host/delete", JSON.stringify(param)).then(function (res) {
          if (res.state === "success") {
            promisesServe.msgBar('success','删除成功!');
            info()
          }else{
            promisesServe.msgBar('warning',res.desc);
            info()
          }
        });
      //}
    }
    //跳转至单个主机信息页面
    function hostDetailsID(item){
      if(item===''||item===undefined){
        promisesServe.msgBar('error', '未找到主机名，请核对信息');
      }else{
        $state.go('disasterRec.hostDetails',{
          'hostId':item
        });
      }
    }
    //跳转至单个实例信息页面
    function hostInstancQuery(a,b){
      if(b===''||b===undefined){
        promisesServe.msgBar('error', '未找到实例ID，请核对信息');
      }else if(a===''||a===undefined){
        promisesServe.msgBar('error', '未找到主机名，请核对信息');
      }else{
        $state.go('disasterRec.hostInstance',{
          'host':a,'instance':b
        });
      }
    }

    function jquerys(item,msg,value){
      if (item && item.length>0){
        document.getElementById('checkAll').disabled  =true;
        angular.forEach(msg,function(item){
          item.checkbox=false;
          msg.allChecked=false;
        });
        checkNum.number=''
      }else{
        document.getElementById('checkAll').disabled  =false;
      }
    }
    //全选、反选、单选
    function getCheckbox(msg,value){
      var newList=getCheck(msg,value);
     var newlist=newList.checkdata;
      checkNum.number=newlist.length===0?'':'('+newlist.length+")";
      checkNum.newList=newlist;
    }
    //执行下拉菜单
    function checkBosOrder(item){
      if(checkNum.number===0||checkNum.number===undefined||checkNum.number===''){
        promisesServe.msgBar('error', '请选择！');
      }else if(item===3){
        if(checkNum.newList.length===1){
          $('#OneModal').modal('toggle');
        }else{
          promisesServe.msgBar('error', '只能选择一项执行该操作！');
        }
      }else if(item===7){
        $('#startAll').modal('show')

      }else if(item===8){
        $('#stopAll').modal('show')

      }
    }
    //启动实例弹出框
    function startModel(){
      var param={};var instances=[];
      param.hostName='';param.instances=[];
      angular.forEach(checkNum.newList,function(key){
        param.hostName=key.hostName;
        //item.push(key.hostName)
        angular.forEach(key.instances,function(item){
          if(item.insMonitorStatus==='02'){
            param.instances.push(item.insMonitorStatus)
          }
        });
        instances.push(param)
      });
      startUpCase(instances)
    }
    function stopModel(){
      var param={};var instances=[];
      param.hostName='';param.instances=[];
      angular.forEach(checkNum.newList,function(key){
        param.hostName=key.hostName;
        //item.push(key.hostName)
        angular.forEach(key.instances,function(item){
          if(item.insMonitorStatus==='00'){
            param.instances.push(item.insMonitorStatus)
          }
        });
        instances.push(param)
      });
      stopItCase(instances);
    }

    //启动主机上的实例
    function startUpCase(item){
        httpServe.post("manage/instance/startAll", JSON.stringify(item)).then(function (res) {
          if (res.state === "success") {
            $('#startAll').modal('hide');
            promisesServe.msgBar('success','启动实例成功');
            hostQueryInfo();
          }else{
            promisesServe.msgBar('warning',res.desc);
          }
        })
    }
    //停止主机上的实例
    function stopItCase(item){
      httpServe.post("manage/instance/stopAll", JSON.stringify(item)).then(function (res) {
        if (res.state === "success") {
          $('#stopAll').modal('hide');
          promisesServe.msgBar('success','实例已停止');
          hostQueryInfo();
        }else{
          promisesServe.msgBar('warning',res.desc);
        }
      })
    }






    //获取多选框选中的数据，以数组的形式返回
    function getCheck(msg,value){
      if (msg&&msg.length>0) {
        var checkLength=0;//选中的数字长度
        var checkList={};
        checkList.checkdata=[];//选中的数据
        checkList.ids=[];//选中数据的id
        angular.forEach(msg,function(item){
          if(item.checkbox===true){
            checkLength+=1;
          }
        });
        if (checkLength<msg.length) {
          msg.allChecked=false;
        }
        if (checkLength===msg.length) {
          msg.allChecked=true;
        }
        if (value==='all'&&checkLength<msg.length) {
          angular.forEach(msg,function(item){
            item.checkbox=true;
            msg.allChecked=true;
          });
        }
        if (value==='all'&&checkLength===msg.length) {
          angular.forEach(msg,function(item){
            item.checkbox=false;
            msg.allChecked=false;
          });
        }
        //获得所选多条数据的id，和单条修改数据
        angular.forEach(msg,function(item){
          if(item.checkbox===true){
            checkList.checkdata.push(item);
            if (item.id) {
              checkList.ids.push(item.id);
            }

          }
        });
        return checkList;
      }

    }


  }
  hostQuerySer.$inject = ['$timeout','httpServe','$interval','promisesServe','$state'];
})(angular);
