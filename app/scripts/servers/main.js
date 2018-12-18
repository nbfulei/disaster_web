;(function(){
  'use strict';
	angular.module('disasterRec.servers',[
	  'servers.httpServe',
    'servers.promisesServe',
    'services.tmail',
    'services.switchView',
    //天猫部分
    'services.monitorThresholdSer',
    'services.tmallOggConfigSer',
    'services.view',
    'services.operation',
    'services.runningStatus',
    'services.disasterSwitch',
    'services.disasterOperation',
    'services.disasterAssess',
    'services.disasterOutside',
    'servers.monitor',
    'services.BatchProcessingSer',
    'services.TreatmentProgramSer',
    'services.alarmDetailsSer',
    'services.operationLate',
    'services.operationInfo',
    'services.alarmQuerySer',
    'services.fileComparisonSer',
    'services.dataComparisonSer',
    'services.dataSynchroMaintainSer',
    'services.loadEqualMaintainSer',
    'services.switchHistoryQuerySer',
    'services.hostQuerySer',
    'services.hostInstancSer',
    'services.hostDetailsSer',
    'services.tmallRegionConfigSer',
    'services.machinesInfoSer',
    'services.hostLogDetailsSer',
    'services.modifyHostSer',
    'services.userServers'
	]).factory('mainServe',mainServe);
  function mainServe(){
    var temp = {};
   
    return{
      combineRow:combineRow,
      ngifFn:ngifFn,
      userRight:userRight,
      initImgSite:initImgSite,
      closePage:closePage,
      openPage:openPage,
      getStateGo:getStateGo
    };

    function getStateGo(value){
      var urlData={'00':'disasterRec.operationInfo',
      '05':'disasterRec.operationLate',
      '10':'disasterRec.operationLast',
      '15':'disasterRec.operationLast',
      '20':'disasterRec.operationLast'
    };
    return urlData[value];
  }
    function combineRow(param,item,key){
      var row = 0;
      for(var i=0;i<param.length;i++){
        if(param[i][key] === item[key]){
          row++;
        }
      }
      return row;
    }
    function ngifFn(item,key){
      if(temp[key]===item[key]){
        return false;
      }else{
        temp[key] = item[key];
        return true;
      }
    }
    function userRight(){

    }
    //有三个页面使用绝对定位，使用
    function initImgSite(){
      if(window.screen.width>1024){
        var width = $("#imgCon").parent().width()/2-500+'px';
        $('#imgCon').css({'position':'absolute','margin-left':width});
        $("#main-menu")[0].addEventListener('webkitTransitionEnd',function(){
          var classVal = $("#sidebar-collapse").children().attr('class');
          if(classVal==='glyphicon glyphicon-circle-arrow-right'){
            width = ($(window).width()-60-1000)/2+'px';
          }else if(classVal==='glyphicon glyphicon-circle-arrow-left'){
            width = ($(window).width()-250-1000)/2+'px';
          }
          $('#imgCon').animate({'margin-left':width},500);
        })
      }else{
        $('#imgCon').css('overflow-x','hidden');
      }
    }
    //右上角的X 点击事件
    function closePage(){
      $('#imgContent,#imgBorder').css({'visibility':'hidden'});
      $('#button').css('display','block');
    }
    function openPage(){
      $('#imgContent,#imgBorder').css('visibility','visible');
      $('#button').css('display','none');
    }
  }
	mainServe.$inject = ['httpServe','$cookieStore','$state']
})();
