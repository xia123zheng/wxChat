// pages/sample/index/index.js
Page({
  data:{
    topics: null
  },
  onLoad:function(options){
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: 'https://www.v2ex.com/api/topics/hot.json',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data)
        wx.hideNavigationBarLoading()

        that.setData({
          topics: res.data
        })
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})