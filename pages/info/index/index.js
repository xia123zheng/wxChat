// pages/sample/index/index.js
var app = getApp()
Page({
  data:{
    userInfo: {},
    uindex: null,
    UI: [
      { greeting: "欢迎回来!" }, // Chinese UI
      { greeting: "Welcome back!" },  // English UI
      { greeting: "お帰りなさい!" }
    ],
    grids: [
      {name:'薪水', path: "salary", icon: "salary.png",isunread: false,
        unreadNum: 1}, 
      {name:'组织', path: "salary", icon: "diagram.png",isunread: false,
        unreadNum: 1}, 
      {name:'公告', path: "salary", icon: "megaphone.png",isunread: false,
        unreadNum: 1}, 
      {name:'分析', path: "salary", icon: "presentation.png",isunread: false,
        unreadNum: 1}, 
      {name:'KPI', path: "salary", icon: "graph.png",isunread: false,
        unreadNum: 1}, 
      {name:'考勤', path: "kaoqin", icon: "credit-card.png",isunread: false,
        unreadNum: 1}, 
      {name:'账户', path: "salary", icon: "check.png",isunread: false,
        unreadNum: 1},
      {name:'订单', path: "order", icon: "neworder.png",isunread: true,
        unreadNum: 1}]
  },
  onLoad:function(options){
    console.log('onLoad')

    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 设置app语言的全局变量  
    var selectedLanguage = app.globalData.settings.language;
    console.log('Current Language:' + selectedLanguage + ' (0: ZH-ch 1: ENG)');
    this.setData({
      uindex: selectedLanguage
    })

  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})