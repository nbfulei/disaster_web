//高级权限
var userRightMessage = [
  {"id":"1","name":"业务活动监控","displayName":"业务活动监控", "children":
    [
      {"id":"1_1","name":"主机配置","displayName":"主机配置","url":"disasterRec.hostQuery","children":[]}
    ]
  },
  {"id":"2","name":"应用配置中心","displayName":"应用配置中心", "children":
    [
      {"id":"2_1_1","name":"应用配置中心","displayName":"应用配置中心","url":"disasterRec.tmallRegionConfig","children":[]}
    ]
  },
  {"id":"3","name":"容灾控制中心","displayName":"容灾控制中心", "children":
    [
      {"id":"3_1","name":"统一支付","displayName":"统一支付", "children":
        [
          {"id":"3_1_1","name":"运行状态","displayName":"运行状态","url":"disasterRec.tmallBusRunningStatus","children":[]},
          {"id":"3_1_2","name":"容灾切换展示","displayName":"容灾切换展示","url":"disasterRec.tmallBusDisasterSwitch","children":[]},
          //{"id":"3_1_4","name":"容灾评估","displayName":"容灾评估","url":"disasterRec.assess","children":[]},
          //{"id":"3_1_4","name":"容灾评估2","displayName":"容灾评估2","url":"disasterRec.outside","children":[]},
          {"id":"3_1_3","name":"容灾切换","displayName":"容灾切换","url":"disasterRec.monitor","children":[]}//,
          //{"name":"容灾操作(旧)","displayName":"容灾操作(旧)","url":"disasterRec.tmalldisasterOperation","children":[]},
          //{"id":"3_1_5","name":"容灾操作","displayName":"容灾操作","url":"disasterRec.operation","children":[]}
        ]
      }
    ]
  },
  {"id":"4","name":"容灾运维管理","displayName":"容灾运维管理","children":
    [
      {"id":"4_1","name":"批处理","displayName":"批处理", "children":
        [
          {"id":"4_1_1","name":"批处理查询","displayName":"批处理查询","url":"disasterRec.BatchProcessing","children":[]},
          {"id":"4_1_2","name":"批处理配置","displayName":"批处理配置","url":"disasterRec.TreatmentProgram","children":[]}
        ]
      },
      {"id":"4_2","name":"负载均衡维护","displayName":"负载均衡维护","url":"disasterRec.loadEqualMaintain","children":[]},
      {"id":"4_3","name":"数据同步维护","displayName":"数据同步维护","url":"disasterRec.dataSynchroMaintain","children":[]}
    ]
  }
];


//低级权限
var userRightMessage2 = [
  
 
  {"id":"3","name":"容灾控制中心","displayName":"容灾控制中心", "children":
    [
      {"id":"3_1","name":"统一支付","displayName":"统一支付", "children":
        [
          {"id":"3_1_1","name":"运行状态","displayName":"运行状态","url":"disasterRec.tmallBusRunningStatus","children":[]},
          {"id":"3_1_2","name":"容灾切换展示","displayName":"容灾切换展示","url":"disasterRec.tmallBusDisasterSwitch","children":[]},
          
        ]
      }
    ]
  }
];
