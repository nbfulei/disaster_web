/**
 * Created by Administrator on 2017/1/10 0010.
 */
/*容灾监控*/

//告警详情-错误详情
exports.errMessage={
    state:'success',
      data:{
        errorInfo:{
           OGG:[
            {time:'2017-1-1',info:'OGG负载过高'},
            {time:'2017-1-1',info:'OGG负载过高'},
            {time:'2017-1-1',info:'OGG负载过高'},
            {time:'2017-1-1',info:'OGG负载过高'},
            {time:'2017-1-1',info:'OGG负载过高'}
           ],
          Array:[
            {time:'2017-1-1',info:'OGG负载过高'},
            {time:'2017-1-1',info:'OGG负载过高'},
            {time:'2017-1-1',info:'OGG负载过高'},
            {time:'2017-1-1',info:'OGG负载过高'},
            {time:'2017-1-1',info:'OGG负载过高'}
           ],
          data:[
            {time:'2017-1-1',info:'OGG负载过高'},
            {time:'2017-1-1',info:'OGG负载过高'},
            {time:'2017-1-1',info:'OGG负载过高'},
            {time:'2017-1-1',info:'OGG负载过高'},
            {time:'2017-1-1',info:'OGG负载过高'}
           ]
        }        
  }
};
  //南基
exports.NJ={
    state:'success',
    data:{
      disk:'39',
      cpu:'56',
      io:'94',
      memory:'82'
    }

  };

//东莞
exports.DG={
    state:'success',
    data:{
      disk:'49',
      cpu:'90',
      io:'45',
      memory:'75'
    }

 };
 //MQ信息
exports.MQMessage={
    state:'success',
    data:{
        njQueueCount:18000,
        dgQueueCount:5000
    }
          
                            
  };
    /*系统运行日志 */
exports.runLog= {
  state:'success',
  data:{
    totalCount:20,
    datas:[
    {
      id:1,
      executionTime:'INFO',
      instance:'2017-1-1',
      checkResult:'instance%',
      info:'111',
      remark:'111'

    },
    {
      id:2,
      executionTime:'INFO',
      instance:'2017-1-1',
      checkResult:'instance%',
      info:'111',
      remark:'111'
    },
    {
      id:3,
      executionTime:'INFO',
      instance:'2017-1-1',
      checkResult:'instance%',
      info:'111',
      remark:'111'
    },
    {
      id:4,
      executionTime:'INFO',
      instance:'2017-1-1',
      checkResult:'instance%',
      info:'111',
      remark:'111'
    },
    {
      id:5,
      executionTime:'INFO',
      instance:'2017-1-1',
      checkResult:'instance%',
      info:'111',
      remark:'111'
    }
    ]
      }
};
exports.regionalInfo={
    state:'success',
      data:{  
           GZData:[
            {baseName:'南基',regionName:'西部'},
            {baseName:'南基',regionName:'华南'},
            {baseName:'南基',regionName:'华北'},
           ],
           DGData:[
            {baseName:'东莞',regionName:'华东'},
            {baseName:'东莞',regionName:'中部'},
 
           ]
                
  }
};

exports.historySwitch={
    state:'success',
      
        data:[
        {         
        currentStage:12121,
        switchBeginTime:1212,
         switchEndTime:212121,
        statusDesc:212121
       },
           {         
        currentStage:12121,
        switchBeginTime:1212,
         switchEndTime:212121,
        statusDesc:212121
       },
           {         
        currentStage:12121,
        switchBeginTime:1212,
         switchEndTime:212121,
        statusDesc:212121
       },
           {         
        currentStage:12121,
        switchBeginTime:1212,
         switchEndTime:212121,
        statusDesc:212121
       },
           {         
        currentStage:12121,
        switchBeginTime:1212,
         switchEndTime:212121,
        statusDesc:212121
       },
           {         
        currentStage:12121,
        switchBeginTime:1212,
         switchEndTime:212121,
        statusDesc:212121
       },
           {         
        currentStage:12121,
        switchBeginTime:1212,
         switchEndTime:212121,
        statusDesc:212121
       }
 
        ]
                
  
};