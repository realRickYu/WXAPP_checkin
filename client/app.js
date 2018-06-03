//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
  globalData:{
    userId:''
  },
  onLaunch: function () {
    //qcloud.setLoginUrl(config.service.loginUrl)
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: config.service.loginUrl,
            data: {
              code: res.code
            },
            //返回userID或者未注册过的标识
            success: function (res) {
              if (res.data.success) {
                var register = res.data.result.register;//根据openID判断是否注册过，false和true
                if (register=='false'){
                  userId: res.data.result.userId//如果未注册过，返回一个新的userID
                  wx.navigateTo({ url: "pages/user/user?user=newuser"})
                } else if (register == 'true'){
                  that.setData({
                    userId: res.data.result.userId//返回该用户userID
                  })
                }
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  }
})