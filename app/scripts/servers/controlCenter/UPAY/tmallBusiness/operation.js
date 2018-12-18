'use strict';

;(function () {
	'use strict';
	angular.module('services.operation', [])
		.factory('operationSer', operationSer);
	function operationSer(httpServe,promisesServe,$state) {
		var scheme = {};
		var addBatch = {};
		var submitData = {};
		return {
			planOut:planOut,
			colseModal:colseModal,
			scheme:scheme,
			getScheme:getScheme,
			addBatch:addBatch,
			watchConfigName:watchConfigName,
			submit:submit
		};

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
			//console.log(submitData);
		}
		function watchConfigName(itme){
			/*submitData.ipScheme = itme;
			console.log(submitData);*/
		}

		function submit(){
			var url = '/switch/outsideSwitch';
	          //console.log(submitData)
	          if (submitData !== undefined) {
	          	  var loa=document.getElementById("loading_2");
					loa.style.display="block";
	              httpServe.post(url, JSON.stringify(submitData)).then(function (res) {
	              if (res.state === "success") {
		              	var loa=document.getElementById("loading_2");
						loa.style.display="none";
		              	promisesServe.msgBar('success',res.desc);
		              	scheme.center = "";
		              	//$state.go("disasterRec.assess");
	              }else{
		                promisesServe.msgBar('warning',res.desc);
		                //$state.go('disasterRec.assess');
	              }
	            })
	          }
		}

	};
	operationSer.$inject = ['httpServe','promisesServe','$state'];
})();
