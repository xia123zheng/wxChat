//index.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util')
//微信接口参数

Page({
  data: {
    motto: '人脸拍照',
    userInfo: {
      imageUrl:'../../images/photos.png',
      tips: ""
    }
  },
  //事件处理函数
  uploadImage: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      success: function (res) {
        //console.log(res);
        var tempFilePaths = res.tempFilePaths
        app.globalData.userImage = tempFilePaths[0];
        that.setData({
          userInfo: {
            //填充人脸识别界面的图片
            imageUrl: tempFilePaths[0],
            tips: '人脸识别中...'
          }
        })
        wx.showToast({
          title: '鉴定中，请稍候',
          icon: 'loading',
          duration: 2000
        })
  
        wx.uploadFile({
          url: 'https://api-cn.faceplusplus.com/facepp/v3/detect', //仅为示例，非真实的接口地址
          header: {
            'content-type': 'multipart/form-data'
          },
          filePath: tempFilePaths[0],
          name: 'image_file',
          formData: {
            'api_key': 'EPrFmQlX44wEFEuz0wWnDVhu_TRj-nSQ',
            'api_secret': 'g6gDY8vP7yWXMVNQPS2u0Dd8Rc7yZWO0',
            'return_attributes': "gender,age,ethnicity,beauty,skinstatus"
          },
          success: function (res) {
            console.log(res.data);
            wx.hideToast();
            var data = JSON.parse(res.data);
            //未检测到人脸
            if (data.faces.length == 0) {
              console.log("执行到这")
              that.setData({
                userInfo: {
                  //填充人脸识别界面的图片
                  imageUrl: tempFilePaths[0],
                  tips: '未检测到人脸'
                }},function () {
                  /*setTimeout(function () {
                    wx.reLaunch({
                      url: '../pic/pic'
                    })
                    //发送短信
                    //var returnMsg = util.sendMsg("您","18810388284");
                    //console.log(returnMsg);
                  }, 500)*/
                  console.log("未检测到人脸，不做跳转");
                  
              })
             
             
            // return
            }else{
              //如果检测到人脸
              var face_token = data.faces[0].face_token;
              console.log(face_token);
              wx.request({
                url: "https://api-cn.faceplusplus.com/facepp/v3/search", //仅为示例，并非真实的接口地址
                data: {
                  "api_key":"EPrFmQlX44wEFEuz0wWnDVhu_TRj-nSQ",
                  "api_secret":"g6gDY8vP7yWXMVNQPS2u0Dd8Rc7yZWO0",
                  "face_token":face_token,
                  "faceset_token":"a6cac1d459268ee894b13ba973531ba7"
                },
                dataType: "json",
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                method: "POST",
                success: function (res) {  
                  var data1 = res.data;
                  //console.log("原来的face_token" + JSON.stringify(data1));
                  const genders = {
                    'Male': '帅哥',
                    'Female': '美女'
                  }
                  const names = {
                    '1ccb4af44a10e085d8903d7870b2d8fe': '夏峥先生',
                    'd0804832cad3aa8e98c3899c72747526': '陈明睿先生',
					'52cd38fa8d7d4fab07835d4e863a2c97': '郭芳琳女士',
                    '223088c308655af4f7b054d0cd6281bd': '易平女士'
                  }
                 
                  var confidence = data1.results[0].confidence;
                  if(confidence > 80){
                    //同一个人
                    console.log("是同一个人");
                    var face_token_new = data1.results[0].face_token;
                    console.log("最新的"+face_token_new);

                    //更新人脸检测数据
                    app.globalData.username = names[face_token_new];
					//发送短信
                    var returnMsg = util.sendMsg(names[face_token_new],"18810388284");
                    //刷新页面
                    that.setData({
                      userInfo: {
                        imageUrl: tempFilePaths[0],
                        tips: '一位' + data.faces[0].attributes.age.value + '岁的' + genders[data.faces[0].attributes.gender.value]
                      }
                    }, function () {
                      //页面跳转
                      setTimeout(function () {
                        wx.reLaunch({
                          url: '../pic/pic'
                        })
                      }, 500)
                    });

                  }else{
                    console.log("新用户");
                    //更新人脸检测数据
                    app.globalData.username = "";
					
					//发送短信
                    var returnMsg = util.sendMsg("您","18810388284");
                    //刷新页面
                    that.setData({
                      userInfo: {
                        imageUrl: tempFilePaths[0],
                        //tips: '一位' + data.faces[0].attributes.age.value + '岁的' + genders[data.faces[0].attributes.gender.value]
                        tips:'新客户'
                      }},function(){
                        //页面跳转
                        setTimeout(function () {
                          wx.reLaunch({
                            url: '../pic/pic'
                          })
                        }, 500)
                      });

                   
                      
                  }
                  /*that.setData({
                    userInfo: {
                      imageUrl: tempFilePaths[0],
                      tips: '一位' + data.faces[0].attributes.age.value + '岁的' + genders[data.faces[0].attributes.gender.value]
                    }
                  })*/
                }
                
                
              })
              
            }

          },

        })
      }
    })
  },
  
  onLoad: function () {
    console.log('onLoad')
   
  }
})
