  //example

exports.companyMessage={
	state:'success',
	data:[
	      {id:'1',name:'创科',type:'信息技术',address:'福田',date:'123213211232'},
	      {id:'2',name:'百度',type:'信息技术',address:'福田',date:'1232133431232'},
	      {id:'3',name:'腾讯',type:'信息技术',address:'福田',date:'1232334421232'},
	      {id:'4',name:'创维',type:'信息技术',address:'福田',date:'123212311232'},
	      {id:'5',name:'京东',type:'商城',address:'福田',date:'123213222232'},
	      {id:'6',name:'淘宝',type:'商城',address:'福田',date:'123213433232'},
	      {id:'7',name:'法本',type:'信息技术',address:'福田',date:'1232123211232'},
	      {id:'8',name:'移动',type:'信息技术',address:'福田',date:'123213231232'},
	      {id:'9',name:'联通',type:'信息技术',address:'福田',date:'123213221223112'},
	      {id:'11',name:'中软',type:'信息技术',address:'福田',date:'12321233211232'}
	     ]
};
exports.departmentMessage={
		state:'success',
		data:[
		      {id:'1',name:'项目经理',manager:'张三'},
		      {id:'2',name:'项目组长',manager:'李四'},
		      {id:'3',name:'项目助理',manager:'王五'},
		      {id:'4',name:'项目QA',manager:'赵六'}
		     ]
	};

exports.user={
	state:'success',
	data:{id:'1',userName:'创科',password:'123456',userType:'1'}

};
exports.problems={
	state:'success',
	message:{
		totalCount:100,
		goPage:1,
    pageSize:10,
		resultList:[{id:1,type: 1,title:'问题',createUserId:'创建人', createTime:'2016.05.02',user:{
    			userName:'用户名'
				},answer:'1手机电话费理解啊少夫人钢筋水泥凤生凤老鼠来看紧迫问题和，m.Aljas;的时间和福克斯的回访客户都跟客户结构的'
   },
   {id:1,type: 1,title:'问题',createUserId:'创建人',createTime:'2016.05.02',user:{
    			userName:'用户名'
				},answer:'2手机电话费理解啊少夫人钢筋水泥凤生凤老鼠来看紧迫问题和，m.Aljas;的时间和福克斯的回访客户都跟客户结构的'
   },
   {id:1,type: 1,title:'问题',createUserId:'创建人',createTime:'2016.05.02',user:{
    			userName:'用户名'
				},answer:'3手机电话费理解啊少夫人钢筋水泥凤生凤老鼠来看紧迫问题和，m.Aljas;的时间和福克斯的回访客户都跟客户结构的'
   }
   ]
	}
};
exports.problemsAdd={
	state:'success',
	message:'新增成功'
};
exports.problemsDel={
	state:'success',
	message:'删除成功'
}
exports.menuAll = {"result":"success",
"message":[
{"id":"1","pid":"","name":"业务活动监控","displayName":"业务活动监控","menuType":"0","url":"","visible":"1","order":"","menuLevel":"1","isSystemMenu":"1",
"children":[{"id":"2","pid":"1","name":"统一支付","displayName":"统一支付","menuType":"0","url":"","visible":"1","order":"","menuLevel":"11","isSystemMenu":null,
  "children":[{"id":"3","pid":"2","name":"在线计费-主","displayName":"在线计费-主","menuType":"0","url":"","visible":"1","order":"","menuLevel":"111","isSystemMenu":null,
    "children":[{"id":"5","pid":"3","name":"负载均衡","displayName":"负载均衡","menuType":"3","url":"disasterRec.tmallMainbusiLoadBal","visible":"1","order":"","menuLevel":"1111","isSystemMenu":null,"children":[]},
            {"id":"6","pid":"3","name":"queue","displayName":"消息队列","menuType":"2","url":"disasterRec.tmallMainMesQueue","visible":"1","order":"","menuLevel":"1111","isSystemMenu":null,"children":[]},
            {"id":"7","pid":"3","name":"oc-crm-front-http","displayName":"省http前置","menuType":"1","url":"disasterRec.tmallMainTrade","visible":"1","order":"","menuLevel":"1111","isSystemMenu":null,"children":[]},
            {"id":"9","pid":"3","name":"oc-front","displayName":"天猫前置","menuType":"1","url":"disasterRec.tmallMainTrade","visible":"1","order":"","menuLevel":"1111","isSystemMenu":null,"children":[]},
            {"id":"10","pid":"3","name":"oc-core","displayName":"交易核心","menuType":"1","url":"disasterRec.tmallMainTrade","visible":"1","order":"","menuLevel":"1111","isSystemMenu":null,"children":[]}]},
  {"id":"4","pid":"2","name":"在线计费-备","displayName":"在线计费-备","menuType":"0","url":"","visible":"1","order":"","menuLevel":"111","isSystemMenu":null,
    "children":[{"id":"11","pid":"4","name":"负载均衡","displayName":"负载均衡","menuType":"3","url":"disasterRec.tmallMainbusiLoadBal","visible":"1","order":"","menuLevel":"1111","isSystemMenu":null,"children":[]},
            {"id":"12","pid":"4","name":"queue","displayName":"消息队列","menuType":"2","url":"disasterRec.tmallMainMesQueue","visible":"1","order":"","menuLevel":"1111","isSystemMenu":null,"children":[]},
            {"id":"13","pid":"4","name":"oc-crm-front-http","displayName":"省http前置","menuType":"1","url":"disasterRec.tmallMainTrade","visible":"1","order":"","menuLevel":"1111","isSystemMenu":null,"children":[]},
            {"id":"15","pid":"4","name":"oc-front","displayName":"天猫前置","menuType":"1","url":"disasterRec.tmallMainTrade","visible":"1","order":"","menuLevel":"1111","isSystemMenu":null,"children":[]},
            {"id":"16","pid":"4","name":"oc-core","displayName":"交易核心","menuType":"1","url":"disasterRec.tmallMainTrade","visible":"1","order":"","menuLevel":"1111","isSystemMenu":null,"children":[]}]}]}]},
{"id":"19","pid":"","name":"应用配置中心","displayName":"应用配置中心","menuType":"0","url":"","visible":"1","order":"","menuLevel":"2","isSystemMenu":"1",
  "children":[{"id":"22","pid":"19","name":"菜单配置管理","displayName":"菜单配置管理","menuType":"0","url":"disasterRec.tmallMenuConfig","visible":"1","order":"","menuLevel":"22","isSystemMenu":"1","children":[]},
            {"id":"23","pid":"19","name":"应用配置管理","displayName":"应用配置管理","menuType":"0","url":"disasterRec.tmallAppConfig","visible":"1","order":"","menuLevel":"22","isSystemMenu":"1","children":[]}]},
{"id":"30","name":"容灾控制中心","displayName":"容灾控制中心",
  "children":[{"name":"统一支付","displayName":"统一支付",
    "children":[{"name":"容灾操作","displayName":"容灾操作","url":"disasterRec.tmalldisasterOperation","children":[]},
                {"name":"容灾切换","displayName":"容灾切换","url":"disasterRec.tmallBusDisasterSwitch","children":[]},
                {"name":"运行状态","displayName":"运行状态","url":"disasterRec.tmallBusRunningStatus","children":[]},
                {"name":"容灾评估","displayName":"容灾评估","url":"disasterRec.assess","children":[]},
                {"name":"容灾监控","displayName":"容灾监控","url":"disasterRec.monitor","children":[]},
                {"name":"批量处理","displayName":"批量处理","url":"disasterRec.BatchProcessing","children":[]},
                {"name":"批量处理管理","displayName":"批量处理管理","url":"disasterRec.TreatmentProgram","children":[]},
    ]
}]
}
],
"goPage":0,
"totalCount":0
};
exports.balance = {
	state:'success',
	totalCount:31,
	message:[
        {id:1,load:'硬件负载',instance:'RD1',ProvinceCode:'100',state:'RUNNING'},
        {id:2,load:'硬件负载',instance:'RD2',ProvinceCode:'200',state:'STOPED'},
        {id:3,load:'硬件负载',instance:'RD3',ProvinceCode:'300',state:'RUNNING'},
        {id:4,load:'软件负载',instance:'NX_H1',ProvinceCode:'400',state:'STOPED'},
        {id:5,load:'软件负载',instance:'NX_H2',ProvinceCode:'500',state:'STOPED'},
        {id:6,load:'软件负载',instance:'NX_H3',ProvinceCode:'600',state:'RUNNING'}
      ]
};
exports.queue1 = {
	state:'success',
	totalCount:31,
	message:[
        {appid:'upay.tmall.queue',queue:'1',index:{
       msg_depth: 12,
       inqueue_speed: 1,
       outqueue_speed: 110,
       products: 42,
       consumers: 3
},state:'RUNNING'},
        {appid:'upay.tmall.queue',queue:'2',index:{
       msg_depth: 435,
       inqueue_speed: 543,
       outqueue_speed: 14340,
       products: 4,
       consumers: 1411
},state:'STOPED'},
        {appid:'upay.tmall.queue',queue:'3',index:{
       msg_depth: 76,
       inqueue_speed: 4,
       outqueue_speed: 6510,
       products: 146,
       consumers: 245
},state:'RUNNING'},
        {appid:'upay.tmall.queue',queue:'4',index:{
       msg_depth: 21,
       inqueue_speed: 233,
       outqueue_speed: 99,
       products: 1,
       consumers: 111
},state:'STOPED'},
        {appid:'upay.tmall.queue',queue:'5',index:{
       msg_depth: 867,
       inqueue_speed: 456,
       outqueue_speed: 111,
       products:45534,
       consumers: 12
},state:'STOPED'},
        {appid:'upay.tmall.queue',queue:'6',index:{
       msg_depth: 123,
       inqueue_speed: 10,
       outqueue_speed: 10,
       products: 1,
       consumers: 111
},state:'RUNNING'},
        {appid:'upay.tmall.queue',queue:'7',index:{
       msg_depth: 456,
       inqueue_speed: 10,
       outqueue_speed: 10,
       products: 1,
       consumers: 111
},state:'RUNNING'},
        {appid:'upay.tmall.queue',queue:'8',index:{
       msg_depth: 23,
       inqueue_speed: 10,
       outqueue_speed: 10,
       products: 1,
       consumers: 111
},state:'RUNNING'},
        {appid:'upay.tmall.queue',queue:'9',index:{
       msg_depth: 342,
       inqueue_speed: 10,
       outqueue_speed: 10,
       products: 1,
       consumers: 111
},state:'RUNNING'},
        {appid:'upay.tmall.queue',queue:'10',index:{
       msg_depth: 453,
       inqueue_speed: 10,
       outqueue_speed: 10,
       products: 1,
       consumers: 111
},state:'RUNNING'}
      ]
};
exports.queue2 = {
  state:'success',
  totalCount:31,
  message:[
        {appid:'upay.tmall.queue',queue:'1',index:{
       msg_depth: 121,
       inqueue_speed: 12,
       outqueue_speed: 10,
       products: 422,
       consumers: 32
},state:'RUNNING'},
        {appid:'upay.tmall.queue',queue:'2',index:{
       msg_depth: 43,
       inqueue_speed: 54,
       outqueue_speed: 1440,
       products: 40,
       consumers: 141
},state:'STOPED'},
        {appid:'upay.tmall.queue',queue:'3',index:{
       msg_depth: 769,
       inqueue_speed: 49,
       outqueue_speed: 650,
       products: 146,
       consumers: 24
},state:'RUNNING'},
        {appid:'upay.tmall.queue',queue:'4',index:{
       msg_depth: 21,
       inqueue_speed: 23,
       outqueue_speed: 99,
       products: 19,
       consumers: 111
},state:'STOPED'},
        {appid:'upay.tmall.queue',queue:'5',index:{
       msg_depth: 86,
       inqueue_speed: 46,
       outqueue_speed: 111,
       products:4534,
       consumers: 129
},state:'STOPED'},
        {appid:'upay.tmall.queue',queue:'6',index:{
       msg_depth: '1212',
       inqueue_speed: 109,
       outqueue_speed: 10,
       products: 1,
       consumers: 111
},state:'RUNNING'},
        {appid:'upay.tmall.queue',queue:'7',index:{
       msg_depth: 111,
       inqueue_speed: 120,
       outqueue_speed: 150,
       products: 16,
       consumers: 11
},state:'RUNNING'},
        {appid:'upay.tmall.queue',queue:'8',index:{
       msg_depth: 342,
       inqueue_speed: 210,
       outqueue_speed: 510,
       products: 155,
       consumers: 11
},state:'RUNNING'},
        {appid:'upay.tmall.queue',queue:'9',index:{
       msg_depth: 99,
       inqueue_speed: 510,
       outqueue_speed: 310,
       products: 151,
       consumers: 111
},state:'RUNNING'},
        {appid:'upay.tmall.queue',queue:'10',index:{
       msg_depth: 111,
       inqueue_speed: 99,
       outqueue_speed: 456,
       products: 231,
       consumers: 11
},state:'RUNNING'}
      ]
};
exports.queue3 = {
  result:'failing',
  message:'没有数据'
}
exports.front = {
	state:'success',
	totalCount:31,
	message:[
        {appid:'oc-front',dataSign:'配置有，采集有！',instance:'127.0.0.1_8080',method:'sdhjgfsdj.sdhjgfsdj',index:{
    producerCount:111,
    delayAvg:434,
    delayMax:4354,
    delayMin:3453,
    curr:3342
},state:'RUNNING'},
        {appid:'oc-front',dataSign:'配置有，采集有！',instance:'127.0.0.1_8080',method:'sdhjgfsdj.sdhjgfsdj',index:{
    producerCount:111,
    delayAvg:434,
    delayMax:4354,
    delayMin:3453,
    curr:3342
},state:'STOPED'},
        {appid:'oc-front',dataSign:'配置有，采集有！',instance:'127.0.0.1_8080',method:'sdhjgfsdj.sdhjgfsdj',index:{
    producerCount:111,
    delayAvg:434,
    delayMax:4354,
    delayMin:3453,
    curr:3342
},state:'RUNNING'},
        {appid:'oc-crm-front-dcc',dataSign:'配置有，采集有！',instance:'127.0.0.2_8083',method:'sdhjgfsdj.sdhjgfsdj',index:{
    producerCount:111,
    delayAvg:434,
    delayMax:4354,
    delayMin:3453,
    curr:3342
},state:'STOPED'},
        {appid:'oc-crm-front-http',dataSign:'配置有，采集有！',instance:'127.0.0.2_8083',method:'sdhjgfsdj',index:{
    producerCount:111,
    delayAvg:434,
    delayMax:4354,
    delayMin:3453,
    curr:3342
},state:'STOPED'},
        {appid:'oc-front',dataSign:'配置有，采集有！',instance:'127.0.0.2_8083',method:'sdhjgfsdj',index:{
    producerCount:111,
    delayAvg:434,
    delayMax:4354,
    delayMin:3453,
    curr:3342
},state:'RUNNING'},
        {appid:'oc-crm-front-dcc',dataSign:'配置有，采集有！',instance:'127.0.0.2_8083',method:'sdhjgfsdj',index:{
    producerCount:111,
    delayAvg:434,
    delayMax:4354,
    delayMin:3453,
    curr:3342
},state:'RUNNING'},
        {appid:'oc-crm-front-dcc',dataSign:'配置有，采集有！',instance:'127.0.0.2_8083',method:'sdhjgfsdj',index:{
    producerCount:111,
    delayAvg:434,
    delayMax:4354,
    delayMin:3453,
    curr:3342
},state:'RUNNING'},
        {appid:'oc-crm-front-dcc',dataSign:'配置有，采集有！',instance:'127.0.0.2_8083',method:'sdhjgfsdj.sdhjgfsdj',index:{
    producerCount:111,
    delayAvg:434,
    delayMax:4354,
    delayMin:3453,
    curr:3342
},state:'RUNNING'},
        {appid:'oc-crm-front-dcc',dataSign:'配置有，采集有！',instance:'127.0.0.2_8083',method:'sdhjgfsdj.sdhjgfsdj',index:{
    producerCount:111,
    delayAvg:434,
    delayMax:4354,
    delayMin:3453,
    curr:3342
},state:'RUNNING'}
      ]
};
exports.trade = {
	state:'success',
	totalCount:31,
	message:[
        {appid:'oc-core',core:'核心',dataSign:'配置有，采集有！',instance:'oc-core-001',method:'dssgsh-4654-4es',index:{
    producerCount:675,
    delayAvg:142,
    delayMax:743,
    delayMin:234,
    curr:324
},state:'RUNNING'},
{appid:'oc-core',core:'核心',dataSign:'配置有，采集有！',instance:'oc-core-001',method:'dssgsh-4654-4es',index:{
    producerCount:242,
    delayAvg:463,
    delayMax:325,
    delayMin:345,
    curr:567
},state:'RUNNING'},
{appid:'oc-core',core:'核心',dataSign:'配置有，采集有！',instance:'oc-core-001',method:'dssgsh-4654-4es',index:{
    producerCount:45,
    delayAvg:111,
    delayMax:474,
    delayMin:256,
    curr:55
},state:'RUNNING'},
{appid:'oc-core',core:'核心',dataSign:'配置有，采集有！',instance:'oc-core-001',method:'dssgsh-4654-4es',index:{
    producerCount:111,
    delayAvg:222,
    delayMax:456,
    delayMin:433,
    curr:235
},state:'RUNNING'},
{appid:'oc-core',core:'核心',dataSign:'配置有，采集有！',instance:'oc-core-001',method:'dssgsh-4654-4es',index:{
    producerCount:756,
    delayAvg:234,
    delayMax:345,
    delayMin:435,
    curr:546
},state:'RUNNING'},
{appid:'oc-core',core:'核心',dataSign:'配置有，采集有！',instance:'oc-core-001',method:'dssgsh-4654-4es',index:{
    producerCount:34,
    delayAvg:846,
    delayMax:35,
    delayMin:245,
    curr:254
},state:'RUNNING'},
{appid:'oc-core',core:'核心',dataSign:'配置有，采集有！',instance:'oc-core-001',method:'dssgsh-4654-4es',index:{
    producerCount:572,
    delayAvg:72,
    delayMax:256,
    delayMin:26,
    curr:26
},state:'RUNNING'},
{appid:'oc-core',core:'核心',dataSign:'配置有，采集有！',instance:'oc-core-001',method:'dssgsh-4654-4es',index:{
    producerCount:2457,
    delayAvg:546,
    delayMax:25,
    delayMin:25,
    curr:25
},state:'RUNNING'},
{appid:'oc-core',core:'核心',dataSign:'配置有，采集有！',instance:'oc-core-001',method:'dssgsh-4654-4es',index:{
    producerCount:256,
    delayAvg:4256,
    delayMax:256,
    delayMin:5426,
    curr:26
},state:'RUNNING'},
{appid:'oc-core',core:'核心',dataSign:'配置有，采集有！',instance:'oc-core-001',method:'dssgsh-4654-4es',index:{
    producerCount:25,
    delayAvg:252,
    delayMax:26,
    delayMin:456,
    curr:42
},state:'RUNNING'}
      ]
};
exports.region = {
  state:'success',
  message:{
    main:['001','002','005','006'],
    spare:['004','003']
  }
}
exports.systemState1 = {
  state:'success',
  data:{
    status:'00',//'00' 正常  '01'  南基挂了  '02'东莞挂了
    MLJ_DG:'main',
    BDG_LJ:'main'
  }
};
exports.systemState2 = {
  state:'success',
  data:{
    status:'01',//'00' 正常  '01'  南基挂了  '02'东莞挂了
    MLJ_DG:'process',
    BDG_LJ:'process'
  }
};
  exports.systemState3 = {
  state:'success',
  data:{
    status:'02',//'00' 正常  '01'  南基挂了  '02'东莞挂了
    MLJ_DG:'process',
    BDG_LJ:'process'
  }
};
exports.flowState1 = {
  state:'success',
  data:{
    southCenter:[{regionCHName:'华东',regionName:123,status: '00',provNames:['上海','浙江','江苏','安徽']},
                 {regionCHName:'西部',regionName:124,status: '01',provNames:['四川','重庆','云南','贵州','陕西','甘肃','新疆','宁夏','西藏','青海']},
                 {regionCHName:'华南',regionName:126,status: '01',provNames:['广东','海南','广西','福建']},
                 ],
    dgCenter:[{regionCHName:'华北',regionName:125,status: '00',provNames:['北京','天津','河北','辽宁','黑龙江','吉林','山东']},
    {regionCHName:'中部',regionName:128,status: '00',provNames:['湖北','湖南','江西','河南','山西','内蒙古']}]
  }
}
exports.flowState2 = {
  state:'success',
  data:{
    southCenter:[],
    dgCenter:[   
                 {regionCHName:'华东',regionName:123,status: '00',provNames:['上海','浙江','江苏','安徽']},
                 {regionCHName:'西部',regionName:124,status: '01',provNames:['四川','重庆','云南','贵州','陕西','甘肃','新疆','宁夏','西藏','青海']},
                 {regionCHName:'华北',regionName:125,status: '00',provNames:['北京','天津','河北','辽宁','黑龙江','吉林','山东']},
                 {regionCHName:'华南',regionName:126,status: '01',provNames:['广东','海南','广西','福建']},
                 {regionCHName:'中部',regionName:128,status: '00',provNames:['湖北','湖南','江西','河南','山西','内蒙古']}]
  }
}
exports.flowState3 = {
  state:'success',
  message:{
    southCenter:['西部','浙江','华东+华南','广东','华中','华北+东北'],
    DGCenter:[]
  }
}
exports.flowState4 = {
  state:'success',
  data:{
    southCenter:['华南','华东'],
    DGCenter:['华北','中部','西部',]
  }
}
exports.notice1 = {
  state:'success',
  data:{
    msg:'当前系统主中心为南基，备中心为东莞。',
    state:'normal'
  }
}
exports.notice2 = {
  state:'success',
  data:{
    msg:'当前系统整体运行正常，省公司与浙江公司通过网状网连接南方基地与北方信息港。',
    state:'normal'
  }
}
exports.notice3 = {
  state:'success',
  data:{
    msg:'当前运行线路为图中蓝色线路，流量经由南方基地与北方信息港流向负载均衡进入主备系统中心。',
    state:'normal'
  }
}
exports.notice4 = {
  state:'success',
  data:{
    msg:'南基与东莞各节点运行正常，浙江区，广东区，东北区与华北区流量进入主中心南方基地，西部，华东，华南与华中流量进入备中心东莞区域。',
    state:'normal'
  }
}
exports.notice5 = {
  state:'success',
  data:{
    msg:'当前无流量切换预案，主备系统运行正常，无超负荷运行，无中断或不良节点。',
    state:'normal'
  }
}
exports.notice6 = {
  state:'success',
  data:{
    msg:'南基往东莞方向（浙江区，广东区，东北区与华北区）ogg同步运行状态正常。东莞往南基方向（西部，华中，华南与华东）ogg同步运行正常。',
    state:'normal'
  }
}
exports.notice7 = {
  state:'success',
  data:{
    msg:'南基往东莞方向（浙江区，广东区，东北区与华北区）ogg同步运行状态不正常。东莞往南基方向（西部，华中，华南与华东）ogg同步运行不正常。',
    state:'brokendown'
  }
}
exports.batchMessage = {
  state:'success',
  message:[
    {ip:'192.168.0.1',way:'AAA',order:'gjhagsfsg',result:'成功',time:'2016.11.18',name:'刘德华'},
    {ip:'192.168.0.2',way:'BBB',order:'gjhagsfsg',result:'成功',time:'2016.11.18',name:'刘德华'},
    {ip:'192.168.0.3',way:'CCC',order:'gjhagsfsg',result:'成功',time:'2016.11.18',name:'刘德华'},
    {ip:'192.168.0.4',way:'SDF',order:'gjhagsfsg',result:'成功',time:'2016.11.18',name:'刘德华'},
    {ip:'192.168.0.5',way:'4E',order:'gjhagsfsg',result:'成功',time:'2016.11.18',name:'刘德华'},
    {ip:'192.168.0.6',way:'HF',order:'gjhagsfsg',result:'成功',time:'2016.11.18',name:'刘德华'},
    {ip:'192.168.0.7',way:'GGGGGGGGGGGGGG',order:'gjhagsfsg',result:'成功',time:'2016.11.18',name:'周星星'},
    {ip:'192.168.0.8',way:'WE4RWT',order:'gjhagsfsg',result:'成功',time:'2016.11.18',name:'刘德华'},
  ]
}
exports.treatMessage = {
  state:'success',
  message:[
                {
                    configuration: 'A',
                    ipArray: [{ip: "111.112.113.111"}, {ip: "111.112.113.112"}, {ip: "111.112.113.113"}],
                    implementation: 1,
                    executiveOrder: [{order: "test1"}, {order: "pdf1"}, {order: "js1"}],
                    explain: '说明一',
                    executionTime: "100ms"
                },
                {
                    configuration: 'B',
                    ipArray: [{ip: "111.112.113.114"}, {ip: "111.112.113.115"}, {ip: "111.112.113.116"}],
                    implementation: 2,
                    executiveOrder: [{order: "test2"}, {order: "pdf2"}, {order: "js2"}],
                    explain: '说明二',
                    executionTime: "100ms"
                },
                {
                    configuration: 'C',
                    ipArray: [{ip: "111.112.113.117"}, {ip: "111.112.113.118"}, {ip: "111.112.113.119"}],
                    implementation: 2,
                    executiveOrder: [{order: "test3"}, {order: "pdf3"}, {order: "js3"}],
                    explain: '说明一',
                    executionTime: "100ms"
                },
                {
                    configuration: 'D',
                    ipArray: [{ip: "111.112.113.121"}, {ip: "111.112.113.122"}, {ip: "111.112.113.123"}],
                    implementation: 1,
                    executiveOrder: [{order: "test4"}, {order: "pdf4"}, {order: "js4"}],
                    explain: '说明二',
                    executionTime: "100ms"
                },
                {
                    configuration: 'E',
                    ipArray: [{ip: "111.112.113.124"}, {ip: "111.112.113.125"}, {ip: "111.112.113.126"}],
                    implementation: 3,
                    executiveOrder: [{order: "test5"}, {order: "pdf5"}, {order: "js5"}],
                    explain: '说明一',
                    executionTime: "100ms"
                },
                {
                    configuration: 'F',
                    ipArray: [{ip: "111.112.113.127"}, {ip: "111.112.113.128"}, {ip: "111.112.113.129"}],
                    implementation: 3,
                    executiveOrder: [{order: "test6"}, {order: "pdf6"}, {order: "js6"}],
                    explain: '说明二',
                    executionTime: "100ms"
                }
            ]
}
exports.doflowState = {"result":"success","message":{"centers":[{"centerId":"1","centerName":"guangzhou","centerNameCN":"广东基地","regions":[{"regionName":"华东+华南","provinces":[{"provinceCode":"250","provinceName":"江苏"},{"provinceCode":"591","provinceName":"福建"},{"provinceCode":"791","provinceName":"江西"},{"provinceCode":"531","provinceName":"山东"},{"provinceCode":"551","provinceName":"安徽"},{"provinceCode":"210","provinceName":"上海"},{"provinceCode":"771","provinceName":"广西"},{"provinceCode":"898","provinceName":"海南"}],"provinceView":"江苏,福建,江西,山东,安徽,上海,广西,海南","isSwitch":false,"centerId":"1"},{"regionName":"华北+东北","provinces":[{"provinceCode":"431","provinceName":"吉林"},{"provinceCode":"240","provinceName":"辽宁"},{"provinceCode":"451","provinceName":"黑龙江"},{"provinceCode":"311","provinceName":"河北"},{"provinceCode":"351","provinceName":"山西"},{"provinceCode":"100","provinceName":"北京"},{"provinceCode":"220","provinceName":"天津"},{"provinceCode":"471","provinceName":"内蒙古"}],"provinceView":"吉林,辽宁,黑龙江,河北,山西,北京,天津,内蒙古","isSwitch":false,"centerId":"1"},{"regionName":"广东","provinces":[{"provinceCode":"200","provinceName":"广东"}],"provinceView":"广东","isSwitch":false,"centerId":"1"},{"regionName":"华中","provinces":[{"provinceCode":"270","provinceName":"湖北"},{"provinceCode":"731","provinceName":"湖南"},{"provinceCode":"371","provinceName":"河南"}],"provinceView":"湖北,湖南,河南","isSwitch":false,"centerId":"1"},{"regionName":"西部","provinces":[{"provinceCode":"971","provinceName":"青海"},{"provinceCode":"290","provinceName":"陕西"},{"provinceCode":"931","provinceName":"甘肃"},{"provinceCode":"951","provinceName":"宁夏"},{"provinceCode":"991","provinceName":"新疆"},{"provinceCode":"891","provinceName":"西藏"},{"provinceCode":"230","provinceName":"重庆"},{"provinceCode":"871","provinceName":"云南"},{"provinceCode":"851","provinceName":"贵州"},{"provinceCode":"280","provinceName":"四川"}],"provinceView":"青海,陕西,甘肃,宁夏,新疆,西藏,重庆,云南,贵州,四川","isSwitch":false,"centerId":"1"},{"regionName":"浙江","provinces":[{"provinceCode":"571","provinceName":"浙江"}],"provinceView":"浙江","isSwitch":false,"centerId":"1"},{"regionName":"基础区","provinces":null,"provinceView":null,"isSwitch":false,"centerId":"1"}]},{"centerId":"2","centerName":"dongguan","centerNameCN":"东莞基地","regions":[]}]}}
exports.catalogMessage = {
  state:'success',
  totalCount:20,
  message:[
    {id:1,downloadName:'abc1',downloadAddress:'-uadmin-padmin1208@192.168.0.222:/home/admin',downloadTargetAddress:'F:/test/rose',remarks:'你好',finalOperationUser:'乔任梁',finalOperationTime:'2016.12.12'},
    {id:2,downloadName:'abc2',downloadAddress:'-uadmin-padmin1208@192.168.0.222:/home/admin',downloadTargetAddress:'F:/test/rose',remarks:'你好',finalOperationUser:'乔任梁',finalOperationTime:'2016.12.12'},
    {id:3,downloadName:'abc3',downloadAddress:'-uadmin-padmin1208@192.168.0.222:/home/admin',downloadTargetAddress:'F:/test/rose',remarks:'你好',finalOperationUser:'乔任梁',finalOperationTime:'2016.12.12'},
    {id:4,downloadName:'abc4',downloadAddress:'-uadmin-padmin1208@192.168.0.222:/home/admin',downloadTargetAddress:'F:/test/rose',remarks:'你好',finalOperationUser:'乔任梁',finalOperationTime:'2016.12.12'},
    {id:5,downloadName:'abc5',downloadAddress:'-uadmin-padmin1208@192.168.0.222:/home/admin',downloadTargetAddress:'F:/test/rose',remarks:'你好',finalOperationUser:'乔任梁',finalOperationTime:'2016.12.12'}
  ]
}
exports.warnIcon = {
  state:'success',
  message:{
        southGSLB:'normal',
        southLB:'warningYel',
        southTmall:'normal',
        southProvince:'warningRed',
        southMQ:'warningRed',
        southCore:'warningRed',
        DGGSLB:'warningRed',
        DGLB:'warningRed',
        DGTmall:'warningRed',
        DGProvince:'warningYel',
        DGMQ:'warningRed',
        DGCore:'warningRed'
      }
}
exports.machineInfo = {
  state:'success',
  data:[
        {name:'up',hostIP:'172.16.59.229',cpuLoad:'4.04%',memoryLoad:'5.9%',ioLoad:'35%',diskLoad:'50%'},
        {name:'aymd',hostIP:'172.16.59.228',cpuLoad:'12%',memoryLoad:'8.9%',ioLoad:'31%',diskLoad:'30%'},
        {name:'upa',hostIP:'172.16.59.227',cpuLoad:'8%',memoryLoad:'3%',ioLoad:'20%',diskLoad:'60%'},
        {name:'ymg',hostIP:'172.16.59.226',cpuLoad:'2%',memoryLoad:'2.5%',ioLoad:'25%',diskLoad:'20%'},
        {name:'upay',hostIP:'172.16.59.225',cpuLoad:'4.04%',memoryLoad:'5.9%',ioLoad:'40%',diskLoad:'40%'}
      ]
}
exports.dataSyncState1 = {
  state:'success',
  message:{state:'abnormal'}
}
exports.dataSyncState2= {
  state:'success',
  message:{state:'crowded'}
}
exports.dataSyncState3 = {
  state:'success',
  message:{state:'normal'}
}
exports.lineInfo = {
  state:'success',
  data:{info:'系统正常，流量拥堵'}
}
exports.disasterTime = {
  state:'success',
  message:{
        time1:1479114924592,
        time2:1479114924700,
        time3:1479114925180,
        time4:1479114925310,
        time5:1479114925495,
        time6:1479114925880,
        time7:1479114926331,
      }
}
exports.switchInfo = {
  state:'success',
  message:{
        switchType:'计划内',
        switchReason:'东莞区域，IP地址为192.168.8.8，承载广东省和北京天猫业务核心，机器内存不足，业务量持续增加，需将流量进行分发切换。',
        switchRecuperability:'国家标准六级',
        RTO:'2119',
        reverseSync:'788',
        flowSwitch:'566',
        positiveSync:'765',
        RPO:0,
        NRO:0,
        RAO:'2016/12/01 16:56:32'
      }
}
exports.machineWarnState = {
  state:'success',
  data:{
    Mradware2:'warningYel',
    MTMQZ:'warningYel',
    MZLYQ:'warningYel',
    MTMHX:'warningRed',
    MYLYQ:'warningRed',
    MSQZ:'warningRed',
    BF5_2:'warningRed',
    BTMQZ:'warningRed',
    BZLYQ:'warningRed',
    BTMHX:'warningYel',
    BYLYQ:'warningRed',
    BSQZ:'warningRed'
      }
}
exports.dataSyncState = {
  state:'success',
  data:{
        state:'crowded'
      }
}
exports.messages = {
  state:'success',
  message:[
                {
                    urlName: 'A',
                    sourceUrl: 'urlaa',
                    toUrl: 'urlbb',
                    remark: '备注',
                    lastName: '张三',
                    lastTime: 'newTime'
                },
               {
                    urlName: 'A1',
                    sourceUrl: 'urlaa1',
                    toUrl: 'urlbb1',
                    remark: '备注1',
                    lastName: '张三1',
                    lastTime: 'newTime1'
                },
               {
                    urlName: 'A2',
                    sourceUrl: 'urlaa2',
                    toUrl: 'urlbb2',
                    remark: '备注2',
                    lastName: '张三2',
                    lastTime: 'newTime2'
                },
               {
                    urlName: 'A3',
                    sourceUrl: 'urlaa3',
                    toUrl: 'urlbb3',
                    remark: '备注3',
                    lastName: '张三3',
                    lastTime: 'newTime3'
                },
               {
                    urlName: 'A4',
                    sourceUrl: 'urlaa4',
                    toUrl: 'urlbb4',
                    remark: '备注4',
                    lastName: '张三4',
                    lastTime: 'newTime4'
                },
                {
                    urlName: 'A5',
                    sourceUrl: 'urlaa5',
                    toUrl: 'urlbb5',
                    remark: '备注5',
                    lastName: '张三5',
                    lastTime: 'newTime5'
                }
            ]
}
exports.hostComputerMessages = {
  state:'success',
  data:[
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

exports.applianceMessages = {
  state:'success',
  data:[
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
exports.mqMessages = {
  state:'success',
  message:[
               {
      id:'1',
      province:'华北+东北',
      queueCount:'1200',
      remarks:'A'
    },
              {
      id:'2',
      province:'华东+华南',
      queueCount:'1103',
      remarks:'AA'
    },
              {
      id:'3',
      province:'东南',
      queueCount:'12000',
      remarks:'B'
    },
             {
      id:'4',
      province:'浙江',
      queueCount:'1200',
      remarks:'A'
    },
             {
      id:'5',
      province:'西北',
      queueCount:'14000',
      remarks:'C'
    }
            ]
}
exports.interStateMessages = {
  state:'success',
  data:[
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
exports.provinceColonyMessages = {
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
}
exports.dataflows={
  state:'success',
  data:[
        {id:1,area:'华南地区',name1:'test',southCenter:'南方基地',DGCenter:'东莞机房',checked:true,checked2:false},
        {id:2,area:'华北地区',name1:'test2',southCenter:'南方基地',DGCenter:'东莞机房',checked:true,checked2:false},
        {id:3,area:'华中地区',name1:'test3',southCenter:'南方基地',DGCenter:'东莞机房',checked:true,checked2:false},
        {id:4,area:'西部地区',name1:'test4',southCenter:'南方基地',DGCenter:'东莞机房',checked:false,checked2:true},
        {id:5,area:'西北地区',name1:'test5',southCenter:'南方基地',DGCenter:'东莞机房',checked:false,checked2:true},
        {id:6,area:'中部地区',name1:'test6',southCenter:'南方基地',DGCenter:'东莞机房',checked:false,checked2:true}
  ]
}

exports.mystatus={
  state:'success',
  data:[
        {id:'1',comp:'差异项一',hC:'66',standby:'10'},
        {id:'2',comp:'差异项二',hC:'55',standby:'20'},
        {id:'3',comp:'差异项三',hC:'44',standby:'30'},
        {id:'4',comp:'差异项四',hC:'33',standby:'40'}
  ]
};

/*exports.flowMessage = {
  state:'success',
  message:[
                {
                  province:'湖南',
                  ascription:'华南',
                  test:'南方基地'
                },
                {
                  province:'湖北',
                  ascription:'华中',
                  test:'南方基地'
                },
                {
                  province:'河南',
                  ascription:'华中',
                  test:'南方基地'
                },
                {
                  province:'广东',
                  ascription:'华南',
                  test:'南方基地'
                },
                {
                  province:'广西',
                  ascription:'华南',
                  test:'南方基地'
                },
                {
                  province:'云南',
                  ascription:'华南',
                  test:'南方基地'
                },
                {
                  province:'陕西',
                  ascription:'西北',
                  test:'南方基地'
                },
                {
                  province:'湖南',
                  ascription:'华南',
                  test:'南方基地'
                }
            ]
}*/
exports.doflowState = {"result":"success","message":{"centers":[{"centerId":"1","centerName":"guangzhou","centerNameCN":"广东基地","regions":[{"regionName":"华东+华南","provinces":[{"provinceCode":"250","provinceName":"江苏"},{"provinceCode":"591","provinceName":"福建"},{"provinceCode":"791","provinceName":"江西"},{"provinceCode":"531","provinceName":"山东"},{"provinceCode":"551","provinceName":"安徽"},{"provinceCode":"210","provinceName":"上海"},{"provinceCode":"771","provinceName":"广西"},{"provinceCode":"898","provinceName":"海南"}],"provinceView":"江苏,福建,江西,山东,安徽,上海,广西,海南","isSwitch":false,"centerId":"1"},{"regionName":"华北+东北","provinces":[{"provinceCode":"431","provinceName":"吉林"},{"provinceCode":"240","provinceName":"辽宁"},{"provinceCode":"451","provinceName":"黑龙江"},{"provinceCode":"311","provinceName":"河北"},{"provinceCode":"351","provinceName":"山西"},{"provinceCode":"100","provinceName":"北京"},{"provinceCode":"220","provinceName":"天津"},{"provinceCode":"471","provinceName":"内蒙古"}],"provinceView":"吉林,辽宁,黑龙江,河北,山西,北京,天津,内蒙古","isSwitch":false,"centerId":"1"},{"regionName":"广东","provinces":[{"provinceCode":"200","provinceName":"广东"}],"provinceView":"广东","isSwitch":false,"centerId":"1"},{"regionName":"华中","provinces":[{"provinceCode":"270","provinceName":"湖北"},{"provinceCode":"731","provinceName":"湖南"},{"provinceCode":"371","provinceName":"河南"}],"provinceView":"湖北,湖南,河南","isSwitch":false,"centerId":"1"},{"regionName":"西部","provinces":[{"provinceCode":"971","provinceName":"青海"},{"provinceCode":"290","provinceName":"陕西"},{"provinceCode":"931","provinceName":"甘肃"},{"provinceCode":"951","provinceName":"宁夏"},{"provinceCode":"991","provinceName":"新疆"},{"provinceCode":"891","provinceName":"西藏"},{"provinceCode":"230","provinceName":"重庆"},{"provinceCode":"871","provinceName":"云南"},{"provinceCode":"851","provinceName":"贵州"},{"provinceCode":"280","provinceName":"四川"}],"provinceView":"青海,陕西,甘肃,宁夏,新疆,西藏,重庆,云南,贵州,四川","isSwitch":false,"centerId":"1"},{"regionName":"浙江","provinces":[{"provinceCode":"571","provinceName":"浙江"}],"provinceView":"浙江","isSwitch":false,"centerId":"1"},{"regionName":"基础区","provinces":null,"provinceView":null,"isSwitch":false,"centerId":"1"}]},{"centerId":"2","centerName":"dongguan","centerNameCN":"东莞基地","regions":[]}]}}

exports.batToShow = {
  state:'success',
  data:[
        {
          historyTime:'2014-10-01',
          switchType:'手动',
          swichResult:'成功',
        },
        {
          historyTime:'2015-05-01',
          switchType:'手动',
          swichResult:'成功',
        },
        {
          historyTime:'2015-10-01',
          switchType:'手动',
          swichResult:'成功',
        },
        {
          historyTime:'2016-05-01',
          switchType:'手动',
          swichResult:'成功',
        },
        {
          historyTime:'2016-10-21',
          switchType:'手动',
          swichResult:'成功',
        },
        {
          historyTime:'2016-12-25',
          switchType:'手动',
          swichResult:'成功',
        }
  ]
}

//等级规范
exports.gradeMessage={
    state:'success',
    data:[
            '一级',
            '二级',
            '三级',
            '四级',
            '五级',
            '六级',
            '七级'
         ]
  };
  /*系统运行日志 */
exports.runLog= {
  state:'success',
  message:[
    {
      level:'INFO',
      time:'2017-1-1',
      mark:'30%',
      onlyLable:'111',
      transCode:'111',
      recipeLabel:'111',
      provinceCode:'666',
      describe:'111'
    },
    {
       level:'INFO',
      time:'2017-1-1',
      mark:'30%',
      onlyLable:'111',
      transCode:'111',
      recipeLabel:'111',
      provinceCode:'555',
      describe:'111'
    },
    {
      level:'WARNING',
      time:'2017-1-1',
      mark:'30%',
      onlyLable:'111',
      transCode:'111',
      recipeLabel:'111',
      provinceCode:'111',
      describe:'111'
    },
    {
      level:'INFO',
      time:'2017-1-1',
      mark:'30%',
      onlyLable:'111',
      transCode:'111',
      recipeLabel:'111',
      provinceCode:'333',
      describe:'111'
    },
    {
      level:'WARNING',
      time:'2017-1-1',
      mark:'30%',
      onlyLable:'111',
      transCode:'111',
      recipeLabel:'111',
      provinceCode:'222',
      describe:'111'
    }
      ]
};
//南基
exports.NJ={
    state:'success',
    data:{
      NJFile:'77%',
      NJCPU:'56%',
      NJIO:'69%',
      NJMemory:'82%'
    }

  };

 //东莞
exports.DG={
    state:'success',
    data:{
      DGFile:'49%',
      DGCPU:'90%',
      DGIO:'45%',
      DGMemory:'75%'
    }

 };
 /*报告预估*/
exports.Report ={
    state:'success',
    data:{
      standard:'一级',
      interStandard:'2',
      recoveryTime:'45',
      reverseTime:'300',
      changeTime:'189',
      positiveTime:'200',
      dataLoss:'30',
      NRTime:'100'
    }

 };
//MQ信息
exports.MQMessage={
    state:'success',
    data:[
            '18000',
            '5000',
            '12000',
            '15000',
            '9000',
            '11000'

         ]
  };
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

/*exports.flowMessage = {
  state:'success',
  message:[
                {

                  ascription:'华南',
                  test:'南方基地'
                },
                {

                  ascription:'华中',
                  test:'南方基地'
                },
                {

                  ascription:'华北',
                  test:'南方基地'
                },
                {

                  ascription:'中部',
                  test:'东莞机房'
                },
                {

                  ascription:'西部',
                  test:'东莞机房'
                },
                {

                  ascription:'西北',
                  test:'东莞机房'
                }
            ]
}*/

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
/*exports.spareHostComputerMessages = {
  state:'success',
  message:[
               {
      id:'1',
      cpuUsage:'100%',
      memoryUsage:'30%',
      diskSpace:'60%'
    },
    {
      id:'2',
      cpuUsage:'99%',
      memoryUsage:'40%',
      diskSpace:'88%'
    },
    {
      id:'3',
      cpuUsage:'50%',
      memoryUsage:'60%',
      diskSpace:'55%'
    },
    {
      id:'4',
      cpuUsage:'48%',
      memoryUsage:'100%',
      diskSpace:'60%'
    },
    {
      id:'5',
      cpuUsage:'55%',
      memoryUsage:'99%',
      diskSpace:'44%'
    }
            ]
}*/

/*exports.spareApplianceMessages = {
  state:'success',
  message:[
               {
      id:'1',
      runState:'正常',
      dataBaseInspect:'正常'
    },
   {
      id:'2',
      runState:'异常',
      dataBaseInspect:'正常'
    },
   {
      id:'3',
      runState:'正常',
      dataBaseInspect:'异常'
    },
   {
      id:'4',
      runState:'正常',
      dataBaseInspect:'正常'
    },
   {
      id:'5',
      runState:'正常',
      dataBaseInspect:'正常'
    }
            ]
}*/

exports.disasterTime = {
  state:'success',
  message:{
        backups:1479114924592,
        Disaster:1479114924700,
        Testing:1479114925180,
        startUp:1479114925310,
        Implementation:1479114925495,
        complete:1479114925880,
        normal:1479114926331,
      }
}
exports.switchInfo = {
  state:'success',
  message:{
        switchType:'计划内',
        switchReason:'东莞区域，IP地址为192.168.8.8，承载广东省和北京天猫业务核心，机器内存不足，业务量持续增加，需将流量进行分发切换。',
        switchRecuperability:'国家标准三级',
        rTO:'2119',
        reverseSync:'788',
        flowSwitch:'566',
        positiveSync:'765',
        rPO:0,
        nRO:0,
        rAO:'2016/12/01 16:56:32',
        iP:'192.168.88.88',
        memoryBack:'6.8%',
        memoryFront:'58%',
        cpuBack:'24%',
        cpuFront:'80%',
      }
}
