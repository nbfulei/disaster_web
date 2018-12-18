/**
 * Created by Administrator on 2017/3/1 0001.
 */
;(function (angular) {
  'use strict';
  angular.module('services.hostDetailsSer',[]).factory('hostDetailsSer', hostDetailsSer);

  function hostDetailsSer($state,$timeout,httpServe,promisesServe,$stateParams,hostQuerySer,systemIP) {
    var singleHost={};//单个信息集合
    var socket;
    var instanceState={};
    var optionData={};//echarts信息
    var operationes={};
    var InstanceType=[];//实例类型
    var Components=[];//实例类型
    var id='';
    var downloadFile=[];//下载查询
    var downParam={};
    var file={};//文件路径
    var Journal={};//日志内容
    file.path='/';
    //var socketConfig='';

    return {
      info:info,
      singleHost:singleHost,
      hostInstancID:hostInstancID,
      delDetails:delDetails,
      delInstance:delInstance,
      delCheckbox:delCheckbox,
      operation:operation,
      callBack:callBack,
      operationInfo:operationInfo,
      operationes:operationes,
      InstanceType:InstanceType,
      Components:Components,
      perationSub:perationSub,
      updateHostGo:updateHostGo,
      exprtInfo:exprtInfo,
      downloadFile:downloadFile,
      upload:upload,
      downCheckbox:downCheckbox,
      downLoad:downLoad,
      downLoadHide:downLoadHide,
      folder:folder,
      file:file,
      down:down,
      uploadMTK:uploadMTK,
      startUpCase:startUpCase,
      stopItCase:stopItCase,
      disconnectSocket:disconnectSocket,
      synConfig:synConfig,
      watchIsExist:watchIsExist,
      Journal:Journal,
      instanceState:instanceState
      //getIP:getIP

    };

    //初始化
    function info(){
      hostDetails();
      echartsData();

    }
    function hostIds(){
      var param= {id:$stateParams.hostId};
      return param;
    }
    //根据Id查询单个主机信息
    function hostDetails(){
      httpServe.getSearch(JSON.stringify(hostIds())).then(function(res){
        if(res.state==='success'){
          if(res.data==='无此ID详细信息'){
            promisesServe.msgBar('warning','数据问题，请核对信息');
            $timeout(function(){
              window.history.go(-1);
              //$state.go('disasterRec.hostQuery');
            },1000);
          }else{
            angular.copy(res.data,singleHost);

            singleHost.cpuUsage=Number(singleHost.cpuUsage);
            if(JSON.stringify(singleHost.instances)==='[]'){
              singleHost.instances=null;
            }
            if(singleHost.instances===undefined){
              singleHost.instances=null;
            }
            if($stateParams.operateType==='新增'){
              operationes.hostId=singleHost.id;
              operationes.hostName=singleHost.hostName;
              operationes.name='';
              operationes.path='';
              operationes.startScript='';
              operationes.stopScript='';
              operationes.explain='';
            }
          }
        }else{
          promisesServe.msgBar('warning',res.desc);
          $timeout(function(){
            window.history.go(-1);
            //$state.go('disasterRec.hostQuery');
          },1000);
        }
      });
    }
    //跳转到修改页面
    function updateHostGo(){
      $state.go('disasterRec.modifyHost',{'host':singleHost.id});
    }
    //跳转实例信息页面
    function hostInstancID(a,b){
      $state.go('disasterRec.hostInstance',{
        'host':a,'instance':b
      });
    }
    //根据ID查询单个主机echarts
    function echartsData(){
      httpServe.getEchartsData(JSON.stringify(hostIds())).then(function(res){
        if(res.state==='success'){
          angular.copy(res.data,optionData);
          hostCpuUsage(optionData);
          hostMems(optionData);
          hostPorts(optionData);
        }else{
          promisesServe.msgBar('warning',res.desc);
        }
      });
      //console.log(socketConfig.data)
      socket = io.connect(systemIP.getUser(),{'force new connection': true});
        socket.on('hostEcharts',function(res){
          if(res.state === 'success'){
              $timeout(function(){
                angular.copy(res.data,optionData);
                hostCpuUsage(optionData);
                hostMems(optionData);
                hostPorts(optionData);
              },0)
          }
        });


    }

    //echarts CPU信息
    function hostCpuUsage(item){
      if(document.getElementById('cpuUsage')!==null){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('cpuUsage'));
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(promisesServe.setOptions('CPU使用率',item.cpuUsage,item.cpuTime));
      }
    }
    //echarts 内存信息
    function hostMems(item){
      if(document.getElementById('mems')!==null){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('mems'));
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(promisesServe.setOptions('内存使用率',item.memUsage,item.memTime));
      }
    }
    //echarts 磁盘信息
    function hostPorts(item){
      if(document.getElementById('disks')!==null){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('disks'));
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(promisesServe.setOptions('磁盘使用率',item.diskUsage,item.diskUsageTime));
      }
    }

    function disconnectSocket(){
      socket.disconnect();
    }

    //弹出删除实例框
    function delDetails(){
      if(singleHost.instances===null || JSON.stringify(singleHost.instances)==='[]'){
        $('#PromptModal').modal('show');
      }else{
        $('#delModal').modal('show');
      }

    }
    //删除多选框
    function delCheckbox(reType,checkList,num){
      var newlist=promisesServe.fCheckboxClick(reType, checkList, num);
      var a=[];
     angular.forEach(newlist,function(key){
       a.push(key.id);});
      id= a.join(',');
    }
    //确认删除
    function delInstance(){
      var param={
        id:id,
        hostName:singleHost.hostName
      };
      if(param.id===''|| param.id===undefined){
        promisesServe.msgBar('warning','请选择操作！');
      }else{
        httpServe.getDelInstance(JSON.stringify(param)).then(function(res){
          if(res.state==='success'){
            $('#delModal').modal('hide');
            promisesServe.msgBar('success','删除成功!');
            info()
          }else{
            promisesServe.msgBar('error',res.desc);
          }
          id='';
        });
      }

    }
    //跳转新增实例
    function operation(item){
      $state.go('disasterRec.detailsOperation',{'hostId':singleHost.id,'operateType':item});
    }

    //初始化
    function operationInfo(){
      if($stateParams.operateType==='新增'){
        getInstanceTypes();
        getComponent();
        hostDetails();
      }
    }
    //新增
    function perationSub(item,val){
      var param=item;
      param.hostId=$stateParams.hostId;
      if(val.name===3){
        httpServe.getAddInstance(JSON.stringify(param)).then(function(res){
          if(res.state==='success'){
            $state.go('disasterRec.hostDetails',{'hostId':item.hostId});
            promisesServe.msgBar('success','增加成功!');
          }else{
            promisesServe.msgBar('error',res.desc);
          }
        });
      }else{
        promisesServe.msgBar('error','增加失败!');
      }
    }
    //监听新增实例是否存在
    function watchIsExist(name){
      if (name&&name.length>0) {
        //console.log(operationes.name.length);
        operationes.error=4;
        var allHost=hostQuerySer.hostData;
        angular.forEach(allHost,function(item){
          if (name===item.hostName) {
            angular.forEach(item.instances,function(va){
              if (operationes.name===va.name) {
                operationes.error=2;
              }
            });
          }
        });
        var exp=/[a-zA-Z][a-zA-Z0-9-]{5,15}$/;
        var temp=operationes.name;
        if (!exp.test(operationes.name)&&operationes.name.length>=6) {
          if (operationes.error!==2) {
             operationes.error=1;
          }

        };
        if (operationes.error>=4&&operationes.name.length>=6) {
          operationes.error=3;
        }
      }
    };
    //实例类型
    function getInstanceTypes(){
      var param={};
      httpServe.getInstanceType(JSON.stringify(param)).then(function(res){
        if(res.state==='success'){
          angular.copy(res.data,InstanceType);
          if($stateParams.operateType==='新增'){
            operationes.instancesTypeId=InstanceType[0].id;
          }
        }else{
          promisesServe.msgBar('error',res.desc);
        }
      });
    }
    //组件
    function getComponent(){
      var param={};
      httpServe.getComponents(JSON.stringify(param)).then(function(res){
        if(res.state==='success'){
          angular.copy(res.data,Components);
          if($stateParams.operateType==='新增'){
            operationes.componentId=Components[0].id;
          }
        }else{
          promisesServe.msgBar('error',res.desc);
        }
      });
    }


    //返回
    function callBack(){
      $state.go('disasterRec.hostDetails',{'hostId':operationes.hostId});
    }

    //下载弹出框
    function down(){
      $('#export').modal('show');
      downloadFile.state=false;
    }
    //查询
    function exprtInfo(){
      file.hostName=singleHost.hostName;
      httpServe.post('/manage/file/show',JSON.stringify(file)).then(function(res){
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
    //选择文件夹
    function folder(item){
      if(file.path==='/'){
        file.path=file.path+item
      }else{
        file.path=file.path+'/'+item;
      }
      exprtInfo();
    }
    //上传下载选择
    function downCheckbox(checkList){
      downParam.path=checkList
    }
    //下载
    function downLoad(item){
      var param=item+'/'+downParam.path;
      if(downParam.path===undefined){
        promisesServe.msgBar('error','请选择下载文件');
      }else{
        window.location='/manage/file/download?path='+param+'&hostName='+singleHost.hostName;

      }
    }
    function downLoadHide(){
      downParam.path=undefined;
      $('#export').modal('hide');
    }


    function uploadMTK(){
      $('#upload').modal('show');
      downloadFile.state=false;
      exprtInfo()
    }
    //上传
    function upload (item){
      var fileInput = document.getElementById('fileUpload');////获取文件导入input元素
      var teg=/[\u4e00-\u9fa5]/;
      var str=fileInput.files[0].name;
      if(fileInput.files[0].size/1024>20*1024){
        promisesServe.msgBar('error','上传文件不能超过20M！');
        return;
      }
      if(downloadFile.files.length>0){
        for(var i=0;i<downloadFile.files.length;i++){
          if(str===downloadFile.files[i]){
            promisesServe.msgBar('warning','此目录已经存在该文件！');
            return;
          }
        }
      }
      if(str.search(teg)!==-1){
        promisesServe.msgBar('warning','文件名包含有中文不可上传！');
        return;
      }
      if (window.ActiveXObject || "ActiveXObject" in window) {
        //ie只能用onpropertychange事件
        fileInput.onpropertychange = function() {
            ajaxFileUpload('fileUpload','/manage/file/upload?path='+item+'&hostName='+singleHost.hostName);
        };
      } else {

        ajaxFileUpload('fileUpload','/manage/file/upload?path='+item+'&hostName='+singleHost.hostName);
      }
    }



    //文件上传功能
    function ajaxFileUpload(id,path){

      var loa=document.getElementById("loading");
      loa.style.display="block";
      $.ajaxFileUpload({
        url : path,
        secureuri : false,
        fileElementId : id,
        dataType : 'json',
        success : function(res) {
          if(res.state==='success'){
            if(res.data==='00'){
               loa=document.getElementById("loading");
              loa.style.display="none";
              promisesServe.msgBar('success','上传成功');
              exprtInfo();//上传成功后，刷新页面
            }else{
              promisesServe.msgBar('error','上传失败');
              loa=document.getElementById("loading");
              loa.style.display="none";
            }
          }else{
            var loa=document.getElementById("loading");
            loa.style.display="none";
            promisesServe.msgBar('error',res.desc)
          }
        },
        error : function() {
          var loa=document.getElementById("loading");
          loa.style.display="none";
          promisesServe.msgBar('error','上传出错');
        }
      });
    }


    function params(name,id){
      var param={
        hostName:name,
        id:id
      };
      return param
    }
    //实例启动
    function startUpCase(name,Instanc){
      if(Instanc.status==='00'){
        promisesServe.msgBar('warning','实例已启动无需再启动！');
      }else {
        httpServe.post('/manage/instance/start', JSON.stringify(params(name, Instanc.id))).then(function (res) {
          if (res.state === 'success') {
            //$('#Journal').modal('show');
            $('#Journal').modal({show:true,backdrop: 'static', keyboard: false});
            instanceState.name='启动';
            hostJournal(Instanc.name,'00');
            var ng1=document.getElementById('ng1');
            var ng2=document.getElementById('ng2');
            setTimeout(function(){
              ng1.style.display='none';
              ng2.style.display='block'
            },6000);
            hostDetails();
          } else {
            promisesServe.msgBar('error', res.desc);
          }
        });
      }
    }
    //日志
    function hostJournal(name,status){
      var ng1=document.getElementById('ng1');
      var ng2=document.getElementById('ng2');
      //var ng3=document.getElementById('ng3');
      var dismiss=document.getElementById('dismiss');
      ng2.addEventListener('click',queryNg2);
      function queryNg2(){
        var param={
          ip:singleHost.ip,
          instanceName:name,
          status:status
        };
        httpServe.post('/manage/host/journal', JSON.stringify(param)).then(function (res) {
          if (res.state=== 'success') {
              angular.copy(res,Journal);
            $('#ng').modal('show');
            //ng3.style.display='block';
          } else {
            promisesServe.msgBar('error', res.desc);
          }
        })
      }
      dismiss.addEventListener('click',function(){
        ng2.removeEventListener('click',queryNg2);
        if(ng1.style.display==='none'){
          $('#Journal').modal('hide');
          ng1.style.display='block';
          ng2.style.display='none';
          //ng3.style.display='none'
        }
      })
    }
    //实例停止
    function stopItCase(name,Instanc){
      //var loa=document.getElementById("loading");
      //loa.style.display="block";
      if(Instanc.status==='02'){
        //loa.style.display="none";
        promisesServe.msgBar('warning','实例已停止无需再停止！');
      }else {
        httpServe.post('/manage/instance/stop', JSON.stringify(params(name, Instanc.id))).then(function (res) {
          if (res.state === 'success') {
            //loa.style.display="none";
            //promisesServe.msgBar('success', res.desc);
            $('#Journal').modal({show:true,backdrop: 'static', keyboard: false});
            instanceState.name='关闭';
            hostJournal(Instanc.name,'02');
            var ng1=document.getElementById('ng1');
            var ng2=document.getElementById('ng2');
            setTimeout(function(){
              ng1.style.display='none';
              ng2.style.display='block'
            },6000);
            hostDetails();
          } else {
            //loa.style.display="none";
            promisesServe.msgBar('error', res.desc);
          }
        });
      }
    }
    //同步配置
    function synConfig(){
      var param={
        hostName:singleHost.hostName
      };
      httpServe.post('manage/host/refreshData',JSON.stringify(param)).then(function(res){
        if(res.state==='success'){
          if(res.data==='00'){
            promisesServe.msgBar('success','同步配置成功!');
          }else{
            promisesServe.msgBar('error','同步配置失败!');
          }
          hostDetails();
        }else{
          promisesServe.msgBar('error',res.desc);
        }
      });
    }
  }
  hostDetailsSer.$inject = ['$state','$timeout','httpServe','promisesServe','$stateParams','hostQuerySer','systemIP'];
})(angular);
