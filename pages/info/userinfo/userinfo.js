var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var app = getApp();
var windowWidth = app.systemInfo.windowWidth
var wxCharts = require("../../../utils/dist/wxcharts.js");

Page({
    data: {
        tabs: ["用户信息", "推荐产品"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        imageUrl: app.globalData.userImage,
        listData: [
          { "code": "316907", "type": "招银进宝系列", "money": 5, "time":5,"benefit": 5.25,"risk":"R5" },
          { "code": "316996 ", "type": "招银进宝系列", "money": "3", "time": 6, "benefit": "5.23", "risk": "R4"  },
          { "code": "317082 ", "type": "招银进宝系列", "money": "4", "time": 10, "benefit": "5.22", "risk": "R3"  },
          { "code": "116414 ", "type": "焦点联动系列 ", "money": "4", "time": 3, "benefit": "5.10", "risk": "R5"  },
          { "code": "863003", "type": "私人银行专享联动系列", "money": "50", "time": 12, "benefit": "5.05", "risk": "R1" }
   
        ]
    },
    onLoad: function () {
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });

        //填充echart图
        new wxCharts({
          canvasId: 'radarCanvas',
          type: 'radar',
          dataItem: { color: '#fff'},
          categories: ['大学精英', '爱理财', '社交广', '良好信用', '旅游达人', '钻石客户'],
          series: [{
            name: '用户画像分析',
            data: [90, 110, 125, 95, 87, 122]
          }],
          width: 400,
          height: 200,
          extra: {
            radar: {
              max: 150
            }
          }
        });
    },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    }
});