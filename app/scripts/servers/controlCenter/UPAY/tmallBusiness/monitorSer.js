'use strict';
;(function (angular){
  angular.module('servers.monitor',[]).factory('monitorSer',monitorSer);
  function monitorSer(httpServe,$interval,$timeout,$state,promisesServe,$cookieStore){
    var runLog=[];
    var catalog={};
    var NJmessage={};
    var MQ={};
    var NJ={};
    var DGMessage={};
    var MQMessage=[];
    var DG={};
    var re={};
    var Report={};
    var codeResult={};
    var setThread ={};
    var params={};
    var scheme = {};
    var addBatch = {};
    var submitData = {};
    var regionalInfo={};
    var num={};
    var statu='';
    var historyswitch=[];
     var GZDatas = [
  
        ];
        var DGDatas = [
      
        ];
    var cookieData = {};
    return {
    initEcharts:initEcharts,
    changeProject:changeProject,
    query:query,
    runLog:runLog,
    secondEchar:secondEchar,
    NJmessage:NJmessage,
    NJ:NJ,
    DG:DG,
    DGMessage:DGMessage,
    MQMessage:MQMessage,
    MQ:MQ,
    Report:Report,
    re:re,
    findCode:findCode,
    codeResult:codeResult,
    setThread:setThread,   
    initQueryParam:initQueryParam,
    turnToPage:turnToPage,
    clear:clear,
    catalog:catalog,
    queryLog:queryLog,
    planOut:planOut,
    colseModal:colseModal,
    scheme:scheme,
    getScheme:getScheme,
    addBatch:addBatch,
    submitaa:submitaa,
    clear1:clear1,
    start:start,
    close:close,
    cookieData:cookieData,
    buttonState:buttonState,
    historyswitch:historyswitch,
    queryHistorySwitch:queryHistorySwitch
    }

    function clear1(){
      initQueryParam();
    }

    function buttonState(){
        var url = '/inspection/array/findswitch';
        httpServe.post(url).then(function(res){
            if(res.state === 'success'){
              num = res.num;
          if(num === '0'){
            $('#btn_s').attr('disabled','disabled');
            $('#btn_c').removeAttr('disabled')
        }else{
            $('#btn_c').attr('disabled','disabled');
            $('#btn_s').removeAttr('disabled')
        }
            }else{
            $('#btn_c').attr('disabled','disabled');
            $('#btn_s').removeAttr('disabled')
            }     
        })
            }
     
    


    function queryLog(){
      httpServe.getRun(JSON.stringify(catalog)).then(function(res){
          if(res.state === 'success'){
              angular.copy(res,runLog);
              catalog.instance='';
              changeInstance();
          }
      })
    }

    function queryHistorySwitch(){
     
      httpServe.getHistorySwitch().then(function(res){
        if (res.state === 'success') {
          angular.copy(res,historyswitch);
          ooo()
        }
    })
  }
    function ooo(){
      angular.forEach(historyswitch.data,function(item){
        var str = item.switchRegion;
         if(!str){
            item.switchRegion = '无 '
          }
         if(str!==undefined){  
            var a = str.split(';');
             for(var i=0;i<a.length;i++){
              if(a[i]==='01'){
                a[i] = '华北'
              }else if(a[i]==='02'){
                a[i] = '华东'
              }else if(a[i]==='03'){
                a[i] = '华南'
              }else if(a[i]==='04'){
                a[i] = '西部'
              }else if(a[i]==='05'){
                a[i] = '中部'
              }
          }
          item.switchRegion = a.join(' ');
          }

      })
    }

    function query(){  

      httpServe.getNJ(NJmessage).then(function(res){
        $('#loding_nj').hide();
        if(res.state==='success'){
          angular.copy(res,NJ);
          heightColor();
        }
      });
      
      httpServe.getMQMessage(MQ).then(function(res){
        if(res.state==='success'){
          angular.copy(res,MQMessage)
          secondEchar();                
        }
      });
      
      httpServe.getDG(DGMessage).then(function(res){
        $('#loding_dg').hide();
        if(res.state==='success'){
          angular.copy(res,DG)
          heightColor();     
        }
      });
      
      httpServe.getReport(re).then(function(res){
        if(res.state==='success'){
          angular.copy(res,Report);          
        }
      });
      
    
    }
    //监控条颜色
    function heightColor(){
          $timeout(function(){
              $('.heightColor').each(function() {                
                var p = $(this).attr('style').replace('height:', ' ');
                var a=parseInt(p);                 
               if(a > 60 && a < 90) {
                $(this).addClass('progress-bar-warning')
                } else if(a >= 90) {
                $(this).addClass('progress-bar-danger')
          }
        })
    },10);
    }
    //点击进去按钮清空input框
    function clear(){      
      document.getElementById("clear_select").value='';
    }
    //分页初始化
    function initQueryParam(){
      catalog.currentPage = 1;
      catalog.pageCount = 5;
      params={instance:""};
      params.currentPage=catalog.currentPage;
      params.pageCount=catalog.pageCount;
      angular.copy(params,catalog);
    }
      //分页请求
    function turnToPage(currentPage){
         catalog.currentPage=currentPage;
         httpServe.getRun(JSON.stringify(catalog)).then(function(res){
         if(res.state==='success'){
          angular.copy(res,runLog)
          changeInstance();
        }
        
    })
}
    /*系统日志按省代码筛选*/
    function findCode(){
      catalog.currentPage=1;
      catalog.pageCount = 5;
      var url='/inspection/polling/query';
      if (catalog !== undefined) {
              httpServe.post(url,JSON.stringify(catalog)).then(function(res){
          if(res.state==='success'){
              angular.copy(res,runLog);
              changeInstance();
          }else{
            promisesServe.msgBar('warning', res.message);
          }
      })
      }
    }
      //将01,02,03转化为对应的选项
    function changeInstance(){
         angular.forEach(runLog.data.datas,function(item){
            if(item.instance==='01'){
              item.instance='array策略巡检';
             }else if(item.instance==='02'){
              item.instance='ogg进程巡检';
             }else if(item.instance==='03'){
              item.instance='大区配置巡检';
             }else if(item.instance==='04'){
              item.instance='文件比对';
             }else if(item.instance==='05'){
              item.instance='数据比对';
             }
              })
    }    

    function changeProject(){
        GZDatas=[];
        DGDatas=[];
       httpServe.getMapInfo().then(function(res){
          if(res.state === 'success'){
            angular.copy(res,regionalInfo);            
        angular.forEach(regionalInfo.data.GZData,function(item){
          var tepmarr=[];
          tepmarr[0]={name:'南基'};
          tepmarr[1]={name:item.regionName};
          GZDatas.push(tepmarr);  
        })
        angular.forEach(regionalInfo.data.DGData,function(item){
          var tepmarr=[];
          tepmarr[0]={name:'东莞'};
          tepmarr[1]={name:item.regionName};
          DGDatas.push(tepmarr);        
        });
         
        initEcharts(GZDatas,DGDatas); 
        
          }
      })
     
      
    }
    function initEcharts(GZData,DGData){
      var echart = echarts.init(document.getElementById('aaa'))
     //流量分配到的地区
     var geoCoordMap = {
        '东莞': [113.8953,22.901],
        '南基': [113.5107,23.2196],
        '华北': [123.3833,41.8000],
        '华东': [120.62,31.32],
        '华南': [116.1204,23.9],
        '中部': [113.42,34.44],
        '西部': [96.4038,35.3207],
        
      };
      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          var fromCoord = geoCoordMap[dataItem[0].name];
          var toCoord = geoCoordMap[dataItem[1].name];
          if (fromCoord && toCoord) {
            res.push({
              fromName: dataItem[0].name,
              toName: dataItem[1].name,
              coords: [fromCoord, toCoord]
            });
          }
        }
        return res;
      };
      var color = ['#03A303', '#ffa022'];
      var series = [];
      [['南基', GZData],['东莞', DGData]].forEach(function (item, i) {
        series.push(
          {
            name: item[0],
            type: 'lines',
            zlevel: 2,
            effect: {
              show: true, 
              period: 6,    
              trailLength: 0,
              symbol: 'arrow',  
              symbolSize: 12  
            },
            //分配线的样式
            lineStyle: {
              normal: {
                color: color[i],  
                width: 1,   
                opacity: 0.7, 
                curveness: 0.2  
              }
            },
            data: convertData(item[1])
          },
          {
          type:'map',
          mapType:'china',
          zoom:1.23,
          showLegendSymbol:false,
          data:[
            {name:'新疆',value:0},
            {name:'青海',value:0},
            {name:'陕西',value:0},
            {name:'甘肃',value:0},
            {name:'宁夏',value:0},
            {name:'西藏',value:0},
            {name:'重庆',value:0},
            {name:'云南',value:0},
            {name:'贵州',value:0},
            {name:'四川',value:0},           
            {name:'广东',value:10},
            {name:'广西',value:10},
            {name:'福建',value:10},
            {name:'海南',value:10},            
            {name:'北京',value:20},
            {name:'天津',value:20},
            {name:'吉林',value:20},
            {name:'辽宁',value:20},
            {name:'黑龙江',value:20},
            {name:'山东',value:20},
            {name:'河北',value:20},      
            {name:'江苏',value:30},
            {name:'安徽',value:30},
            {name:'上海',value:30},
            {name:'浙江',value:30},
            {name:'湖北',value:50},
            {name:'江西',value:50},
            {name:'内蒙古',value:50},
            {name:'湖南',value:50},
            {name:'山西',value:50},
            {name:'河南',value:50}
          ]
        });
      });
      var option = {
        backgroundColor: 'white',
        title : {
          text: '流量分布:',
          left: 'left',
          textStyle : {
            color: 'black'
          }
        },
        legend: {
          orient: 'vertical',
          top: 'bottom',
          right: '20',
          data:['南基', '东莞'],
          textStyle: {
            color: 'black'
          }
        },
        visualMap:{
          min: 0,
          left:'0',
          max: 100,
          show: false,
          inRange: {
            color: ['#FF6E87','#CF72E8','#988AFF','#72AFE8','#7DFFE9']
          }
        },
        geo: {
          map: 'china',
          roam: false,
          zoom:1.23
        },
        series: series
      };
      echart.setOption(option);
    }
    cons
    function secondEchar(){
      var myChart = echarts.init(document.getElementById('bbb'));
      var option = {
            title: {
                text: 'MQ展示:'
            },
            tooltip: {},
            legend: {
                data:['南基队列数','东莞队列数']
            },
            xAxis: {
                data: [],
            },
            yAxis: {},
            series: [
            {
                name: '南基队列数',
                type: 'bar',
                data: [],
                itemStyle:{  
                           normal:{color:'#FF6666'}  
                          }          
            },
            {
                name: '东莞队列数',
                type: 'bar',
                data: [],
                itemStyle:{  
                           normal:{color:'#00FFCC'}  
                          }  
            }

            ]
        };
        njData(option);
        dgData(option);


        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

    }
    function njData(option){
      var params1=[];     
          params1.push(MQMessage.data.njQueueCount);      
          option.series[0].data = params1;
    }

    function dgData(option){
      var params2=[];        
          params2.push(MQMessage.data.dgQueueCount);         
          option.series[1].data = params2;
    }

        function start(){ 
                
            var url='/inspection/array/change';
            var name = '0';
             httpServe.post(url,name).then(function(res){
                  if(res.state === 'opensuccess'){
                  
                  }             
             });
            $('#btn_s').attr('disabled','disabled');
            $('#btn_c').removeAttr('disabled')
          }

          function close(){
            var url='/inspection/array/changeoff';
            var name='1';
            $('#loading-4').show();
            httpServe.post(url,name).then(function(res){
                if(res.state === 'success'){
                   $('#loading-4').hide();                  
                }else if(res.state === 'fail'){
                  $('#loading-4').show();
                  close();
                }
            })
              $('#btn_c').attr('disabled','disabled');
              $('#btn_s').removeAttr('disabled')
          }


    function planOut(){
      $("#planOutModal").modal("show");
      
    }
    function colseModal(){
      $("#planOutModal").modal("hide");
      scheme.center = "";
    }
    //获取输入数据 
    function getScheme(itme){
      submitData.center = itme;
   
    }

    function submitaa(){
      var url = '/switch/outsideSwitch';
            
            if (submitData !== undefined) {
                var loa=document.getElementById("loading_2");
                  loa.style.display="block";
                httpServe.post(url, JSON.stringify(submitData)).then(function (res) {
                if (res.state === "success") {
                  angular.copy(res.time,cookieData);
                  //$cookieStore.put('cookieDatas',cookieData);//添加cookie
                  console.log(cookieData);
                  var loa=document.getElementById("loading_2");
                  loa.style.display="none";
                  promisesServe.msgBar('success',res.desc);
                  scheme.center = "";
                  setTimeout(function(){
                    $state.go('disasterRec.tmallBusDisasterSwitch');
                   /* $state.go('disasterRec.assess',{
                      'begin':cookieData.begin,'end':cookieData.end
                    });*/
                  },500);
                }else{
                  promisesServe.msgBar('warning',res.desc);
                }
              })
            }
    }

  }
  monitorSer.$inject = ['httpServe','$timeout','$interval','$state','promisesServe','$cookieStore'];
})(angular)