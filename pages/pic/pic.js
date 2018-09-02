// pages/pic/pic.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msglist: [],
    scrollTop: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.username);
    var msg = { 'type': 1, 'msg': app.globalData.username+"您好，欢迎来办理业务"}
    var msglist = this.data.msglist;
    msglist.push(msg);
    this.setData({
      msglist: msglist,
      scrollTop: this.data.scrollTop
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onready");


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //发送信息
  send: function (e) {
    console.log(e.detail.value.msg);
    var msg = { 'type': 0, 'msg': e.detail.value.msg };
    //将发送数据存放到list中
    var msglist = this.data.msglist;
    msglist.push(msg);
    //更新视图
    this.setData({
      msglist: msglist

    });
    this.getReply(e.detail.value.msg);
  },
  //请求图灵API
  getReply: function (sendMsg) {
    var that = this;
    wx.request({
      url: "https://www.fintechwuzhao.cn", //仅为示例，并非真实的接口地址
      data: {
        "msg": sendMsg
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      method: "POST",
      success: function (res) {
        console.log(res.data);

        var msg = { 'type': 1, 'msg': res.data }
        var msglist = that.data.msglist;
        msglist.push(msg);
        that.setData({
          msglist: msglist,
          scrollTop: that.data.scrollTop + 100
        });
        console.log(msglist);
      }
    })
  }



})