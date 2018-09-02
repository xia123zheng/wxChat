const baseUrl = 'https://www/index.php';

const getAPI = (param, url) => {
    console.log('url:'+url);
    wx.request({
        url: url,
        data: param.data || {},
        method: param.method || 'POST',
        header: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        }, // 设置请求的 header
        success: function (res) {
            console.log(res)
            if (res.statusCode == 200 && res.data.status == '200' && param.success) {
                param.success(res.data);
            } else {
                  console.log("fail")
                if (param.fail) {
                    param.fail(res.data.status,res.data.message);
                }
            }
        },
        fail: function () {
            if (param.fail) {
                param.fail();
            }
            console.log('失败')
        },
        complete: function () {
            if (param.complete) {
                param.complete();
            }
            console.log('完成')
        }
    })
}

const upload = (params) =>{
    wx.uploadFile({
      url:`${baseUrl}/upload/upfile`,
      filePath:params.filePath,
      name:params.name,//'avatar' 头像   'picture' 文章图片
      header: {
             Accept: 'application/json',
            'Content-type': 'multipart/form-data'
      }, // 设置请求的 header
      // formData: {}, // HTTP 请求中其他额外的 form data
      success: function(res){
               console.log(res)
            if (res.statusCode == 200 && params.success) {
                let result = res.data.replace(/"/g,'');
                 console.log('result:' + result); 
                params.success(result);
            } else {
                  console.log("fail")
                if (params.fail) {
                       params.fail();
                }
            }
        // success
      },
      fail: function() {
        // fail
               if (params.fail) {
                params.fail();
            }
            console.log('失败')
      },
      complete: function() {
        // complete
              if (params.complete) {
                params.complete();
            }
            console.log('完成')
      }
    })
}

//登录
const login = (params) => {
    // getAPI(params, `${baseUrl}/user/login`);
  let result = {
    "status": 200,
    "data": [
      {
        "uid": "1000",
        "openId": "10001",
        "password": null,
        "avatarUrl": "http://photos.breadtrip.com/avatar_ff_dd_2996abbf0c199538920b538472431db431e693d9.jpg-avatar.l",
        "province": null,
        "city": null,
        "gender": null,
        "nickName": "每日经济",
        "phone": "",
        "isProfessor": "1"
      }
    ]
  };
  params.success(result);
}
//用户信息
const userInfo = (params) => {
    // getAPI(params, `${baseUrl}/user/userinfo`);
  let result = {
    "status": 200,
    "data": {
      "uid": "1000",
      "openId": "10001",
      "password": null,
      "avatarUrl": "http://photos.breadtrip.com/avatar_ff_dd_2996abbf0c199538920b538472431db431e693d9.jpg-avatar.l",
      "province": null,
      "city": null,
      "gender": null,
      "nickName": "每日经济",
      "phone": "",
      "isProfessor": "1",
      "pid": "1011"
    }
  };
  params.success(result);
}
//更新用户信息 昵称 头像 手机号
const updateUserinfo = (params) =>{
      getAPI(params, `${baseUrl}/user/updateinfo`);
}
//申请分析师
const applyPro = (params) =>{
     getAPI(params, `${baseUrl}/professor/apply`);
}
//全部分析师
const getProList = (params) =>{
      // getAPI(params, `${baseUrl}/professor/prolist`);
  let rusult = {
    "status": 200,
    "data": [
      {
        "pid": "1012",
        "openId": "10017",
        "brief": "阿里巴巴集团创始人",
        "latest": "私人银行客户",
        "user": {
          "avatarUrl": "../../../images/client/my.jpg",
          "nickName": "马云"
        },
        "attention": ""
      },
      {
        "pid": "1011",
        "openId": "10001",
        "brief": "腾讯公司控股董事会主席兼首席执行官；全国青联副主席",
        "latest": "私人银行客户",
        "user": {
          "avatarUrl": "../../../images/client/mht.jpg",
          "nickName": "马化腾"
        },
        "attention": ""
      },
      {
        "pid": "1004",
        "openId": "10007",
        "brief": "百度公司董事长兼首席执行官",
        "latest": "私人银行客户",
        "user": {
          "avatarUrl": "../../../images/client/lyh.jpg",
          "nickName": "李彦宏"
        },
        "attention": ""
      },
      {
        "pid": "1010",
        "openId": "10013",
        "brief": "足球 篮球 乒乓球 羽毛球 棒球 网球 高级分析师",
        "latest": "钻石级用户",
        "user": {
          "avatarUrl": "http://photos.breadtrip.com/avatar_ff_dd_2996abbf0c199538920b538472431db431e693d9.jpg-avatar.l",
          "nickName": "房地产老板"
        },
        "attention": ""
      },
      {
        "pid": "1009",
        "openId": "10012",
        "brief": "我是足球教授，资深足彩分析师，专业研究足彩超过10年，擅长亚盘、串关、滚球等玩法，熟悉足彩行业玩球规则，善于通过临场变盘做出准确判断。",
        "latest": "金卡客户",
        "user": {
          "avatarUrl": "http://photos.breadtrip.com/avatar_ff_dd_2996abbf0c199538920b538472431db431e693d9.jpg-avatar.l",
          "nickName": "大学教授"
        },
        "attention": ""
      },
      {
        "pid": "1008",
        "openId": "10011",
        "brief": "亚盘 滚球 足球 篮球 专栏 样样精通",
        "latest": "新客户",
        "user": {
          "avatarUrl": "http://photos.breadtrip.com/avatar_ff_dd_2996abbf0c199538920b538472431db431e693d9.jpg-avatar.l",
          "nickName": "学生"
        },
        "attention": ""
      },
      {
        "pid": "1007",
        "openId": "10010",
        "brief": "老司机，资深足彩分析师，专业研究足彩超过10年，擅长亚盘、串关、滚球等玩法，熟悉足彩行业玩球规则，善于通过临场变盘做出准确判断。",
        "latest": "金葵花客户",
        "user": {
          "avatarUrl": "http://photos.breadtrip.com/avatar_ff_dd_2996abbf0c199538920b538472431db431e693d9.jpg-avatar.l",
          "nickName": "商人"
        },
        "attention": ""
      },
      {
        "pid": "1006",
        "openId": "10009",
        "brief": "小莉莉，资深足彩分析师，专业研究足彩超过10年，擅长亚盘、串关、滚球等玩法，熟悉足彩行业玩球规则，善于通过临场变盘做出准确判断。",
        "latest": "普卡客户",
        "user": {
          "avatarUrl": "http://photos.breadtrip.com/avatar_ff_dd_2996abbf0c199538920b538472431db431e693d9.jpg-avatar.l",
          "nickName": "莉莉"
        },
        "attention": ""
      },
      {
        "pid": "1005",
        "openId": "10008",
        "brief": "经济学家带你飞，资深足彩分析师，专业研究足彩超过10年，擅长亚盘、串关、滚球等玩法，熟悉足彩行业玩球规则，善于通过临场变盘做出准确判断。",
        "latest": "私人银行客户",
        "user": {
          "avatarUrl": "http://photos.breadtrip.com/avatar_ff_dd_2996abbf0c199538920b538472431db431e693d9.jpg-avatar.l",
          "nickName": "环球中心"
        },
        "attention": ""
      },
      {
        "pid": "1003",
        "openId": "10006",
        "brief": "资深足彩分析师，专业研究足彩超过10年，擅长亚盘、串关、滚球等玩法，熟悉足彩行业玩球规则，善于通过临场变盘做出准确判断。",
        "latest": "钻石客户",
        "user": {
          "avatarUrl": "http://photos.breadtrip.com/avatar_ff_dd_2996abbf0c199538920b538472431db431e693d9.jpg-avatar.l",
          "nickName": "金城武"
        },
        "attention": ""
      }
    ]
  };
  params.success(rusult);
}
// 已关注分析师
const getAttentionList = (params) =>{
      // getAPI(params, `${baseUrl}/professor/attentionlist`);
  let rusult = {
    "status": 200,
    "data": [
      {
        "pid": "1012",
        "openId": "10017",
        "brief": "一个字就是特别帅。。。。。",
        "latest": "04-24 18:24",
        "user": {
          "avatarUrl": "http://photos.breadtrip.com/avatar_ff_dd_2996abbf0c199538920b538472431db431e693d9.jpg-avatar.l",
          "nickName": "小万"
        },
        "attention": "1007"
      },
      {
        "pid": "1011",
        "openId": "10001",
        "brief": "专业资深足彩分析师，擅长亚盘、串关、滚球等玩法，熟悉足彩行业玩球规则，善于通过临场变盘做出准确判断。",
        "latest": "03-23 10:44",
        "user": {
          "avatarUrl": "http://photos.breadtrip.com/avatar_ff_dd_2996abbf0c199538920b538472431db431e693d9.jpg-avatar.l",
          "nickName": "每日经济"
        },
        "attention": "1008"
      }
    ]
  };

  params.success(rusult);
}
//添加关注
const addAttention = (params) =>{
     getAPI(params, `${baseUrl}/professor/addattention`);
}
//取消关注
const cancelAttention = (params) =>{
     getAPI(params, `${baseUrl}/professor/cancelattention`);
}
//发布文章
const addart = (params) =>{
 getAPI(params, `${baseUrl}/article/addart`);
}
//文章列表
const artList = (params) =>{
    // getAPI(params, `${baseUrl}/article/artlist`);
  let tops = {
    "status": 200,
    "data": [
      {
        "aid": "1012",
        "openId": "10001",
        "pid": "1011",
        "ballType": "1",
        "gameType": "1",
        "isTop": "1",
        "needMoney": "1",
        "issueTime": "03-23 10:44",
        "price": "20.00",
        "gameOne": "梅斯 v.s 巴斯蒂亚",
        "oneTime": "03-23 10:48",
        "gameTwo": null,
        "twoTime": "03-23 10:44",
        "freeContent": "梅斯在法甲战绩8胜8负，失12球，法甲排名暂居16。球队目前情势非常危及，有降级的危险，需要邓多的胜场才能保住他们在法甲的位置。",
        "user": {
          "avatarUrl": "http://photos.breadtrip.com/avatar_ff_dd_2996abbf0c199538920b538472431db431e693d9.jpg-avatar.l",
          "nickName": "每日经济"
        },
        "oneEnd": "1",
        "twoEnd": "1"
      },
      {
        "aid": "1011",
        "openId": "10001",
        "pid": "1011",
        "ballType": "1",
        "gameType": "1",
        "isTop": "1",
        "needMoney": "1",
        "issueTime": "03-23 10:44",
        "price": "9.00",
        "gameOne": "华尔巴鄂 v.s 皇家马德里",
        "oneTime": "03-25 10:43",
        "gameTwo": null,
        "twoTime": "03-23 10:44",
        "freeContent": "西甲进行到第28轮，西甲的豪门球队皇马此次将挑战华尔巴鄂竞技，历史上两队交手，华尔巴鄂踢出51胜32平88负的战绩，情势较不有利。",
        "user": {
          "avatarUrl": "http://photos.breadtrip.com/avatar_ff_dd_2996abbf0c199538920b538472431db431e693d9.jpg-avatar.l",
          "nickName": "每日经济"
        },
        "oneEnd": "1",
        "twoEnd": "1"
      },
      {
        "aid": "1008",
        "openId": "10007",
        "pid": "1004",
        "ballType": "1",
        "gameType": "1",
        "isTop": "1",
        "needMoney": "0",
        "issueTime": "03-22 13:54",
        "price": "0.00",
        "gameOne": "切尔西 v.s 曼联",
        "oneTime": "03-22 23:53",
        "gameTwo": null,
        "twoTime": "03-22 13:54",
        "freeContent": "切尔西在近期的所有比赛当中表现良好，作为英超的豪门球队他们对于明天面对曼联的比赛相当的有自信。本赛季的状态相当强势，英超21胜3平3负。\n曼",
        "user": {
          "avatarUrl": "http://photos.breadtrip.com/avatar_ff_dd_2996abbf0c199538920b538472431db431e693d9.jpg-avatar.l",
          "nickName": "壹单"
        },
        "oneEnd": "1",
        "twoEnd": "1"
      }
    ]
  };

  let arts = {
    "status": 200,
    "data": [
      {
        "aid": "1017",
        "openId": "10017",
        "pid": "1012",
        "ballType": "1",
        "gameType": "1",
        "isTop": "0",
        "needMoney": "1",
        "issueTime": "04-24 18:24",
        "price": "10.00",
        "gameOne": " 里昂主场迎战贝西克塔斯",
        "oneTime": "04-25 18:24",
        "gameTwo": null,
        "twoTime": "04-24 18:24",
        "freeContent": "欧罗巴杯重点前瞻 足球竟猜推荐：土超豪强贝西克塔斯客场挑战法甲里昂",
        "user": {
          "avatarUrl": "http://photos.breadtrip.com/avatar_ff_dd_2996abbf0c199538920b538472431db431e693d9.jpg-avatar.l",
          "nickName": "小万"
        },
        "oneEnd": "1",
        "twoEnd": "1"
      },
      {
        "aid": "1016",
        "openId": "10017",
        "pid": "1012",
        "ballType": "1",
        "gameType": "1",
        "isTop": "0",
        "needMoney": "0",
        "issueTime": "04-24 18:23",
        "price": "0.00",
        "gameOne": "尤文图斯主场迎战西甲豪强巴萨",
        "oneTime": "04-29 18:24",
        "gameTwo": null,
        "twoTime": "04-24 18:23",
        "freeContent": "4/12 凌晨02点45分，欧冠杯 尤文图斯主场迎战西甲豪强巴萨。\n\n尤文图斯在本赛季中表现没有太大的挫败，意甲排名第一的尤文图斯在近攻及防守方面都",
        "user": {
          "avatarUrl": "http://photos.breadtrip.com/avatar_ff_dd_2996abbf0c199538920b538472431db431e693d9.jpg-avatar.l",
          "nickName": "小万"
        },
        "oneEnd": "1",
        "twoEnd": "1"
      },
      {
        "aid": "1015",
        "openId": "10017",
        "pid": "1012",
        "ballType": "2",
        "gameType": "1",
        "isTop": "0",
        "needMoney": "1",
        "issueTime": "04-24 18:22",
        "price": "10.00",
        "gameOne": "底特律活塞 主场迎战 布鲁克林篮网",
        "oneTime": "04-24 18:23",
        "gameTwo": null,
        "twoTime": "04-24 18:22",
        "freeContent": "NBA赛前重点分析: 篮网近期情况看好, 活塞能否终结连败趋势?",
        "user": {
          "avatarUrl": "http://photos.breadtrip.com/avatar_ff_dd_2996abbf0c199538920b538472431db431e693d9.jpg-avatar.l",
          "nickName": "小万"
        },
        "oneEnd": "1",
        "twoEnd": "1"
      },
      {
        "aid": "1014",
        "openId": "10017",
        "pid": "1012",
        "ballType": "1",
        "gameType": "1",
        "isTop": "0",
        "needMoney": "1",
        "issueTime": "04-24 18:21",
        "price": "8.00",
        "gameOne": "里昂主场迎战贝西克塔斯",
        "oneTime": "04-25 18:22",
        "gameTwo": null,
        "twoTime": "04-24 18:21",
        "freeContent": "欧罗巴杯重点前瞻 足球竟猜推荐：土超豪强贝西克塔斯客场挑战法甲里昂",
        "user": {
          "avatarUrl": "http://photos.breadtrip.com/avatar_ff_dd_2996abbf0c199538920b538472431db431e693d9.jpg-avatar.l",
          "nickName": "小万"
        },
        "oneEnd": "1",
        "twoEnd": "1"
      },
      {
        "aid": "1013",
        "openId": "10017",
        "pid": "1012",
        "ballType": "2",
        "gameType": "3",
        "isTop": "0",
        "needMoney": "0",
        "issueTime": "03-23 13:38",
        "price": "0.00",
        "gameOne": null,
        "oneTime": "03-23 13:38",
        "gameTwo": null,
        "twoTime": "03-23 13:38",
        "freeContent": "NBA免费专栏，良心平台，不错选择。",
        "user": {
          "avatarUrl": "http://photos.breadtrip.com/avatar_ff_dd_2996abbf0c199538920b538472431db431e693d9.jpg-avatar.l",
          "nickName": "小万"
        },
        "oneEnd": "1",
        "twoEnd": "1"
      },
      {
        "aid": "1012",
        "openId": "10001",
        "pid": "1011",
        "ballType": "1",
        "gameType": "1",
        "isTop": "1",
        "needMoney": "1",
        "issueTime": "03-23 10:44",
        "price": "20.00",
        "gameOne": "梅斯 v.s 巴斯蒂亚",
        "oneTime": "03-23 10:48",
        "gameTwo": null,
        "twoTime": "03-23 10:44",
        "freeContent": "梅斯在法甲战绩8胜8负，失12球，法甲排名暂居16。球队目前情势非常危及，有降级的危险，需要邓多的胜场才能保住他们在法甲的位置。",
        "user": {
          "avatarUrl": "http://photos.breadtrip.com/avatar_ff_dd_2996abbf0c199538920b538472431db431e693d9.jpg-avatar.l",
          "nickName": "每日经济"
        },
        "oneEnd": "1",
        "twoEnd": "1"
      },
      {
        "aid": "1011",
        "openId": "10001",
        "pid": "1011",
        "ballType": "1",
        "gameType": "1",
        "isTop": "1",
        "needMoney": "1",
        "issueTime": "03-23 10:44",
        "price": "9.00",
        "gameOne": "华尔巴鄂 v.s 皇家马德里",
        "oneTime": "03-25 10:43",
        "gameTwo": null,
        "twoTime": "03-23 10:44",
        "freeContent": "西甲进行到第28轮，西甲的豪门球队皇马此次将挑战华尔巴鄂竞技，历史上两队交手，华尔巴鄂踢出51胜32平88负的战绩，情势较不有利。",
        "user": {
          "avatarUrl": "http://photos.breadtrip.com/avatar_ff_dd_2996abbf0c199538920b538472431db431e693d9.jpg-avatar.l",
          "nickName": "每日经济"
        },
        "oneEnd": "1",
        "twoEnd": "1"
      },
      {
        "aid": "1010",
        "openId": "10001",
        "pid": "1011",
        "ballType": "2",
        "gameType": "1",
        "isTop": "0",
        "needMoney": "1",
        "issueTime": "03-23 10:42",
        "price": "30.00",
        "gameOne": "亚特兰大老鹰",
        "oneTime": "03-23 12:50",
        "gameTwo": null,
        "twoTime": "03-23 10:42",
        "freeContent": "NBA赛事精准分析：华盛顿奇才主场迎战亚特兰大老鹰，奇才让分能胜？",
        "user": {
          "avatarUrl": "http://photos.breadtrip.com/avatar_ff_dd_2996abbf0c199538920b538472431db431e693d9.jpg-avatar.l",
          "nickName": "每日经济"
        },
        "oneEnd": "1",
        "twoEnd": "1"
      },
      {
        "aid": "1009",
        "openId": "10007",
        "pid": "1004",
        "ballType": "2",
        "gameType": "3",
        "isTop": "0",
        "needMoney": "0",
        "issueTime": "03-22 13:56",
        "price": "0.00",
        "gameOne": null,
        "oneTime": "03-22 13:56",
        "gameTwo": null,
        "twoTime": "03-22 13:56",
        "freeContent": "（NBA赛事）太阳直接晒湖人目前战绩19胜45负，排名西部第15位，太阳则以21胜43负的战绩排名西部第14位，两队之间差了2个胜场，而常规赛已经进入倒数2",
        "user": {
          "avatarUrl": "http://photos.breadtrip.com/avatar_ff_dd_2996abbf0c199538920b538472431db431e693d9.jpg-avatar.l",
          "nickName": "壹单"
        },
        "oneEnd": "1",
        "twoEnd": "1"
      },
      {
        "aid": "1008",
        "openId": "10007",
        "pid": "1004",
        "ballType": "1",
        "gameType": "1",
        "isTop": "1",
        "needMoney": "0",
        "issueTime": "03-22 13:54",
        "price": "0.00",
        "gameOne": "切尔西 v.s 曼联",
        "oneTime": "03-22 23:53",
        "gameTwo": null,
        "twoTime": "03-22 13:54",
        "freeContent": "切尔西在近期的所有比赛当中表现良好，作为英超的豪门球队他们对于明天面对曼联的比赛相当的有自信。本赛季的状态相当强势，英超21胜3平3负。\n曼",
        "user": {
          "avatarUrl": "http://photos.breadtrip.com/avatar_ff_dd_2996abbf0c199538920b538472431db431e693d9.jpg-avatar.l",
          "nickName": "壹单"
        },
        "oneEnd": "1",
        "twoEnd": "1"
      }
    ]
  };
  if (params.data.top){
    params.success(tops);
  }else{
    params.success(arts);
  }
}
//文章详情
const artinfo = (params) =>{
    // getAPI(params, `${baseUrl}/article/artinfo`);
  let result = {
    "status": 200,
    "data": {
      "aid": "1011",
      "openId": "10001",
      "pid": "1011",
      "ballType": "1",
      "gameType": "1",
      "isTop": "1",
      "needMoney": "1",
      "issueTime": "03-23 10:44",
      "price": "9.00",
      "gameOne": "华尔巴鄂 v.s 皇家马德里",
      "oneTime": "03-25 10:43",
      "gameTwo": null,
      "twoTime": "03-23 10:44",
      "odds": "1.0",
      "freeContent": "西甲进行到第28轮，西甲的豪门球队皇马此次将挑战华尔巴鄂竞技，历史上两队交手，华尔巴鄂踢出51胜32平88负的战绩，情势较不有利。",
      "content": "『主对情报』\n\n1、华尔巴鄂近13个西甲主场不败，是西甲联赛当中，主场不败的最长记录者。\n\n2.华尔巴鄂喜欢在最后十五分钟进球，再这一个阶段共打进8球 ，时常成为绝杀对手的球队。\n\n3、华尔巴鄂近三次主场与皇马交手1胜1平1负。\n\n『客队情报』\n\n1、皇马连续48场各项赛事都能收获进球，成为西甲球队中最常进球的球队，场均2.7球。\n\n2、皇家马德里客场丢球较多，连续6个西甲客场都有丢球。\n\n3、皇马主力都喜欢对阵华尔巴鄂，近15次对战打进16球。\n\n《投资建议》\n\n推荐 皇马-0.75/2.75大球\n\n波胆推荐 1：2、1：3\n\n",
      "picture": "1490237038tmp_35984087o6zAJs7mmhWjibPgIiaAgcxecRPw1490237055398.jpg,1490237039tmp_35984087o6zAJs7mmhWjibPgIiaAgcxecRPw1490237059554.jpg",
      "status": "1",
      "user": {
        "avatarUrl": "http://photos.breadtrip.com/avatar_ff_dd_2996abbf0c199538920b538472431db431e693d9.jpg-avatar.l",
        "nickName": "每日经济"
      },
      "pro": {
        "pid": "1011",
        "openId": "10001",
        "brief": "专业资深足彩分析师，擅长亚盘、串关、滚球等玩法，熟悉足彩行业玩球规则，善于通过临场变盘做出准确判断。",
        "latest": "03-23 10:44",
        "count": 4,
        "attention": ""
      },
      "seeAll": "1",
      "praiseCount": 0,
      "praiseId": "",
      "collectId": ""
    }
  };

  params.success(result);
}
//收藏
const addcollect = (params) => {
     getAPI(params, `${baseUrl}/comm/addcollect`);
}
//取消收藏
const cancelcollect = (params) => {
     getAPI(params, `${baseUrl}/comm/cancelcollect`);
}
//收藏列表
const collectlist = (params) => {
     getAPI(params, `${baseUrl}/comm/collectlist`);
}
//点赞
const addPraise = (params) => {
     getAPI(params, `${baseUrl}/praise/add`);
}
//取消点赞
const cancelPraise = (params) => {
     getAPI(params, `${baseUrl}/praise/cancel`);
}
//购买
const buy = (params) => {
     getAPI(params, `${baseUrl}/order/buy`);
}
//已购买
const buyed = (params) => {
     getAPI(params, `${baseUrl}/order/buyed`);
}
//专家详情
const proInfo = (params) => {
    //  getAPI(params, `${baseUrl}/professor/prodetail`);
  let result = {
    "status": 200,
    "data": {
      "pid": "1011",
      "openId": "10001",
      "status": "1",
      "name": "经济学家",
      "phone": "15345234545",
      "brief": "专业资深足彩分析师，擅长亚盘、串关、滚球等玩法，熟悉足彩行业玩球规则，善于通过临场变盘做出准确判断。",
      "joinDate": "2017-03-22 13:38:48",
      "grade": "1",
      "wechat": "oneqiugo",
      "latest": "2017-03-23 10:44:50",
      "attention": "",
      "count": 4,
      "user": {
        "avatarUrl": "http://photos.breadtrip.com/avatar_ff_dd_2996abbf0c199538920b538472431db431e693d9.jpg-avatar.l",
        "nickName": "每日经济"
      }
    }
  };
  params.success(result);
}
//分析师自己详情
const myProInfo = (params) => {
     getAPI(params, `${baseUrl}/professor/myinfo`);
}
//获取消息列表
const msgList = (params) => {
getAPI(params, `${baseUrl}/comm/msglist`);
}
const getUnCheckPro = (params) =>{
    getAPI(params, `${baseUrl}/comm/getUnCheckPro`);
}
const checkPro = (params) =>{
    getAPI(params, `${baseUrl}/comm/checkPro`);
}
module.exports = {
    login,
    userInfo,
    updateUserinfo,
    applyPro,
    getProList,
    getAttentionList,
    addAttention,
    cancelAttention,
    addart,
    artList,
    artinfo,
    addcollect,
    cancelcollect,
    collectlist,
    addPraise,
    cancelPraise,
    buy,
    buyed,
    proInfo,
    myProInfo,
    msgList,
    getUnCheckPro,
    checkPro,
    upload,
}


















