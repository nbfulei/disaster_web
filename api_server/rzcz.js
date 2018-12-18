/**
 * Created by Administrator on 2017/1/10 0010.
 */
/*容灾操作*/
/*exports.provinceColonyMessages = {
  state:'success',
  message:[
        {
          id:'1',
          province:'湖南',
          Colony:'华南',
          Colonys:['华南','华北','东南','西南','华中','华西']
          
         },
         {
          id:'2',
          province:'湖北',
          Colony:'华北',
          Colonys:['华南','华北','东南','西南','华中','华西']
         },
         {  
          id:'3',
          province:'河南',
          Colony:'东南',
          Colonys:['华南','华北','东南','西南','华中','华西']
         },
         {
          id:'4',
          province:'浙江',
          Colony:'东南',
          Colonys:['华南','华北','东南','西南','华中','华西']
         },
         {
          id:'5',
          province:'上海',
          Colony:'东南',
          Colonys:['华南','华北','东南','西南','华中','华西']
         },
         {
          id:'6',
          province:'南京',
          Colony:'华中',
          Colonys:['华南','华北','东南','西南','华中','华西']
         },
         {
          id:'7',
          province:'北京',
          Colony:'华北',
          Colonys:['华南','华北','东南','西南','华中','华西']
         },
         {
          id:'8',
          province:'江西',
          Colony:'华北',
          Colonys:['华南','华北','东南','西南','华中','华西']
         }
  ]
}*/
//当前流量信息
exports.flowMessage = {
  state:'success',
  data:
            {
              southCenter:['华南','华东','华北'],
              DGCenter:['中部','西部']
            }
}
//MQ消息
exports.mqMessages = {
  state:'success',
  data:[
               {
      
      region:'华北+东北',
      queueCount:1200,
      remarks:'A'
    },
              {
      
      region:'华东+华南',
      queueCount:1103,
      remarks:'AA'
    },
              {
   
      region:'东南',
      queueCount:12000,
      remarks:'B'
    },
             {
      
      region:'浙江',
      queueCount:1200,
      remarks:'A'
    },
             {
      
      region:'西北',
      queueCount:14000,
      remarks:'C'
    }
            ]
}
//备中心主机 信息
exports.spareHostComputerMessages = {
  state:'success',
  data:{
    totalCount:20,
    datas:[
               {
      hostName:'1',
      cpuUsage:'100%',
      memoryUsage:'30%',
      diskSpace:'60%'
    },
    {
      hostName:'2',
      cpuUsage:'99%',
      memoryUsage:'40%',
      diskSpace:'88%'
    },
    {
      hostName:'3',
      cpuUsage:'50%',
      memoryUsage:'60%',
      diskSpace:'55%'
    },
    {
      hostName:'4',
      cpuUsage:'48%',
      memoryUsage:'100%',
      diskSpace:'60%'
    },
    {
      hostName:'5',
      cpuUsage:'55%',
      memoryUsage:'99%',
      diskSpace:'44%'
    }
            ]
  }
}
//主中心主机
exports.hostComputerMessages = {
  state:'success',
  data:{
    totalCount:20,
    datas:[
               {
      hostName:'1',
      cpuUsage:'100%',
      memoryUsage:'30%',
      diskSpace:'60%'
    },
    {
      hostName:'2',
      cpuUsage:'99%',
      memoryUsage:'40%',
      diskSpace:'88%'
    },
    {
      hostName:'3',
      cpuUsage:'50%',
      memoryUsage:'60%',
      diskSpace:'55%'
    },
    {
      hostName:'4',
      cpuUsage:'48%',
      memoryUsage:'100%',
      diskSpace:'60%'
    },
    {
      hostName:'5',
      cpuUsage:'55%',
      memoryUsage:'99%',
      diskSpace:'44%'
    }
            ]
  }
}
//主中心网络
exports.interStateMessages = {
  state:'success',
  data:{
    totalCount:20,
    datas:[
               {
      equipmentName:'1',
      broadband:'20M',
      packetLossRate:'50%',
      ioInspect:'A'
    },
              {
      equipmentName:'2',
      broadband:'20M',
      packetLossRate:'40%',
      ioInspect:'A'
    },
              {
      equipmentName:'3',
      broadband:'20M',
      packetLossRate:'60%',
      ioInspect:'A'
    },
            {
      equipmentName:'4',
      broadband:'20M',
      packetLossRate:'50%',
      ioInspect:'A'
    },
             {
      equipmentName:'5',
      broadband:'20M',
      packetLossRate:'50%',
      ioInspect:'A'
    }
            ]
  }
}
//主中心应用
exports.applianceMessages = {
  state:'success',
  data:{
    totalCount:20,
     datas:[
               {
      appName:'1',
      runState:'正常',
      dataBaseInspect:'正常'
    },
   {
      appName:'2',
      runState:'异常',
      dataBaseInspect:'正常'
    },
   {
      appName:'3',
      runState:'正常',
      dataBaseInspect:'异常'
    },
   {
      appName:'4',
      runState:'正常',
      dataBaseInspect:'正常'
    },
   {
      appName:'5',
      runState:'正常',
      dataBaseInspect:'正常'
    }
            ]
  }
}
//备中心 应用
exports.spareApplianceMessages = {
  state:'success',
  data:{
    totalCount:20,
    datas:[
               {
      appName:'1',
      runState:'正常',
      dataBaseInspect:'正常'
    },
   {
      appName:'2',
      runState:'异常',
      dataBaseInspect:'正常'
    },
   {
      appName:'3',
      runState:'正常',
      dataBaseInspect:'异常'
    },
   {
      appName:'4',
      runState:'正常',
      dataBaseInspect:'正常'
    },
   {
      appName:'5',
      runState:'正常',
      dataBaseInspect:'正常'
    }
            ]
  }
}
//备中心网络
exports.spareInterStateMessages = {
  state:'success',
  data:{
    totalCount:20,
    datas:[
               {
      equipmentName:'1',
      broadband:'20M',
      packetLossRate:'50%',
      ioInspect:'A'
    },
              {
      equipmentName:'2',
      broadband:'20M',
      packetLossRate:'40%',
      ioInspect:'A'
    },
              {
      equipmentName:'3',
      broadband:'20M',
      packetLossRate:'60%',
      ioInspect:'A'
    },
            {
      equipmentName:'4',
      broadband:'20M',
      packetLossRate:'50%',
      ioInspect:'A'
    },
             {
      equipmentName:'5',
      broadband:'20M',
      packetLossRate:'50%',
      ioInspect:'A'
    }
            ]
  }
}

//切换历史
exports.batToShow = {
  state:'success',
  data:{
    totalCount:20,
    datas:[
        {
          historyTime:'2014-10-01',
          switchType:'手动',
          switchResult:'成功',
          southCenter:['华南','华东','华北'],
          dgCenter:['中部','西部']
        },
        {
          historyTime:'2015-05-01',
          switchType:'手动',
          switchResult:'成功',
          southCenter:['华南','华东','华北'],
          dgCenter:['中部','西部']
        },
        {
          historyTime:'2015-10-01',
          switchType:'手动',
          switchResult:'成功',
          southCenter:['华南','华东','华北'],
          dgCenter:['中部','西部']
        },
        {
          historyTime:'2016-05-01',
          switchType:'手动',
          switchResult:'成功',
          southCenter:['华南','华东','华北'],
          dgCenter:['中部','西部']
        },
        {
          historyTime:'2016-10-21',
          switchType:'手动',
          switchResult:'成功',
          southCenter:['华南','华东','华北'],
          dgCenter:['中部','西部']
        },
        {
          historyTime:'2016-12-25',
          switchType:'手动',
          switchResult:'成功',
          southCenter:['华南','华东','华北'],
          dgCenter:['中部','西部']
        }
  ]
  }
  
}
//主备 对比
exports.mystatus={
  state:'success',
  data:[
        {id:'1',comp:'差异项一',hC:'66',standby:'10'},
        {id:'2',comp:'差异项二',hC:'55',standby:'20'},
        {id:'3',comp:'差异项三',hC:'44',standby:'30'},
        {id:'4',comp:'差异项四',hC:'33',standby:'40'}
  ]
};

/*容灾操作新*/
//主中心
//主中心主机
exports.hostComputerMessage_new = {
  state:'success',
  data:{
    totalCount:100,
    datas:[
               {
      hostIP:'192.1=',
      cpuLoad:'ss',
      memoryLoad:'dd',
      diskLoad:'ff',
      ioLoad:'aa',
      processCenter:'主',
      state:'alarm'
    },
    {
      hostIP:'192.',
      cpuLoad:'ss',
      memoryLoad:'dd',
      diskLoad:'ff',
      ioLoad:'aa',
      processCenter:'主',
      state:'normal'
    },
    {
      hostIP:'192.16',
      cpuLoad:'ss',
      memoryLoad:'dd',
      diskLoad:'ff',
      ioLoad:'aa',
      processCenter:'主',
      state:'alarm'
    },
    {
      hostIP:'192',
      cpuLoad:'ss',
      memoryLoad:'dd',
      diskLoad:'ff',
      ioLoad:'aa',
      processCenter:'主',
      state:'normal'
    },
    {
      hostIP:'192.16',
      cpuLoad:'ss',
      memoryLoad:'dd',
      diskLoad:'ff',
      ioLoad:'aa',
      processCenter:'主',
      state:'warning'
    }
            ]
  }
}

//主中心应用
exports.applianceMessage_new = {
  state:'success',
  data:{
    totalCount:100,
     datas:[
               {
      appName:'1',
      runState:'正常',
      dataBaseInspect:'正常',
      state:'normal'
    },
   {
      appName:'2',
      runState:'正常',
      dataBaseInspect:'正常',
      state:'normal'
    },
   {
      appName:'3',
      runState:'正常',
      dataBaseInspect:'正常',
      state:'warning'
    },
   {
      appName:'4',
      runState:'正常',
      dataBaseInspect:'正常',
      state:'normal'
    },
   {
      appName:'5',
      runState:'正常',
      dataBaseInspect:'正常',
      state:'alarm'
    }
            ]
  }
}
//主中心网络
exports.interStateMessage_new = {
  state:'success',
  data:{
    totalCount:100,
    datas:[
               {
      id:'11',
      ping:'20',
      frameLossRate:'50%',
      ioInspect:'A',
      state:'warning'
    },
              {
      id:'11',
      ping:'20',
      frameLossRate:'50%',
      ioInspect:'A',
      state:'normal'
    },
              {
      id:'11',
      ping:'20',
      frameLossRate:'50%',
      ioInspect:'A',
      state:'alarm'
    },
            {
      id:'11',
      ping:'20',
      frameLossRate:'50%',
      ioInspect:'A',
      state:'normal'
    },
             {
      id:'11',
      ping:'20',
      frameLossRate:'50%',
      ioInspect:'A',
      state:'alarm'
    }
            ]
  }
}
//告警状态
exports.giveAnlarmState = {
  state:'success',
  data:{
    totalCount:100,
    datas:[
               {
      id_:'1',
      giveAnlarmType:'AA',
      giveAnlarmDetail:'BB',
      state:'normal'
    },
              {
      id_:'1',
      giveAnlarmType:'AA',
      giveAnlarmDetail:'BB',
      state:'normal'
    },
              {
      id_:'1',
      giveAnlarmType:'AA',
      giveAnlarmDetail:'BB',
      state:'normal'
    },
            {
      id_:'1',
      giveAnlarmType:'AA',
      giveAnlarmDetail:'BB',
      state:'warning'
    },
             {
      id_:'1',
      giveAnlarmType:'AA',
      giveAnlarmDetail:'BB',
      state:'alarm'
    }
            ]
  }
}

//备中心主机 信息
exports.spareHostComputerMessage_new = {
  state:'success',
  data:{
    totalCount:100,
    datas:[
               {
      hostIP:'192.16',
      cpuLoad:'ss',
      memoryLoad:'dd',
      diskLoad:'ff',
      ioLoad:'aa',
      processCenter:'备',
      state:'normal'
    },
    {
      hostIP:'192.16',
      cpuLoad:'ss',
      memoryLoad:'dd',
      diskLoad:'ff',
      ioLoad:'aa',
      processCenter:'备',
      state:'alarm'
    },
    {
      hostIP:'192.16',
      cpuLoad:'ss',
      memoryLoad:'dd',
      diskLoad:'ff',
      ioLoad:'aa',
      processCenter:'备',
      state:'normal'
    },
    {
      hostIP:'192.16',
      cpuLoad:'ss',
      memoryLoad:'dd',
      diskLoad:'ff',
      ioLoad:'aa',
      processCenter:'备',
      state:'warning'
    },
    {
      hostIP:'192.16',
      cpuLoad:'ss',
      memoryLoad:'dd',
      diskLoad:'ff',
      ioLoad:'aa',
      processCenter:'备',
      state:'normal'
    }
            ]
  }
}

//备中心应用
exports.spareApplianceMessage_new = {
  state:'success',
  data:{
    totalCount:100,
     datas:[
               {
      appName:'12',
      runState:'正常',
      dataBaseInspect:'正常',
      state:'normal'
    },
   {
      appName:'13',
      runState:'正常',
      dataBaseInspect:'正常',
      state:'normal'
    },
   {
      appName:'14',
      runState:'正常',
      dataBaseInspect:'正常',
      state:'normal'
    },
   {
      appName:'15',
      runState:'正常',
      dataBaseInspect:'正常',
      state:'warning'
    },
   {
      appName:'16',
      runState:'正常',
      dataBaseInspect:'正常',
      state:'alarm'
    }
            ]
  }
}
//备中心网络
exports.spareInterStateMessage_new = {
  state:'success',
  data:{
    totalCount:100,
    datas:[
              {
      id:'112',
      ping:'20',
      frameLossRate:'50%',
      ioInspect:'A',
      state:'normal'
    },
              {
      id:'113',
      ping:'20',
      frameLossRate:'50%',
      ioInspect:'A',
      state:'normal'
    },
              {
      id:'114',
      ping:'20',
      frameLossRate:'50%',
      ioInspect:'A',
      state:'warning'
    },
            {
      id:'115',
      ping:'20',
      frameLossRate:'50%',
      ioInspect:'A',
      state:'alarm'
    },
            {
      id:'115',
      ping:'20',
      frameLossRate:'50%',
      ioInspect:'A',
      state:'normal'
    }
            ]
  }
}
//备中心 告警状态
exports.spareGiveAnlarmState = {
  state:'success',
  data:{
    totalCount:100,
    datas:[
               {
      id_:'1',
      giveAnlarmType:'AA',
      giveAnlarmDetail:'BB'
    },
              {
      id_:'1',
      giveAnlarmType:'AA',
      giveAnlarmDetail:'BB'
    },
              {
      id_:'1',
      giveAnlarmType:'AA',
      giveAnlarmDetail:'BB'
    },
            {
      id_:'1',
      giveAnlarmType:'AA',
      giveAnlarmDetail:'BB'
    },
             {
      id_:'1',
      giveAnlarmType:'AA',
      giveAnlarmDetail:'BB'
    }
            ]
  }
}
//容灾状态 数据库复制状态
exports.dataBaseCopyStateMessage = {
  state:'success',
  data:{
    totalCount:100,
    datas:[
               {
      regionCHName:'华东',
      NJ_DG:'ABENDED',
      DG_NJ:'ABENDED'
    },
              {
      regionCHName:'华北',
      NJ_DG:'STOPPED',
      DG_NJ:'RUNNING'
    },
              {
      regionCHName:'华南',
      NJ_DG:'RUNNING',
      DG_NJ:'RUNNING'
    },
            {
      regionCHName:'华中',
      NJ_DG:'STOPPED',
      DG_NJ:'RUNNING'
    },
             {
      regionCHName:'西部',
      NJ_DG:'RUNNING',
      DG_NJ:'RUNNING'
    }
            ]
  }
}
//容灾状态 文件数据复制状态
exports.fileDataCopyStateMessage = {
  state:'success',
  data:{
    totalCount:100,
    datas:[
               {
      hostName:'ad',
      status:'STOPPER',
      delay:'1s'
    },
              {
      hostName:'ad',
      status:'RUNNING',
      delay:'1s'
    }/*,
              {
      hostName:'ad',
      status:'ss',
      delay:'1s'
    },
            {
      hostName:'ad',
      status:'ss',
      delay:'1s'
    },
             {
      hostName:'ad',
      status:'ss',
      delay:'1s'
    }*/
            ]
  }
}
//容灾状态 网络状态
exports.disasterInterStateMessage = {
  state:'success',
  data:{
    totalCount:100,
    datas:[
               {
      networkName:'1',
      delay:'20M',
      packetLoss:'50%'
    },
              {
      networkName:'1',
      delay:'20M',
      packetLoss:'50%'
    }/*,
              {
      networkName:'1',
      delay:'20M',
      packetLoss:'50%'
    },
            {
      networkName:'1',
      delay:'20M',
      packetLoss:'50%'
    },
             {
      networkName:'1',
      delay:'20M',
      packetLoss:'50%'
    }*/
            ]
  }
}

//容灾状态 告警状态
exports.disasterGiveAnlarmState = {
  state:'success',
  data:{
    totalCount:100,
    datas:[
               {
      hostName:'1',
      instance:'121',
      warnLeve:'BB',
      warnTime:'BB',
      warnContent:'OGG巡检|异常,请联系相关运维人员处理|异常信息:华北-正向复制异常开启;华东-正向复制异常开启;华南-正向复制异常开启;西部-正向复制异常开启;华北-反向复制异常关闭;华东-反向复制异常关闭;华南-反向复制异常关闭;西部-反向复制异常关闭;中部-反向复制异常关闭;'
    },
              {
      hostName:'1',
      instance:'121',
      warnLeve:'BB',
      warnTime:'BB',
      warnContent:'OGG巡检|异常,请联系相关运维人员处理|异常信息:华北-正向复制异常开启;华东-正向复制异常开启;华南-正向复制异常开启;西部-正向复制异常开启;华北-反向复制异常关闭;华东-反向复制异常关闭;华南-反向复制异常关闭;西部-反向复制异常关闭;中部-反向复制异常关闭;'
    },
              {
      hostName:'1',
      instance:'121',
      warnLeve:'BB',
      warnTime:'BB',
      warnContent:'OGG巡检|异常,请联系相关运维人员处理|异常信息:华北-正向复制异常开启;华东-正向复制异常开启;华南-正向复制异常开启;西部-正向复制异常开启;华北-反向复制异常关闭;华东-反向复制异常关闭;华南-反向复制异常关闭;西部-反向复制异常关闭;中部-反向复制异常关闭;'
    },
            {
      hostName:'1',
      instance:'121',
      warnLeve:'BB',
      warnTime:'BB',
      warnContent:'OGG巡检|异常,请联系相关运维人员处理|异常信息:华北-正向复制异常开启;华东-正向复制异常开启;华南-正向复制异常开启;西部-正向复制异常开启;华北-反向复制异常关闭;华东-反向复制异常关闭;华南-反向复制异常关闭;西部-反向复制异常关闭;中部-反向复制异常关闭;'
    },
             {
      hostName:'1',
      instance:'121',
      warnLeve:'BB',
      warnTime:'BB',
      warnContent:'OGG巡检|异常,请联系相关运维人员处理|异常信息:华北-正向复制异常开启;华东-正向复制异常开启;华南-正向复制异常开启;西部-正向复制异常开启;华北-反向复制异常关闭;华东-反向复制异常关闭;华南-反向复制异常关闭;西部-反向复制异常关闭;中部-反向复制异常关闭;'
    }
            ]
  }
}
//ogg进程配置provRegionMessage
exports.oggConfigMessage = {
  state:'success',
  data:{
    totalCount:100,
    datas:[
               {
      id:'1',
      threadName:'AA',
      regionName:'华南',
      copydirec:'正向',
      function:'ERP',
      parameter:'zz',
      deployside:'nj',
      hostIp:'192.168.1.3',
      remark:'dd'
    },
              {
      id:'2',
      threadName:'AA',
      regionName:'华北',
      copydirec:'正向',
      function:'DP',
      parameter:'zz',
      deployside:'nj',
      hostIp:'192.168.1.3',
      remark:'dd'
    },
              {
      id:'3',
      threadName:'AA',
      regionName:'华东',
      copydirec:'反向',
      function:'DP',
      parameter:'zz',
      deployside:'dg',
      hostIp:'192.168.1.3',
      remark:'dd'
    },
            {
      id:'4',
      threadName:'AA',
      regionName:'中部',
      copydirec:'正向',
      function:'EXT',
      parameter:'zz',
      deployside:'dg',
      hostIp:'192.168.1.3',
      remark:'dd'
    },
             {
      id:'5',
      threadName:'AA',
      regionName:'西部',
      copydirec:'反向',
      function:'EXT',
      parameter:'zz',
      deployside:'nj',
      hostIp:'192.168.1.3',
      remark:'dd'
    },
             {
      id:'6',
      threadName:'AA',
      regionName:'西部',
      copydirec:'反向',
      function:'EXT',
      parameter:'zz',
      deployside:'nj',
      hostIp:'192.168.1.3',
      remark:'dd'
    }/*,
             {
      id:'7',
      threadName:'AA',
      regionName:'西部',
      copydirec:'x-y',
      function:'EXT',
      parameter:'zz',
      deployside:'nj',
      hostIp:'192.168.1.3',
      remark:'dd'
    },
             {
      id:'8',
      threadName:'AA',
      regionName:'西部',
      copydirec:'x-y',
      function:'EXT',
      parameter:'zz',
      deployside:'nj',
      hostIp:'192.168.1.3',
      remark:'dd'
    },
             {
      id:'9',
      threadName:'AA',
      regionName:'西部',
      copydirec:'x-y',
      function:'EXT',
      parameter:'zz',
      deployside:'nj',
      hostIp:'192.168.1.3',
      remark:'dd'
    },
             {
      id:'10',
      threadName:'AA',
      regionName:'西部',
      copydirec:'x-y',
      function:'EXT',
      parameter:'zz',
      deployside:'nj',
      hostIp:'192.168.1.3',
      remark:'dd'
    }*/
            ]
  }
}
//省份大区配置
exports.provRegionMessage = {
  state:'success',
  data:{
    totalCount:100,
    datas:[
               {
      id:'1',
      provCode:'001',
      provName:'湖北',
      regionName:'中部'
    },
              {
      id:'2',
      provCode:'002',
      provName:'湖南',
      regionName:'中部'
    },
              {
      id:'3',
      provCode:'003',
      provName:'广东',
      regionName:'华南'
    },
            {
      id:'4',
      provCode:'004',
      provName:'广西',
      regionName:'华南'
    },
             {
      id:'5',
      provCode:'005',
      provName:'新疆',
      regionName:'西部'
    }
            ]
  }
}
//配置表操作记录
exports.operationNoteMessage = {
  state:'success',
  data:{
    datas:{
      opTableName:'a',
      opType:'b',
      opUser:'张三',
      opTime:'2017--02--28 15:23:45:556'
    }
  }
}
//机器信息
exports.machinesMessage = {
  state:'success',
  data:{
    totalCount:100,
    datas:[
               {
      id:'1',
      name:'A',
      ip:'192.168.1.1',
      area:'华东',
      rack:'DG',
      remark:'aa'
    },
              {
      id:'2',
      name:'B',
      ip:'192.168.1.1',
      area:'华南',
      rack:'NJ',
      remark:'aa'
    },
              {
      id:'3',
      name:'C',
      ip:'192.168.1.1',
      area:'华北',
      rack:'NJ',
      remark:'aa'
    },
            {
      id:'4',
      name:'D',
      ip:'192.168.1.1',
      area:'中部',
      rack:'DG',
      remark:'aa'
    },
             {
      id:'5',
      name:'E',
      ip:'192.168.1.1',
      area:'西部',
      rack:'NJ',
      remark:'aa'
    }
            ]
  }
}
exports.filer= {
  state: 'success',
  desc: '',
  data: {
    files:['1.doc','2.exe'],
    dirs:['/fal','/home'],
    msg:''
  }
};
exports.instance = {
  state:'success',
  data:{
    totalCount:100,
    datas:[
               {
      instanceName:'192',
      host:'aa1',
      state:'RUNNING'
    },{
      instanceName:'194',
      host:'aa2',
      state:'ABENDED'
    },{
      instanceName:'191',
      host:'aa3',
      state:'RUNNING'
    },{
      instanceName:'193',
      host:'aa4',
      state:'ABENDED'
    },{
      instanceName:'193',
      host:'aa4',
      state:'ABENDED'
    },{
      instanceName:'193',
      host:'aa4',
      state:'ABENDED'
    },{
      instanceName:'193',
      host:'aa4',
      state:'ABENDED'
    },{
      instanceName:'193',
      host:'aa4',
      state:'ABENDED'
    },{
      instanceName:'193',
      host:'aa4',
      state:'ABENDED'
    },{
      instanceName:'193',
      host:'aa4',
      state:'ABENDED'
    },{
      instanceName:'193',
      host:'aa4',
      state:'ABENDED'
    },{
      instanceName:'193',
      host:'aa4',
      state:'ABENDED'
    },{
      instanceName:'193',
      host:'aa4',
      state:'ABENDED'
    },{
      instanceName:'193',
      host:'aa4',
      state:'ABENDED'
    },{
      instanceName:'193',
      host:'aa4',
      state:'ABENDED'
    }
            ]
  }
}