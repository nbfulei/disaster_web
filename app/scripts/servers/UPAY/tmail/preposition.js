'use strict';

;(function () {
	'use strict';
	angular.module('services.tmail', [])
		.factory('tmailSer', tmailSer);
	function tmailSer($timeout) {
		var tmailPre = [];
		var configDetail = {};
		return {
			initTmailPre:initTmailPre,
			changeBtn:changeBtn,
			showDetail:showDetail,
			configDetail:configDetail
		};
		function initTmailPre(){
			tmailPre = [
				{id:1,hostName:'upay2',ip:'192.168.88.26',versions:'01',onLineTime:'2016.07.20',isHealthy:true,index:'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'},
				{id:2,hostName:'upay2',ip:'192.168.88.27',versions:'02',onLineTime:'2016.07.19',isHealthy:true,index:'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'},
				{id:3,hostName:'upay_dr',ip:'192.168.88.28',versions:'00',onLineTime:'2016.07.06',isHealthy:false,index:'jdhfsjhd'},
				{id:4,hostName:'pboss',ip:'192.168.88.29',versions:'06',onLineTime:'2016.07.06',isHealthy:true,index:'的互设哦一的还是更科技示范户是会计师被对方不必须'},
			];
			return tmailPre;
		};
		function changeBtn(param){
			$timeout(function(){
				angular.forEach(tmailPre,function(item){
					if(param.id === item.id){
						if(param.buttom===undefined||item.buttom === '启动'){
							item.buttom = '停止';
						}else if(item.buttom === '停止'){
							item.buttom = '启动';
						};
					};
				})},0);
		};
		function showDetail(param){
			angular.copy(param,configDetail);
		};
	};
	tmailSer.$inject = ['$timeout'];
})();