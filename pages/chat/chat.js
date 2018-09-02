//index.js
//获取应用实例
var app = getApp()
var myData = require('../../utils/data')
var util = require('../../utils/util')

Page({
  // 页面初始数据
  data: {
    userData: myData.userData(),
    imageUrl : app.globalData.userImage,
    addrDate: util.replacePhone(myData.userData().addrs, true),
    listData: [
      { "code": "01", "text": "text1", "type": "type1" },
      { "code": "02", "text": "text2", "type": "type2" },
      { "code": "03", "text": "text3", "type": "type3" },
      { "code": "04", "text": "text4", "type": "type4" },
      { "code": "05", "text": "text5", "type": "type5" },
      { "code": "06", "text": "text6", "type": "type6" },
      { "code": "07", "text": "text7", "type": "type7" }
    ]
  },
  // 地址编辑
  editAddr: function (e) {
    console.log(e)
    
    wx.navigateTo({
      url: '../edit_addr/edit_addr?addrid=' + e.currentTarget.dataset.addrid
    })
  },
  onReady: function () {
    var that = this;
    that.setData({
      imageUrl: app.globalData.userImage

    })

  },
   onLoad: function () {
     console.log('onLoad')
    var that = this;
    /*wx.request({
      url:'http://www.phonegap100.com/appapi.php?a=getPortalCate',//请求地址
      data:{//发送给后台的数据
        name:"bella",
        age:20
      },
      header:{//请求头
        "Content-Type":"applciation/json"
      },
      method:"GET",//get为默认方法/POST
      success:function(res){
        console.log(res.data);//
　　　　 that.setData({//如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数
　　　　    logs:res.data.result

　　　　 })

      },
      fail:function(err){},//请求失败
      complete:function(){}//请求完成后执行的函数
    }) */
    

  }

})
