var sha256 = require('../utils/sha256')
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 返回当前日期 YYYY-MM-DD
function formatDateForPicker(date, flag) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  // start -> 月初 / end -> 下月初 / else -> 当前日期
  if(flag === 'start'){
    return [year, month, 1].map(formatNumber).join('-')
  }else if(flag === 'end'){
    return [year, month+1, 1].map(formatNumber).join('-')
  }else{
    return [year, month, day].map(formatNumber).join('-')
  }
}

// 返回当前时间 HH:mm:ss
function currentTime(){
  var date = new Date(Date.now());

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [hour, minute, second].map(formatNumber).join(':');
}


/**
 * 转换地址数据
 * */
function replacePhone(arr, isreplace) {
  var newAddr = []
  for (let i = 0; i < arr.length; i++) {
    if (isreplace) {
      let phone = arr[i].phone
      arr[i].phone = phone.replace(phone.substring(3, 7), '****')
    }
    newAddr[i] = arr[i].name + ' ' + arr[i].phone + '\n' + arr[i].province + arr[i].city + arr[i].addr
  }

  return newAddr
}

/*
短信API
*/
function sendMsg(name, phonenumber) {
  //发送短信
  var msgUrl = "https://yun.tim.qq.com/v5/tlssmssvr/sendsms?sdkappid=1400079927&random=7226249334"
  var date = new Date();
  var humanDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
  console.log(humanDate.getTime() / 1000 - 8 * 60 * 60);
  var timemsg = humanDate.getTime() / 1000 - 8 * 60 * 60;
  var sigmsg = sha256.SHA256("appkey=ed873077f1f201cfa7be7b0857b58701&random=7226249334&time=" + timemsg + "&mobile=" + phonenumber);
  wx.request({
    url: msgUrl,
    data: {
      "ext": "",
      "extend": "",
      "params": [
        name
      ],
      "sig": sigmsg,
      "sign": "Fintechteam",
      "tel": {
        "mobile": phonenumber,
        "nationcode": "86"
      },
      "time": timemsg,
      "tpl_id": 115872
    },
    dataType: "json",
    header: {
      'content-type': 'application/json'
    },
    method: "POST",
    success: function (res) {
      console.log(res);
      return res.data;
    }
  })
  //若发送不成功，还需要返回吗
  
}
module.exports = {
  formatTime: formatTime,
  replacePhone: replacePhone,
  formatDate: formatDateForPicker,
  currentTime: currentTime,
  sendMsg:sendMsg
}
