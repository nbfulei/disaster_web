
/**
 * Created by Administrator on 2016/10/14.
 */
(function () {
  'use strict';
  angular.module('services.BatchProcessingSer', [])
    .factory('TmallBatchProcessingSer', TmallBatchProcessingSer);
  function TmallBatchProcessingSer(httpServe,$timeout,promisesServe) {
    var pageParam; //分页参数集合
    var params;
    var batchMessage=[];//查询列表集合;
    var totalCount;//总条数
    var batchSet={};//参数设置集合
    var detail={};
    
    return {
      batchSet:batchSet,
      batchQuery:batchQuery,//条件查询
      initPageParam:initPageParam,//初始化分页
      initParam:initParam,//初始化数据
      batchMessage:batchMessage,
      turnToPage:turnToPage, //分页查询
      
      detail:detail
    };
    //初始化分页
    function initPageParam(){
      pageParam = {
        currentPage:1,   //当前页
        pageCount:10     //每页显示条数
      };
      return pageParam;
    }
    //初始化数据
    function initParam(){
      var params={
        ip:"",
        currentPage:1,
        pageCount:10
      };
      angular.copy(params,batchSet);
    }
    //分页查询
    function turnToPage(page){
          batchSet.currentPage=page;
          //httpServe.post("areas/tmall/download/TmallBatchProcessing",batchSet).then(function(res){
          httpServe.post("/om/batchProcessingQuery",JSON.stringify(batchSet)).then(function(res){
            
            if(res.state === 'success'){
              angular.copy(res.data,batchMessage);
              executionMode(batchMessage.datas);
              if (batchMessage.datas.length>8) {
                batchMessage.scroll=true;
              }else{
                batchMessage.scroll=false;
              }
              if (!res.data.datas||(res.data.datas&&res.data.datas.length<1)) {
                  //暂时去掉 promisesServe.msgBar('warning','暂无数据！');
                }
            }else{
              promisesServe.msgBar('warning',res.desc);
            }
          })
    }

//条件查询 batchQuery  
    function batchQuery(params){
      var param={};
        angular.copy(params,param);
      if(params.ip===null ){
        param.ip="";
      }
      param.currentPage= batchSet.currentPage=1;
      param.pageCount=10;
      httpServe.getProcessingQuery(JSON.stringify(param)).then(function(res){
        if(res.state==='success'){
          angular.copy(res.data,batchMessage);
          executionMode(batchMessage.datas);
          if (batchMessage.datas.length>8) {
                batchMessage.scroll=true;
              }else{
                batchMessage.scroll=false;
              }
          if (!res.data.datas||(res.data.datas&&res.data.datas.length<1)) {
                 //暂时去掉 promisesServe.msgBar('warning','暂无数据！');
                }
        }else{
          promisesServe.msgBar('warning',res.desc);
        }
      });
    }
    //执行方式  UNIX SHELL命令  oracle命令  sybase命令
    function executionMode(data){
      data.forEach(function(item){
        switch (item.implementation){
          case '1':
            item.ation='UNIX SHELL命令';
                break;
          case '2':
            item.ation='oracle命令';
            break;
          default:
            item.ation='sybase命令';
            break;
        }
      })
    }

    

  }
  TmallBatchProcessingSer.$inject = ['httpServe','$timeout','promisesServe'];
})();
