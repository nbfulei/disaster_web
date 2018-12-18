'use strict';

;(function () {
	'use strict';
	angular.module('services.switchView', [])
		.factory('switchViewSer', switchViewSer);
	function switchViewSer($timeout) {
		var datas = [];
		var switchFlag = [];
		var isShow = {};
		return {
			datas:datas,
			query:query,
			nextStep:nextStep,
			initswitchFlag:initswitchFlag,
			switchPage:switchPage,
			executeScript:executeScript,
			isShow:isShow
		};
		function query(){
			var param = [
				{address:'备中心',province:'黑龙江'},
				{address:'备中心',province:'浙江'},
				{address:'主中心',province:'广东'},
				{address:'备中心',province:'湖南'},
			];
			angular.copy(param,datas);
		};
		function initswitchFlag(){
			switchFlag = [
				{program:true,check:false,execute:false,rollback:false,submit:false},
				{program:false,check:true,execute:true,rollback:true,submit:true}
			]
			return switchFlag;
		};
		function nextStep(flag){
			switch(flag){
				case 'program':
					switchFlag[0].program = false;
					switchFlag[0].check = true;
					switchFlag[1].check = false;
					break;
				case 'check':
					switchFlag[0].check = false;
					switchFlag[0].execute = true;
					switchFlag[1].execute = false;
					break;
				case 'execute':
					switchFlag[0].execute = false;
					switchFlag[0].rollback = true;
					switchFlag[1].rollback = false;
					break;
				case 'rollback':
					switchFlag[0].rollback = false;
					switchFlag[0].submit = true;
					switchFlag[1].submit = false;
					break;
			}
			return switchFlag[0];
		};
		function switchPage(flag){$("#12").width(100)
			switchFlag[0] = {program:false,check:false,execute:false,rollback:false,submit:false};
			switch(flag){
				case 'program':
					switchFlag[0].program = true;
					break;
				case 'check':
					switchFlag[0].check = true;
					break;
				case 'execute':
					switchFlag[0].execute = true;
					break;
				case 'rollback':
					switchFlag[0].rollback = true;
					break;
				case 'submit':
					switchFlag[0].submit = true;
					break;
			}
		};
		function executeScript(){
			angular.copy({show:true},isShow)
		};
	};
	switchViewSer.$inject = ['$timeout'];
})();