'use strict';

;(function () {
	'use strict';
	angular.module('services.disasterSwitch', [])
		.factory('switchSer', switchSer);
	function switchSer($timeout,httpServe,$filter,systemIP) {
    var flowDistribution = {};
		var targetFlow = {};

    var countdown={};
    var recording={setp00:0,setp05:0,setp10:0,step15:0,setp20:0}
    var notice = [];
		var socket;
    /*中文注释var class1 = [];
    中文注释var class2 = [];*/
    var styleObj = {
        hd0:{'top':'134px','left':'314px'},
        hd1:{'top':'134px','left':'407px'},
        hn0:{'top':'134px','left':'335px'},
        hn1:{'top':'134px','left':'428px'},
        xb0:{'top':'134px','left':'356px'},
        xb1:{'top':'134px','left':'449px'},
        hb0:{'top':'164px','left':'314px'},
        hb1:{'top':'164px','left':'407px'},
        zb0:{'top':'164px','left':'335px'},
        zb1:{'top':'164px','left':'428px'}
      };
		return {
			queryFlow:queryFlow,
			flowDistribution:flowDistribution,
      notice:notice,
      disconnectSocket:disconnectSocket,
      countdown:countdown
		};
    // 到达预案切换步骤
		function toSwitchPlan(){
      //中文注释console.log('05-----到达切换预案');
      //中文注释$('#step1').next().addClass('toNextStep');//线条移动
      //中文注释$('#step1').next()[0].addEventListener('webkitAnimationEnd',function(){
        $('#step2').next().addClass('toNextStep');//线条移动
        $('#step2').addClass('arrival');       //改变圆圈的背景和border
        $('#stepText2').addClass('textColor');  //改变字体颜色 灰色--黑色
      //});
		}
    // 流量分布状况查询
		function queryFlow(){
     /*中文注释 queryCurrentStep();
          中文注释showFlow();
          中文注释controlAnimation();
          中文注释oggArrowAnimation();*/
          queryCurrentStep();//启动socket
          currentFlowQuery();
		}
    //当前流量查询
    function currentFlowQuery(){
      //console.log("当前流量查询"); southCenter
        httpServe.bvCurrentFlowStateQuery().then(function(res){
        if(res.state==='success'){
          angular.copy(res.data,flowDistribution);
          //console.log(res.data);
          flowDistribution.southCenterSwitch = angular.copy(flowDistribution.southCenter);
          flowDistribution.DGCenterSwitch = angular.copy(flowDistribution.dgCenter);
          flowDistribution.southCenterOgg = angular.copy(flowDistribution.southCenter);
          flowDistribution.DGCenterOgg = angular.copy(flowDistribution.dgCenter);
          $timeout(function(){
            showFlow();
            controlAnimation();//水箱到OGG的箭头
            oggArrowAnimation();//OGG同步的两个箭头
          },10);

        }
      })
    }
    // 启动socket
		function queryCurrentStep(){
      //中文注释socket = io.connect('127.0.0.1:8888');

      //中文注释socket = io.connect('192.168.0.41:8888');
			//socket = io.connect('192.168.117.88:8888');

      socket = io.connect(systemIP.getUser());
       //当前步骤
      //中文注释socket.on('currentStep',function(res){  //----------------
			socket.on('switchBvCurrentStep',function(res){
        //console.log("当前步骤");
			  if(res.state==='success'){
			 		  getCurrentStep(res.data.status);

			  }
			});

        //公告信息
      //中文注释socket.on('switchInformation',function(res){  //------------------
      socket.on('switchBvInformation',function(res){
        //console.log("公告已请求");
        if(res.state === 'success'){
          $timeout(function(){
            //console.log("公告");
            notice.push(res.data);
          },0);
        }
      });
      //监听新的当前流量状态
      //中文注释socket.on('switchTargetFlowState',function(res){ //------------------
      socket.on('switchBvTargetFlowState',function(res){
        if(res.state === 'success'){
          if (res.data==="00") {//00：有切换成功的大区，01：没有大区切换成功
            httpServe.bvCurrentFlowStateQuery().then(function(res){
                if(res.state==='success'){
                  angular.copy(res.data,targetFlow);
                  flowSwitch(targetFlow);
                }
            })
          }
        }else{
          promisesServe.msgBar('warning',res.desc);
        }
      });
		}
    // socket对应步骤的调用
		function getCurrentStep(step){
      if(step==='00'){
        toStateCheck();
        recording.setp00=1;
      }else if(step==='05'){
        if( recording.setp00===0){
          getCurrentStep('00');
        }
        recording.setp05=1;
        toSwitchPlan();

      }else if(step==='10'){
        if( recording.setp00===0){
          getCurrentStep('00');
        }
        if( recording.setp05===0){
          getCurrentStep('05');
        }
        $timeout(function(){
          oggAntiSync();
           recording.setp10=1;
        },10);
			}else if(step==='15'){
        if( recording.setp00===0){
          getCurrentStep('00');
        }
        if( recording.setp05===0){
          getCurrentStep('05');
        }
        if( recording.setp10===0){
          getCurrentStep('10');
        }
				doFlowSwitch();
         recording.setp15=1;
			}else if(step==='20'){
        if( recording.setp00===0){
          getCurrentStep('00');
        }
        if( recording.setp05===0){
          getCurrentStep('05');
        }
        if( recording.setp10===0){
          getCurrentStep('10');
        }
        if( recording.setp15===0){
          getCurrentStep('15');
        }
				oggPositiveSync();
        recording.setp20=1;
			}else if(step==='25'){
        if( recording.setp00===0){
          getCurrentStep('00');
        }
        if( recording.setp05===0){
          getCurrentStep('05');
        }
        if( recording.setp10===0){
          getCurrentStep('10');
        }
        if( recording.setp15===0){
          getCurrentStep('15');
        }
        if( recording.setp20===0){
          getCurrentStep('20');
        }
				theEnd();
        /*中文注释$timeout(function(){
          中文注释recording.setp00=0;
          中文注释recording.setp05=0;
          中文注释recording.setp10=0;
          中文注释recording.setp15=0;
          中文注释recording.setp20=0;
        },10000);*/

			}else if (step==='01') {//终止切换
        //清空数据
        $("#sysPrompt").css("display","block");
        countdown.number=5;
        calculation();
        recording.setp00=0;
        recording.setp05=0;
        recording.setp10=0;
        recording.setp15=0;
        recording.setp20=0;
        function calculation(){
          if (countdown.number>=0) {
            $timeout(function(){
               countdown.number=countdown.number-1;
               calculation();
            },1000);
          }
        }
        $timeout(function(){
          $("#waterTank").css("display","none");
          $("#sysPrompt").css("display","none");
          for(var i=0;i<7;i++){
            var id='#step'+i;
            if ($(id)) {
              $(id).next().removeClass('toNextStep');//线条移动
              $(id).removeClass('arrival');       //改变圆圈的背景和border
              $('#stepText'+i).css("color","#828181");
            }
          }
          notice.splice(0);
          currentFlowQuery();
        },6000);

      }
		}
    //开始状态检查
    function toStateCheck(){
      //console.log('00-----状态检查，动画');
      $('#step1').addClass('arrival');       //改变圆圈的背景和border
      $('#stepText1').addClass('textColor');//改变字体颜色 灰色--黑色
      $('#step1').next().addClass('toNextStep');//线条移动
    }
    //初始化大区位置
		function showFlow(){
      $("#waterTank").css("display","block");
			var flowFlag = {
        //中文注释zj:0,gd:0,xb:0,hd:0,db:0,hz:0  regionCHName
        hd:0,hn:0,xb:0,hb:0,zb:0
      };

      for(var c=0;c<flowDistribution.southCenter.length;c++){
        flowFlag[$filter('transformRegion')(flowDistribution.southCenter[c].regionCHName)] = 0;
      }
      for(var j=0;j<flowDistribution.dgCenter.length;j++){
        flowFlag[$filter('transformRegion')(flowDistribution.dgCenter[j].regionCHName)] = 1;
      }
      //console.log(flowFlag);
      angular.forEach(flowFlag,function(v,k){
        var id = '#'+k+'S';
        if(flowFlag[k]===0){
          $(id).css(styleObj[k+'0']);
          //中文注释$(id).style="styleObj[k+'0']";
        }else{
          $(id).css(styleObj[k+'1']);
          //中文注释$(id).style=styleObj[k+'1'];
        }
        $(id)[0].style.display = 'inline-block';
      });
      //原始的for in
     /* 中文注释for(var k in flowFlag){
        中文注释var id = '#'+k+'S';
        中文注释if(flowFlag[k]===0){
          中文注释$(id).css(styleObj[k+'0']);
          //中文注释$(id).style="styleObj[k+'0']";
        中文注释}else{
          中文注释$(id).css(styleObj[k+'1']);
          //中文注释$(id).style=styleObj[k+'1'];
        }
        中文注释$(id)[0].style.display = 'inline-block';
      }*/

		}
    //流量切换
		function doFlowSwitch(){
      //中文注释$('#step3').next().addClass('toNextStep');
      //中文注释$('#step2').next()[0].addEventListener('webkitAnimationEnd',function(){
      //中文注释$('#step3').next()[0].addEventListener('webkitAnimationEnd',function(){
        //console.log("15------流量切换");
        $('#step4').addClass('arrival');          //改变圆圈的背景和border
        $('#step4').next().addClass('toNextStep'); //线条移动
        $('#stepText4').addClass('textColor');   //改变字体颜色 灰色--黑色


     // });
    }
    //监听到有切换完成的大区后，重新定位
    function flowSwitch(flowMsg){
      var flowFlag = {
          //中文注释zj:0,gd:0,xb:0,hd:0,db:0,hz:0
          hd:0,hn:0,xb:0,hb:0,zb:0
        };
      //var styleObj = showFlow();
        for(var e=0;e<flowMsg.southCenter.length;e++){
          flowFlag[$filter('transformRegion')(flowMsg.southCenter[e].regionCHName)] = 0;
        }
        for(var f=0;f<flowMsg.dgCenter.length;f++){
          flowFlag[$filter('transformRegion')(flowMsg.dgCenter[f].regionCHName)] = 1;
        }
        angular.forEach(flowFlag,function(v,k){
          var id = '#'+k+'S';
          var animates;
          var styles;
          if(flowFlag[k]===0){
             animates = k+'lSwitch';
             styles = styleObj[k+'0'];
          }else{
             animates = k+'rSwitch';
             styles = styleObj[k+'1'];
          }
          $(id).addClass(animates);
          setStyle(id,styles,animates);
        });
        //原始的for in
        /*中文注释for(var k in flowFlag){
          中文注释var id = '#'+k+'S';
          中文注释if(flowFlag[k]===0){
            中文注释var animate = k+'lSwitch';
            中文注释var style = styleObj[k+'0'];
          中文注释}else{
            中文注释var animate = k+'rSwitch';
            中文注释var style = styleObj[k+'1'];
          }
          中文注释$(id).addClass(animate);
          中文注释setStyle(id,style,animate);
        }*/
        $timeout(function(){
          flowDistribution.southCenterSwitch = targetFlow.southCenter;//主负载均衡和主应用水箱
          flowDistribution.DGCenterSwitch = targetFlow.dgCenter;//备负载均衡和备应用水箱
          $timeout(function(){
            controlAnimation();//水箱到OGG的箭头
            oggArrowAnimation();//OGG同步的两个箭头
          },500);
          
        },3000);
    }
    //流量切换完毕后移除动画，设定大区位置
    function setStyle(id,style,animate){
      setTimeout(function(){
        $(id).css(style);
        $(id).removeClass(animate);
      },2000);
    }
    // ogg反向同步开启
		function oggAntiSync(){
      //console.log("10---进入反向同步");
      //中文注释$('#step2').next().addClass('toNextStep');
      //中文注释('#step2').next()[0].addEventListener('webkitAnimationEnd',function(){
        $('#doSwitch').css('background','#d6d6d6');
        $timeout(function(){
          $('#step3').addClass('arrival');//改变圆圈的背景和border
          //$('#stepText3').addClass('textColor');
          $('#step3').next().addClass('toNextStep');//线条移动
          $('#stepText3').addClass('textColor');  //改变字体颜色 灰色--黑色
       /*  中文注释if(flowDistribution.southCenter.length===0){
            中文注释for(var i=0;i<targetFlow.southCenter.length;i++){
             中文注释 class1.push($filter('transformRegion')(targetFlow.southCenter[i].regionCHName));
             中文注释 flowDistribution.southCenterOgg.push(targetFlow.southCenter[i]);
            }
          }
          中文注释for(var i=0;i<flowDistribution.southCenter.length;i++){
           中文注释if(targetFlow.southCenter.length===0){
              中文注释class1.push($filter('transformRegion')(flowDistribution.southCenter[i].regionCHName));
              中文注释flowDistribution.DGCenterOgg.push(flowDistribution.southCenter[i]);
            }
            中文注释for(var j=0;j<targetFlow.southCenter.length;j++){
              中文注释if(targetFlow.southCenter[j].regionCHName===flowDistribution.southCenter[i].regionCHName){
               中文注释 break;
              中文注释}else if(flowDistribution.southCenter[i].regionCHName!==targetFlow.southCenter[j].regionCHName && j===targetFlow.southCenter.length-1){
                中文注释class1.push($filter('transformRegion')(flowDistribution.southCenter[i].regionCHName));
                中文注释console.log(class1);
                中文注释flowDistribution.DGCenterOgg.push(flowDistribution.southCenter[i]);
              }
            }
          }
          中文注释if(flowDistribution.dgCenter.length===0){
            中文注释for(var i=0;i<targetFlow.dgCenter.length;i++){
              for(var j=0;j<flowDistribution.DGCenterOgg.length;j++){
                中文注释if(flowDistribution.DGCenterOgg[j].regionCHName===targetFlow.dgCenter[i].regionCHName){
                  break;
                中文注释}else if(flowDistribution.DGCenterOgg[j].regionCHName!==targetFlow.dgCenter[i].regionCHName &&j===flowDistribution.DGCenterOgg.length-1){
                  中文注释class2.push($filter('transformRegion')(targetFlow.dgCenter[i].regionCHName));
                  中文注释flowDistribution.DGCenterOgg.push(targetFlow.dgCenter[i]);
                }
              }
            }
          }
          中文注释for(var i=0;i<flowDistribution.dgCenter.length;i++){
            中文注释if(targetFlow.dgCenter.length===0){
              中文注释class2.push($filter('transformRegion')(flowDistribution.dgCenter[i].regionCHName));
              中文注释flowDistribution.southCenterOgg.push(flowDistribution.dgCenter[i]);
            }
            中文注释for(var j=0;j<targetFlow.dgCenter.length;j++){
              中文注释if(targetFlow.dgCenter[j].regionCHName===flowDistribution.dgCenter[i].regionCHName){
                break;
              中文注释}else if(flowDistribution.dgCenter[i].regionCHName!==targetFlow.dgCenter[j].regionCHName &&j===targetFlow.dgCenter.length-1){
                中文注释class2.push($filter('transformRegion')(flowDistribution.dgCenter[i].regionCHName));
                中文注释flowDistribution.southCenterOgg.push(flowDistribution.dgCenter[i]);
              }
            }
          }*/
        },0);
       /* 中文注释setTimeout(function(){
          console.log(class1);
          console.log(class2);
          中文注释for(var i=0;i<class1.length;i++){
            中文注释$('.oggSync.'+class1[i]).addClass('getsouthCenter');
          }
          中文注释for(var i=0;i<class2.length;i++){
            中文注释$('.oggSync.'+class2[i]).addClass('toDGCenter');
          }
          中文注释oggArrowAnimation();//OGG同步的两个箭头
        },0)*/
      //});
		}
    // ogg正向同步关闭
    function oggPositiveSync(){
      //console.log("20------正向同步");
      $('#step4').next().addClass('toNextStep');
     // 中文注释$('#step4').next()[0].addEventListener('webkitAnimationEnd',function(){
        $('#step5').addClass('arrival');//改变圆圈的背景和border
        $('#stepText5').addClass('textColor');//改变字体颜色 灰色--黑色
        $('#step5').next().addClass('toNextStep');//线条移动
        flowDistribution.southCenterOgg = targetFlow.southCenter;//主OGG右水箱和备OGG左水箱
        flowDistribution.DGCenterOgg = targetFlow.dgCenter;//主OGG左水箱和备OGG右水箱
        $timeout(function(){
          $('.oggSync').removeClass('getsouthCenter toDGCenter');
          oggArrowAnimation();//OGG同步的两个箭头
        },0);
      //});
    }
    //结束
    function theEnd(){
      //中文注释$('#step5').next().addClass('toNextStep');
      //中文注释$('#step5').next()[0].addEventListener('webkitAnimationEnd',function(){
        $('#step6').addClass('arrival');//改变圆圈的背景和border
        $('#stepText6').addClass('textColor');//改变字体颜色 灰色--黑色
      //});
    }
    //路由改变时关闭socket
    function disconnectSocket(){
      //console.log(socket)
      socket.disconnect();
    }
    //水箱到OGG的箭头
    function controlAnimation(){

      $('#MswitchLeft,#MswitchDown,#MloadToApp,#MappToOgg').css('display','none');
       $('#SswitchLeft,#SswitchDown,#SloadToApp,#SappToOgg').css('display','none');
      if(flowDistribution.southCenterSwitch.length===0){
        $('#MswitchLeft').removeClass('mainCisternLeft');
        $('#MswitchDown').removeClass('cisternDown');
        $('#MloadToApp').removeClass('loadToApp');
        $('#MappToOgg').removeClass('appToOgg');
      }else{
        $('#MswitchLeft,#MswitchDown,#MloadToApp,#MappToOgg').css('display','block');
        $('#MswitchLeft').addClass('mainCisternLeft');
        $('#MswitchDown').addClass('cisternDown');
        $('#MloadToApp').addClass('loadToApp');
        $('#MappToOgg').addClass('appToOgg');
      }
      if(flowDistribution.DGCenterSwitch.length===0){
        $('#SswitchLeft').removeClass('spareCisternRight');
        $('#SswitchDown').removeClass('cisternDown');
        $('#SloadToApp').removeClass('loadToApp');
        $('#SappToOgg').removeClass('appToOgg');
      }else{
        $('#SswitchRight,#SswitchDown,#SloadToApp,#SappToOgg').css('display','block');
        $('#SswitchRight').addClass('spareCisternRight');
        $('#SswitchDown').addClass('cisternDown');
        $('#SloadToApp').addClass('loadToApp');
        $('#SappToOgg').addClass('appToOgg');
      }
    }
    //OGG同步的两个箭头
    function oggArrowAnimation(){
        $('.oggPositiveSync,.oggPositiveSyncT').removeClass('oggPositiveSyncAni');
        $('.oggAntiSync,.oggAntiSyncT,.oggAntiSyncS').removeClass('oggAntiSyncAni');
        /*$('.oggPositiveSync,.oggPositiveSyncT').addClass('initArrowTop');//初始化上部分箭头坐标，隐藏
        $('.oggAntiSync,.oggAntiSyncT,.oggAntiSyncS').addClass('initArrowBot');//初始化下部分箭头坐标，隐藏*/
        $('.oggPositiveSync,.oggPositiveSyncT').css('display','none');
        $('.oggAntiSync,.oggAntiSyncT,.oggAntiSyncS').css('display','none');

      if(flowDistribution.southCenterOgg.length===0){
        $('.oggPositiveSync,.oggPositiveSyncT').removeClass('oggPositiveSyncAni');
      }else{
        setTimeout(function(){
          $('.oggPositiveSync').css('display','block');
          $('.oggPositiveSync').addClass('oggPositiveSyncAni');
        },2000);
        setTimeout(function(){
          $('.oggPositiveSyncT').css('display','block');
          $('.oggPositiveSyncT').addClass('oggPositiveSyncAni');
        },3000);
      }
      if(flowDistribution.DGCenterOgg.length===0){
        $('.oggAntiSync,.oggAntiSyncT,.oggAntiSyncS').removeClass('oggAntiSyncAni');
      }else{
        setTimeout(function(){
          $('.oggAntiSync').css('display','block');
          $('.oggAntiSync').addClass('oggAntiSyncAni');
        },2000);

        setTimeout(function(){
          $('.oggAntiSyncT').css('display','block');
          $('.oggAntiSyncT').addClass('oggAntiSyncAni');
        },3000);
        setTimeout(function(){
          $('.oggAntiSyncS').css('display','block');
          $('.oggAntiSyncS').addClass('oggAntiSyncAni');
        },4000);
      }
    }
	};
	switchSer.$inject = ['$timeout','httpServe','$filter','systemIP'];
})();
