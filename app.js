//app.js
const AV = require('./utils/av-weapp-min.js')

// LeanCloud 应用的 ID 和 Key
AV.init({
  appId: 'z9dWOxquTBh7kIH0BGXlHjEa-gzGzoHsz',
  appKey: 'wA3sIlhOWzVHQubxmJyK2Ef8',
});

console.log(AV)
App({
  onLaunch: function () {
    //进入应用时检查语言设置
    var language = wx.getStorageSync('selectedLanguage');
    if (language) {
      this.globalData.settings.language = language;
    } else {
      //使用系统语言设定 user-info COUNTRY, 暂时默认为中文 
      this.globalData.settings.language = 0;
    }
    //检查EMP ID设置
    var emp = wx.getStorageSync('employeeId')
    if (emp) {
      this.globalData.settings.employeeId = emp
    } else {
      this.globalData.settings.employeeId = null
    }

    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    //获取系统参数
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.systemInfo = res;
      }
    })
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
              console.log(res.userInfo)
              //在LocalStorage中储存用户信息 
              wx.setStorage({
                key: 'userInfo',
                data: res.userInfo
              })
            }
          })
        }
      })
    }
  },
  globalData: {
    settings: {
      language: null,
      employeeId: null
    },
    userInfo: null,
    username: "",
    //数据展示页面的所有数据信息
    userImage: ""
  },
  //系统参数
  systemInfo: null,
})