 /**
 * Created by Administrator on 2017/2/17 0017.
 * 数据同步维护
 */

;(function (angular) {
   'use strict';
  
  angular.module('services.dataSynchroMaintainSer',[]).factory('dataSynchroMaintainSer', dataSynchroMaintainSer);
  function dataSynchroMaintainSer($timeout,httpServe,$interval,promisesServe) {
     var params={};//切换集合
     var friminfo=[];//后台传的值集合
     var regions={};//后台传的第二张表对比集合
     var region={};
     var msg={};//南基至东莞的数据
     var info=[]; //东莞至南基的数据
     var getting={};
     var eventLevel={};
    
    return {
   friminfo:friminfo,
   regions:regions,
   msg:msg,
   info:info,
   onload:onload,
   onClickNJ:onClickNJ,
   onClickDG:onClickDG,
   getRegionOuery:getRegionOuery,
   OnClickNJGD:OnClickNJGD,
   startOGG:startOGG,
   stopOGG:stopOGG,
   initGetting:initGetting,
   initeventLevel:initeventLevel,
   selectType:selectType,
   initSelectedType:initSelectedType,
   initNotice:initNotice,
   Contrast:Contrast
    };
     //公告数据
    function initNotice(){
      var notice=[{
          msg:'该页面用来启动、停止ogg数据同步的相关进程，当且仅当ogg进程检查出现告警，或切换回滚失败时使用。使用前请根据业务需求确认需要执行的操作及大区。',
          state:'normal'},
          {
          msg:'系统正常运行时，原则上同一大区的正反向同步不能同时开启或同时关闭。',
          state:'normal'
      },
      {
          msg:'执行开启或关闭操作前，请先确认该大区当前的运行侧，根据业务需求确定操作是否必要，避免出现负载侧与同步方向不一致的情况。',
          state:'normal'
      }, {
          msg:'当操作会引起ogg进程巡检告警时，请先关闭告警定时任务，避免操作引起监控系统告警。',
          state:'normal'
      }]
      return notice;
    }
      //页面绑定的对象
    function initGetting(){
     getting=[{Type:'请选择'},{Type:'批量开启'},{Type:'批量关闭'}]
      return getting;
    }
    function initeventLevel(){
     eventLevel =[{levelName:'请选择'},{levelName:'批量开启'},{levelName:'批量关闭'}];
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
					selectType({ target: $('#certTypeDropdown li div')[key] });
				}
			});
    }
    //两个切换按钮跟后台判断的值
    function getRegionOuery(){
      httpServe.getFriminfoOuery(JSON.stringify()).then(function(res){
        if(res.state==='success'){
          angular.copy(res.data,friminfo);
          Contrast();  
               msg.data=[];
                info.data=[]
                angular.forEach(friminfo,function(item){       
                if(item.theirBase==="1"){
                  if(item.state==='RUNNING'){
                    item.operation='关闭';
                    item.states='已开启';
                  }
                  if(item.state==='STOPPED'){
                    item.operation='开启';
                     item.states='已关闭';
                  }
                  if(item.state==='ABENDED'){
                     item.states='--';
                      item.operation='';
                  }
                  msg.data.push(item);
                      return;
                  }
                   if(item.theirBase==="2"){
                     if(item.state==='RUNNING'){
                    item.operation='关闭';
                    item.states='已开启'
                  }
                  if(item.state==='STOPPED'){
                    item.operation='开启';
                     item.states='已关闭'
                  }
                  if(item.state==='ABENDED'){
                     item.states='--';
                      item.operation='';
                  }

                  info.data.push(item);
                   angular.forEach(info,function(b){
                    if(b.state==='ABENDED'){
                  promisesServe.msgBar('warning','出现异常,请重新刷新');
              }
                 })
                  return;
                }
           });
        }
       });
    }
      //从后台获得regionname
    function Contrast(){
         var regionUrl="/oggProcess/getRegion";
         httpServe.post(regionUrl,JSON.stringify()).then(function(res){
            if(res.state==='success'){
                  region.data=[];
                angular.copy(res.data,region.data);
                angular.forEach(region.data,function(va){
                  angular.forEach(friminfo,function(item){
                        if(item.regionName===va.regionName){
                       item.regionCHName=va.regionCHName;
                     };
                  })
                    
                   });
            }
            });
    }
       function OnClickNJGD(){
            angular.forEach(friminfo,function(item){
                if(item.theirBase==="1"){
                    if(msg.state==='ABENDED'){
                  promisesServe.msgBar('warning','出现异常,请重新刷新');
                }
                      return;
                  }
                   if(item.theirBase==="2"){
                    if(info.state==='ABENDED'){
                  promisesServe.msgBar('warning','出现异常,请重新刷新');
              }

                  return;
                }
           });
     }
     //点击开启按钮
     function startOGG(a,index){
       var b={};
         b.regionName=a[index].regionName;
         b.direction=a[index].theirBase;
          var Url='';
       if(a[index].operation==='关闭'){
                Url='/oggProcess/stopOGG';
                info.data[index].operation='关闭中';
                	 var loa10=document.getElementById("loading");
			              	loa10.style.display="block";           
     httpServe.post(Url,JSON.stringify(b)).then(function(res){
        var loa10=document.getElementById("loading");
			              	loa10.style.display="none";
         if(res.state==="success"){
            if(res.data==="STOPPED"){
               a[index].operation='开启';
              info.data[index].operation='开启';
                info.data[index].states='已关闭';
            }else{
               a[index].operation='关闭';
              info.data[index].operation='关闭';
                info.data[index].states='已开启';
            }
         }else{
                a[index].operation='关闭';
              info.data[index].operation='关闭';
                info.data[index].states='已开启';
                promisesServe.msgBar('warning',res.desc);
         }
         })
       }
       if(a[index].operation==='开启'){
                Url='/oggProcess/startOGG';
                info.data[index].operation='开启中';
                	 var loa10=document.getElementById("loading");
			              	loa10.style.display="block";   
      httpServe.post(Url,JSON.stringify(b)).then(function(res){
        	 var loa10=document.getElementById("loading");
			              	loa10.style.display="none";   
          if(res.state==='success'){
             if(res.data==="RUNNING"){
                a[index].operation='关闭';
                info.data[index].states='已开启';
            }else{   
               a[index].operation='开启';
                info.data[index].states='已关闭';             
          }
          }else{
               a[index].operation='开启';
                info.data[index].states='已关闭';    
                promisesServe.msgBar('warning',res.desc);               
          }
         })
       }
     }
     //点击关闭按钮
     function stopOGG(a,index){
       var b={};
         b.regionName=a[index].regionName;
         b.direction=a[index].theirBase;
          var Url='';
       if(a[index].operation==='关闭'){
                Url='/oggProcess/stopOGG';
                msg.data[index].operation='关闭中';
                 var loa10=document.getElementById("loading");
			              	loa10.style.display="block";
     httpServe.post(Url,JSON.stringify(b)).then(function(res){
        var loa10=document.getElementById("loading");
			              	loa10.style.display="none";
          if(res.state==="success"){
               if(res.data==="STOPPED"){
               a[index].operation='开启';
               msg.data[index].operation='开启';
                msg.data[index].states='已关闭';
            }else{
               a[index].operation='关闭';
               msg.data[index].operation='关闭';
                msg.data[index].states='已开启';
            }
          }else{
             a[index].operation='关闭';
               msg.data[index].operation='关闭';
                msg.data[index].states='已开启';
                 promisesServe.msgBar('warning',res.desc);   
          }
         })
       }
       if(a[index].operation==='开启'){
                Url='/oggProcess/startOGG';
                msg.data[index].operation='开启中';
                	 var loa10=document.getElementById("loading");
			              	loa10.style.display="block";   
      httpServe.post(Url,JSON.stringify(b)).then(function(res){
        	 var loa10=document.getElementById("loading");
			              	loa10.style.display="none";   
          if(res.state==="success"){
             if(res.data==="RUNNING"){
                a[index].operation='关闭';
                msg.data[index].states='已开启';
            }else{
               a[index].operation='开启';
                msg.data[index].states='已关闭';
            }
          }else{
             a[index].operation='开启';
                msg.data[index].states='已关闭';
                 promisesServe.msgBar('warning',res.desc);  
          }
         })
       }
     }
    //默认的南基至东莞样式
  function onload(){
     $("#NJ").show();$("#table1").show();
     $("#NJ").css("backgroundColor","white");
  }
  //切换的南基至东莞样式
  function onClickNJ(){
   if($("#NJ").show()&&$("#table1").show()) {
       $("#NJ").css("backgroundColor","white");
    $("#DG").show(); $("#table2").hide();
    $("#DG").css("backgroundColor","");
   }
  }
   //切换的东莞至南基样式
   function onClickDG(){
     if($("#DG").show()&&$("#table2").show()){
       $("#DG").css("backgroundColor","white");
     $("#table1").hide();$("#NJ").show()
    $("#NJ").css("backgroundColor","");
     }

  }
  }
  dataSynchroMaintainSer.$inject = ['$timeout','httpServe','$interval','promisesServe'];
})(angular);
