/**
 * Created by Administrator on 2017/3/1 0001.
 * 实例
 */
;(function (angular) {
  'use strict';
  angular.module('services.hostInstancSer',[]).factory('hostInstancSer', hostInstancSer);

  function hostInstancSer($state,$timeout,httpServe,$interval,promisesServe,$stateParams,systemIP) {
    var instancData={};//实例信息
    var journalData=[];//实例日志
    var toConfigureData=[];//配置信息
    var instancEchartsData={};//echarts信息
    var operation={};//
    var files={};//
    var ItemFile={};//
    var Components=[];//组件信息
    var InstanceType=[];//实例信息
    var comparison={};
    var socket;
    var filePath='';//路径
    var fileName='';//
    return {
      info:info,
      instancData:instancData,
      journalData:journalData,
      toConfigureData:toConfigureData,
      instancEchartsData:instancEchartsData,
      logDetails:logDetails,
      operationUP:operationUP,
      operationUpInfo:operationUpInfo,
      operation:operation,
      InstanceType:InstanceType,
      Components:Components,
      perationSub:perationSub,
      callBack:callBack,

      addFile:addFile,
      updateFile:updateFile,
      addConfirmFile:addConfirmFile,
      files:files,
      upConfirmFile:upConfirmFile,
      delFile:delFile,
      //loadFile:loadFile,
      delConfirmFile:delConfirmFile,
      queryItemFile:queryItemFile,
      ItemFile:ItemFile,
      upconfigItem:upconfigItem,
      upconfigCallBack:upconfigCallBack,
      addConfigItem:addConfigItem,
      delConfigItem:delConfigItem,
      startUpCase:startUpCase,
      stopItCase:stopItCase,
      disconnectSocket:disconnectSocket
    };

    function info(){
      InstancQuery();
      InstancToConfigure();
      InstancEcharts();
      ItemFile.id=undefined;
    }

    function params(){
      var param={
        hostName:$stateParams.host,
        id:$stateParams.instance
      };
      return param;
    }
    //实例信息查询
    function InstancQuery(){
      httpServe.getInstance(JSON.stringify(params())).then(function(res){
        if(res.state==='success'){
          if(res.state.id===null){
            promisesServe.msgBar('warning','查无数据，请核对信息');
            $timeout(function(){
              window.history.go(-1);
              //$state.go('disasterRec.hostQuery');
            },2000);
          }else{
            angular.copy(res.data,instancData);
            getInstanceTypes();
            getComponent();
            instancData.hostName=$stateParams.host;
            if($stateParams.operateType==='修改'){
              angular.copy(instancData,operation);
              operation.hostName=$stateParams.host;
            }
          }
        }else{
          promisesServe.msgBar('warning',res.desc);
          $timeout(function(){
            window.history.go(-1);
            //$state.go('disasterRec.hostQuery');
          },2000);
        }
      })
    }
    //实例日志
    function InstancJournal(){
      httpServe.getInstancJournal(JSON.stringify(params())).then(function(res){
        if(res.state==='success'){
          angular.copy(res.data,journalData);
        }else{
          promisesServe.msgBar('warning',res.desc);
        }
      })
    }
    function InstancEcharts(){
      httpServe.getInstancEcharts(JSON.stringify(params())).then(function(res){
        if(res.state==='success'){
          angular.copy(res.data,instancEchartsData);
          instancCpu(instancEchartsData);
          instancMems(instancEchartsData);
        }else{
          promisesServe.msgBar('warning',res.desc);
        }
      });
      socket = io.connect(systemIP.getUser(),{'force new connection': true});
        socket.on('instanceEcharts',function(res){
          if(res.state === 'success'){
             $timeout(function(){
              angular.copy(res.data,instancEchartsData);
               instancCpu(instancEchartsData);
               instancMems(instancEchartsData);
           },0)
          }
        });

    }
    //日志详情
    function logDetails(item){
      $state.go('disasterRec.hostLogDetails',{
        insId:$stateParams.insId,
        journalId:item
      });
    }
    //echarts CPU信息
    function instancCpu(item){
      if(document.getElementById('instancCpu')!==null){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('instancCpu'));
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(promisesServe.setOptions('CPU使用率',item.insCpuUsage,item.insCpuTime));
      }
    }
    //echarts 内存信息
    function instancMems(item){
      if(document.getElementById('instancMems')!==null){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('instancMems'));
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(promisesServe.setOptions('内存使用率',item.insMemUsage,item.insMemTime));
      }
    }

    function disconnectSocket(){
      socket.disconnect();
    }

    //跳转修改实例
    function operationUP(item){
      $state.go('disasterRec.detailsOperation',{'host':instancData.hostName,'instance':instancData.id,'operateType':item});
    }
    //修改初始化
    function operationUpInfo(){
      if($stateParams.operateType==='修改'){
        InstancQuery();
        //getInstanceTypes();
        //getComponent()
      }
    }
    //修改保存
    function perationSub(item,val){
      if(instancData.name===item.name&&instancData.path===item.path&&instancData.stopScript===item.stopScript
        &&instancData.startScript===item.startScript&&instancData.instancesTypeId===item.instancesTypeId
        &&instancData.componentId===item.componentId&&instancData.explain===item.explain){
        promisesServe.msgBar('warning','未做任何修改请修改！');
      }else{
        if(val.name===3 || val.name===4){
          httpServe.getUpInstance(JSON.stringify(item)).then(function(res){
            if(res.state==='success'){
              promisesServe.msgBar('success','修改成功！');
              $timeout(function(){
                $state.go('disasterRec.hostInstance',{'host':item.hostName,'instance':item.id});
              },1000);
            }else{
              promisesServe.msgBar('error',res.desc);
            }
          });
        }else{
          promisesServe.msgBar('error','修改失败！');
        }
      }
    }
    //返回实例页面
    function callBack(){
      $state.go('disasterRec.hostInstance',{'host':operation.hostName,'instance':operation.id});
    }
    //实例类型
    function getInstanceTypes(){
      var param={};
      httpServe.getInstanceType(JSON.stringify(param)).then(function(res){
        if(res.state==='success'){
          angular.copy(res.data,InstanceType);

            angular.forEach(InstanceType,function(key){
              if(key.id===operation.insTypeId){
                operation.insTypeId=key.id
              }
              if(instancData.instancesTypeId===key.id){
                instancData.instancesTypeName=key.name
              }
            });
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
            angular.forEach(Components,function(key){
              if(key.id==operation.componentsId){
                operation.componentsId=key.id
              }
              if(instancData.componentId===key.id){
                instancData.componentName=key.name
              }
            });
        }else{
          promisesServe.msgBar('error',res.desc);
        }
      });
    }

    //实例配置信息
    function InstancToConfigure(){
      httpServe.getInstancToConfigure(JSON.stringify(params())).then(function(res){
        if(res.state==='success'){
            angular.copy(res.data,toConfigureData);
        }else{
          promisesServe.msgBar('warning',res.desc);
          toConfigureData.length===0
        }
      })
    }
    //新增配置弹出框
    function addFile(){
      $('#addFile').modal('show');
      angular.copy([],files);
    }
    //新增确认
    function addConfirmFile(item){
      var strs='';
      var param=item;
      param.hostName=$stateParams.host;
      param.instanceId=$stateParams.instance;
      var str=param.filePath.toString();
      if(str[str.length-1]==='/'){
        strs=str.substring(0,str.length-2)
      }
      if(strs){
        param.filePath=strs
      }
      httpServe.post('manage/config/add',JSON.stringify(param)).then(function(res){
        if(res.state==='success'){
          $('#addFile').modal('hide');
          promisesServe.msgBar('success','新增成功！');
          InstancToConfigure()
        }else{
          promisesServe.msgBar('warning',res.desc);
        }
      })
    }

    //修改配置弹出框
    function updateFile(item){
      $('#updateFile').modal('show');
      angular.copy(item,files);
      angular.copy(item,comparison);
    }
    function upConfirmFile(item){
      if(item.fileAlias===comparison.fileAlias&&item.fileName===comparison.fileName&&item.filePath===comparison.filePath){
        promisesServe.msgBar('warning','请修改后提交!');
      }else{
        var param=item;
        param.hostName=$stateParams.host;
        param.instanceId=$stateParams.instance;
        httpServe.post('manage/config/update',JSON.stringify(param)).then(function(res){
          if(res.state==='success'){
            $('#updateFile').modal('hide');
            promisesServe.msgBar('success','修改成功！');
            InstancToConfigure()
          }else{
            promisesServe.msgBar('warning',res.desc);
          }
        })
      }

    }
    //删除弹出框
    function delFile(item){
      $('#delModal').modal('toggle');
      angular.copy(item,files);
    }
    //载入
    //function loadFile(item){
    //    console.log(item)
    //}
    //配置文件删除
    function delConfirmFile(item){
      var param={id:item};
      param.hostName=$stateParams.host;
      httpServe.post('manage/config/delete',JSON.stringify(param)).then(function(res){
        if(res.state==='success'){
          ItemFile.id=undefined;
          promisesServe.msgBar('success','删除成功！');
          InstancToConfigure()
        }else{
          promisesServe.msgBar('warning',res.desc);
        }
      })
    }
    //显示配置文件详细内容
    function queryItemFile(item){
      console.log(item)
      var param={id:item.id,filePathTotal:item.filePathTotal};
      filePath=item.filePath;
      fileName=item.fileName;
      param.hostName=$stateParams.host;
      //param.filePathTotal=item.filePathTotal;
      var loa=document.getElementById("loading");
      loa.style.display="block";
      httpServe.post('manage/configItem/query',JSON.stringify(param)).then(function(res){
        var loa=document.getElementById("loading");
        loa.style.display="none";
        if(res.state==='success'){
          if(res.data.id===null){
            angular.copy([],ItemFile);
            ItemFile.id=param.id;
            ItemFile.items=[];
            angular.copy(ItemFile.items,comparison.items);
          }else{
            angular.copy(res.data,ItemFile);
            angular.copy(res.data,comparison);
          }
        }else{
          promisesServe.msgBar('warning',res.desc);

        }
      })
    }
    //添加空行
    function addConfigItem(){
      var param={key:'',val:''};

      ItemFile.items.push(param);
    }
    //添加减号
    function delConfigItem(num){
      ItemFile.items.splice(num,1);
    }

    //配置文件详情修改
    function upconfigItem(item){

      //var reg=/[^\x00-\xff]/;
      var param=item;
      //var b=encodeURI(param.items)
      //console.log(b)
      //console.log(decodeURI(b))
      //console.log((param.items).match(reg));
      //if((param.items).match(reg)!==null){
      //  promisesServe.msgBar('warning','配置文件内容不能有中文以及符号！');
      //  return
      //}
      //var regs=/[\\]/;
      //var param=item;
      //console.log((param.items).match(reg));
      //if((param.items).match(regs)!==null){
      //  promisesServe.msgBar('warning','配置文件内容不能有中文以及特殊符号！');
      //  return
      //}
      //var par=comparison;
      //var string=''
      //debugger
      param.hostName=$stateParams.host;
      param.filePath=filePath;
      param.fileName=fileName;
      delete param.configureFileId;
      delete param.id;
      //console.log(param)
      //for(var i=0;i<item.items.length;i++){
      //  delete item.items[i].$$hashKey;
      //  if(item.items[i].key===''|| item.items[i].val===''){
      //    //item.items.splice([i],1)
      //    promisesServe.msgBar('warning','配置文件内容不能有空！');
      //    return
      //  }
        //if(item.items[i].key){
        //  //var key=item.items[i].key.toString().replace('\'','\\');
        //  //console.log(key)
        //}
      //}
      //debugger
      //for(var x=0;x<item.items.length;x++){
      //  for(var x=0;x<par.items.length;x++){
      //    if(item.items[x].key!==par.items[x].key || item.items[x].val!==par.items[x].val){
      //      string='修改'
      //    }
      //  }
      //}
      //if(string==='修改'){


        var loa=document.getElementById("loading");
        loa.style.display="block";
        httpServe.post('manage/configItem/update',JSON.stringify(param)).then(function(res){
          var loa=document.getElementById("loading");
            loa.style.display="none";
          if(res.state==='success'){
            if(res.data==='00'){
              promisesServe.msgBar('success',res.desc);
            }else{
              promisesServe.msgBar('warning',res.desc);
            }
            ItemFile.id=undefined;
          }else{
            promisesServe.msgBar('warning',res.desc);
          }
        });
      //}else{
      //  promisesServe.msgBar('warning','未做任何修改！');
      //}
    }
    //配置文件内容取消按钮
    function upconfigCallBack(){
      ItemFile.id=undefined;
    }
    //启动实例
    function startUpCase(){
      if(instancData.status==='00'){
        promisesServe.msgBar('warning','实例已启动无需再启动！');
      }else{
        httpServe.post('/manage/instance/start',JSON.stringify(params())).then(function(res){
          if(res.state==='success'){
            promisesServe.msgBar('success',res.desc);
            InstancQuery();
          }else{
            promisesServe.msgBar('error',res.desc);
          }
        });
      }
    }
    function stopItCase(){
      if(instancData.status==='02'){
        promisesServe.msgBar('warning','实例已停止无需再停止！');
      }else{
        httpServe.post('/manage/instance/stop',JSON.stringify(params())).then(function(res){
          if(res.state==='success'){
            promisesServe.msgBar('success',res.desc);
            InstancQuery();
          }else{
            promisesServe.msgBar('error',res.desc);
          }
        });
      }
    }




  }
  hostInstancSer.$inject = ['$state','$timeout','httpServe','$interval','promisesServe','$stateParams','systemIP'];
})(angular);
