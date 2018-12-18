;(function (angular) {
	'use strict';
	angular.module('services.alarmDetailsSer',[]).factory('alarmDetailsSer',alarmDetailsSer);
		function alarmDetailsSer(httpServe){
				var errMessage={};


				return{
					errMessage:errMessage,
					qureyOgg:qureyOgg,
					qureyArray:qureyArray,
					qureyFile:qureyFile,
					qureyArea:qureyArea,
					oggBox:oggBox,
					arrayBox:arrayBox,
					fileBox:fileBox,
					areaBox:areaBox,
					dataBox:dataBox,
					qureyData:qureyData

				}
				/*错误信息查询*/
				function qureyOgg(){
					var url='/inspection/array/query';
					var name='02';
					httpServe.post(url,name).then(function(res){
						if(res.state === 'success'){
							angular.copy(res,errMessage);
							//console.log(errMessage);
						}
					})

				}
				function qureyArray(){
					var url='/inspection/array/query';
					var name='01';
					httpServe.post(url,name).then(function(res){
						if(res.state === 'success'){
							angular.copy(res,errMessage);
							//console.log(errMessage.data.array);
						}
					})
				}
				function qureyFile(){
					var url='/inspection/array/query';
					var name= '04';
					httpServe.post(url,name).then(function(res){
						if(res.state === 'success'){
							angular.copy(res,errMessage);
						}
					})
				}
				function qureyData(){
					var url='/inspection/array/query';
					var name = '05';
					httpServe.post(url,name).then(function(res){
						if(res.state === 'success'){
							angular.copy(res,errMessage);
						}
					})
				}

					function qureyArea(){
						var url='/inspection/array/query';
						var name='03';
						httpServe.post(url,name).then(function(res){
							if(res.state === 'success'){
								angular.copy(res,errMessage);
							}
						})
					}

			


					function oggBox(){
						//console.log(222);
						$('#oggbox').toggle();
						$('#arraybox').hide();
						$('#filebox').hide();
						$('#areabox').hide();
						$('#databox').hide();
					}

					function arrayBox(){
						$('#arraybox').toggle();
						$('#oggbox').hide();
						$('#filebox').hide();
						$('#areabox').hide();
						$('#databox').hide();
					}


					function fileBox(){
						$('#filebox').toggle();
						$('#arraybox').hide();
						$('#oggbox').hide();
						$('#areabox').hide();
						$('#databox').hide();
					}

					function dataBox(){
						$('#databox').toggle();
						$('#filebox').hide();
						$('#arraybox').hide();
						$('#oggbox').hide();
						$('#areabox').hide();
					}

					function areaBox(){
						$('#areabox').toggle();
						$('#arraybox').hide();
						$('#filebox').hide();
						$('#oggbox ').hide();
						$('#databox').hide();
					}


	}
		alarmDetailsSer.$inject=['httpServe']
})(angular)
