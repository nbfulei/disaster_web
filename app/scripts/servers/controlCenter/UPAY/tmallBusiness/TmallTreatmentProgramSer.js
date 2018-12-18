/**
 * Created by Administrator on 2016/10/17.  valGet
 */

(function () {
    'use strict';
    angular.module('services.TreatmentProgramSer', [])
        .factory('TmallTreatmentProgramSer', TmallTreatmentProgramSer);
    function TmallTreatmentProgramSer(httpServe, $timeout, promisesServe,$rootScope) {
      var setTreat = {};//查询条件集合
      var treatMessage = [];
      var valGet = [];//选择的ip集合
      var checkedIp = [];
      var valOrder = {setOrder: ""};//选择的执行命令集合
      var excuting = {};//我要执行模态框数据集合
      /*-----------------------*/
      
      var arr;
      var ord;
      var addParam = {};
      var tempParam={};//跳转页数时，保存的查询参数
      
      var isDo = {};
      var batchResult = [];
      var upDelDate={}; //选择数据集合
      var idList=[];//ID集
      return {
        setTreat: setTreat,//查询条件集合
        treatMessage: treatMessage,//查询结果集合
        initParam: initParam,  //初始化查询条件
        treatQuery: treatQuery, //查询
        checkIp: checkIp,//IP选择框确认按钮
        valGet: valGet,//获取ip集合
        checkedIp: checkedIp,//选择的ip集合
        checkOrder: checkOrder,//order选择框确认按钮
        valOrder: valOrder,//选择的执行命令集合
        clearBatch: clearBatch,//清空添加弹出框内容点击取消时
        
        /*=------我要执行框----------*/
        excuting: excuting,//执行命令框数据集合
        excutingOrder: excutingOrder,//执行
        conChange: conChange,//改变配置
        initDealWith: initDealWith,//点击我要执行触发
        /***************新增***********************/
        saveBatch: saveBatch,  //保存添加批处理数据
        /*************修改******************/
        upDelTreat: upDelTreat,
        batchExecution: batchExecution,
        /***************删除*********************/
        delTreat: delTreat,
        /****************立即执行*******************/
        addBatch: addBatch,
        
        doConfig: doConfig,
        batchResult: batchResult,
        isDoFn: isDoFn,
        turnToPage: turnToPage,
        batchProcessing:batchProcessing //列表多选
      };
      //初始化状态值
      function addBatch() {
        addParam.implementation = '1';
        return addParam;
      }

      //初始化查询条件
      function initParam() {
        var params = {
          ip: "",
          configuration: ""
        };
        angular.copy(params, setTreat);
        setTreat.currentPage = 1;
        setTreat.pageCount = 5;
        treatQuery();
      }


      //封装查询条件
      function condition(params) {
        var param = angular.copy(params);
        if (params.ip === null) {
          param.ip = ""
        }
        if (params.configuration === null) {
          param.configuration = ""
        }
        return param;
      }

      // 初始化批处理执行框按钮
      function isDoFn() {
        isDo = {
          pause: true,
          play: false
        };
        return isDo;
      }

      //查询  turnToPage

      function treatQuery() {
        var url = "/om/batchProcessing/configQuery";
        idList=[];
        $timeout(function () {
          var param = condition(setTreat);
          param.currentPage = setTreat.currentPage=1
          param.pageCount = 5;
          angular.copy(setTreat,tempParam);
          if (param !== undefined) {
            httpServe.post(url, JSON.stringify(param)).then(function (res) {
              if (res.state === "success") {
                angular.copy(res.data, treatMessage);
                executionMode(treatMessage.datas);
                if (!res.data.datas||(res.data.datas&&res.data.datas.length<1)) {
                  //暂时去掉 promisesServe.msgBar('warning','暂无数据！');
                }
              }else{
                promisesServe.msgBar('warning',res.desc);
              }
            })
          }
        }, 0)
      }
      //跳转到@页，下一页 上一页
      function turnToPage(param) {
        tempParam.currentPage = param;
        idList=[];
        var url = "/om/batchProcessing/configQuery";
        httpServe.post(url, JSON.stringify(tempParam)).then(function (res) {
              if (res.state === "success") {
                angular.copy(res.data, treatMessage);
                executionMode(treatMessage.datas);
              }else{
                promisesServe.msgBar('warning',res.desc);
              }
            })
      }
      //执行方式  UNIX SHELL命令  oracle命令  sybase命令
      function executionMode(data) {
        data.forEach(function (item) {
          var Titel=item.ip;
          var exOrder=item.executiveOrder;
          item.ipTitel=Titel.replace(/;/g, '\n');
          item.eOrder=exOrder.replace(/@&/g, '\n');
          item.eOrderShow=exOrder.replace(/@&/g, ';');
          switch (item.implementation) {
            case '1':
              item.ation = 'UNIX SHELL命令';
              break;
            case '2':
              item.ation = 'oracle命令';
              break;
            default:
              item.ation = 'sybase命令';
              break;
          }
        })
      }




      //IP选择框选择Ip
      function checkIp(data) {
        var peoms = [];
        angular.copy(data, peoms);
        angular.extend(peoms, data);
        var obox1 = document.getElementById("checkBox1").getElementsByTagName("input");
        var val = [];
        angular.forEach(obox1, function (i) {
          if (i.checked) {
            val.push(i.value);
          }
         
        });
        angular.forEach(treatMessage, function (item) {
          if (peoms.configuration === item.configuration) {
            item.initip = val.join(";");
          }
        });
      }

      //order选择框选择命令
      function checkOrder(data) {
        var peoms = [];
        angular.copy(data, peoms);
        angular.extend(peoms, data);
        var obox2 = document.getElementById("checkBox2").getElementsByTagName("input");
        var val = [];
        angular.forEach(obox2, function (i) {
          if (i.checked) {
            val.push(i.value);
          }
          i.checked = false;
        });
        angular.forEach(treatMessage, function (item) {
          if (peoms.configuration === item.configuration) {
            item.initOrder = val.join(";");
          }
        });
      }

      //保存新增批处理数据
      function saveBatch(data, ipadd, addip) {
        var param = {};
        param.configuration = data.configuration;
        param.implementation = data.implementation;
        param.explain = data.explain;
        param.ip = addip.join(';');
        param.executiveOrder = (data.executiveOrder).replace(/\n/g, '@&');
        param.author=$rootScope.userInfo.staffName;
        httpServe.post("/om/batchProcessing/saveConfig", JSON.stringify(param)).then(function (res) {
          if (res.state === "success") {
            promisesServe.msgBar('success', res.desc);
            treatQuery()
          } else {
            promisesServe.msgBar('error', res.desc);
          }
        });
        clearBatch(data, ipadd, addip);
        $('#myModal').modal('hide');
      }

      //清空添加弹出框内容点击取消时
      function clearBatch(data, ip, addip) {
        angular.copy([], data);
        data.implementation = '1';
        angular.copy([], addip);
        angular.copy({}, ip);
      }

      //选择按钮选择
      function ationCheck(data){
        var indnum={'1':0,'2':1,'3':2};
        var num=indnum[data];
        $("input[type='radio'][name='order']").attr("checked",false);//所有单选按钮都不选中
        $("input[type='radio'][name='order']").get(num).checked = true;//选中第一个
       /* 中文注释var check=$('[name="order"]').attr('checked');
          check="checked";*/
       /* 中文注释switch(data){
          case '1':
            check="checked";
          case '2':
            check="checked";
          case '3':
            check="checked";


        }*/
      }

      /**********执行批处理**********/
      //初始化我要执行
      function initDealWith() {
        var checkdata=promisesServe.getCheckbox(treatMessage);
        if (checkdata.checkdata&&checkdata.checkdata.length<2) {
          var checkMsg;
          var excutings;
            $('#example').modal('show');
            checkMsg=promisesServe.getCheckbox(treatMessage);
            paramArr(treatMessage.datas[0].ip, treatMessage.datas[0].executiveOrder);
            if (checkMsg.checkdata&&checkMsg.checkdata.length>0) {
                paramArr(checkMsg.checkdata[0].ip, checkMsg.checkdata[0].executiveOrder);
                excutings = {
                            configuration: checkMsg.checkdata[0].configuration,
                            implementation: checkMsg.checkdata[0].implementation,
                            ip: checkMsg.checkdata[0].ip,
                            executiveOrder: (checkMsg.checkdata[0].executiveOrder).replace(/@&/g, '\n')
                          };
            }else{
                   excutings = {
                    configuration: treatMessage.datas[0].configuration,
                    implementation: treatMessage.datas[0].implementation,
                    ip: treatMessage.datas[0].ip,
                    executiveOrder: (treatMessage.datas[0].executiveOrder).replace(/@&/g, '\n')
                  };
            }
            angular.copy(excutings, excuting);
            ationCheck(excuting.implementation);
        }else{
           promisesServe.msgBar('warning','最多选择一条数据进行此操作！');
        }


      }

      // 我要执行 模态框展示框配置
      function paramArr(arrips, arrOrders) {
        var arrip = [];
        angular.forEach(arrips, function (item) {
          arrip.push(item);
        });
        arr = arrip.join(";");
        ord = arrOrders.replace(/@&/g , '\n');
      }

      //改变配置
      function conChange(data) {
        if (data === null) {
          angular.copy({}, excuting);
        }
        angular.forEach(treatMessage.datas, function (item) {
          if (item.configuration === data) {
            paramArr(item.ip, item.executiveOrder);  //调试去掉
            excuting.ip = item.ip;    //arr;
            excuting.executiveOrder = ord;
            excuting.implementation = item.implementation;
            ationCheck(excuting.implementation);
          }
        });

      }

      //字符串添加到集合中
      function joinArr(data) {
        if (Object.prototype.toString.call(data.executiveOrder) === "[object String]") {
        
          var arr2 = (data.executiveOrder).split("\n");

          angular.forEach(arr2, function (item) {
            data.executiveOrder += item;
          });
        }
      }


      //查询信息全选以及单选对应的处理  获取多选的数据，以数组的形式返回
      
      function batchProcessing(value){
        /*中文注释var newList=fCheckBoxClick(returnType,checkList,num);
        中文注释angular.copy(newList,idList);
        中文注释if(newList.length===1){
          中文注释angular.copy(param, upDelDate);
        }*/
        var checkLength=0;
        idList=[];
        angular.forEach(treatMessage.datas,function(item){
          if(item.checkbox===true){
            checkLength+=1;
          };
        });

        if (checkLength<treatMessage.datas.length) {
          treatMessage.allChecked=false;
        }
        if (checkLength===treatMessage.datas.length) {
          treatMessage.allChecked=true;
        }
        if (value==='all'&&checkLength<treatMessage.datas.length) {
          angular.forEach(treatMessage.datas,function(item){
            item.checkbox=true;
            treatMessage.allChecked=true;
          });
        }
         if (value==='all'&&checkLength===treatMessage.datas.length) {
            angular.forEach(treatMessage.datas,function(item){
            item.checkbox=false;
            treatMessage.allChecked=false;
          });
          }
          //获得所选多条数据的id，和单条修改数据
          angular.forEach(treatMessage.datas,function(item){
          if(item.checkbox===true){
            idList.push(item.id);
             angular.copy(item, upDelDate);
          };
        });
      }
      /********************修改***********************/
      //跳转到修改或者删除模态框  valGet
      function upDelTreat(flag,ipAmend){
        if (idList.length===0) {
          promisesServe.msgBar('warning','请选择数据进行此操作！');
        } else if(idList.length===1){
         if (flag === '1') {
          //判断是否是数组
          if(!(upDelDate.ip.constructor===Array)){
            upDelDate.ip = upDelDate.ip.split(";");
          }
           upDelDate.executiveOrder = upDelDate.executiveOrder.replace(/@&/g, '\n');
            angular.copy(upDelDate,valGet);
            $('#update').modal('show');
          } else if (flag === '2' ){
            $('#delData').modal('show');
          }
        }else{
          if (flag === '2') {
            $('#delData').modal('show');
          }else {promisesServe.msgBar('warning','请选择一条数据进行此操作！');}
        }
      }

      //保存修改
      function batchExecution(data, ipAmend) {
        if (data.ip.length>0) {
              var param = {};
              if (data.ip.length === 1) {
                param.ip = data.ip.join();
              } else {
                param.ip = data.ip.join(';');
              }
              param.id = data.id;
              param.implementation = data.implementation;
              param.executiveOrder = data.executiveOrder.replace(/\n/g, '@&');
              param.explain = data.explain;
              param.author=$rootScope.userInfo.staffName;
              $timeout(function () {
                if (param !== undefined) {
                  httpServe.post("/om/batchProcessing/updateConfig", JSON.stringify(param)).then(function (res) {
                    if (res.state === "success") {
                      promisesServe.msgBar('success', res.desc);
                      idList=[];
                      treatQuery();
                    } else {
                      promisesServe.msgBar('warning', res.desc);
                    }
                  })
                }
              }, 0)
        }else{
            promisesServe.msgBar('warning', '请保留至少一个IP地址！');
        }

      }

      /***************删除*************/
      function delTreat() {
        var ids=[];
        angular.copy(idList,ids)
        var param = {ids: ids.join(';')};
        $timeout(function () {
          if (param !== undefined) {
            httpServe.post("/om/batchProcessing/deleteConfig", JSON.stringify(param)).then(function (res) {
              if (res.state === "success") {
                promisesServe.msgBar('success', res.desc);
                treatQuery();
                idList=[];
                treatMessage.allChecked=false;
              } else {
                promisesServe.msgBar('error', res.desc);
              }
            })
          }
        }, 0)
      }

      //执行
      function excutingOrder(item) {
        var param = {};
        param.configuration = item.configuration;
        param.implementation = item.implementation;
        param.ip = item.ip;
        param.executiveOrder = item.executiveOrder.replace(/\n/g, '@&');
        param.author=$rootScope.userInfo.staffName;
        var url = "/om/batchProcessing/execution";
       
          if (param !== undefined) {
            httpServe.post(url, JSON.stringify(param)).then(function (res) {
              if (res.state === "success") {
                promisesServe.msgBar('success', res.desc);
                angular.forEach(treatMessage.datas,function(item){
                  item.checkbox=false;
                });
              } else {
                promisesServe.msgBar('warning', res.desc);
              }
            })
          }
       
      }

      // 启停配置按钮
      function doConfig(flag) {
        if (flag === 'pause') {
          isDo.pause = false;
          isDo.play = true;
        } else if (flag === 'play') {
          isDo.pause = true;
          isDo.play = false;
        }
      }

      /**
       * @Description 多选框全选/反选/单选
       * @param  reType:返回类型（list:集合;void:false）
       checkList:多选列表对象
       num:单选项在列表中的下标
       * @return list or void(集合对象或者false)
       **/
      /*中文注释function fCheckBoxClick(reType,checkList,num){
        //当没有数据的时候，不做多选处理，否则会因为marquee出现一条空数据
        if(undefined===checkList){
          return;
        }
        var checkBool;//复选框状态
        var newList = [];//返回集合
        if(undefined===num){//全选/反选
          checkBool = !checkList.marquee;
          checkList.marquee = checkBool; //全选框状态修改
          for (var i in checkList) {
            //如果i是全选框的状态，则当条数据去掉
            if('marquee'===i){
              break;
            }
            checkList[i].checkbox = checkBool; //多选框状态修改
            newList.push(checkList[i].id);//获取所有勾选数据数组
          }
          //如果全选框不为true则返回空数组
          if(false===checkBool){
            newList = [];
          }
        }else{//单选
          checkList[num].checkbox = !checkList[num].checkbox; //当前多选框状态修改
          checkBool = true;
          for (var o in checkList) {
            //如果i是全选框的状态，则当条数据去掉
            if('marquee'===o){
              break;
            }
            //一旦存在多选框状态不为true，则全选框的状态应为false
            if (true!== checkList[o].checkbox) {
              checkBool = false;
            }
            //获取所有勾选数据数组
            if(true===checkList[o].checkbox){
              newList.push(checkList[o].id);
            }
          }
          checkList.marquee = checkBool; //全选框赋值
        }
        //返回对象
        if('list'===reType){
          return newList;
        }else if('void'===reType){
          return false;
        }
      }*/



    }

    TmallTreatmentProgramSer.$inject = ['httpServe', '$timeout', 'promisesServe','$rootScope'];
})();

