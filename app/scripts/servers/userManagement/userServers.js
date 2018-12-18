(function () {
  'use strict';
  angular.module('services.userServers', [])
    .factory('userServers', userServers);
  function userServers(httpServe,$timeout,promisesServe,$state,$cookieStore,systemIP,$filter) {
   var disabl={};
   var registeredMsg={};//注册信息
   var changePasswordMsg={//修改密码Msg
     oldPassword:'',
     newPassword:'',
     newPassword2:''
   };
   var pass_word={a1:false,a2:false,a4:false,a5:false};
   var userMessage={};//用户msg
   var queryParam={};//查询参数
   var tempQueryParam={currentPage:1};//点查询，保存查询条件 departmentList
   var idList=[];//选中的ID
   var aUserInfo={};//修改-单条用户信息
   var departmentList={};//所有部门
   var workGroup={};//所有工作组
   var loa=document.getElementById("loading");
   var eyes=document.getElementById("eyes");
    return {
      disabl:disabl,
      registeredMsg:registeredMsg,
      changePasswordMsg:changePasswordMsg,
      registerAccount:registerAccount,
      initMessage:initMessage,
      changePassword:changePassword,
      userQuery:userQuery,
      queryParam:queryParam,
      userMessage:userMessage,
      pagingQuery:pagingQuery,
      clickUpdate:clickUpdate,
      aUserInfo:aUserInfo,
      saveUpdate:saveUpdate,
      deleteUser:deleteUser,
      clickDelete:clickDelete,
      wathPassword:wathPassword,
      pass_word:pass_word,
      compared:compared,
      departmentList:departmentList,
      workGroup:workGroup,
      bindGroup:bindGroup,
      showPassword:showPassword,
      hidenPassword:hidenPassword
    }
    //初始化对象
    function initMessage(){
        pass_word.show=false;
        registeredMsg.loginUser='';
        registeredMsg.staffName='';
        registeredMsg.password='';
        disabl.disabled1=true;//注册-控制按钮不可点击
        disabl.disabled2=true;
        disabl.disabled3=true;
        changePasswordMsg.oldPassword='';
        changePasswordMsg.newPassword='';
        changePasswordMsg.newPassword2='';
        queryParam.loginUser='';
        queryParam.staffName='';
        queryParam.pageCount = 5;
        angular.copy(systemIP.getDepartmentIonfo(),departmentList);
        angular.copy(systemIP.getWorkGroupIonfo(),workGroup);
        
        if (departmentList.datas) {

           angular.forEach(departmentList.datas,function(item){
            item.label=item.departmentname;
            item.value=item.departmentId;
          }); 

        }
        if (workGroup.datas) {
          angular.forEach(workGroup,function(item){
            item.checked=false;
          });
        }
       
    }
    //显示密码
    function showPassword(){
      if (pass_word.show===false) {
        pass_word.show=true;
        $("#eyes").removeClass('glyphicon glyphicon-eye-close');
        $("#eyes").addClass('glyphicon glyphicon-eye-open');
      }else{
        pass_word.show=false;
        $("#eyes").removeClass('glyphicon glyphicon-eye-open');
        $("#eyes").addClass('glyphicon glyphicon-eye-close');
      }
      /*var passwordDom=document.getElementById("password");
      if (passwordDom.type==="text") {
        passwordDom.type="password";
        $("#eyes").removeClass('glyphicon glyphicon-eye-open');
        $("#eyes").addClass('glyphicon glyphicon-eye-close');
      }else{
        passwordDom.type="text";
        $("#eyes").removeClass('glyphicon glyphicon-eye-close');
         $("#eyes").addClass('glyphicon glyphicon-eye-open');
      }*/
    }
    //隐藏密码
    function hidenPassword(){
       /*passwordDom.type="password";
       eyes.style.fontSize="14px";
       $("#eyes").css("left","525px");*/
    }
    //注册 
    function getParam(){
      return registeredMsg;
    }
    //修改密码
    function getpasswordParam(){
      return changePasswordMsg;
    }
    //查询用户
    function getqueryParam(){
      return queryParam;
    }
    //注册
    function registerAccount(reg){
          var tempUrl="/disaster/addUser";
          console.log(registeredMsg);
          var registeredParam=reg;
          loa.style.display="block";
          httpServe.post(tempUrl, JSON.stringify(registeredParam)).then(function (res) {
          loa.style.display="none";
          if (res.result === "0") {
              promisesServe.msgBar('success','注册成功！');
              $timeout(function(){
                initMessage();
                $state.go('login');
              },2000);
                
          }else{
            promisesServe.msgBar('warning',res.resultDesc);
          }
        });
    }
    //监听密码是否可用
    function wathPassword(psw){
          pass_word.a1=false;
          pass_word.a2=false;
          pass_word.a3=false;
          pass_word.a4=false;
          pass_word.a5=false;
          if (psw) {
              //console.log("密码："+psw);
              
              var str= psw.toLowerCase();//转换成小写
              //特殊字符编码
              var code={'~':0,'!':1,'@':2,'#':3,'$':4,'%':5,'^':6,'&':7,'*':8,'(':9,')':10,'_':11,'-':11,'+':12,'=':12};
              //横向键盘code
              var levelLetter={
                               'q':1,'w':2,'e':3,'r':4,'t':5,'y':6,'u':7,'i':8,'o':9,'p':10,
                               'a':12,'s':13,'d':14,'f':15,'g':16,'h':17,'j':18,'k':19,'l':20,
                               'z':22,'x':23,'c':24,'v':25,'b':26,'n':27,'m':28,
                               'Q':30,'W':31,'E':32,'R':33,'T':34,'Y':35,'U':36,'I':37,'O':38,'P':39,
                               'A':41,'S':42,'D':43,'F':44,'G':45,'H':46,'J':47,'K':48,'L':49,
                               'Z':51,'X':52,'C':53,'V':54,'B':55,'N':56,'M':57
              };
              //小写纵向键盘
              var v_l={
                                  '!':1,'1':1,'q':2,'a':3,'z':4,
                                  '@':7,'2':7,'w':8,'s':9,'x':10,
                                  '#':13,'3':13,'e':14,'d':15,'c':16,
                                  '$':19,'4':19,'r':20,'f':21,'v':22,
                                  '%':25,'5':25,'t':26,'g':27,'b':28,
                                  '^':31,'6':31,'y':32,'h':33,'n':34,
                                  '&':37,'7':37,'u':38,'j':39,'m':40,
                                  '*':43,'8':43,'i':44,'k':45,
                                  '(':48,'9':48,'o':49,'l':50
              }
              //大写纵向键盘
              var v_b={
                                  '!':1,'1':1,'Q':2,'A':3,'Z':4,
                                  '@':7,'2':7,'W':8,'S':9,'X':10,
                                  '#':13,'3':13,'E':14,'D':15,'C':16,
                                  '$':19,'4':19,'R':20,'F':21,'V':22,
                                  '%':25,'5':25,'T':26,'G':27,'B':28,
                                  '^':31,'6':31,'Y':32,'H':33,'N':34,
                                  '&':37,'7':37,'U':38,'J':39,'M':40,
                                  '*':43,'8':43,'I':44,'K':45,
                                  '(':48,'9':48,'O':49,'L':50
              }
              for (var i = 0; i < str.length-2; i++) {
                if (str[i]===str[i+1] && str[i+1]===str[i+2]) {
                  pass_word.a1=true;
                  pass_word.a5=false;
                  //console.log("存在至少3个重复的字符");
                  return;
                }
                if (str[i].charCodeAt()+1===str[i+1].charCodeAt() &&str[i+1].charCodeAt()+1 ===str[i+2].charCodeAt()) {
                    pass_word.a2=true;
                    pass_word.a5=false;
                    //console.log("存在至少3个连续的字母或数字");
                    return;
                }
                if (code[str[i]]+1===code[str[i+1]] && code[str[i+1]]+1===code[str[i+2]]) {
                  pass_word.a2=true;
                  pass_word.a5=false;
                  //console.log("存在至少3个连续的特殊字符");
                  return;
                }
                if (levelLetter[psw[i]]+1===levelLetter[psw[i+1]] && levelLetter[psw[i+1]]+1===levelLetter[psw[i+2]]) {
                  pass_word.a4=true;
                  pass_word.a5=false;
                   //console.log("存在至少3个连续的横向键盘字母");
                   return;
                }
                if ((v_l[psw[i]]+1===v_l[psw[i+1]] && v_l[psw[i+1]]+1===v_l[psw[i+2]])||(v_b[psw[i]]+1===v_b[psw[i+1]] && v_b[psw[i+1]]+1===v_b[psw[i+2]])) {
                  pass_word.a4=true;
                  pass_word.a5=false;
                  // console.log("存在至少3个连续的纵向键盘字母");
                   return;
                }
              }
          }
    }
    //判断密码是否相等
    function compared(value1,value2){
      pass_word.a3=false;
    }
    //修改密码
    function changePassword(){
          var tempUrl1="/disaster/modifyUserPassword";
          var passwordParam=getpasswordParam();
          //密码至少由8位及以上及包含大小写字母、数字及特殊符号
          //var regStr = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\.\!\~\_\-@#$%^&*()+=])[a-zA-Z0-9\.\!\~\_\-@#$%^&*()+=]{8,20}$/;
          var regStr = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[\.\!\~\_\-@#$%^&*()+=])[a-zA-Z0-9\.\!\~\_\-@#$%^&*()+=]{8,20}$/;
          if (!regStr.test(passwordParam.newPassword)) {
            pass_word.a5=true;
           return;
          }if (passwordParam.newPassword!==passwordParam.newPassword2) {
            pass_word.a3=true;
            return;
          }
          passwordParam.loginUser=$cookieStore.get('userInfo').loginUser;
          
          loa.style.display="block";
          httpServe.post(tempUrl1, JSON.stringify(passwordParam)).then(function (res) {
          loa.style.display="none";
          if (res.result === "0") {
                promisesServe.msgBar('success','修改成功！');
                initMessage();
          }else{
            promisesServe.msgBar('warning',res.resultDesc);
          }
        });
    }
    //用户查询
    function userQuery(){
          idList=[];
          var tempUrl2="/disaster/queryUserInfo";
          angular.copy(getqueryParam(),tempQueryParam);
          tempQueryParam.currentPage =1;
          queryParam.currentPage=1;
          loa.style.display="block";
          httpServe.post(tempUrl2, JSON.stringify(tempQueryParam)).then(function (res) {
            console.log(res);
          loa.style.display="none";
          if (res.state === "success") {
              if (res.data.datas.length<=0) {
                promisesServe.msgBar('warning',res.desc);
              }else{
                angular.copy(res.data,userMessage);
                filterInfo(userMessage);
              }
          }else{
            promisesServe.msgBar('warning','查询失败!');
          }
              
        });
    }
    //分页查询
    function pagingQuery(num){
          idList=[];
          var tempUrl3="/disaster/queryUserInfo";
          var paging= tempQueryParam;
          paging.currentPage = num;
          loa.style.display="block";
          httpServe.post(tempUrl3, JSON.stringify(paging)).then(function (res) {
          loa.style.display="none";
          if (res.state === "success") {
                angular.copy(res.data,userMessage);
                filterInfo(userMessage);
          }else{
            promisesServe.msgBar('warning',res.desc);
          }
              
        });
    }
    //过滤显示信息到表格
    function filterInfo(msg){
      if (msg.datas.length>0) {

          angular.forEach(msg.datas,function(item){
            var grouparrs=item.workCode.split(',');
            if (item.logLock==='0') {
              item.logLock2='禁用';
            }
            if (item.logLock==='1') {
              item.logLock2='启用';
            }
            if (item.logLock==='9') {
              item.logLock2='删除';
            }
            if (departmentList.datas) {
              angular.forEach(departmentList.datas,function(dep){
                if (item.departmentCode===dep.departmentId) {
                  item.departmentCode2=dep.departmentname;
                }
              });
            }
            if (workGroup.datas) {
              item.workCode2='';
              angular.forEach(workGroup.datas,function(gro){
                
                angular.forEach(grouparrs,function(gr){
                  if (gro.groupId===gr) {
                   item.workCode2+=gro.name+',';
                  }
                });
              });
              item.workCode2=item.workCode2.slice(0,item.workCode2.length-1);
            }
            

            if (item.flag==='00') {
              item.flag='有效';
            }
            if (item.flag==='01') {
              item.flag='失效';
            }
          });
      }
     
    }
    //点击修改
    function clickUpdate(msg){
      if (msg.datas){
      var userMsg=promisesServe.getCheckbox(msg);
      if (userMsg.checkdata.length===0) {
          promisesServe.msgBar('warning','请选择数据进行此操作！');
        }else if(userMsg.checkdata.length>=2){
          promisesServe.msgBar('warning','请选择一条数据进行此操作！');
        }else{
          $('#update').modal('show');
          angular.copy(userMsg.checkdata[0],aUserInfo);
          aUserInfo.expireDates=new Date(aUserInfo.expireDate);

          //初始化工作组选项
          angular.forEach(workGroup.datas,function(item){
              item.checked=false;
          });
          aUserInfo.workGroup='';
          var grouparr=aUserInfo.workCode.split(',');
          $timeout(function(){
              if (workGroup.datas) {
              angular.forEach(workGroup.datas,function(item){
                angular.forEach(grouparr,function(grou){
                  if (item.groupId===grou) {
                    item.checked=true;
                    aUserInfo.workGroup+=item.name+',';
                  }
                });
              });
              aUserInfo.workGroup=aUserInfo.workGroup.slice(0,aUserInfo.workGroup.length-1);
            }
          },0); 
        }
      }
    }
    //绑定工作组
    function bindGroup(index){
      aUserInfo.workGroup='';
      aUserInfo.workCode='';
      workGroup.datas[index].checked=(!workGroup.datas[index].checked);
      angular.forEach(workGroup.datas,function(item){
        if (item.checked===true) {
          aUserInfo.workGroup+=item.name+',';
          aUserInfo.workCode+=item.groupId+',';
        }
      });
      aUserInfo.workGroup=aUserInfo.workGroup.slice(0,aUserInfo.workGroup.length-1);
      aUserInfo.workCode=aUserInfo.workCode.slice(0,aUserInfo.workCode.length-1);
    }
    //保存修改用户信息
    function saveUpdate(amsg){
          var tempUrl4="/disaster/modifyUserInfo";
          loa.style.display="block";
          var y=amsg.expireDates.getFullYear();
          var m=amsg.expireDates.getMonth()+1;
          var d=amsg.expireDates.getDate();
          var datestr=m+' '+d+','+y+',23:59:59';
          var da=new Date(datestr);
          amsg.expireDate=da.getTime();
          //console.log($filter('getFullDate')(amsg.expireDate));
          httpServe.post(tempUrl4, JSON.stringify(amsg)).then(function (res) {
          loa.style.display="none";
          if (res.result==='0') {
                  promisesServe.msgBar('success',"修改成功！");
                  userQuery();
          }else{
            promisesServe.msgBar('warning',res.resultDesc);
          }
              
        });
    }
    //点击删除
    function clickDelete(msgs){
      if (msgs.datas) {
      if (msgs.datas&&msgs.datas.length>0) {
        var userMsgs=promisesServe.getCheckbox(msgs);
        if (userMsgs.checkdata.length===0) {
            promisesServe.msgBar('warning','请选择数据进行此操作！');
          }else{
            $('#delData').modal('show');
          }
        }else{
          promisesServe.msgBar('warning','请选择数据进行此操作！');
        }
      }
    }
    //确认删除用户
    function deleteUser(selectUser){
      idList=[];
      var seleuserMsg=promisesServe.getCheckbox(selectUser);
      if (seleuserMsg.checkdata&&seleuserMsg.checkdata.length>0) {
        angular.forEach(seleuserMsg.checkdata,function(item){
          idList.push(item.loginUser);
        });
        //发送请求
          var tempUrl5="/disaster/delUserInfo";
          var deleteParam={};
          deleteParam.loginUsers=idList.join(',');
          loa.style.display="block";
          httpServe.post(tempUrl5,JSON.stringify(deleteParam)).then(function (res) {
          loa.style.display="none";
          if (res.result==='0') {
                  promisesServe.msgBar('success',"删除成功！");
                  userQuery();
          }else{
            promisesServe.msgBar('warning',res.resultDesc);
          }
              
        });
      }
          
        
    }

  }
  userServers.$inject = ['httpServe','$timeout','promisesServe','$state','$cookieStore','systemIP','$filter'];
})();
