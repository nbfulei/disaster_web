//var socketConfig="192.168.117.87:8888";
//var socketConfig="192.168.0.41:8888";
//var socketConfig="127.0.0.1:8888";
(function(){
  'use strict';
  angular.module('services.systemIP',[])
    .factory('systemIP',systemIP);

  function systemIP(Restangular,$state,mainServe,$cookieStore){
    var obj = {
      _modules: '',
      userInfo:{},
      department:{},
      workGroup:{},
      getSystemModules: getSystemModules,
      getAuthority:getAuthority,
      getDepartmentIonfo:getDepartmentIonfo,
      getUser:getUser,
      getDepartment:getDepartment,
      getWorkGroup:getWorkGroup,
      getWorkGroupIonfo:getWorkGroupIonfo
    };

    return obj;
    //获取scoket.IO的请求
    function getSystemModules(){
      return Restangular.one('/manage/host/getIP').post().then(function(res){
        obj._modules = res.data;
      });
    }
    //获取scoket.IO的IP
    function getUser(){
      return obj._modules;
    }
     //获取用户和权限的请求
     function getAuthority(){
      return Restangular.one('/disaster/userAuthority').post().then(function(res){
        if (res.data) {
          obj.userInfo = res.data;
          $cookieStore.put('userInfo',res.data);
        }
      });
     }
    
     //获取所有部门的请求
     function getDepartment(){
      return Restangular.one('/disaster/queryDepartment').post().then(function(res){
        obj.department = res.data;
      });
     }
     //返回所有部门
     function getDepartmentIonfo(){
      return obj.department;
     }

     //获取所有部门的工作组
     function getWorkGroup(){
      return Restangular.one('/disaster/queryWorkGroup').post().then(function(res){
        obj.workGroup = res.data;
      });
     }
     //返回所有工作组
     function getWorkGroupIonfo(){
      return obj.workGroup;
     }
  }
}());
