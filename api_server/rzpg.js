//容灾评估时间
exports.planTime = {
  state :'success',
  data:{
        backupsTime:[1492049063592],
        disasterTime:[1494641063700],
        completeTime:[1497319463180],
        startUpTime:[1499911463880],
        detectionTime:[1502589863310],
        normalTime:[1505268263331],
     }
}

exports.disasterTime = {
  data:{
        state :'success',
        message :{
        /*disasterTime:[1490860412869],
        detectionTime:[1490860412869],
        startUpTime:[1490860472869],
        normalTime:[1490860532869],*/
        // 正常时间
        disasterTime:[1490857832869],
        detectionTime:[1490858432869],
        startUpTime:[1490859032869],
        normalTime:[1490859632869],
        //7段时间表 
        /*backupsTime:1479114086592,  
        disasterTime:1479114090700,
        detectionTime:1479114206180,
        startUpTime:1479114266310,
        implementatioTimen:1479114326495,
        completeTime:1479114440880,
       normalTime:1479114446331,*/

        
        }
    }
}
//容灾评估详情
exports.switchInfo = {
  state:'success',
  data:{
        switchType:'计划外',
        switchReason:'东莞区域，IP地址为192.168.8.8，承载广东省和北京天猫业务核心，机器内存不足，业务量持续增加，需将流量进行分发切换。',
        standard:'国家标准五级',
        rto:'2119',
        reverseSyncTime:'788',
        flowSwitchTime:'566',
        positiveSyncTime:'765',
        rpo:1,
        nro:2,
        rao:'2016/12/01 16:56:30',
        iP:'192.168.88.88',
        memoryBack:'6.8%',
        memoryFront:'58%',
        cpuBack:'24%',
        cpuFront:'80%',
        //原始数据
        /*switchType:'计划内',   
        switchReason:'东莞区域，IP地址为192.168.8.8，承载广东省和北京天猫业务核心，机器内存不足，业务量持续增加，需将流量进行分发切换。',
        switchRecuperability:'国家标准六级',
        RTO:'2119',
        reverseSync:'788',
        flowSwitch:'566',
        positiveSync:'765',
        RPO:0,
        NRO:0,
        RAO:'2016/12/01 16:56:32'*/
      }
}