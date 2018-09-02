//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    uindex: null,
    UI: [
      {greeting: "欢迎回来!"}, // Chinese UI
      {greeting: "Welcome back!"},  // English UI
      {greeting: "お帰りなさい!"}
    ],
    list: [
      {
        id: 'timecard',
        name: ['打卡', 'Time Card', '打刻'],
        open: false,        
        pages: [
          {path: "normal", title: ["正常出勤", "Normal Checkin", '通常出勤']},
          {path: "history", title: ["打卡记录", "Check History", "打刻履歴"]}
          ]
      }, {
        id: 'overwork',
        name: ['各类申请', 'Application', "各種申請"],
        open: false,        
        pages: [
          {path: "create", title: ["加班申请", "Apply Overwork", "残業申請"]},
          {path: "list", title: ["休假申请", "Apply vacation", "休暇申請"]}
          ]
      }, {
        id: 'sample',
        name: ['申请审批', 'Improvement', "申請承認"],
        open: false,        
        pages: [
          {path: "index", title: ["子菜单", "Sub-menu", "サブメニュー"]}
          ]
      }
    ]
  },
  //事件处理函数
  kindToggle: function (e) {        
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },
  onLoad: function () {
    console.log('onLoad')

    
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onShow:function(){
    // 设置app语言的全局变量  
    var selectedLanguage = app.globalData.settings.language;
    console.log('Current Language:' + selectedLanguage + ' (0: ZH-ch 1: ENG)');
    this.setData({
      uindex: selectedLanguage    
    })
  }
})
