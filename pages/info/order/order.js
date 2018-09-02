const app = getApp();
const api = require('../../../utils/api.js')
Page({
  data: {
    width: app.systemInfo.windowWidth,
    height: app.systemInfo.windowHeight,
    pixelRatio: app.systemInfo.pixelRatio,
    //pros是存放所有数据
    pros: [],
    select: 'all',
    showLoadMore: false,
    hasMore: true,
    loading: false,

  },

  onLoad() {
    this.getList(false);
    // console.log('height:'+this.data.height);
  },
  
  //暂时没有用到
  proInfo(event) {
    const that = this;
    const pid = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'proinfo/proinfo?pid=' + pid,
    })
  },
  //切换导航按钮
  navbtn(event) {
    const index = event.currentTarget.dataset.id;
    const that = this;
    if (index == '1') {
      that.setData({
        select: 'all',
      })
    } else {
      that.setData({
        select: '',
      })
    }
    that.getList(false);
  },
  //获取列表
  getList(loadMore) {
    const that = this;
    const loading = that.data.loading;
    //正在加载
    if (loading) {
      return;
    }
    that.setData({
      loading: true,
    });
    // if (!loadMore) {
    //     wx.showNavigationBarLoading();
    // }

    //select == 'all'代表所有，select == ''是关注的
    if (that.data.select == 'all') {
      that.getProList(loadMore);
    } else {
      that.getAttentionList();
    }
  },

  attentionBtn(event) {
    const that = this;
    const dataModel = event.currentTarget.dataset;
    if (dataModel.attentionid == '') {
      that.addAttention(dataModel.pid, dataModel.index);
    } else {
      that.cancelAttention(dataModel.attentionid, dataModel.index);
    }
  },

  loadMore() {
    // const that = this;
    // if (that.data.select == 'all') {
    //     that.setData({
    //         showLoadMore: true,
    //     })
    //     that.getList(true);
    // } else {
    //     return;
    // }
  },
  getProList(loadMore) {
    const that = this;
    let offset = 0;
    if (loadMore) {
      offset = that.data.pros.length;
    } else {
      offset = 0;
    }
    //获取列表数据
    api.getProList({
      data: {
        openId: app.globalData.userInfo.openId,
        limit: 10,
        offset: offset,
      },

      success(res) {
        console.log(res);
        let temps = res.data;
        if (loadMore) {
          temps = that.data.pros.concat(temps);
        }
        that.setData({
          pros: temps,
        })
      },
      complete() {
        if (!loadMore) {
          wx.hideNavigationBarLoading();
        }
        that.setData({
          loading: false,
          showLoadMore: false,
        })
      }
    })
  },

  getAttentionList() {
    const that = this;
    api.getAttentionList({
      data: {
        openId: app.globalData.userInfo.openId,
      },
      success(res) {
        that.setData({
          pros: res.data,
        })
      },
      fail() {
        that.setData({
          pros: [],
        })
      },
      complete() {
        wx.hideNavigationBarLoading();
        that.setData({
          loading: false,
          showLoadMore: false,
        })
      }
    })
  },

  addAttention(pid, index) {
    console.log('pid:' + pid + 'index:' + index);
    const that = this;
    wx.showNavigationBarLoading();
    api.addAttention({
      data: {
        openId: app.globalData.userInfo.openId,
        pid: pid
      },

      success(res) {
        console.log('id:' + res.data);
        let temps = that.data.pros;
        temps[index].attention = res.data;
        that.setData({
          pros: temps,
        })
      },
      complete() {
        wx.hideNavigationBarLoading();
      }
    })
  },

  cancelAttention(attentionid, index) {
    console.log('attentionid:' + attentionid + 'index:' + index);
    const that = this;
    wx.showNavigationBarLoading();
    api.cancelAttention({
      data: {
        openId: app.globalData.userInfo.openId,
        attentionId: attentionid
      },

      success(res) {
        let temps = that.data.pros;
        temps[index].attention = '';
        that.setData({
          pros: temps,
        })
      },
      complete() {
        wx.hideNavigationBarLoading();
      }
    })
  }

})