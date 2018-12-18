/**
 * Created by Administrator on 2017/2/17 0017.
 * 负载均衡维护
 */
;(function (angular) {
  'use strict';
  angular.module('services.loadEqualMaintainSer',[]).factory('loadEqualMaintainSer', loadEqualMaintainSer);
  function loadEqualMaintainSer($timeout,httpServe,$interval,promisesServe) {      
      var param=[];//后台省份数据
      var provinceInfo={};
      var getting;
     var eventLevel=[];//下拉框集合
      var switchinfo={};
       var msg={};
       var currentObj={region:'hn'};
    return {
      initGetting:initGetting,
      provinceInfo:provinceInfo,
      switchinfo:switchinfo,
      load:load,//初始化华南地区
      tabClass:tabClass,//切换华北地区样式 
      tabNorth:tabNorth,
      tabSouthern:tabSouthern,
      tabMiddle:tabMiddle,
      tabWest:tabWest,
      tabOuery:tabOuery,
      getInfoQuerty:getInfoQuerty,
      deleteInfo:deleteInfo,
      initeventLevel:initeventLevel,
      selectType:selectType,
      initSelectedType:initSelectedType,
      selectData:selectData,
      allDell:allDell,
      initNotice:initNotice,  
      onClickNJ:onClickNJ,
      SedNJ:SedNJ,
      SedDG:SedDG,
      SedOther:SedOther,
      getUrlTo:getUrlTo,
      getOtherUrl:getOtherUrl,
      initQuery:initQuery,
      QuerySave:QuerySave,
      SaveInfo:SaveInfo,
      getEquipmentFirm:getEquipmentFirm,
      QueryDelete:QueryDelete,
      tabDeal:tabDeal
      // QueryShow:QueryShow
    };
  
    //查询数据
     function getEquipmentFirm(){
       msg={
       Query:[{provName:'查询',center:'NJ'}]
      }        
      return msg;
    }
    //获得南方基地 东莞中心 其它ip查询
    function onClickNJ(){
    var tempUrl="/array/getUrl";   
     httpServe.post(tempUrl,JSON.stringify()).then(function (res){  
                  angular.copy(res,switchinfo);
       })
       
    }
    
    //点击南基发送请求
    function SedNJ(param){ 
      var njnum={};
      njnum.url=param;
        var tempUrl="/array/setUrl";
         httpServe.post(tempUrl,JSON.stringify(njnum)).then(function (res){
               if(res.state==='success'){
                    promisesServe.msgBar('success','请求成功'); 
                    switchinfo.url=param
                    getInfoQuerty();
               }
       })
    }
      function SedDG(param){ 
      var dgnum={};
      dgnum.url=param;
        var dgUrl="/array/setUrl";
         httpServe.post(dgUrl,JSON.stringify(dgnum)).then(function (res){
          if(res.state==='success'){
                    promisesServe.msgBar('success','请求成功'); 
                    getInfoQuerty();
               }
              
       })
    }
      function SedOther(param){ 
      var othernum={};
      othernum.url=param;
        var othersUrl="/array/setUrl";
         httpServe.post(othersUrl,JSON.stringify(othernum)).then(function (res){
             if(res.state==='success'){
                    promisesServe.msgBar('success','请求成功')              
               }
          })
             getInfoQuerty(); 
    }
     function getUrlTo(a){
       angular.copy(a,param.otherUrl);
       
     }
     
   function getOtherUrl(param){
     var Url="/array/setOther";
     var b={};
     b.url=param;
     if(param===switchinfo.dgUrl||param===switchinfo.njUrl){
         document.getElementById("button1").disabled=true;    
         promisesServe.msgBar('warning','你输入了重复的ip,需重新输入');  
      }else if(param!==switchinfo.dgUrl||param!==switchinfo.njUrl){
   document.getElementById("button1").disabled=false;  
     httpServe.post(Url,JSON.stringify(b)).then(function(res){
            if(res.state==='success'){
                promisesServe.msgBar('success','修改成功'); 
                      var tempUrl="/array/getUrl";   
     httpServe.post(tempUrl,JSON.stringify()).then(function (res){  
                  angular.copy(res,switchinfo);
          })       
        }          
     });
      }
   }
   //进入先查到后台传来的当前负载侧判断
      function initQuery(){
          var queryinfo={};
          queryinfo.provName='查询'
          var queryUrl="/operation/array/query";
     httpServe.post(queryUrl,JSON.stringify(queryinfo)).then(function(res){
            if(res.state==='success'){
             angular.forEach(res.data,function(a){
               if(a.provName==='DG'){
                  angular.forEach(msg.Query,function(item){
                item.center='DG';
              })
               }
             })
               angular.forEach(res.data,function(a){
               if(a.provName==='NJ'){
                  angular.forEach(msg.Query,function(item){
                item.center='NJ';
              })
               }
             })
        }
     });
      }
      //查询的添加
      function QueryDelete(param){
          var isdele=window.confirm('将删除查询相关策略，是否确认？');
            if(isdele){
        var deleteUrl="/operation/array/delete";
         var deletemsg={};
          deletemsg.provName=param;
     httpServe.post(deleteUrl,JSON.stringify(deletemsg)).then(function(res){
            if(res.state==='success'){
              angular.forEach(msg.Query,function(item){
                   if( item.center==='DG'){
                        item.center='NJ';
                      }
                    })
                  }
              });  
        }
      }
        //查询的添加
      function QuerySave(param){ 
         var isdele=window.confirm('将添加查询相关策略，是否确认？');
            if(isdele){        
          var saveUrl="/operation/array/save";
          var savedata={};
          savedata.provName=param
     httpServe.post(saveUrl,JSON.stringify(savedata)).then(function(res){
            if(res.state==='success'){
                    angular.forEach(msg.Query,function(item){
                        if(item.center==='NJ'){
                          item.center='DG';
                        }
                      })
                    }
               });             
             }
      }
    //公告数据
    function initNotice(){
      var notice=[{
          msg:'该页面为array策略操作入口，当且仅当array当前策略与系统配置不符，巡检出现异常告警或切换回滚失败时使用，请谨慎操作',
          state:'normal'},
          {
          msg:'某省份策略被添加至array时，该省报文消息会被分配至东莞中心处理，反之删除策略报文会分配至南方基地',
          state:'normal'
      },
      {
          msg:'理论上同一大区的所有省份负载侧应该一致，提交添加或删除策略前应确认所选中的省份提交后操作结果是否符合该标准',
          state:'normal'
      }, {
          msg:'查询报文的默认执行侧是南方基地。可以通过该页面分配至东莞中心，需要确认数据同步功能正常后才能执行该操作',
          state:'normal'
      }]
      return notice;
    }
     //页面绑定的对象
    function initGetting(){
     getting=[{Type:'批量添加'},{Type:'批量删除'}]
      return getting;
    }
    function initeventLevel(){
     eventLevel =[{levelName:'批量添加'},{levelName:'批量删除'}];
      return eventLevel;
    }
      //选择框的样式
    	function selectType(event) {
			$('#certTypeDropdown li').each(function () {
				$(this).children('div:first').attr('class', 'normal');
			});
			$(event.target).closest('div').attr('class', 'change');
		}
    //未选择框选中某条某条显示
    function initSelectedType(items,param){
      angular.forEach(items, function (item,key) { 
				if (item.levelName === param.Type) {
					selectType({target: $('#certTypeDropdown li div')[key]});
				}
			});
    }
     	//选择下拉框的值
   function selectData(data){
     getting.Type=data;     
 }
 //华南批量删除
   function allDell(){
     var params={};
    params.provName=[];
    params.prov=[];
     params.center=[];
     params.checkbox=[];
     provinceInfo.datas=[];//华南
      //华南批量删除
      var a=0;
     provinceInfo.datas=provinceInfo[currentObj.region];  
     params.provNames=promisesServe.getCheckbox(provinceInfo);
      if(!params.provNames.checkdata||params.provNames.checkdata.length<1){
          promisesServe.msgBar('warning','请选择一条或多条数据再操作');
       getting.Type="请选择";  
     }
     angular.forEach(params.provNames.checkdata,function(item){  
        if(getting.Type==="批量删除"&&item.center==="NJ"){
             promisesServe.msgBar('warning','选取了添加按钮,请重新选择');
                a+=1; 
          angular.forEach(provinceInfo[currentObj.region],function(a){
            if(a.provName===item.provName){
                 a.checkbox=false;
                }
            })          
          }
            if(getting.Type==="批量添加"&&item.center==="DG"){
                promisesServe.msgBar('warning','选取了删除按钮,请重新选择');
                   a+=1;     
              angular.forEach(provinceInfo[currentObj.region],function(a){
                if(a.provName===item.provName){
                     a.checkbox=false;
                     }
                  })          
                }
            var p={};
            p.provName=item.provName;         
              params.prov.push(p);  
              params.center.push(item.center); 
              params.checkbox.push(item.checkbox); 

         });
      if(a===0){
              params.provName=params.prov;  
           }
            
     $timeout(function(){
             if(a>0){
             getting.Type='请选择';
           }},500);
     if((getting.Type==="批量删除"||params.center==="DG")&&a===0&&params.provName.length>0){    
          var isdele=window.confirm('将批量删除array相关策略，是否确认？');
             if(isdele){
            var tempUrl="/operation/array/deleteConfig";
            var acodes={};
          acodes.provName=params.provName      
          httpServe.post(tempUrl,JSON.stringify(acodes)).then(function (res){
              if(res.state === 'success'){
           promisesServe.msgBar('success',res.desc);
            getting.Type='请选择';
            angular.forEach(params.provNames.checkdata,function(a){        
                   a.checkbox=false;               
                   a.center='NJ'    
                });
              }
           }); 
     }   
     }else if((getting.Type==='批量添加'||params.center==='NJ')&&a===0&&params.provName.length>0){
         var issure=window.confirm('将批量添加array相关策略，是否确认？');
             if(issure){
          var temphuananUrl="/operation/array/saveConfig";
          var code={};
          code.provName=params.provName
          httpServe.post(temphuananUrl, JSON.stringify(code)).then(function (res){
        if(res.state === 'success'){
          promisesServe.msgBar('success',res.desc);
           getting.Type='请选择';
           angular.forEach(params.provNames.checkdata,function(a){
              a.checkbox=false;
              a.center='DG'
           });
           }         
         });
       }
     }    
    }    
    //从后台获取省份
    function getInfoQuerty(){
      var tempUrl="/status/flowStatusOp";   
     httpServe.post(tempUrl,JSON.stringify()).then(function (res){  
       if(res.state==='success'){
              angular.copy(res.data,provinceInfo);        
            }else{
               angular.copy(res.data,[]);
            }                               
          })   
        }
    
    function deleteInfo(item){
       var param={};
       param.provName=[];
       var vinda={};
       vinda.provName=item.provName;
       param.provName.push(vinda);
            var isdele=window.confirm('将删除array相关策略，是否确认？');
            if(isdele){
          var tempUrl="/operation/array/deleteConfig";  
          httpServe.post(tempUrl, JSON.stringify(param)).then(function (res){    
              if(res.state === 'success'){
                 promisesServe.msgBar('success', res.desc);  
                     if(item.center==='DG'){
                       item.center='NJ';
                     }
                   }        
                });
              }        
         }

         //添加
   function SaveInfo(item){
       var param={};
       param.provName=[];
       var firm={};
       firm.provName=item.provName;
       param.provName.push(firm);
            var isadd=window.confirm('将添加array相关策略，是否确认？');
            if(isadd){
          var addUrl="/operation/array/saveConfig";
          httpServe.post(addUrl, JSON.stringify(param)).then(function (res){
                if(res.state === 'success'){
                   promisesServe.msgBar('success',res.desc); 
                   if(item.center==='NJ'){
                       item.center='DG';   
                   }
                  }                   
                });
              } 
            }
          //页面加载 样式初始化
      function load(){
        $("#Southern").show();$("#table1").show();
			$("#Southern").css("backgroundColor","");
      	$("#deal").css("backgroundColor","white");
		}
    function tabSouthern(){
      currentObj.region='hn';
      if($("#Southern").show()&&$("#table1").show()){
        $("#Southern").css("backgroundColor","white"); 
        $("#East").show();$("#table2").hide();
         $("#East").css("backgroundColor","");
         $("#North").show();$("#table3").hide()
         $("#North").css("backgroundColor","");
         $("#Middle").show();$("#table4").hide()
         $("#Middle").css("backgroundColor","");
          $("#West").show();$("#table5").hide()
         $("#West").css("backgroundColor",""); 
          $("#Query").show();$("#table6").hide()
         $("#Query").css("backgroundColor","");           
     }
    }
    //点击切换华东样式
    function tabClass(){
      currentObj.region='hd';
     if($("#East").show()&&$("#table2").show()){
        $("#East").css("backgroundColor","white");  
        $("#Southern").show();$("#table1").hide()
         $("#Southern").css("backgroundColor","");
         $("#North").show();$("#table3").hide()
         $("#North").css("backgroundColor","");
         $("#Middle").show();$("#table4").hide()
         $("#Middle").css("backgroundColor","");
          $("#West").show();$("#table5").hide()
         $("#West").css("backgroundColor",""); 
          $("#Query").show();$("#table6").hide()
         $("#Query").css("backgroundColor","");               
     }
    }
    //点击切换华北
    function tabNorth(){
      currentObj.region='hb';
     if($("#North").show()&&$("#table3").show()){
        $("#Southern").show();$("#table1").hide();
         $("#Southern").css("backgroundColor","");
          $("#East").show();$("#table2").hide();
         $("#East").css("backgroundColor","");
         $("#North").css("backgroundColor","white");
         $("#Middle").show();$("#table4").hide()
         $("#Middle").css("backgroundColor","");
          $("#West").show();$("#table5").hide()
         $("#West").css("backgroundColor",""); 
          $("#Query").show();$("#table6").hide()
         $("#Query").css("backgroundColor","");             
     }
    }
    //点击切换中部
    function tabMiddle(){
      currentObj.region='zb';
     if($("#Middle").show()&&$("#table4").show()){
        $("#Southern").show();$("#table1").hide();
         $("#Southern").css("backgroundColor","");
          $("#East").show();$("#table2").hide();
         $("#East").css("backgroundColor","");
         $("#Middle").css("backgroundColor","white"); 
          $("#North").show();$("#table3").hide()
         $("#North").css("backgroundColor","");  
          $("#West").show();$("#table5").hide();
         $("#West").css("backgroundColor","");  
          $("#Query").show();$("#table6").hide()
         $("#Query").css("backgroundColor","");     
     }
    }
    //点击切换西部
    function tabWest(){
      currentObj.region='xb';
     if($("#West").show()&&$("#table5").show()){
        $("#Southern").show();$("#table1").hide();
         $("#Southern").css("backgroundColor","");
          $("#East").show();$("#table2").hide();
         $("#East").css("backgroundColor","");
         $("#West").css("backgroundColor","white");
          $("#North").show();$("#table3").hide()
         $("#North").css("backgroundColor","");  
          $("#Middle").show();$("#table4").hide();
         $("#Middle").css("backgroundColor","");  
         $("#Query").show();$("#table6").hide()
         $("#Query").css("backgroundColor","");        
     }
    }
      //点击切换查询
     function tabOuery(){
     if($("#Query").show()&&$("#table6").show()){
        $("#Southern").show();$("#table1").hide();
         $("#Southern").css("backgroundColor","");
          $("#East").show();$("#table2").hide();
         $("#East").css("backgroundColor","");
         $("#West").show();$("#table5").hide()
         $("#Query").css("backgroundColor","white");
          $("#West").css("backgroundColor","");
          $("#North").show();$("#table3").hide()
         $("#North").css("backgroundColor","");  
          $("#Middle").show();$("#table4").hide();
         $("#Middle").css("backgroundColor","");    
        $("#five").hide();    
         $("#style1").css("backgroundColor","");
         $("#style1").css("marginTop","-35px");
         $("#deal").css("backgroundColor","");
     }
    }
    //点击交易
    function tabDeal(){
      //console.log("aaa");
        if($("#deal").show()&&$("#five").show()){
            $("#table1").show();
           $("#deal").css("backgroundColor","white");       
         $("#Southern").show();
            $("#Query").show();$("#table6").hide()
           $("#Query").css("backgroundColor","");        
      }
    }
  }
  loadEqualMaintainSer.$inject = ['$timeout','httpServe','$interval','promisesServe'];
})(angular);
