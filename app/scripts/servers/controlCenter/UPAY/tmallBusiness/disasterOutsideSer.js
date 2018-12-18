'use strict';
;(function (angular){
  angular.module('services.disasterOutside',[]).factory('outsideSer',outsideSer);
  function outsideSer(httpServe){
    var styleObj = [[],[],[]];
    var time = {};
    var switchInfo = {};
    var ff={};
    return {
      querySwitchInfo:querySwitchInfo,
      styleObj:styleObj,
      showTime:showTime,
      hideTime:hideTime,
      switchInfo:switchInfo,
      time:time
    }
    //请求获取容灾切换的详细信息
    function querySwitchInfo(){
     //获取容灾各阶段时间
      httpServe.getPlanTime().then(function(res){
        if(res.state === 'success'){
          angular.copy(res.data,ff);
          time.backupsTime=ff.backupsTime[0];
           time.disasterTime=ff.disasterTime[0];
           time.completeTime=ff.completeTime[0];
           time.startUpTime=ff.startUpTime[0];
           time.detectionTime=ff.detectionTime[0];
           time.normalTime=ff.normalTime[0];
           var aa=time.normalTime-time.backupsTime;
          showDisasterTime();
          //网络中断时间 
          //aa = time.normalTime-time.backupsTime;
         }
       })
      //获取评审信
        
      //获取切换信息详情
      httpServe.getSwitchInfo().then(function(res){
      if(res.state === 'success'){
          angular.copy(res.data,switchInfo);
            //业务影响
            document.getElementById('Influence').innerHTML = '计划内切换, 数据丢失'+switchInfo.rpo+',网络中断时间'+switchInfo.nro+', 无任何业务影响。';
            //滚动条默认显示位置以及背景行颜色
            /*var Grade6 = '国家标准五级';
            var Grade7 = '国家标准五级';
            if (Grade6 === Grade7) {
                var idd = document.getElementById('tbody1');
                idd.scrollTop = 110;
                document.getElementById('tier5').style.background = "#0099FF";
            }*/
          showEcharts();
        };
      })
      
      
  }
    //展示容灾各阶段时间占比图
    function showDisasterTime(){
      //backupsTime到7不需要改动
      drawLine('time1',1);
      drawLine('time2',2);
      drawLine('time3',3);
      drawLine('time4',4);
      //drawLine('time5',5);
      drawLine('time6',6);
      drawLine('time7',1);
      var unitLength = 612/(time.normalTime-time.backupsTime);
      styleObj[0][0] = {'left':(time.disasterTime-time.backupsTime)*unitLength+146+'px'};
      styleObj[0][1] = {'left':(time.detectionTime-time.backupsTime)*unitLength+146+'px'};
      styleObj[0][2] = {'left':(time.startUpTime-time.backupsTime)*unitLength+146+'px'};
      styleObj[0][3] = {'left':(time.implementatioTimen-time.backupsTime)*unitLength+146+'px'};
      styleObj[0][4] = {'left':(time.completeTime-time.backupsTime)*unitLength+146+'px'};
      styleObj[0][5] = {'left':(time.normalTime-time.backupsTime)*unitLength+146+'px'};
      styleObj[1][0] = {'left':(time.disasterTime-time.backupsTime)*unitLength+146+'px','width':(time.normalTime-time.disasterTime)*unitLength+1+'px'};
      styleObj[1][1] = {'left':(time.completeTime-time.backupsTime)*unitLength+146+'px','width':(time.normalTime-time.completeTime)*unitLength+1+'px'};
      styleObj[1][2] = {'left':(time.detectionTime-time.backupsTime)*unitLength+146+'px','width':(time.normalTime-time.detectionTime)*unitLength+1+'px'};
      styleObj[1][3] = {'left':(time.startUpTime-time.backupsTime)*unitLength+146+'px','width':(time.normalTime-time.startUpTime)*unitLength+1+'px'};
      styleObj[2][0] = {};
      styleObj[2][1] = {'left':(time.disasterTime-time.backupsTime)*unitLength+'px'};
      styleObj[2][2] = {'left':(time.completeTime-time.backupsTime)*unitLength+'px'};
      styleObj[2][3] = {'left':(time.startUpTime-time.backupsTime)*unitLength+'px'};
      //styleObj[2][4] = {'left':(time.implementatioTimen-time.backupsTime)*unitLength+'px'};
      styleObj[2][4] = {'left':(time.detectionTime-time.backupsTime)*unitLength+'px','z-index':8};
      styleObj[2][5] = {'left':(time.normalTime-time.backupsTime)*unitLength+'px'};
      $('#assessPicture').css('display','block');
    }
    function drawLine(id,flag){
      var canvas = document.getElementById(id).getContext('2d');
      canvas.strokeStyle = '#C5C3C7';
      canvas.moveTo(0,118);
      canvas.lineTo(0,267);
      if(flag===2){
        canvas.moveTo(0,95);
        canvas.lineTo(0,267);
      }else if(flag===3){
        canvas.moveTo(0,72);
        canvas.lineTo(0,267);
       }else if(flag===4){
        canvas.moveTo(0,49);
        canvas.lineTo(0,267);
       }else if(flag===5){
        canvas.moveTo(0,72);
        canvas.lineTo(0,267);
       }else if(flag===6){
        canvas.moveTo(0,26);
        canvas.lineTo(0,267);
       }
      canvas.stroke();
    }
    function showTime(event,index){
      if(index===0||index===5){
        return;
      }else{
        $(event.target).parent().next().removeClass('displayNone');
      }
    }
    function hideTime(event,index){
      if(index===0||index===5){
        return;
      }else{
        $(event.target).parent().next().addClass('displayNone');
      }
    }
    function showEcharts(){
      var myChart = echarts.init(document.getElementById('switchTime'));
      var option = {
            tooltip : {
              trigger: 'item',
              formatter: "{b} : {c} ({d}%)"
            },
            /*legend:{
              orient:'vertical',
              right:10,
              bottom:50,
              textStyle:{
                fontSize:10
              },
              data:['反向同步','流量切换','正向同步']
            },*/
            series : [
              {
                type: 'pie',
                radius : '50%',
                center: ['50%', '50%'],
                data:[
                  {value:switchInfo.reverseSyncTime, name:'反向同步'},
                  {value:switchInfo.flowSwitchTime, name:'流量切换'},
                  {value:switchInfo.positiveSyncTime, name:'正向同步'}
                ],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                },
                /*label:{
                  normalTime:{
                    show:false
                  }
                }*/
              }
            ]
          };
      myChart.setOption(option);
    }
  }
  outsideSer.$inject = ['httpServe'];
})(angular);