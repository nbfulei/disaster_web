/*运行状态*/
'use strict';
;(function () {
  'use strict';
  angular.module('services.runningStatus', []).factory('runningStatusSer', runningStatusSer);
  function runningStatusSer($timeout,$filter,httpServe,$q,systemIP,promisesServe) {
    var systemState = {};
    var flowBelong = {};
    //中文注释var isFirst;
    var notice = [];
    var socket;
    var warnIcon = {};
    var machineInfo = {};
    var lineInfo = {};
    var dataSyncState = {};
    var OGGInfo={};
    return {

      queryState:queryState,
      systemState:systemState,
      notice:notice,
      colsePage:colsePage,
      openPage:openPage,
      disconnectSocket:disconnectSocket,
      warnIcon:warnIcon,
      showMachineInfo:showMachineInfo,
      showMachine:showMachine,
      machineInfo:machineInfo,
      lineInfo:lineInfo,
      OGGInfo:OGGInfo,
      showLineInfo:showLineInfo,
      dataSyncState:dataSyncState
    };
    //初始化全局负载均衡以上的9九条线
   /*中文注释 function initLines(){
      isFirst = true;
    }
*/

    //请求
    function queryState(){
      //当前流量状态查询
      httpServe.bvCurrentFlowStateQuery().then(function(res){
        if(res.state==='success'){
          angular.copy(res.data,flowBelong);
          console.log(flowBelong);
          showFlowSwitch(1);
          showState(flowBelong.status);
        }else{
          promisesServe.msgBar('warning',res.desc);
        }
      });
      socket = io.connect(systemIP.getUser(),{'force new connection': true});
      //socket = io.connect('127.0.0.1:8888',{'force new connection': true});
      //socket = io.connect('192.168.0.41:8888',{'force new connection': true});
      //socket = io.connect('192.168.117.88:8888',{'force new connection': true});
      angular.copy([],notice);
      //OGG运行状态
      socket.on('bvSystemState',function(res){
        if(res.state === 'success'){
          //console.log("OGG运行状态数据++");
          $timeout(function(){
            angular.copy(res.data,systemState);
            systemState.main='main';
            systemState.prepare='prepare';
            console.log(systemState);
            showState(systemState.status);
          },0);

        }
      });
      //大区分布状态
      socket.on('bvRunningTargetFlowState',function(res){
        if(res.state === 'success'){
          angular.copy(res.data,flowBelong);
          //console.log("大区分布+1");
         // console.log(flowBelong);
          showFlowSwitch(2);
        }
      });
      //公共信息（暂时不要）
      socket.on('bvRunningInformation',function(res){
        if(res.state === 'success'){
          $timeout(function(){
            if(notice.length>6){
              return;
            }
            notice.push(res.data);
          },0)
        }
      });
      //机器状态
      socket.on('bvMachineState',function(res){
        if(res.state === 'success'){

          $timeout(function(){
            angular.copy(res.data,warnIcon);
             //console.log("机器状态+1");

          },0)
        }
      });
    }

    //线和箭头的坐标
    function showState(item){
      if(item==='00') {//正常
        //clearLine('MZj-NJ-1');
        //clearLine('MZj-NJ-2');
        //clearLine('MNJ-Array1');
        //clearLine('Marray1-radware2');
        //clearLine('Mradware2-TMQZ');
        //clearLine('MTMQZ-ZLYQ');
        //clearLine('MLLYQ-TMHX');
        //clearLine('MTMHX-RLYQ');
        //clearLine('MRLYQ-SQZ');
        //clearLine('MSQZ-NJ');
        //clearLine('MNJ-31SGS-1');
        //clearLine('MNJ-31SGS-2');
        //
        //clearLine('Marray1-F5_2-1');
        //clearLine('Marray1-F5_2-2');
        //clearLine('Marray1-F5_2-3');
        //clearLine('MDTMHX-WR');
        //clearLine('MLJ-DG-left');
        //clearLine('BDG-LJ-left');
        //clearLine('BTMHX-WR');
        //
        //clearLine('BF5_2-TMQZ');
        //clearLine('BTMQZ-ZLYQ');
        //clearLine('BZLYQ-TMHX');
        //clearLine('BTMHX-RLYQ');
        //clearLine('BRLYQ-SQZ');
        //clearLine('BSQZ-NG-1');
        //clearLine('BSQZ-NG-2');
        //clearLine('BSQZ-NG-3');
        //clearLine('BSQZ-NG-4');


        drawing('MZj-NJ-1', 1);
        drawing('MZj-NJ-2', 4);
        drawing('MNJ-Array1', 4);
        drawing('Marray1-radware2', 4);
        drawing('Mradware2-TMQZ', 4);
        drawing('MTMQZ-ZLYQ', 4);
        drawing('MLLYQ-TMHX', 4);
        drawing('MTMHX-RLYQ', 4);
        drawing('MRLYQ-SQZ', 4);
        drawing('MSQZ-NJ', 4);
        drawing('MNJ-31SGS-1', 4);
        drawing('MNJ-31SGS-2', 2);

        drawing('Marray1-F5_2-1', 2);
        drawing('Marray1-F5_2-2', 8);
        drawing('Marray1-F5_2-3', 2);
        drawing('MDTMHX-WR', 7);
        drawing('MLJ-DG-left', 2);
        drawing('BDG-LJ-left', 1);
        drawing('BTMHX-WR', 'WR');

        drawing('BF5_2-TMQZ', 4);
        drawing('BTMQZ-ZLYQ', 4);
        drawing('BZLYQ-TMHX', 4);
        drawing('BTMHX-RLYQ', 4);
        drawing('BRLYQ-SQZ', 4);
        drawing('BSQZ-NG-1', 1);
        drawing('BSQZ-NG-2', 6);
        drawing('BSQZ-NG-3', 6);
        drawing('BSQZ-NG-4', 1);
      }

    }
    //清除操作
    function clearLine(id){
      var can = document.getElementById(id);
      var cans = can.getContext('2d');
      cans.clearRect(0,0,16,16);
    }

    //根据后台数据画箭头和线
    function drawing(id,m){
          drawArrow(id,m);
    }


    // 画箭头
    function drawArrow(id,m){
      var anger=Math.PI/180;
      var context = document.getElementById(id).getContext('2d');
      context.save();
      var img=document.getElementById('switchDown');
      var img2=document.getElementById('switchLeft');
      //var img=new Image();
      //img.src='img/switchDown.png';
      //var img2=new Image();
      //img2.src='img/switchLeft.png';
      //上指向箭头
      if(m===1){

        context.translate(8,16);
        context.rotate(180*anger);
        context.drawImage(img,0,0,8,16);
        context.restore()
      //下指向箭头
      }else if(m===2){

        context.drawImage(img,0,0,8,16);

        context.restore()
      //左指向箭头
      }else if(m===3){

        context.drawImage(img2,0,0,16,8);

        context.restore()
      //右指向箭头
      }else if(m===4){

        context.translate(16,8);
        context.rotate(180*anger);
        context.drawImage(img2,0,0,16,8);
        context.restore()
        //上左指向箭头
      }else if(m===5){

      }else if(m===6){

        context.translate(8,16);
        context.rotate(210*anger);
        context.drawImage(img,0,0,8,16);

        context.restore()
      }else if(m==='WR'){

        context.translate(6,16);
        context.rotate(223*anger);
        context.drawImage(img,0,0,8,16);

        context.restore()
      }else if(m===7){

        context.translate(10,0);
        context.rotate(40*anger);
        context.drawImage(img,0,0,8,16);

        context.restore()
      }else if(m===8){


        context.translate(2,4);
        context.rotate(-30*anger);
        context.drawImage(img,0,0,8,16);

        context.restore()
      }
    }

    //画虚线
    //function drawDashLine(id,color,x1,y1,x2,y2){
    //
    //  var context = document.getElementById(id).getContext('2d');
    //  context.strokeStyle=color;
    //  context.setLineDash([5,5]);
    //  context.lineWidth=2;
    //  context.moveTo(x1,y1);
    //  context.lineTo(x2,y2);
    //  context.stroke();
    //}
    // 画箭头
    //function drawArrowhead(ctx,x,y,radians,flag){
    //  ctx.save();
    //  ctx.beginPath();
    //  ctx.translate(x,y);
    //  ctx.rotate(radians);
    //  ctx.moveTo(0,0);
    //  ctx.lineTo(7,10);
    //  ctx.lineTo(-7,10);
    //  ctx.closePath();
    //  ctx.restore();
    //  ctx.fillStyle = '#4A87D6';
    //  ctx.fill();
    //  if(flag===true){
    //    ctx.globalCompositeOperation = 'source-atop';
    //  }
    //}
    // 画直线
    //function initLine(id,color,x1,y1,x2,y2){
    //  var ctx = document.getElementById(id).getContext('2d');
    //  ctx.strokeStyle=color;
    //  ctx.lineWidth=2;
    //  ctx.moveTo(x1,y1);
    //  ctx.lineTo(x2,y2);
    //  ctx.stroke();
    //}
    // 画折线
    //function drawPolyline(id,color,x1,y1,x2,y2,x3,y3){
    //  var ctx = document.getElementById(id).getContext('2d');
    //  ctx.strokeStyle=color;
    //  ctx.lineWidth=2;
    //  ctx.beginPath();
    //  ctx.moveTo(x1,y1);
    //  ctx.lineTo(x2,y2);
    //  ctx.lineTo(x3,y3);
    //  ctx.stroke();
    //}
    // 执行流量切换
    function showFlowSwitch(value){
      var flowFlag = {
        hn:0,xb:0,hd:0,hb:0,zb:0
      };
      //主-大区分布的位置
      var styleObj = {
        hd0:{'top':'256px','left':'465px'},//华东 南基位置
        hd1:{'top':'376PX','left':'691px'},//     东莞位置
        hn0:{'top':'256px','left':'495px'},//华南 南基位置
        hn1:{'top':'376PX','left':'721px'},//     东莞位置
        xb0:{'top':'256px','left':'525px'},//西部 南基位置
        xb1:{'top':'376PX','left':'751px'},//     东莞位置
        hb0:{'top':'256px','left':'555px'},//华北 南基位置
        hb1:{'top':'376PX','left':'781px'},//     东莞位置
        zb0:{'top':'256px','left':'585px'},//中部 南基位置
        zb1:{'top':'376PX','left':'811px'} //     东莞位置
      };
      //灰色区域-大区分布
      var styleObj2 = {
        hd0:{'top':'376px','left':'466px'},//华东 东莞位置
        hd1:{'top':'256px','left':'691px'},//     南基位置
        hn0:{'top':'376px','left':'496px'},//华南 东莞位置
        hn1:{'top':'256px','left':'721px'},//     南基位置
        xb0:{'top':'376px','left':'526px'},//西部 东莞位置
        xb1:{'top':'256px','left':'751px'},//     南基位置
        hb0:{'top':'376px','left':'556px'},//华北 东莞位置
        hb1:{'top':'256px','left':'781px'},//     南基位置
        zb0:{'top':'376px','left':'586px'},//中部 东莞位置
        zb1:{'top':'256px','left':'811px'} //     南基位置
      };
      if (flowBelong.southCenter&&flowBelong.southCenter.length>0) {
        for(var i=0;i<flowBelong.southCenter.length;i++){
          flowFlag[$filter('transformRegion')(flowBelong.southCenter[i].regionCHName)] = 0;
          //中文注释flowFlag2[$filter('transformRegion')(flowBelong.southCenter[i].regionCHName)] = 0;
        }
      }
      if (flowBelong.dgCenter&&flowBelong.dgCenter.length>0) {
        for(var j=0;j<flowBelong.dgCenter.length;j++){
           flowFlag[$filter('transformRegion')(flowBelong.dgCenter[j].regionCHName)] = 1;
           //中文注释flowFlag2[$filter('transformRegion')(flowBelong.dgCenter[j].regionCHName)] = 1;
         }
      }
      if(value===1){;
        initPosition(1);//1：最初始的主OGG大区分布，2：有大区切换时，备OGG大区分布即使改变
      }else if(value === 2){
        angular.forEach(flowFlag,function(value,m){
            var id = '#'+m;
             var animates='';
             var styles='';
          if(flowFlag[m]===0){
             animates = m+'l',
                styles = styleObj[m+'0'];
          }else{
             animates = m+'r',
                styles = styleObj[m+'1'];
          }
          $(id).addClass(animates);
          setStyle(id,styles,animates);
        });
        $timeout(function(){
          initPosition(2);
        },4000);
      }
      function initPosition(value){
        for(var k in flowFlag){
          if(flowFlag[k]===0){
            if (value===1) {
              $('#'+k).css(styleObj[k+'0']);
            }
            $('#'+k+2).css(styleObj2[k+'0']);
          }else{
            if (value===1) {
              $('#'+k).css(styleObj[k+'1']);
            }
             $('#'+k+2).css(styleObj2[k+'1']);
          }
          if (k!==undefined) {
            //中文注释$('#'+k)[0].style.display = 'inline-block';
            $('#'+k).css({'display':'inline-block'});
            $('#'+k+2).css({'display':'inline-block'});
            //中文注释$('#'+k+2)[0].style.display = 'inline-block';
          }

        }
      }
    }
    function setStyle(id,style,animate){
      setTimeout(function(){
        $(id).css(style);
        $(id).removeClass(animate);
      },4000)
    }
    //右上角小图标，显示隐藏功能
    function colsePage(){
      $('#imgContent,#imgBorder').css('display','none');
      $('#button').css('display','block');
    }
    function openPage(){
      $('#imgContent,#imgBorder').css('display','block');
      $('#button').css('display','none');
    }
    function disconnectSocket(){
      socket.disconnect();
    }

    function showMachine(name,num){
      if(num===1){
        $('#MyModal1').modal('show');
      }else if(num===2){
        $('#MyModal2').modal('show');
      }else if(num===3){
        $('#MyModal3').modal('show');
      }else if(num===4){
        $('#MyModal4').modal('show');
      }else if(num===5){
        $('#MyModal5').modal('show');
      }else if(num===6){
        $('#MyModal6').modal('show');
      }
      var temp={name:name};
      machineInfo.data1=[],machineInfo.data2=[],machineInfo.data3=[],machineInfo.data4=[],machineInfo.data5=[],machineInfo.data6=[];
      machineInfo.exist=false;
      machineInfo.loading=true;
      var url2="/bigViews/queryMachineInfo";
      httpServe.post(url2,JSON.stringify(temp)).then(function (res) {
        if (res.state === "success"){
          machineInfo.loading=false;
          if(num===1){
            angular.copy(res.data,machineInfo.data1);
            if (res.data===undefined || res.data.length<1 ) {
              machineInfo.exist=true;
            }
          }else if(num===2){
            angular.copy(res.data,machineInfo.data2);
            if (res.data==undefined || res.data.length<1 ) {
              machineInfo.exist=true;
            }
          }else if(num===3){
            angular.copy(res.data,machineInfo.data3);
            if (res.data===undefined || res.data.length<1 ) {
              machineInfo.exist=true;
            }
          }else if(num===4){
            angular.copy(res.data,machineInfo.data4);
            if (res.data===undefined || res.data.length<1 ) {
              machineInfo.exist=true;
            }
          }else if(num===5){
            angular.copy(res.data,machineInfo.data5);
            if (res.data===undefined || res.data.length<1 ) {
              machineInfo.exist=true;
            }
          }else if(num===6){
            angular.copy(res.data,machineInfo.data6);
            if (res.data===undefined || res.data.length<1 ) {
              machineInfo.exist=true;
            }
          }
        }else{
          promisesServe.msgBar('warning',res.desc);
        }
      });
    }
    //悬浮框
    function showMachineInfo(event,name,num){
      var temp={};
      temp.name=name;
      machineInfo.loading=false;
      //路由器显示数据
      if(num===1){
        var url="/bigViews/arrow/state";
        httpServe.post(url,JSON.stringify(temp)).then(function (res) {
                   if (res.state === "success") {
                      angular.copy(res.data,lineInfo);
                       $('#lineInfo').css({'top':event.clientY+2+'px','left':event.clientX+2+'px','display':'block'});
                   }else{
                    promisesServe.msgBar('warning',res.desc);
                   }
        });

        // OGG 线条显示数据
      }else if(num===2){
           //console.log(systemState);
          if(systemState.MLJ_DG==='abnormal'){
            OGGInfo.info='OGG同步链路延迟过大'
          }if(systemState.MLJ_DG==='process'){
            OGGInfo.info='OGG进程异常'
          }else {
            OGGInfo.info='OGG网络状态良好'
          }
        $('#OGGInfo').css({'top':event.clientY+2+'px','left':event.clientX+2+'px','display':'block'});
      }else if(num===3){//各机器信息查询
        machineInfo.data=[];
        $('#machineInfo').css({'top':event.clientY+45+'px','left':event.clientX-100+'px','display':'block'});
        var url2="/bigViews/queryMachineInfo";
         machineInfo.loading=true;
         machineInfo.exist=false;
        httpServe.post(url2,JSON.stringify(temp)).then(function (res) {
                   machineInfo.loading=false;
                   if (res.state === "success") {
                      angular.copy(res.data,machineInfo.data);
                      if (machineInfo.data.length<1) {
                       machineInfo.exist=true;
                      }

                   }else{
                    promisesServe.msgBar('warning',res.desc);
                   }
        });
      }else{
        machineInfo.data=[];
         $('#machineInfo').css({'top':event.clientY-190+'px','left':event.clientX-100+'px','display':'block'});
        var url3="/bigViews/queryMachineInfo";
         machineInfo.loading=true;
         machineInfo.exist=false;
        httpServe.post(url3,JSON.stringify(temp)).then(function (res) {
               machineInfo.loading=false;
               if (res.state === "success") {
                  angular.copy(res.data,machineInfo.data);
                  if (machineInfo.data.length<1) {
                        machineInfo.exist=true;
                      }

               }else{
                promisesServe.msgBar('warning',res.desc);
               }
        });

      }
    }
    //暂时不用
    function showLineInfo(event,name){
      //中文注释httpServe.getLineInfo(name).then(function(res){
      //中文注释if(res.state === 'success'){
      //    中文注释angular.copy(res.data,lineInfo);
      //  }
      //})
      //中文注释$('#lineInfo').css({'top':event.clientY+2+'px','left':event.clientX+2+'px','display':'block'});
    }
    //动态图
      function renderCircleFlare(){
      ctx.save();
      ctx.translate(circle.x, circle.y);
      ctx.rotate(dToR(circle.rotation+185));
      ctx.scale(1,1);
      ctx.beginPath();
      ctx.arc(0, circle.radius, 30, 0, Math.PI *2, false);
      ctx.closePath();
      var gradient3 = ctx.createRadialGradient(0, circle.radius, 0, 0, circle.radius, 5);
      gradient3.addColorStop(0, 'blue');
      gradient3.addColorStop(1, 'hsla(330, 50%, 50%, 0)');
      ctx.fillStyle = gradient3;
      ctx.fill();
      ctx.restore();
    }
     function clear(){
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, .1)';
      ctx.fillRect(0, 0, cw, ch);
      ctx.globalCompositeOperation = 'lighter';
    }
  }
  runningStatusSer.$inject = ['$timeout','$filter','httpServe','$q','systemIP','promisesServe'];
})();
