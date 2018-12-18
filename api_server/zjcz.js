/**
 * Created by Administrator on 2017/2/27 0027.
 */
exports.InstanceType={
  state:'success',
  desc:'',
  data:[
    {id:17,name:'052'},
    {id:16,name:'05'},
    {id:15,name:'057'}
  ]
};
exports.Components={
  state:'success',
  desc:'',
  data:[
    {id:11,name:'组件1'},
    {id:12,name:'组件05'},
    {id:13,name:'组件057'}
  ]
};
exports.fuletextsearch={
  state:'success',
  desc:'',
  data:[
      {
        id:1,status:'00',hostName:'452',ip:'101.11.113.112',
        instances:[
                    {id:'111',name:'tdsfdsfsdfdsfdsfsom',insMonitorStatus:'00'},
                    {id:'111',name:'tom',insMonitorStatus:'01'},
                    {id:'111',name:'tom',insMonitorStatus:'02'}],
        cpuUsage:30,cpuCores:10,cpuHZ:20,remark:'备注',memUsage:30.1,memSize:160,diskUsage:30.2,diskSize:500
      },{
        id:2,status:'00',hostName:'123',ip:'102.12.113.112',
      instances:[
                {id:'111',name:'tom',insMonitorStatus:'01'}],
          cpuUsage:30,cpuCores:10,cpuHZ:20,remark:'备注', memUsage:60.1,memSize:160000.1,diskUsage:30.2,diskSize:50000
      },{
        id:3,status:'00',hostName:'234',ip:'103.13.113.112',
      instances:[{
        id:'111',name:'tom',insMonitorStatus:'01'}],
      cpuUsage:30,cpuCores:10,cpuHZ:20,remark:'备注',machine:{id:02,name:'毫升'}, memUsage:30.2,memSize:160,diskUsage:90,diskSize:500
    },{
      id:4,status:'00',hostName:'345',ip:'104.14.113.112',
      instances:[
        {id:'111',name:'tom',insMonitorStatus:'01'}],
      cpuUsage:30,cpuCores:10,cpuHZ:20,remark:'备注',memUsage:90,memSize:160,diskUsage:30,diskSize:500
    },{
      id:5,status:'01',hostName:'456',ip:'105.15.113.112',
      instances:[
          {id:'111',name:'tom',insMonitorStatus:'01'},
          {id:'111',name:'tom',insMonitorStatus:'01'},
          {id:'111',name:'tom',insMonitorStatus:'01'}],
      cpuUsage:30.5,cpuCores:10,cpuHZ:20,remark:'备注备注备注备注备注', memUsage:30,memSize:160,diskUsage:30,diskSize:500
    },{
        id:6,status:'00',hostName:'567',ip:'106.16.113.112',
      instances:[
        {id:'111',name:'tom',insMonitorStatus:'01'}],
      cpuUsage:30,cpuCores:10,cpuHZ:20,remark:'备注',memUsage:60,memSize:160,diskUsage:30,diskSize:500
    },{id:7,status:'02',hostName:'789',ip:'107.17.113.112',
      instances:[
        {id:'111',name:'tom',insMonitorStatus:'01'}],
      cpuUsage:20,cpuCores:10,cpuHZ:20,remark:'备注',machine:{id:02,name:'毫升'}, memUsage:30,memSize:160,diskUsage:30,diskSize:500
    },{
      id:8,status:'01',hostName:'890',ip:'108.15.113.112',
      instances:[
          {id:'111',name:'tom',insMonitorStatus:'01'},
          {id:'111',name:'tom',insMonitorStatus:'01'},
          {id:'111',name:'tom',insMonitorStatus:'02'}
    ],
      cpuUsage:30,cpuCores:10,cpuHZ:20,remark:'备注',memUsage:30,memSize:160,diskUsage:30,diskSize:500
    },{
      id:9,status:'00',hostName:'901',ip:'109.16.901.012',
      instances:[{id:'111',name:'tom',insMonitorStatus:'01'}],
      cpuUsage:30,cpuCores:10,cpuHZ:20,remark:null, memUsage:60,memSize:160,diskUsage:30,diskSize:500
    },{
      id:10,status:'02',hostName:'012',ip:'110.17.113.112',
      instances:[{id:'111',name:'tom',insMonitorStatus:'01'}],
      cpuUsage:10,cpuCores:10,cpuHZ:20,remark:'备注',machine:{id:02,name:'毫升'},memUsage:30,memSize:160,diskUsage:30,diskSize:500
    }, {
      id:11,status:'02',hostName:'NO1',ip:'111.17.113.112',
      instances:[{id:'111',name:'tom',insMonitorStatus:'01'}],
      cpuUsage:10,cpuCores:10,cpuHZ:20,remark:'备注', memUsage:30,memSize:160,diskUsage:30,diskSize:500
    }

    ]
};
exports.search={
  state:'success',
  desc:'',
  data:{id:3,status:'02',hostName:'NO1',ip:'118.17.113.112',
    instances:[
      {id:'111',name:'tom',status:'01'},
      {id:'111',name:'tom',status:'01'},
      {id:'111',name:'tom',status:'02'}
    ],

    cpuUsage:50,cpuCores:10, memUsage:30,memSize:160,diskUsage:30,diskSize:500,
    cpuHZ:20, machine:{id:02,name:520},remark:'dfdsf',
    cpus:[
      {
        insId:1,
        insTypeName: "tomcat",
      insName: "tomcat2",
      remark: "CPU是什么",
      cpuCores:0.5
      },
      {
        insId:1,
        insTypeName: "tomcat",
        insName: "tomcat1",
        remark: "是什么",
        cpuCores:0.6
      }
    ],
    mems: [
      {
        insId:1,
      insTypeName: "tomcat",
      insName: "tomcat",
      remark: "堆内存 栈内存",
      memUsage: "88"
      },
      {
        insId:1,
        insTypeName: "tomcat",
        insName: "tomcat",
        remark: "栈内存",
        memUsage: "89"
      }
    ],
    ports: [
      {   //端口列表list
        insId:1,
      insTypeName: "tomcat",
      insName: "tomcat",
      remark: " WEB端口",
      portNum: "8088"
      },
      {   //端口列表list
        insId:2,
        insTypeName: "tomcat1",
        insName: "tomcat1",
        remark: " WEB端口1",
        portNum: "8089"
      },
      {   //端口列表list
        insId:3,
        insTypeName: "tomcat1",
        insName: "tomcat1",
        remark: " WEB端口1",
        portNum: "8089"
      }
    ]
  }
};
exports.echartsData={
  state:'success',
  desc:'',
  data:{
    cpuUsage:[10,20,30,40,50,60,70,20,50,10],
    cpuTime:['2009/6/12 2:00', '2009/6/12 3:00', '2009/6/12 4:00', '2009/6/12 5:00', '2009/6/12 6:00',
      '2009/6/12 7:00', '2009/6/12 8:00', '2009/6/12 9:00', '2009/6/12 10:00', '2009/6/12 11:00'],
    diskUsage:[70,20,50,10,10,20,30,40,50,60],
    diskUsageTime:['2009/6/12 2:00', '2009/6/12 3:00', '2009/6/12 4:00', '2009/6/12 5:00', '2009/6/12 6:00',
      '2009/6/12 7:00', '2009/6/12 8:00', '2009/6/12 9:00', '2009/6/12 10:00', '2009/6/12 11:00'],
    memUsage:[40,50,60,10,20,30,70,20,50,10],
    memTime:['2009/6/12 2:00', '2009/6/12 3:00', '2009/6/12 4:00', '2009/6/12 5:00', '2009/6/12 6:00',
      '2009/6/12 7:00', '2009/6/12 8:00', '2009/6/12 9:00', '2009/6/12 10:00', '2009/6/12 11:00']
  }
};
exports.echartsData1={
  state:'success',
  desc:'',
  data:{
    cpuUsage:[20,30,40,50,60,70,80,30,60,20],
    cpuTime:['2009/6/13 2:00', '2009/6/13 3:00', '2009/6/13 4:00', '2009/6/13 5:00', '2009/6/13 6:00',
      '2009/6/13 7:00', '2009/6/13 8:00', '2009/6/13 9:00', '2009/6/13 10:00', '2009/6/13 11:00'],
    diskUsage:[70,20,50,10,10,20,30,40,50,60],
    diskUsageTime:['2009/6/13 2:00', '2009/6/13 3:00', '2009/6/13 4:00', '2009/6/13 5:00', '2009/6/13 6:00',
      '2009/6/13 7:00', '2009/6/13 8:00', '2009/6/13 9:00', '2009/6/13 10:00', '2009/6/13 11:00'],
    memUsage:[40,50,60,10,20,30,70,20,50,10],
    memTime:['2009/6/13 2:00', '2009/6/13 3:00', '2009/6/13 4:00', '2009/6/13 5:00', '2009/6/13 6:00',
      '2009/6/13 7:00', '2009/6/13 8:00', '2009/6/13 9:00', '2009/6/13 10:00', '2009/6/13 11:00']
  }
};
exports.echartsData2={
  state:'success',
  desc:'',
  data:{
    cpuUsage:[20,30,40,50,60,70,80,30,60,20],
    cpuTime:['2009/6/13 2:00', '2009/6/13 3:00', '2009/6/13 4:00', '2009/6/13 5:00', '2009/6/13 6:00',
      '2009/6/13 7:00', '2009/6/13 8:00', '2009/6/13 9:00', '2009/6/13 10:00', '2009/6/13 11:00'],
    diskUsage:[70,20,50,10,10,20,30,40,50,60],
    diskUsageTime:['2009/6/13 2:00', '2009/6/13 3:00', '2009/6/13 4:00', '2009/6/13 5:00', '2009/6/13 6:00',
      '2009/6/13 7:00', '2009/6/13 8:00', '2009/6/13 9:00', '2009/6/13 10:00', '2009/6/13 11:00'],
    memUsage:[40,50,60,10,20,30,70,20,50,10],
    memTime:['2009/6/13 2:00', '2009/6/13 3:00', '2009/6/13 4:00', '2009/6/13 5:00', '2009/6/13 6:00',
      '2009/6/13 7:00', '2009/6/13 8:00', '2009/6/13 9:00', '2009/6/13 10:00', '2009/6/13 11:00']
  }
};
exports.echartsData3={
  state:'success',
  desc:'',
  data:{
    cpuUsage:[20,30,40,50,60,70,80,30,60,20],
    cpuTime:['2009/6/13 2:00', '2009/6/13 3:00', '2009/6/13 4:00', '2009/6/13 5:00', '2009/6/13 6:00',
      '2009/6/13 7:00', '2009/6/13 8:00', '2009/6/13 9:00', '2009/6/13 10:00', '2009/6/13 11:00'],
    diskUsage:[70,20,50,10,10,20,30,40,50,60],
    diskUsageTime:['2009/6/13 2:00', '2009/6/13 3:00', '2009/6/13 4:00', '2009/6/13 5:00', '2009/6/13 6:00',
      '2009/6/13 7:00', '2009/6/13 8:00', '2009/6/13 9:00', '2009/6/13 10:00', '2009/6/13 11:00'],
    memUsage:[40,50,60,10,20,30,70,20,50,10],
    memTime:['2009/6/13 2:00', '2009/6/13 3:00', '2009/6/13 4:00', '2009/6/13 5:00', '2009/6/13 6:00',
      '2009/6/13 7:00', '2009/6/13 8:00', '2009/6/13 9:00', '2009/6/13 10:00', '2009/6/13 11:00']
  }
};
exports.echartsData4={
  state:'success',
  desc:'',
  data:{
    cpuUsage:[20,30,40,50,60,70,80,30,60,20],
    cpuTime:['2009/6/13 2:00', '2009/6/13 3:00', '2009/6/13 4:00', '2009/6/13 5:00', '2009/6/13 6:00',
      '2009/6/13 7:00', '2009/6/13 8:00', '2009/6/13 9:00', '2009/6/13 10:00', '2009/6/13 11:00'],
    diskUsage:[70,20,50,10,10,20,30,40,50,60],
    diskUsageTime:['2009/6/13 2:00', '2009/6/13 3:00', '2009/6/13 4:00', '2009/6/13 5:00', '2009/6/13 6:00',
      '2009/6/13 7:00', '2009/6/13 8:00', '2009/6/13 9:00', '2009/6/13 10:00', '2009/6/13 11:00'],
    memUsage:[40,50,60,10,20,30,70,20,50,10],
    memTime:['2009/6/13 2:00', '2009/6/13 3:00', '2009/6/13 4:00', '2009/6/13 5:00', '2009/6/13 6:00',
      '2009/6/13 7:00', '2009/6/13 8:00', '2009/6/13 9:00', '2009/6/13 10:00', '2009/6/13 11:00']
  }
};
//单个实例信息
exports.instancData={
  state:'success',
  desc:'',
  data:{
    id: "1", //实例_id
    hostId: "主机_id", //主机_id
    hostName:'No1',
    name: "tomcat", //实例名
    path: "/全路径", //实例全路径
    stopScript: "脚本名程", //实例启动脚本
    startScript: "脚本名程", //实例启动脚本
    //insStatus: "running", //实例状态:running,stopping,started,stopped
    insMonitorStatus: "02",//实例状态
    //PID: "", //实例进程ID
    //runningDate: "11天", //已运行天数
    instancesTypeId: "11" ,//组件_id
    componentId: "17", //实例类型
    status:'01'
  }
};
//单个实例日志信息
exports.journalData={
  state:'success',
  desc:'',
  data:[
    {
      journalId: "日志_id1", //实例_id
      journalName: "日志名称1", //实例名称
    fileAlias: "文件别名", //文件别名
    fileName: "文件名1", //文件名
    filePath: "文件路径1", //文件路径
    filePathTotal: "文件全路径1" //文件全路径
  },{
      journalId: "日志_id2", //实例_id
      journalName: "日志名称2", //实例名称
      fileAlias: "文件别名2", //文件别名
      fileName: "文件名2", //文件名
      filePath: "文件路径2", //文件路径
      filePathTotal: "文件全路径2" //文件全路径
    }
  ]
};

//单个实例配置信息
exports.toConfigureData={
  state:'success',
  desc:'',
  data:[
    {
      insId: "1", //实例_id
      insName: "实例名称1", //实例名称
      fileAlias: "文件别名1", //文件别名
      fileName: "文件名1", //文件名
      filePath: "文件路径1", //文件路径
      filePathTotal: "文件全路径1" //文件全路径
    },    {
      insId: "2", //实例_id
      insName: "实例名称2", //实例名称
      fileAlias: "文件别名2", //文件别名
      fileName: "文件名2", //文件名
      filePath: "文件路径2", //文件路径
      filePathTotal: "文件全路径2" //文件全路径
    }
  ]
};
exports.instancEchartsData={
  state:'success',
  desc:'',
  data:{
    insCpuUsage:[10,20,30,40,50,60,70,20,50,10],
    insCpuTime:['2009/6/12 2:00', '2009/6/12 3:00', '2009/6/12 4:00', '2009/6/12 5:00', '2009/6/12 6:00',
      '2009/6/12 7:00', '2009/6/12 8:00', '2009/6/12 9:00', '2009/6/12 10:00', '2009/6/12 11:00'],
    insDiskUsage:[70,20,50,10,10,20,30,40,50,60],
    insDiskUsageTime:['2009/6/12 2:00', '2009/6/12 3:00', '2009/6/12 4:00', '2009/6/12 5:00', '2009/6/12 6:00',
      '2009/6/12 7:00', '2009/6/12 8:00', '2009/6/12 9:00', '2009/6/12 10:00', '2009/6/12 11:00'],
    insMemUsage:[40,50,60,10,20,30,70,20,50,10],
    insMemTime:['2009/6/12 2:00', '2009/6/12 3:00', '2009/6/12 4:00', '2009/6/12 5:00', '2009/6/12 6:00',
      '2009/6/12 7:00', '2009/6/12 8:00', '2009/6/12 9:00', '2009/6/12 10:00', '2009/6/12 11:00'],
    insStatus:[40,50,60,10,20,30,70,20,50,10],
    insStatusTime:['2009/6/12 2:00', '2009/6/12 3:00', '2009/6/12 4:00', '2009/6/12 5:00', '2009/6/12 6:00',
      '2009/6/12 7:00', '2009/6/12 8:00', '2009/6/12 9:00', '2009/6/12 10:00', '2009/6/12 11:00']
  }
};
exports.logDetailsData={
  state:'success',
  desc:'',
  data:[
    {
      journalTime:'2009/6/12 2:00',//时间
      journalLevel:'INFO',//级别
      journalSource:'org.apache.hadoop.hdfs.server.datanode.DataNode.clienttrace',//源
      journalNews:'src: /192.168.0.62:55028, dest: /192.168.0.62:50010, bytes: 56, op: HDFS_WRITE, ' +
      'cliID: DFSClient_NONMAPREDUCE_407534101_67, offset: 0, srvID: aa9a1f3e-5143-4d5d-95e0-597bb6e83ec2,' +
      ' blockid: BP-1799576936-192.168.0.62-1487844136256:blk_1073757466_16642, duration: 19441599'//消息
    },
    {
      journalTime:'2009/6/12 3:00',//时间
      journalLevel:'INFO',//级别
      journalSource:'org.apache.hadoop.hdfs.server.datanode.DataNode.clienttrace',//源
      journalNews:'src: /192.168.0.62:55028, dest: /192.168.0.62:50010, bytes: 56, op: HDFS_WRITE, ' +
      'cliID: DFSClient_NONMAPREDUCE_407534101_67, offset: 0, srvID: aa9a1f3e-5143-4d5d-95e0-597bb6e83ec2,' +
      ' blockid: BP-1799576936-192.168.0.62-1487844136256:blk_1073757466_16642, duration: 19441599'//消息
    }
  ]
};
exports.journalData1={
  state:'success',
  desc:'',
  data:
    {
      journalTime:'2009/6/12 2:00',//时间
      journalLevel:'INFO',//级别
      journalSource:'org.apache.hadoop.hdfs.server.datanode.DataNode.clienttrace',//源
      journalNews:'src: /192.168.0.62:55028, dest: /192.168.0.62:50010, bytes: 56, op: HDFS_WRITE, ' +
      'cliID: DFSClient_NONMAPREDUCE_407534101_67, offset: 0, srvID: aa9a1f3e-5143-4d5d-95e0-597bb6e83ec2,' +
      ' blockid: BP-1799576936-192.168.0.62-1487844136256:blk_1073757466_16642, duration: 19441599'//消息
    }
};
exports.journalData2={
  state:'success',
  desc:'',
  data:
  {
    journalTime:'2009/6/12 2:00',//时间
    journalLevel:'INFO',//级别
    journalSource:'org.apache.hadoop.hdfs.server.datanode.DataNode.clienttrace',//源
    journalNews:'src: /192.168.0.62:55028, dest: /192.168.0.62:50010, bytes: 56, op: HDFS_WRITE, ' +
    'cliID: DFSClient_NONMAPREDUCE_407534101_67, offset: 0, srvID: aa9a1f3e-5143-4d5d-95e0-597bb6e83ec2,' +
    ' blockid: BP-1799576936-192.168.0.62-1487844136256:blk_1073757466_16642, duration: 19441599'//消息
  }
};
exports.journalData3={
  state:'success',
  desc:'',
  data:
  {
    journalTime:'2009/6/12 2:00',//时间
    journalLevel:'INFO',//级别
    journalSource:'org.apache.hadoop.hdfs.server.datanode.DataNode.clienttrace',//源
    journalNews:'src: /192.168.0.62:55028, dest: /192.168.0.62:50010, bytes: 56, op: HDFS_WRITE, ' +
    'cliID: DFSClient_NONMAPREDUCE_407534101_67, offset: 0, srvID: aa9a1f3e-5143-4d5d-95e0-597bb6e83ec2,' +
    ' blockid: BP-1799576936-192.168.0.62-1487844136256:blk_1073757466_16642, duration: 19441599'//消息
  }
};
exports.journalData4={
  state:'success',
  desc:'',
  data:
  {
    journalTime:'2009/6/12 2:00',//时间
    journalLevel:'INFO',//级别
    journalSource:'org.apache.hadoop.hdfs.server.datanode.DataNode.clienttrace',//源
    journalNews:'src: /192.168.0.62:55028, dest: /192.168.0.62:50010, bytes: 56, op: HDFS_WRITE, ' +
    'cliID: DFSClient_NONMAPREDUCE_407534101_67, offset: 0, srvID: aa9a1f3e-5143-4d5d-95e0-597bb6e83ec2,' +
    ' blockid: BP-1799576936-192.168.0.62-1487844136256:blk_1073757466_16642, duration: 19441599'//消息
  }
};
exports.hostWLId={
  state:'success',
  desc:'',
  data:[
  {id:201,name:'201'},
  {id:202,name:'202'},
  {id:203,name:'203'},
  {id:204,name:'204'},
  ]
};
exports.toConfigureData={
  state:'success',
  desc:'',
  data:[
  {fileAlias:'hibernate配置文件',fileName:'hibernate.cfg.xml',filePath:'D:configFile/hibernate.cfg.xml'},
  {fileAlias:'Spring配置文件',fileName:'applicationContext.xml',filePath:'D:configFile/applicationContext.xml'},
  {fileAlias:'系统配置文件',fileName:'system.cfg.xml',filePath:'D:configFile/system.cfg.xml'},
  {fileAlias:'应用配置文件',fileName:'application.cfg.xml',filePath:'D:configFile/application.cfg.xml'}
  ]
};
exports.ItemFile={
  state:'success',
  desc:'',
  data:{
    id:15,
    configureFileId:26,
    items:[{key:'key1',val:'va1'},{key:'key2',val:'hibernate.cfg.xml'},{key:'key3',val:'D:configFile/hibernate.cfg.xml'}]
  }

};
exports.filer= {
  state: 'success',
  desc: '',
  data: {
    files:['1.doc','2.exe'],
    dirs:['/fal','/home'],
    msg:''
  }
};
exports.journal={
  state: 'success',
  desc: '',
  data:'ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'
}
