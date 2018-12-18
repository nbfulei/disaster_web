;(function(){
	'use strict';
	/**
	 * @ngdoc function
	 * @name controllers.userMng.userLogin
	 * 用户登录
	 * controller:userRolesController
	 * @param:
	 * @userName:aixing
	 * @Date:2015/9/1
	 * */
	angular.module('controllers.userLogin',[]).controller('userLoginController',userLogin);
	
	//function userLogin($scope,userLoginService){
	function userLogin($scope,$rootScope,$state,$stateParams,$timeout,$cookieStore,httpServe,mainServe,promisesServe,userServers,$filter){//$stateParams路由参数，跟app.js的$stateProvider.state对应使用
		//$scope.vm=false;
		$scope.shouvm=function(){
			if ($scope.vm===true) {
				$scope.vm=false;
			}
		};
		//注册信息
		$scope.registeredMsg=userServers.registeredMsg;
		//注册
		$scope.registerAccount=userServers.registerAccount;
		//初始化对象
		$scope.initMessage=userServers.initMessage();
		//注册--按钮检测
		$scope.disabl=userServers.disabl;
		//修改密码的mdg
		$scope.changePasswordMsg=userServers.changePasswordMsg;
		//修改密码fun
		$scope.changePassword=userServers.changePassword;
		//用户msg
		$scope.userMessage=userServers.userMessage;
		//用户查询参数
		$scope.queryParam=userServers.queryParam;
		//用户查询
		$scope.userQuery=userServers.userQuery;
		//用户分页查询
		$scope.pagingQuery=userServers.pagingQuery;
		//用户多选
		$scope.checkUserInfo=promisesServe.getCheckbox;
		//点击修改
		$scope.clickUpdate=userServers.clickUpdate;
		//所有部门 
		$scope.departmentList=userServers.departmentList;
		//所有工作组
		$scope.workGroup=userServers.workGroup;
		//绑定工作组
		$scope.bindGroup=userServers.bindGroup;
		//单条用户信息
		$scope.aUserInfo=userServers.aUserInfo;
		//保存修改
		$scope.saveUpdate=userServers.saveUpdate;
		//点击删除
		$scope.clickDelete=userServers.clickDelete;
		//确认删除用户
		$scope.deleteUser=userServers.deleteUser;
		//检测密码是否合规
		$scope.wathPassword=userServers.wathPassword;
		//对比两次输入密码是否一致
		$scope.compared=userServers.compared;
		//是否可点击
		$scope.pass_word=userServers.pass_word;
		//用户
		$scope.user={};
		//显示密码
		$scope.showPassword=userServers.showPassword;
		//隐藏密码
		$scope.hidenPassword=userServers.hidenPassword;
		//生成验证码
		$scope.changeVerCode=function(){
			var tempNum=0;
			$scope.user.verCodeErro=false;
			$scope.user.verCode='';
			if ($scope.user.imgsrc) {
				tempNum=$scope.user.imgsrc;
			}
			$scope.user.imgsrc=Math.floor(Math.random()*20)+1;
			if (tempNum===$scope.user.imgsrc) {
				$scope.changeVerCode();
			}
		}
		$scope.changeVerCode();
		//登录
		$scope.login=function(){
			var param={};
			angular.copy($scope.user,param);
			//密码至少由8位及以上及包含大小写字母、数字及特殊符号
            //var regStr = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\.\!\~\_\-\`\,@#$%^&*()+=])[a-zA-Z0-9\.\!\~\_\-\`\,@#$%^&*()+=]{8,20}$/;
            var regStr = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[\.\!\~\_\-\`\,@#$%^&*()+=])[a-zA-Z0-9\.\!\~\_\-\`\,@#$%^&*()+=]{8,20}$/;
            if (!regStr.test(param.password)) {
                 $scope.pass_word.a5=true;
             return;
            }
            
			var matchVerCode={
				'1':"dzr2",'2':"kwdk",'3':"t73y",'4':"lwhy",'5':"pqiu",'6':"ucmu",'7':"vnxr",'8':"3ujx",'9':"2nvc",'10':"3fhy",
				'11':'iyqf','12':'qbip','13':'anik','14':'atg6','15':'b8md','16':'sw4g','17':'vuad','18':'cqaq','19':'ipur','20':'47yp'
			};
			var match=matchVerCode[$scope.user.imgsrc];
			if ($scope.user.verCode.toLowerCase()!==match) {
				$scope.user.verCodeErro=true;
				$timeout(function(){
					$scope.user.verCodeErro=false;
				},4000);
				return;
			}
			 var url="/disaster/userLogin";
             httpServe.post(url,JSON.stringify(param)).then(function (res) {
               var loa33=document.getElementById("loading");
               loa33.style.display="none";
               if (res.state === "SUCCSE") {
	              var day=new Date();
	              var days=day.getTime();
	              $rootScope.confirm={};
	              //if (res.data.expireDate&&res.data.flag) {
	              if (res.data.flag) {
	              	/*if (res.data.expireDate<days) {
	               	  	$rootScope.confirm.flag=true;
	               	  	$rootScope.confirm.msg="您的密码已过期!";
	               	  	return;
               	    }*/
               	  	if (res.data.flag==='0') {//暂定0-4A,1-本地
               	  		$rootScope.confirm.flag=true;
	               	  	$rootScope.confirm.msg="4A接口已开启，请通过4A系统登入!";
	               	  	return;
               	  	}
               	  	$cookieStore.put('userInfo',res.data);
               	  	$cookieStore.put('uiSerf',"disasterRec.tmallBusRunningStatus");
               	  	//设置权限
               	  	if ($cookieStore.get('userInfo').safeMode==='1') {//1高权限，0低权限
                      $rootScope.userRights = userRightMessage;
                    }else if($cookieStore.get('userInfo').safeMode==='0'){
                      $rootScope.userRights = userRightMessage2;
                    }
	               	$state.go('disasterRec.tmallBusRunningStatus');
	              }else{
	              	    $rootScope.confirm.flag=true;
	               	  	$rootScope.confirm.msg="系统错误！";
	              }
               }else{
               	promisesServe.msgBar('warning',res.data);
               }
            });
			 //window.open("http://10.192.10.120:8080/usersmanager/common/login.html","_self");
		}

  }
  userLogin.$inject = ['$scope','$rootScope','$state','$stateParams','$timeout','$cookieStore','httpServe','mainServe','promisesServe','userServers','$filter'];
})();

