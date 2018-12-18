;(function(){
    angular.module('disasterRec')
      .filter('textNumber',textNumber)
      .filter('getFirstkey',getFirstkey)
      .filter('appStateFil',appStateFil)
      .filter('indexFil',indexFil)
      .filter('indexDirFil',indexDirFil)
      .filter('frontName',frontName)
      .filter('xdataFil',xdataFil)
      .filter('frontXdataFil',frontXdataFil)
      .filter('coreXdataFil',coreXdataFil)
      .filter('menuTitleFil',menuTitleFil)
      .filter('regionId',regionId)
      .filter('getProvince',getProvince)
      .filter('methodName',methodName)
      .filter('methodArrayName',methodArrayName)
      .filter('getUrl',getUrl)
      .filter('transformRegion',transformRegion)
      .filter('areaClass',areaClass)
      .filter('chartTime',chartTime)
      .filter('runningWarnIcon',runningWarnIcon)
      .filter('runningWarnIconSty',runningWarnIconSty)
      .filter('menuId',menuId)
      .filter('dataSyncState',dataSyncState)
      .filter('transformRegionToName',transformRegionToName)
      .filter("subletters",subletters)
      .filter("orderArrayToStr",orderArrayToStr)
      .filter("colorState",colorState)
      .filter("usageColor",usageColor)
      .filter("colorNumOne",colorNumOne)
      .filter("hostStatus",hostStatus)
      .filter("getSeconds",getSeconds)
      .filter("getid",getid)
      .filter("getTakeOver",getTakeOver)
      .filter("getRester",getRester)
      .filter("fillterNull",fillterNull)
      .filter("zhangwei",zhangwei)
      .filter("fillterType",fillterType)
      .filter("getFullDate",getFullDate)
      .filter("filterState",filterState)
      .filter("hostStates",hostStates)
      .filter("getTtimeConsuming",getTtimeConsuming)
      .filter("filterLargearea",filterLargearea);
      function hostStates(){
        return function(value){
          if(value==="alarm"){
            return "异常";
          }else if(value==="warning"){
            return "告警";
          }else if(value==="normal"){
            return "正常";
          }
        }
      }

      function filterState(){
        return function(value){
          if(value==="ABENDED"){
            return "异常";
          }else if(value==="STOPPED"){
            return "停止";
          }else if(value==="RUNNING"){
            return "运行";
          }
        }
      }

      function filterLargearea(){
        return function(val){
          if(val === '01'){
            return '华北'
          }else if(val === '02'){
            return  '华东'
          }else if(val === '03'){
            return  '华南'
          }else if(val === '04'){
            return  '西部'
          }else{
            return  '中部'
          }
        }
      }
      function zhangwei(){
        return function(value){
          if(value=== "NJ"){
              return   "南方基地"        
            }else if(value=== "DG"){
              return   "东莞基地";
          }else if(value==="other"){
              return   "其他";
          }
        }
      }
    function getRester(){
      return function(value,input){
        var param=[];
        angular.forEach(value,function(key){
          if(key.ip.indexOf(input)>=0){
            param.push(key);
          }else if(key.hostName.indexOf(input)>=0){
            param.push(key);
          }
        });
        return param;
      }
    }
    function fillterType(){
        return function(val){
          if(val === '99'){
            return '计划外'
          }else{
           return '计划内'
          }
        }
    }
    function fillterNull(){
      return function(value){
        if (value===null||value===''||value===undefined){
          value='';
        }
        return value;
      }
    }
    function getTakeOver(){
      return function(value){
        return value.toFixed(2)
      }
    }
    function hostStatus(){
      return function(value){
        if(value === '00'){
          return '运行状况良好';
        }else if(value === '01'){
          return '存在隐患的运行状况';
        }else if(value === '02'){
          return '运行状况不良';
        }
      }
    }
    function colorNumOne(){
      return function(value){
        if(value === '00'){
          return {'background-color':'#96C55A' ,'border-radius': '50%','width': '24px','height': '24px'};
        }else if(value === '01'){
          return {'background-color':'#EDB233' ,'border-radius': '50%','width': '24px','height': '24px'};
        }else if(value === '02'){
          return {'background-color':'#D0021B' ,'border-radius': '50%','width': '24px','height': '24px'};
        }
      }
    }
    function colorState(){
      return function(value){
        if(value === '00'){
          return {'background-color':'#96C55A' ,'border-radius': '50%','width': '15px','height': '15px'};
        }else if(value === '01'){
          return {'background-color':'#EDB233' ,'border-radius': '50%','width': '15px','height': '15px'};
        }else if(value === '02'){
          return {'background-color':'#D0021B' ,'border-radius': '50%','width': '15px','height': '15px'};
        }
      }
    }
    function usageColor(){
      return function(value){
        if(value===''){
          value=0;
        }
        if(value<80){
          return {'border': '1px solid #96C55A','width':value+'%'};
        }else if(value<90&&value>=80){
          return {'border': '1px solid #EDB233','width':value+'%'};
        }else if(value>=90){
          return {'border': '1px solid #D0021B','width':value+'%'};
        }
      }
    }
    function textNumber(){

      return function(value,num){
        if(value===null){
          return value='';
        }else{
          return value.length<num?value:value.substring(0,num)+'...';
        }
      }
    }
    //转换成秒
    function getSeconds(){
      return function(value){
        return (parseInt(value,10)/1000).toFixed(2)
      }
    }
    function getFirstkey(){
    	return function(value,num){
    		var keySet = [];
    		for(var key in value){
    			keySet.push(key);
    		}
    		text = keySet[0]+':'+String(value[keySet[0]]);
    		return text.length<num?text+'......':text.substring(0,num)+'......';
    	}
    }
    function appStateFil(){
      return function(value){
        if(value===undefined||value==='START'){
          value = 'STOPED';
        }else if(value==='STOP'){
          value = 'RUNNING';
        }
        return value;
      }
    }
    function indexFil(){
      return function(value,num){
        var text = '';
        for( var key in value){
          text += key+':'+value[key]+';'
        }
        text = text.substring(0,text.length-1);
        return text.length<num?text:text.substring(0,num)+'...';
      }
    }
    function indexDirFil(){
      return function(value){
        var text = '';
        for(var key in value){
          text += key+':'+value[key]+';'
        }
        text = text.substring(0,text.length-1);
        return text;
      }
    }
    function frontName(){
      return function(value){
        if(value === 'oc-front'){
          return '省端 (oc-front)';
        }else if(value === 'oc-crm-front-dcc'){
          return '业务端 (oc-crm-front-dcc)';
        }else if(value === 'oc-crm-front-http'){
          return '业务端 (oc-crm-front-http)';
        }
      }
    }
    function xdataFil(){
      return function(value){
        var text = [];
        if(is.array(value)){
          for(var i=0;i<value.length;i++){
            text.push(value[i].appid+'/'+value[i].queue);
          }
        }
        return text;
      }
    }
    function frontXdataFil(){
      return function(value){
        var text = [];
        if(is.array(value)){
          for(var i=0;i<value.length;i++){
            text.push(value[i].method+'/'+value[i].instance);
          }
        }
        return text;
      }
    }
    function coreXdataFil(){
      return function(value){
        var text = [];
        if(is.array(value)){
          for(var i=0;i<value.length;i++){
            text.push(value[i].method+'/'+value[i].instance);
          }
        }
        return text;
      }
    }
    function frontId(){
      return function(value){
        if(value === 'oc-front'){
          return '省端';
        }else if(value === 'oc-crm-front-dcc'){
          return '业务(dcc)';
        }else if(value === 'oc-crm-front-http'){
          return '业务(http)';
        }
      }
    }
    function menuTitleFil(){
      return function(value){
        if(value === '咪咕前置'){
          return 'oc-front';
        }else if(value === '省dcc前置'){
          return 'oc-crm-front-dcc';
        }else if(value === '省http前置'){
          return 'oc-crm-front-http';
        }else if(value === '交易核心'){
          return 'oc-core';
        }else{
          return '';
        }
      }
    }
    function regionId(){
      return function(value){
        if(value === '华北+东北'){
          return '华北东北';
        }else if(value === '华东+华南'){
          return '华东华南';
        }else {
          return value;
        }
      }
    }
    function getProvince(){
      return function(value){
        if(value === '广东'){
          return '广东';
        }else if(value === '西部'){
          return '青海<br>陕西<br>甘肃<br>宁夏<br>新疆<br>西藏<br>重庆<br>云南<br>贵州<br>四川';
        }else if(value === '华北+东北'){
          return '河北<br>山西<br>北京<br>天津<br>吉林<br>辽宁<br>黑龙江';
        }else if(value === '华东+华南'){
          return '江苏<br>福建<br>江西<br>山东<br>安徽<br>上海<br>广西<br>海南';
        }else if(value === '浙江'){
          return '浙江';
        }else if(value === '华中'){
          return '湖北<br>湖南<br>河南';
        }
      }
    }
    function methodName(){
      return function(value){
    	  if(value === '未定义'){
    		  return value;
    	  }
        var name1 = value.split('.').splice(-2,2);
        var name_map={'CCAListeners,receivedSuccessMessage':'CCA响应',
        		'ChargeDCCService,doService':'DCC计费/退费请求',
        		'OcQueryAction,charge':'咪咕查询请求',
        		'OcAction,charge':'咪咕计费请求',
        		'ChargeQueryNotifyService,doService':'咪咕查询响应',
        		'ChargeNotifyService,doService':'咪咕计费/退费结果响应',
        		'ChargeQueryService,doService':'咪咕计费查询请求',
        		'ChargeService,doService':'咪咕计费请求',
        		'ChargeQueryRtnService,doService':'咪咕计费查询响应',
        		'ChargeRtnService,doService':'咪咕计费响应'
        		}
        return name_map[name1]+':'+name1[0]+'.'+name1[1];
      }
    }
    function methodArrayName(){
      return function(value){
        var newValue = [];
        angular.forEach(value,function(item){
          newValue.push(methodName()(item));
        })
        return newValue;
      }
    }
    function areaClass(){
      return function(value){
        if(value === '广东'){
          return 'area gd';
        }else if(value === '西部'){
          return 'area xb';
        }else if(value === '华北+东北'){
          return 'area db';
        }else if(value === '华东+华南'){
          return 'area hd';
        }else if(value === '浙江'){
          return 'area zj';
        }else if(value === '华中'){
          return 'area hz';
        }
      }
    }
    function getid(){
      return function(value){
      if(value === '华南'||value === '华南地区'){
        return 'plan_hn';
      }else if(value === '西部'||value === '西部地区'){
        return 'plan_xb';
      }else if(value === '华北'||value === '华北地区'){
        return 'plan_hb';
      }else if(value === '华东'||value === '华东地区'){
        return 'plan_hd';
      }else if(value === '中部'||value === '中部地区'){
        return 'plan_zb';
      }
    }
    }
    function getUrl(){
      return function(value){
        var url = value.split('/');
        return url[1]+'.'+url[2];
      }
    }
    //获得完整时间如： 2220-8-13 19:51:27
    function getFullDate(){
      return function(value){
        if (value) {
        var da=new Date(parseInt(value,10));
        var mm=da.getMinutes();
        var ss=da.getSeconds();
        if(mm<10){
          mm='0'+mm;
        }
        if(ss<10){
          ss='0'+ss;
        }
        return da.getFullYear()+"-"+(da.getMonth()+1)+"-"+da.getDate()+" "+da.getHours()+":"+mm+":"+ss;
      }
    }
    }
    //获得耗时
    function getTtimeConsuming(){
      return function(value){
         var ssnum=Math.floor(value/1000);//秒数
         var mmnum=Math.floor(value/(1000*60));//总分钟数
         var h=Math.floor(value/(1000*60*60));//小时位
         var m=Math.floor(mmnum-(h*60));//分钟位
         var s=Math.floor(ssnum-(m*60+(h*60*60)));//秒数位
         var sss=Math.floor(value-((s*1000)+(m*60*1000)+(h*60*60*1000)));//毫秒数位
         var str='';
         if (h>0) {
                  str=h+'小时'+m+"分钟"+s+"秒"+sss+"毫秒";
                  return str;
                }else if(m>0){
                  str=m+"分钟"+s+"秒"+sss+"毫秒";
                  return str;
                }else if(s>0){
                  str=s+"秒"+sss+"毫秒";
                }else{
                  str=sss+"毫秒";
                }
          return str;
      }
    }
    function chartTime($filter){
      return function(value,size,i){
        var milliseconds = new Date().getTime()
        if(size==='5s'){
          milliseconds-=i*5000;
          return $filter('date')(milliseconds,'yyyy-MM-dd HH:mm:ss');
        }else if(size==='1m'){
          milliseconds-=i*60*1000;
          return $filter('date')(milliseconds,'yyyy-MM-dd HH:mm:00');
        }else if(size==='1h'){
          milliseconds-=i*3600*1000;
          return $filter('date')(milliseconds,'yyyy-MM-dd HH:00:00');
        }else if(size==='1d'){
          milliseconds-=i*24*3600*1000;
          return $filter('date')(milliseconds,'yyyy-MM-dd 08:00:00');
        }
      }
    }
    function runningWarnIcon(){
    return function(value){
      if(value==='warningRed'){
        return 'img/warningRed.png';
      }else if(value==='warningYel'){
        return 'img/warningYel.png';
      }else{//normar正常
        return '';
      }
    }
  }
  function runningWarnIconSty(){
    return function(value){
      if(value==='Mradware2'){
        return {'top':'100px','left':'379px'};
      }else if(value==='MTMQZ'){
        return {'top':'100px','left':'465px'};
      }else if(value==='MZLYQ'){
        return {'top':'100px','left':'550px'};
      }else if(value==='MTMHX'){
        return {'top':'100px','left':'650px'};
      }else if(value==='MYLYQ'){
        return {'top':'100px','left':'735px'};
      }else if(value==='MSQZ'){
        return {'top':'100px','left':'835px'};

      }else if(value==='BF5_2'){
        return {'top':'495px','left':'369px'};
      }else if(value==='BTMQZ'){
        return {'top':'495px','left':'465px'};
      }else if(value==='BZLYQ'){
        return {'top':'495px','left':'550px'};
      }else if(value==='BTMHX'){
        return {'top':'495px','left':'650px'};
      }else if(value==='BYLYQ'){
        return {'top':'495px','left':'735px'};
      }else if(value==='BSQZ'){
        return {'top':'495px','left':'835px'};
      }
    }
  }
  function transformRegion(){
    return function(value){
      if(value === '华南'||value === '华南地区'){
        return 'hn';
      }else if(value === '西部'||value === '西部地区'){
        return 'xb';
      }else if(value === '华北'||value === '华北地区'){
        return 'hb';
      }else if(value === '华东'||value === '华东地区'){
        return 'hd';
      }else if(value === '中部'||value === '中部地区'){
        return 'zb';
      }
    }
  }
  function menuId(){
    return function(value){
      return value.substr(12);
    }
  }
  function dataSyncState(){
    return function(value){
      if(value === 'crowded'){
        return '#F3E218';
      }else if(value === 'normal'){
        return '#3370BF';
      }else if(value === 'abnormal'){
        return '#F91212';
      }
    }
  }
  function transformRegionToName(){
      return function(value){
        if(value === '华东'||value === '华东地区'){
          return '2';
        }else if(value === '华南'||value === '华南地区'){
          return '3';
        }else if(value === '华北'||value === '华北地区'){
          return '5';
        }else if(value === '中部'||value === '中部地区'){
          return '1';
        }else if(value === '西部'||value === '西部地区'){
          return '4';
        }
      }
    }
    function subletters(){
      return function(value,num){
        value = value || "";
        return value.length <= num ? value : value.substring(0,num)+"...";
      };
    }
    function orderArrayToStr(){
      return function(value){
        var str = '';
        angular.forEach(value,function(item){
          str += item+';';
        })
        return str;
      }
    }
    function n(){
      return function(value){
        return value.split("/").join("\n");
      }
    }
}
)()
