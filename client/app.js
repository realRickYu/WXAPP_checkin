//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
  globalData:{
    userId:'123'
  },
  onLaunch: function () {
    qcloud.setLoginUrl(config.service.loginUrl)
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res)
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: 'wxdaddcb93abec0a55',
              secret: 'ff7237e5dd7ed615abdeccbf301f7c5c',
              js_code:res.code,
              grant_type:'grant_type=authorization_code'
            },
            method: 'GET',
            //返回userID或者未注册过的标识
            success: function (res) {
              console.log('res');
              console.log(res);   
              getApp().globalData.userId=res.data.openid;
              console.log(res.data.openid);
              console.log(getApp().globalData.userId)          
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  }
})