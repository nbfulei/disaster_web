exports.flowState1 = {
  state:'success',
  data:{
    southCenter:[{regionCHName:'华东',regionName:123,status: '00',provNames:['上海','浙江','江苏','安徽']},
                 {regionCHName:'西部',regionName:124,status: '01',provNames:['四川','重庆','云南','贵州','陕西','甘肃','新疆','宁夏','西藏','青海']},
                 {regionCHName:'华北',regionName:125,status: '00',provNames:['北京','天津','河北','辽宁','黑龙江','吉林','山东']}],
    dgCenter:[{regionCHName:'华南',regionName:126,status: '01',provNames:['广东','海南','广西','福建']},
              {regionCHName:'中部',regionName:128,status: '00',provNames:['湖北','湖南','江西','河南','山西','内蒙古']}]
  }
}
exports.flowState2 = {
  state:'success',
  data:{
    southCenter:['西部','浙江','华东+华南'],
    DGCenter:['广东','华中','华北+东北']
  }
}
exports.flowState3 = {
  state:'success',
  data:{
    southCenter:['西部','浙江','华东+华南','广东','华中','华北+东北'],
    DGCenter:[]
  }
}
exports.flowState4 = {
  state:'success',
  data:'00'
}
exports.flowState5 = {
  state:'success',
  data:{
    southCenter:[{regionCHName:'华东',regionName:123,status: '00',provNames:['上海','浙江','江苏','安徽']},
                 {regionCHName:'西部',regionName:124,status: '01',provNames:['四川','重庆','云南','贵州','陕西','甘肃','新疆','宁夏','西藏','青海']},
                 {regionCHName:'华北',regionName:125,status: '00',provNames:['北京','天津','河北','辽宁','黑龙江','吉林','山东']}],
    dgCenter:[{regionCHName:'华南',regionName:126,status: '01',provNames:['广东','海南','广西','福建']},
              {regionCHName:'中部',regionName:128,status: '00',provNames:['湖北','湖南','江西','河南','山西','内蒙古']}]
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

exports.synMessage = {
  state:'success',
  states:'RUNNING',
  data:'RUNNING'
  }
 /* exports.synMessage = {
  state:'success',
  states:'RUNNING',
  data:[
        {regionName:"华北",reverseState:"开启",positiveState:"关闭",avgDelay:"-",theirBase:"南基"},
        {regionName:"华南",reverseState:"开启",positiveState:"关闭",avgDelay:"-",theirBase:"南基"},
        {regionName:"华东",reverseState:"开启",positiveState:"关闭",avgDelay:"-",theirBase:"东莞"},
        {regionName:"西部",reverseState:"开启",positiveState:"关闭",avgDelay:"-",theirBase:"南基"},

      ]
  }*/
  exports.synMessage1 = {
  state:'success',
  data:'STOPPEN'
  }
  
  exports.flowSwitchMessage = {
  state:'success',
  data:[
        {regionName:"华北",flowDirection:"南基->东莞",flowState:"正常",switchResult:"切换完成"},
        {regionName:"华东",flowDirection:"南基->东莞",flowState:"正常",switchResult:"切换完成"},
        {regionName:"华南",flowDirection:"东莞->南基",flowState:"正常",switchResult:"切换完成"},
        {regionName:"华北",flowDirection:"南基->东莞",flowState:"正常",switchResult:"切换完成"}

      ]
  }

  exports.reportMessage = {
  state:'success',
  data:{
         checkStatusBeginTime:1489046550260,
         checkStatusEndTime:1489046552260,
         planSetBeginTime:1489046553260,
         planSetEndTime:1489046554280,
         switchBeginTime:1489046555270,
         switchEndTime:1489046557260,
         operationBeginTime:1489046550260,
         operationEndTime:1489046557260
      },
     switchNumber:20170309160237
      
  }
   exports.beginResult = {
    state:'success',
    desc:"成功",
    data:{switchNumber:20170910111236111}
    }
 exports.switch = {
    state:'success',
    desc:"成功",
    data:'00'
    }
