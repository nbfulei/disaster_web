exports.request = function(app,queryResponse){
  //用户查询
  app.post('/security/sysMng/userMng/userQuery',function(req,res){
    var resBody = paging(req.body,queryResponse.userInfo);
    res.send({data:resBody,result:'success',totalCount:'16'});
  });
  //新增用户
  app.post('/security/sysMng/userMng/userAddition',function(req,res){
    res.send({result:'success'});
  });

  //修改用户
  app.post('/security/sysMng/userMng/userUpdate',function(req,res){
    res.send({result:'success'});
  });

  //删除用户
  app.post('/security/sysMng/userMng/userDeletion',function(req,res){
    res.send({result:'success'});
  });

  //查询全部角色
  app.post('/security/sysMng/roleMng/findRoleList',function(req,res){
    res.send({data:queryResponse.roleList,result:'success'});
  })

  //检测用户名是否重名
  app.post('/security/sysMng/userMng/userNameCheck',function(req,res){
    res.send({result:'success'});
  });

  //检测用户邮箱是否重名
  app.post('/security/sysMng/userMng/userEmailCheck',function(req,res){
    res.send({result:'success'});
  });

  //生命周期邮箱被使用查询
  app.post('/security/certificate/certificateCycle/cycleEmailCheck',function(req,res){
    res.send({result:'success'});
  });

  //修改用户密码
  app.post('/security/sysMng/userMng/modifyPwd',function(req,res){
    res.send({result:'success'});
  });

  //全用户查询
  app.post('/security/sysMng/userMng/allQuery',function(req,res){
    res.send({data:queryResponse.userInfo,result:'success'});
  });

  //保存生命周期设置
  app.post('/security/certificate/certificateCycle/remindSite',function(req,res){
    res.send({result:'success'});
  });
  
  //周期设置查询
  app.post('/security/certificate/certificateCycle/remindFind',function(req,res){
    var resValue = queryResponse.remindSite;
    resValue.result = 'success';
    res.send(resValue);
  });

  //生命周期查询
  app.post('/security/certificate/certificateCycle/cycleFind',function(req,res){
    res.send(
      {
        result:'success',
        data:queryResponse.cycleView,
        index:['cerBeginTime','cerUploadTime','cerCheckTime','cerExpirationTime'],
        vanish:'1,y',
        systemTime: 1476116820251
      }
    );
  });

  // //下载前进行的证书查询
  // app.post('/security/sysMng/certificate/findAllCertificateWithKeyword',function(req,res){
  //   res.send({
  //     state:'10000',
  //     data:queryResponse.certs
  //   });
  // });
  
  //证书下载
  app.post('/security/sysMng/certificate/certificateDownload',function(req,res){
    res.send('123456');
  });

  //证书操作记录
  app.post('/security/sysMng/certificate/queryOperation',function(req,res){
    if(Math.random()<0.5){
      res.send({
        result:'success',
        data:queryResponse.certOperationHistory
      });
    }else{
      res.send({result:'success'});
    }
  });

  function paging(reqBody, resData) {
    var page = {
      currentPage: Number(reqBody.currentPage),
      pageSize: Number(reqBody.pageSize)
    };
    var data = [];
    for (var currRow = (page.currentPage - 1) * page.pageSize; currRow < resData.length && currRow < page.currentPage * page.pageSize; currRow++) {
      data.push(resData[currRow]);
    }
    var responseValue = data;
    return responseValue;
  }
};