exports.userMessage={
  state:'success',
  desc:'',
  data:{
    totalCount:50,
    datas:[
    {id:213,loginUser:'51235567',staffName:'刘云萱',logLock:'1',departmentCode:'213',workCode:'1,2,3',flag:'00',validLength:'3个月',expireDate:1497319487406},
    {id:214,loginUser:'51235567',staffName:'张大德',logLock:'0',departmentCode:'214',workCode:'2',flag:'01',validLength:'3个月',expireDate:1497319489406},
    {id:215,loginUser:'51235567',staffName:'李开来',logLock:'1',departmentCode:'215',workCode:'3',flag:'00',validLength:'3个月',expireDate:1497419487406},
    {id:216,loginUser:'51235567',staffName:'周小嘴',logLock:'9',departmentCode:'216',workCode:'4',flag:'00',validLength:'3个月',expireDate:1497319487406},
    {id:217,loginUser:'51235567',staffName:'王岐山',logLock:'1',departmentCode:'217',workCode:'5',flag:'00',validLength:'3个月',expireDate:1497339487406},
  ]}
}
exports.departmentMsg={
   state:'success',
   desc:'',
   data:{
    datas:[
    {departmentId:'213',departmentname:"技术研发部"},
    {departmentId:'214',departmentname:"市场销售部"},
    {departmentId:'215',departmentname:"生产部"},
    {departmentId:'216',departmentname:"财务部"},
    {departmentId:'217',departmentname:"行政部"}
  ]}
}
exports.workGroup={
   state:'success',
   desc:'',
   data:{
    datas:[
    {groupId:'1',name:"技术研发组1"},
    {groupId:'2',name:"技术研发组2"},
    {groupId:'3',name:"技术研发组3"},
    {groupId:'4',name:"技术研发组4"},
    {groupId:'5',name:"技术研发组5"},
  ]}
}
exports.batchMessage = {
  state:'success',
  desc:'',
  data:{
    totalCount:50,
    datas:[
      {id:1,ip:'192.168.0.1',implementation:'1',executiveOrder:'ls',result:'成功',executionTime:'2016.11.18 12:35:47',time:350,author:'张伟'},
      {id:10,ip:'192.168.0.2',implementation:'2',executiveOrder:'ls@&cat',result:'失败',executionTime:'2016.11.18 12:35:47',time:1350,author:'刘德华'},
      {id:12,ip:'192.168.0.3',implementation:'3',executiveOrder:'cat',result:'成功',executionTime:'2016.11.18 12:35:47',time:850,author:'刘德华'},
      {id:2,ip:'192.168.0.4',implementation:'1',executiveOrder:'result@&ls',result:'成功',executionTime:'2016.11.18 12:35:47',time:950,author:'张伟'},
      {id:5,ip:'192.168.0.5',implementation:'2',executiveOrder:'result@&cat',result:'失败',executionTime:'2016.11.18 12:35:47',time:50,author:'刘德华'},
      {id:8,ip:'192.168.0.6',implementation:'2',executiveOrder:'result',result:'成功',executionTime:'2016.11.18 12:35:47',time:'2350',author:'刘德华'},
      {id:4,ip:'192.168.0.7',implementation:'2',executiveOrder:'success',result:'成功',executionTime:'2016.11.18 12:35:47',time:'12350',author:'张伟'},
      {id:4,ip:'192.168.0.7',implementation:'2',executiveOrder:'success',result:'成功',executionTime:'2016.11.18 12:35:47',time:'12350',author:'张伟'},
      {id:4,ip:'192.168.0.7',implementation:'2',executiveOrder:'success',result:'成功',executionTime:'2016.11.18 12:35:47',time:'12350',author:'张伟'},
      {id:6,ip:'192.168.0.8',implementation:'1',executiveOrder:'success@&result',result:'失败',executionTime:'2016.11.18 12:35:47',time:'5450',author:'刘德华'}
    ]
  }
}
exports.treatMessage = {
  state:'success',
  desc:'',
  data:{
    totalCount:50,
    datas:[
      {
        id:6,
        configuration: 'A配置名称测试显示长度',
        ip: "111.112.113.111;111.112.113.112;111.112.113.113",
        implementation:'1',
        executiveOrder: "test1@&pdf1@&order@&js12",
        executionTime: "2016.11.18",
        author:"张少",
        explain: '说明一1111111'
      },
      {
        id:10,
        configuration: 'B配置名称测试显示长度',
        ip: "111.112.113.111;111.112.113.112;111.112.113.211",
        implementation: '2',
        executiveOrder:"test1@&pdf1@&order@&js1",
        executionTime: "2016.11.18",
        author:"熊熊",
        explain: '说明一22222'
      },
      {
        id:1,
        configuration: 'C配置名称测试显示长度',
        ip: "111.112.113.111;111.112.113.112;111.112.113.021",
        implementation: '3',
        executiveOrder:"test1@&pdf1@&order@&js1",
        executionTime: "2016.11.18",
        author:"Atem",
        explain: '说明一'
      },
      {
        id:7,
        configuration: 'D配置名称测试显示长度',
        ip: "111.112.113.111;111.112.113.112;111.112.113.124",
        implementation: '1',
        executiveOrder: "test1@&pdf1@&order@&js1",
        executionTime: "2016.11.18",
        author:"调调",
        explain: '说明一'
      },
      {
        id:8,
        configuration: 'E配置名称测试显示长度',
        ip: "111.112.113.111;111.112.113.112;111.112.113.115",
        implementation: '2',
        executiveOrder: "test1@&pdf1@&order@&js1",
        executionTime: "2016.11.18",
        author:"小丸子",
        explain: '说明一'
      }
    ]
  }

}
exports.execution= {
  state:'success',
  desc:'执行成功！'
}
