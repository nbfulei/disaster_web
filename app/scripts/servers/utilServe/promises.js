;(function(){

	angular.module('servers.promisesServe',[]).factory('promisesServe',promisesServe);

	function promisesServe(){
    var UserInfoMessage={};
    var create=[];
		return{
			msgBar:function(type,text,time){
	    	if(time === undefined){
	    		time = 2000;
	    	}
	    	if(type === 'failed'){
	    	  type = 'error'
	    	}
				$("#bar_container").html("");
				$.msgBar({
					type: type,
					text: text,
					lifetime: time
				}).prependTo ('#bar_container');
	    },
		  UserInfo:UserInfo,
		  getData:getData,
      setData:setData,
      processDate:processDate,
      createInfo:createInfo,
      getCreateInfo:getCreateInfo,
      setCreateInfo:setCreateInfo,
      getCheckbox:getCheckbox,
      fCheckboxClick:fCheckboxClick,
      setOptions:setOptions
		};
    //echarts图
    function setOptions(name,usage,time){
      var option = {
        tooltip: { //提示框组件。
          trigger: 'axis',//触发类型。// axis 坐标轴触发 item 据项图形触发
          formatter: function(params) {
            return params[0].name + '<br/>' +
              params[0].seriesName + ' : ' + params[0].value + ' %<br/>' ;
          },
          axisPointer: { //坐标轴指示器配置项
            animation: true  //是否开启动画。
          }
        },
        legend: { //图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
          data: [name],
          show:'true',
          left:'left',
          top:'15'
          //x: 'left'
        },
        dataZoom: [{ //组件 用于区域缩放，从而能自由关注细节的数据信息，或者概览数据整体，或者去除离群点的影响。
          show: true,
          realtime: true, //拖动时，是否实时更新系列的视图
          start: 60,//数据窗口范围的起始百分比。范围是：0 ~ 100。表示 0% ~ 100%。
          end: 80 //数据窗口范围的结束百分比。范围是：0 ~ 100。
          //filterMode: 'empty'
        }, {
          type: 'inside',
          realtime: true,
          start: 60,
          end: 80
        }],
        xAxis: [{  //直角坐标系 grid 中的 x 轴
          type: 'category', // 'category' 类目轴，适用于离散的类目数据 'value' 数值轴，适用于连续数据 'time' 时间轴 'log' 对数轴。适用于对数数据
          boundaryGap: false, //坐标轴两边留白策略
          axisLine: {
            onZero: false //X 轴或者 Y 轴的轴线是否在另一个轴的 0 刻度上，只有在另一个轴为数值轴且包含 0 刻度时有效。
          },

          //splitNumber:'5',//坐标轴的分割段数
          data: time.map(function(str) {
            return str.replace(' ', '\n')
          })
        }],
        yAxis: [{ //直角坐标系 grid 中的 y 轴
          //name: '使用率(m^3/s)',
          nameLocation:'middle',//坐标轴名称显示位置
          nameGap:'30',//坐标轴名称与轴线之间的距离。
          type: 'value',
          max: 100,
          min:0
        }
        ],
        series: [{  //系列列表
          name: name,
          type: 'line',
          hoverAnimation: true, //是否开启 hover 在拐点标志上的提示动画效果。
          areaStyle: { //区域填充样式。
            "normal": {
              "color": "#83C6F9",
              opacity:0.8
            }
          },
          itemStyle: {
            "normal": {
              "color": "#2c96ef"
            }
          },
          lineStyle: { //线条样式。
            normal: {
              width: 1,
              "color": "#2c96ef"
            }
          },
          data: usage
        }

        ]
      };
      return option
    }
		function UserInfo(value){
			return value;
		}
		function setData(value)
		{
			 UserInfoMessage = value;
		}
		function getData()
		{
			  return UserInfoMessage;
		}
		function createInfo(value){
			return value;
		}
		function setCreateInfo(value)
		{
			 create = value;

		}
		function getCreateInfo()
		{
			  return create;

		}
		//时间选择器
		function processDate(id,startDateTime){
			$('#'+id).datepicker({
				language:'zh-CN',
				format:'yyyy/mm/dd',
				startDate:startDateTime,
				autoclose:true,
				orientation: "bottom right"
			});
		}
		/**
		 * @Description 多选框全选/反选/单选
		 * @author yugd
		 * @CreateDate 2015/09/14
		 * @param  reType:返回类型（list:集合;void:false）
		 					 checkList:多选列表对象
		 					 num:单选项在列表中的下标
		 * @return list or void(集合对象或者false)
		 **/
		function fCheckboxClick(reType,checkList,num){
			//当没有数据的时候，不做多选处理，否则会因为marquee出现一条空数据
			if(undefined===checkList){
				return;
			}
			var checkBool;//复选框状态
			var newList = [];//返回集合
			if(undefined===num){//全选/反选
				checkBool = !checkList.marquee;
				checkList.marquee = checkBool; //全选框状态修改
				for (var i in checkList) {
					//如果i是全选框的状态，则当条数据去掉
					if('marquee'===i){
						break;
					}
					checkList[i].checkbox = checkBool; //多选框状态修改
					newList.push(checkList[i]);//获取所有勾选数据数组
				}
				//如果全选框不为true则返回空数组
				if(false===checkBool){
					newList = [];
				}
			}else{//单选
				checkList[num].checkbox = !checkList[num].checkbox; //当前多选框状态修改
				checkBool = true;
				for (var o in checkList) {
					//如果i是全选框的状态，则当条数据去掉
					if('marquee'===o){
						break;
					}
					//一旦存在多选框状态不为true，则全选框的状态应为false
					if (true!== checkList[o].checkbox) {
						checkBool = false;
					}
					//获取所有勾选数据数组
					if(true===checkList[o].checkbox){
						newList.push(checkList[o]);
					}
				}
				checkList.marquee = checkBool; //全选框赋值
			}
			//返回对象
			if('list'===reType){
				return newList;
			}else if('void'===reType){
				return false;
			}
		}
		//获取多选框选中的数据，以数组的形式返回
		function getCheckbox(msg,value){
        if (msg.datas&&msg.datas.length>0) {
            var checkLength=0;
            var checkList={};
            checkList.checkdata=[];//选中的数据
            checkList.ids=[];//选中数据的id
            angular.forEach(msg.datas,function(item){
              if(item.checkbox===true){
                checkLength+=1;
              };
            });
            if (checkLength<msg.datas.length) {
              msg.allChecked=false;
            }
            if (checkLength===msg.datas.length) {
              msg.allChecked=true;
            }
            if (value==='all'&&checkLength<msg.datas.length) {
              angular.forEach(msg.datas,function(item){
                item.checkbox=true;
                msg.allChecked=true;
              });
            }
             if (value==='all'&&checkLength===msg.datas.length) {
                angular.forEach(msg.datas,function(item){
                item.checkbox=false;
                msg.allChecked=false;
              });
              }
              //获得所选多条数据的id，和单条修改数据
              angular.forEach(msg.datas,function(item){
                if(item.checkbox===true){
                    checkList.checkdata.push(item);
                    if (item.id) {
                      checkList.ids.push(item.id);
                    }

                };
              });
              return checkList;
        }

      }
 }

})()
