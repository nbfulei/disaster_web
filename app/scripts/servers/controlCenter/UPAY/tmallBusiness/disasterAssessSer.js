'use strict';
;(function (angular){
	angular.module('services.disasterAssess',[]).factory('assessSer',assessSer);
	function assessSer(httpServe,monitorSer,$stateParams){
    var styleObj = [[],[],[]];
    var time = {};
    var switchInfo = {};
    var aa;
    var ff=[];
    //var person = {};
    var cookieDatas = {};
		return {
			querySwitchInfo:querySwitchInfo,
      styleObj:styleObj,
      showTime:showTime,
      hideTime:hideTime,
      switchInfo:switchInfo,
      time:time,
      //person:person, 
      //hostIds:hostIds,
      cookieDatas:cookieDatas
     }
  //请求获取容灾切换的详细信息
    function querySwitchInfo(){
      //获取容灾各阶段时间
      httpServe.getDisasterTime().then(function(res){
       if(res.state === 'success'){
        angular.copy(res.data,ff);
           //time.detectionTime=ff.detectionTime[0];
           //time.startUpTime=cookieDatas.end;
           //time.normalTime=cookieDatasc.begin;
          // time.startUpTime=ff.startUpTime[0];
             
             time.disasterTime=ff.switchBeginTime;
              time.normalTime=ff.switchEndTime;
              //time.disasterTime=cookieDatas.end;
              //time.normalTime=cookieDatasc.begin;
          showDisasterTime();
          //网络中断时间 
          //aa = time.normalTime-time.backupsTime;
         }
       })
      //滚动条默认显示位置以及背景行颜色
      httpServe.getSwitchInfo().then(function(res){
          if(res.state==='success'){
          angular.copy(res.data,switchInfo);
          showEcharts();
        }
            var Grade5 = '国家标准五级';
            var Grade6 = '国家标准五级';
            if (Grade5 === Grade6) {
                var idd = document.getElementById('tbody1');
                idd.scrollTop = 110;
                document.getElementById('tier5').style.background = "#0099FF";
            }
      })
      
  }
    //展示容灾各阶段时间占比图
    function showDisasterTime(){
      //drawLine('time1',1);
      drawLine('time2',2);
      //drawLine('time3',3);
      //drawLine('time4',4);
      //drawLine('time5',5);
      //drawLine('time6',6);
      drawLine('time7',7);
      var unitLength = 612/(time.normalTime-time.disasterTime);
      styleObj[0][0] = {'left':(time.disasterTime-time.disasterTime)*unitLength+146+'px'};
      //styleObj[0][1] = {'left':(time.detectionTime-time.disasterTime)*unitLength+146+'px'};
      //styleObj[0][2] = {'left':(time.startUpTime-time.disasterTime)*unitLength+146+'px'};
      //styleObj[0][3] = {'left':(time.implementatioTimen-time.disasterTime)*unitLength+146+'px'};
      //styleObj[0][4] = {'left':(time.completeTime-time.disasterTime)*unitLength+146+'px'};
      styleObj[0][5] = {'left':(time.normalTime-time.disasterTime)*unitLength+146+'px'};
      styleObj[1][0] = {'left':(time.disasterTime-time.disasterTime)*unitLength+146+'px','width':(time.normalTime-time.disasterTime)*unitLength+1+'px'};
      styleObj[1][1] = {'left':(time.disasterTime-time.disasterTime)*unitLength+146+'px','width':(time.completeTime-time.disasterTime)*unitLength+1+'px'};
      //styleObj[1][2] = {'left':(time.detectionTime-time.disasterTime)*unitLength+146+'px','width':(time.normalTime-time.detectionTime)*unitLength+1+'px'};
      //styleObj[1][3] = {'left':(time.startUpTime-time.disasterTime)*unitLength+146+'px','width':(time.normalTime-time.startUpTime)*unitLength+1+'px'};
      styleObj[2][0] = {};
      //styleObj[2][0] = {'left':(time.disasterTime-time.disasterTime)*unitLength+'px'};
      //styleObj[2][1] = {'left':(time.detectionTime-time.disasterTime)*unitLength+'px'};
      //styleObj[2][2] = {'left':(time.startUpTime-time.disasterTime)*unitLength+'px','z-index':8};
      //styleObj[2][4] = {'left':(time.implementatioTimen-time.backupsTime)*unitLength+'px'};
      //styleObj[2][3] = {'left':(time.completeTime-time.disasterTime)*unitLength+'px','z-index':8};
      styleObj[2][1] = {'left':(time.normalTime-time.disasterTime)*unitLength+'px'};
      $('#assessPicture').css('display','block');
    }
    function drawLine(id,flag){
    	var canvas = document.getElementById(id).getContext('2d');
    	canvas.strokeStyle = '#C5C3C7';
    	canvas.moveTo(0,18);
    	canvas.lineTo(0,112);
      if(flag===2){
        canvas.moveTo(0,18);
        canvas.lineTo(0,112);
      }else if(flag===7){
        canvas.moveTo(0,18);
        canvas.lineTo(0,112);
       }
      canvas.stroke();
    }
    function showTime(event,index){
      if(index===0||index===1){
        return;
      }else{
        $(event.target).parent().next().removeClass('displayNone');
      }
    }
    function hideTime(event,index){
      if(index===0||index===1){
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
	assessSer.$inject = ['httpServe','monitorSer','$stateParams'];
})(angular);