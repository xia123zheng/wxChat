// pages/timecard/normal/normal.js
//获取应用实例
var app = getApp()
var util = require('../../../../utils/util.js')
var amapFile = require('../../../../utils/amap-wx.js');

const AV = require('../../../../utils/av-weapp-min.js');
const Check = require('../../../../model/check.js')

Page({
  data:{
    latitude: 0,
    longitude: 0,
    displayTime: null,
    uindex: null,
    index: 0,
    title: null,
    checkType: [
      [{id: "clockIn", msg: "上班"}, {id: "clockOut", msg: "下班"}],
      [{id: "clockIn", msg: "Clock In"}, {id: "clockOut", msg: "Clock Out"}],
      [{id: "clockIn", msg: "出勤"}, {id: "clockOut", msg: "退勤"}],
      
    ],      
    loading: false, // 更新地理位置加载状态
    checkMode: {},
    UI: [
      {checkType: "打卡目的", current: "当前选择", locName: "位置名称", locDesc: "详细位置", locNameContent: "等待获取", locDescContent: "等待获取", locButton: "更新定位", submitButton: "提交"},
      {checkType: "Type", current: "Current", locName: "Location", locDesc: "Detail", locNameContent: "Waiting", locDescContent: "Waiting", locButton: "Update Location", submitButton: "Submit"},
      {checkType: "打刻種類", current: "選択項目", locName: "現在場所", locDesc: "詳細位置", locNameContent: "取得待ち", locDescContent: "取得待ち", locButton: "場所再取得", submitButton: "打刻"}
      ]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({      
      loading: true
    })
    var selectedLanguage = app.globalData.settings.language;
    var toastTitle = ['定位成功', 'Got Location', '取得完了'][selectedLanguage];
    var that = this;
    var ui = that.data.UI;
    var amap = new amapFile.AMapWX({key:'8ebbe699d71eed6674889848604e411a'});
    
    amap.getRegeo({      
      success: function(data){
        //成功回调
        wx.showToast({
          title: toastTitle,
          icon: 'success',
          duration: 1000
        })
        // 改写UI，反映在视图层
        console.log(data[0])
        ui[selectedLanguage].locNameContent =  data[0].name
        ui[selectedLanguage].locDescContent =  data[0].desc
        var lat = data[0].latitude;
        var lon = data[0].longitude; 
        that.setData({
          UI: ui,          
          latitude: lat,
          longitude: lon,
          loading: false
        })  
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
    this.setData({
        displayTime: util.currentTime()    
      });
  },
  onShow:function(){
    // 设置app语言的全局变量  
    var selectedLanguage = app.globalData.settings.language;
    console.log('Current Language:' + selectedLanguage + ' (0: ZH-ch 1: ENG 2:JP)');
    var title = ["打卡", "Timecard", "打刻"][selectedLanguage];
    this.setData({
      uindex: selectedLanguage,
      title: title
    })
    // 时间显示
    var that = this;
    setInterval(function(){
      that.setData({
        displayTime: util.currentTime()    
      });
    }, 1000)
  },
  bindPickerChange:function(e){
    // 页面隐藏
    this.setData({
      index: e.detail.value
    })
  },
  relocate: function(){
    this.setData({      
      loading: true
    })
    var selectedLanguage = app.globalData.settings.language;
    var toastTitle = ['定位成功', 'Got Location', '取得完了'][selectedLanguage];
    var that = this;
    var ui = that.data.UI
    var amap = new amapFile.AMapWX({key:'8ebbe699d71eed6674889848604e411a'});
    
    amap.getRegeo({      
      success: function(data){
        console.log(data)
        //成功回调
        wx.showToast({
          title: toastTitle,
          icon: 'success',
          duration: 1000
        })
        // 改写UI，反映在视图层
        ui[selectedLanguage].locNameContent =  data[0].name
        ui[selectedLanguage].locDescContent =  data[0].desc
        that.setData({
          UI: ui,
          loading: false,
          latitude: data[0].latitude,
          longitude: data[0].longitude,           
        })  
      }
    })
    
  },
  formSubmit: function(e){
    var that = this;
    if(AV.User.current() !== null){
      // 有账户绑定时
      var acl = new AV.ACL();
      acl.setPublicReadAccess(false);
      acl.setPublicWriteAccess(false);
      acl.setReadAccess(AV.User.current(), true);
      acl.setWriteAccess(AV.User.current(), true);

      var currentTime = new Date();
      console.log(that.data.latitude)
      console.log(that.data.longitude)
      var currentLocation = new AV.GeoPoint(that.data.latitude, that.data.longitude);
      console.log(currentLocation)
      // store the check
      new Check({
        timestamp: currentTime,
        checkType: e.detail.value.type,
        location: e.detail.value.name,
        address: e.detail.value.address,
        user: AV.User.current(),
        geo: currentLocation
      }).setACL(acl).save().then(wx.navigateTo({
        url: '../history/history'
      })); 

    }else{
      // 无账户绑定
      wx.showModal({
        title: '当前无绑定账户',
        content: '请绑定账户后，再进行考勤打卡',        
        cancelText: '返回',
        confirmText: '去绑定',
        success: function(res){      
          if(res.confirm) {
            wx.navigateTo({
              url: '../../user/user'
            })
          } else {            
            wx.navigateBack({delta: 1});
          }
        }
      })      
    }

  }
})